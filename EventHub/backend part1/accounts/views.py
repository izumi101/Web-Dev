import logging
import secrets

from rest_framework.decorators import api_view, permission_classes, throttle_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.db import transaction
from django.db.models import Q

from .serializers import RegisterSerializer, LoginSerializer, UserSerializer
from .models import PasswordResetCode

logger = logging.getLogger(__name__)


# ---- Throttle classes ---- #
class LoginRateThrottle(AnonRateThrottle):
    rate = '5/min'


class RegisterRateThrottle(AnonRateThrottle):
    rate = '3/min'


class PasswordResetRateThrottle(AnonRateThrottle):
    rate = '3/min'


# ---- FBV: Register ---- #
@api_view(['POST'])
@permission_classes([AllowAny])
@throttle_classes([RegisterRateThrottle])
def register_view(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        try:
            with transaction.atomic():
                user = serializer.save()

                try:
                    send_mail(
                        'Welcome to EventHub 🎉',
                        'Hey there 👋\n\nWelcome to EventHub — your space for discovering, creating, and sharing amazing events.\n\nWe\'re really excited to have you here 🚀\n\nFrom now on, you can explore events around you, join communities, and never miss something interesting again.\n\nThis is just the beginning — let\'s build something awesome together 🔥\n\nSee you inside,\nEventHub Team',
                        'EventHub Team <eventhub.supporting@gmail.com>',
                        [user.email],
                        fail_silently=True,
                    )
                except Exception as e:
                    logger.warning('Welcome email failed for user %s: %s', user.username, e)

                refresh = RefreshToken.for_user(user)
                logger.info('User registered: %s (%s)', user.username, user.email)
                return Response({
                    'user': UserSerializer(user).data,
                    'tokens': {
                        'refresh': str(refresh),
                        'access': str(refresh.access_token),
                    }
                }, status=status.HTTP_201_CREATED)
        except Exception as e:
            logger.error('Registration error: %s', e, exc_info=True)
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ---- FBV: Login ---- #
@api_view(['POST'])
@permission_classes([AllowAny])
@throttle_classes([LoginRateThrottle])
def login_view(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        identifier = serializer.validated_data['username']
        db_user = User.objects.filter(Q(email=identifier) | Q(username=identifier)).first()
        
        user = None
        if db_user:
            user = authenticate(
                username=db_user.username,
                password=serializer.validated_data['password'],
            )
        if user:
            refresh = RefreshToken.for_user(user)
            logger.info('User logged in: %s', user.username)
            return Response({
                'user': UserSerializer(user).data,
                'tokens': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }
            })
        logger.warning('Failed login attempt for username: %s', serializer.validated_data['username'])
        return Response(
            {'error': 'Invalid credentials'},
            status=status.HTTP_401_UNAUTHORIZED,
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ---- FBV: Logout ---- #
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    try:
        refresh_token = request.data.get('refresh')
        if refresh_token:
            token = RefreshToken(refresh_token)
            token.blacklist()
        return Response({'message': 'Successfully logged out'}, status=status.HTTP_200_OK)
    except Exception:
        return Response({'message': 'Logged out'}, status=status.HTTP_200_OK)


# ---- FBV: Profile ---- #
@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def profile_view(request):
    if request.method == 'GET':
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ---- FBV: Password Reset — Step 1: Request code ---- #
@api_view(['POST'])
@permission_classes([AllowAny])
@throttle_classes([PasswordResetRateThrottle])
def password_reset_request(request):
    """Accept email or username, generate a 6-digit code, 'send' it."""
    identifier = request.data.get('identifier', '').strip()
    if not identifier:
        return Response({'error': 'Please enter your email or username.'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.filter(Q(email=identifier) | Q(username=identifier)).first()
    if not user:
        # Don't reveal whether user exists — always return success
        return Response({'message': 'If an account exists, a reset code has been sent to the associated email.'})

    reset_code = PasswordResetCode.create_for_user(user)

    # Send reset code email
    try:
        send_mail(
            'EventHub — Password Reset Code',
            f'Your password reset code is: {reset_code.code}\n\nThis code expires in 15 minutes.\n\nIf you did not request this, please ignore this email.',
            'EventHub <eventhub.supporting@gmail.com>',
            [user.email],
            fail_silently=True,
        )
    except Exception as e:
        logger.warning('Password reset email failed for %s: %s', user.username, e)

    logger.info('Password reset requested for user: %s', user.username)
    return Response({'message': 'If an account exists, a reset code has been sent to the associated email.'})


# ---- FBV: Password Reset — Step 2: Verify code ---- #
@api_view(['POST'])
@permission_classes([AllowAny])
def password_reset_verify(request):
    """Verify the 6-digit code and return a one-time reset token."""
    identifier = request.data.get('identifier', '').strip()
    code = request.data.get('code', '').strip()

    if not identifier or not code:
        return Response({'error': 'Identifier and code are required.'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.filter(Q(email=identifier) | Q(username=identifier)).first()
    if not user:
        return Response({'error': 'Invalid code.'}, status=status.HTTP_400_BAD_REQUEST)

    reset_entry = PasswordResetCode.objects.filter(
        user=user, code=code, is_used=False
    ).first()

    if not reset_entry or reset_entry.is_expired:
        return Response({'error': 'Invalid or expired code.'}, status=status.HTTP_400_BAD_REQUEST)

    # Generate one-time reset token
    reset_token = secrets.token_urlsafe(48)
    reset_entry.reset_token = reset_token
    reset_entry.save()

    return Response({'reset_token': reset_token, 'message': 'Code verified successfully.'})


# ---- FBV: Password Reset — Step 3: Set new password ---- #
@api_view(['POST'])
@permission_classes([AllowAny])
def password_reset_confirm(request):
    """Accept reset_token + new password, change password in DB."""
    reset_token = request.data.get('reset_token', '').strip()
    new_password = request.data.get('new_password', '').strip()
    new_password2 = request.data.get('new_password2', '').strip()

    if not reset_token or not new_password:
        return Response({'error': 'Reset token and new password are required.'}, status=status.HTTP_400_BAD_REQUEST)

    if new_password != new_password2:
        return Response({'error': 'Passwords do not match.'}, status=status.HTTP_400_BAD_REQUEST)

    if len(new_password) < 8:
        return Response({'error': 'Password must be at least 8 characters.'}, status=status.HTTP_400_BAD_REQUEST)

    if not any(c.isdigit() for c in new_password):
        return Response({'error': 'Password must contain at least one digit.'}, status=status.HTTP_400_BAD_REQUEST)

    reset_entry = PasswordResetCode.objects.filter(
        reset_token=reset_token, is_used=False
    ).first()

    if not reset_entry or reset_entry.is_expired:
        return Response({'error': 'Invalid or expired reset token.'}, status=status.HTTP_400_BAD_REQUEST)

    # Change the password
    user = reset_entry.user
    user.set_password(new_password)
    user.save()

    # Mark code as used
    reset_entry.is_used = True
    reset_entry.save()

    logger.info('Password reset completed for user: %s', user.username)
    return Response({'message': 'Password has been reset successfully. You can now log in.'})
