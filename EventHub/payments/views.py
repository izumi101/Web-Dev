import stripe
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

from events.models import Registration
from .models import Payment

stripe.api_key = settings.STRIPE_SECRET_KEY


# ---- FBV: Create Stripe Checkout Session ---- #
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_checkout_session(request, registration_id):
    registration = get_object_or_404(
        Registration, id=registration_id, user=request.user
    )

    if registration.event.is_free:
        return Response(
            {'error': 'This event is free, no payment needed'},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if hasattr(registration, 'payment') and registration.payment.status == 'completed':
        return Response(
            {'error': 'Payment already completed'},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': 'usd',
                    'product_data': {
                        'name': registration.event.title,
                        'description': f'Registration for {registration.event.title}',
                    },
                    'unit_amount': int(registration.event.price * 100),
                },
                'quantity': 1,
            }],
            mode='payment',
            success_url=f'{settings.FRONTEND_URL}/payment/success?session_id={{CHECKOUT_SESSION_ID}}',
            cancel_url=f'{settings.FRONTEND_URL}/payment/cancel',
            metadata={
                'registration_id': registration.id,
            },
        )

        payment, created = Payment.objects.get_or_create(
            registration=registration,
            defaults={
                'amount': registration.event.price,
                'stripe_checkout_session_id': checkout_session.id,
            },
        )
        if not created:
            payment.stripe_checkout_session_id = checkout_session.id
            payment.save()

        return Response({
            'checkout_url': checkout_session.url,
            'session_id': checkout_session.id,
        })

    except stripe.error.StripeError as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_400_BAD_REQUEST,
        )


# ---- FBV: Stripe Webhook ---- #
@api_view(['POST'])
@permission_classes([AllowAny])
def stripe_webhook(request):
    payload = request.body
    sig_header = request.META.get('HTTP_STRIPE_SIGNATURE')

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
        )
    except (ValueError, stripe.error.SignatureVerificationError):
        return Response(status=status.HTTP_400_BAD_REQUEST)

    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        registration_id = session['metadata'].get('registration_id')
        if registration_id:
            try:
                payment = Payment.objects.get(
                    stripe_checkout_session_id=session['id']
                )
                payment.status = 'completed'
                payment.stripe_payment_intent_id = session.get('payment_intent', '')
                payment.save()

                registration = payment.registration
                registration.status = 'confirmed'
                registration.save()
            except Payment.DoesNotExist:
                pass

    return Response(status=status.HTTP_200_OK)


# ---- FBV: Verify payment ---- #
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def verify_payment(request):
    session_id = request.query_params.get('session_id')
    if not session_id:
        return Response({'error': 'session_id required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        payment = Payment.objects.get(stripe_checkout_session_id=session_id)
        return Response({
            'status': payment.status,
            'event_title': payment.registration.event.title,
            'amount': str(payment.amount),
        })
    except Payment.DoesNotExist:
        return Response({'error': 'Payment not found'}, status=status.HTTP_404_NOT_FOUND)
