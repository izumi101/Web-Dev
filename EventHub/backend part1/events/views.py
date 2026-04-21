from rest_framework import generics, viewsets, status, filters
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import (
    BasePermission,
    SAFE_METHODS,
    IsAuthenticated,
    IsAuthenticatedOrReadOnly,
    AllowAny,
)
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.utils import timezone

from .models import Category, Event, Registration
from .serializers import (
    CategorySerializer,
    EventListSerializer,
    EventCreateSerializer,
    RegistrationSerializer,
)


class IsOrganizerOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.organizer == request.user


# ---- CBV: Categories ---- #
class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    pagination_class = None

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsAuthenticated()]
        return [AllowAny()]


# ---- CBV: Events (full CRUD via ViewSet) ---- #
class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.filter(status='published')
    permission_classes = [IsAuthenticatedOrReadOnly, IsOrganizerOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description', 'location']
    ordering_fields = ['date', 'price', 'created_at']

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return EventCreateSerializer
        return EventListSerializer

    def get_queryset(self):
        queryset = Event.objects.all()
        category = self.request.query_params.get('category')
        is_free = self.request.query_params.get('is_free')
        is_online = self.request.query_params.get('is_online')
        status_param = self.request.query_params.get('status', 'published')

        if status_param:
            queryset = queryset.filter(status=status_param)
        if category:
            queryset = queryset.filter(category_id=category)
        if is_free == 'true':
            queryset = queryset.filter(price=0)
        if is_online == 'true':
            queryset = queryset.filter(is_online=True)

        return queryset

    def perform_create(self, serializer):
        serializer.save()

    def destroy(self, request, *args, **kwargs):
        event = self.get_object()
        if event.organizer != request.user:
            return Response(
                {'error': 'You can only delete your own events'},
                status=status.HTTP_403_FORBIDDEN,
            )
        return super().destroy(request, *args, **kwargs)

    # Custom action: get registrations for an event
    @action(detail=True, methods=['get'], permission_classes=[IsAuthenticated])
    def registrations(self, request, pk=None):
        event = self.get_object()
        # Only organizer can see all registrations
        if event.organizer != request.user:
            return Response({'error': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)
        
        registrations = event.registrations.all()
        serializer = RegistrationSerializer(registrations, many=True)
        return Response(serializer.data)

    # Custom action: get stats for an event dashboard
    @action(detail=True, methods=['get'], permission_classes=[IsAuthenticated])
    def stats(self, request, pk=None):
        event = self.get_object()
        if event.organizer != request.user:
            return Response({'error': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)
        
        total_regs = event.registrations.filter(status='confirmed').count()
        checked_in = event.registrations.filter(is_checked_in=True).count()
        
        return Response({
            'total_registrations': total_regs,
            'checked_in': checked_in,
            'remaining': total_regs - checked_in,
            'check_in_rate': round((checked_in / total_regs * 100), 2) if total_regs > 0 else 0
        })


# ---- CBV: Registrations ViewSet for Check-in ---- #
class RegistrationViewSet(viewsets.GenericViewSet):
    queryset = Registration.objects.all()
    serializer_class = RegistrationSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['post'], url_path='check-in/(?P<uuid>[^/.]+)')
    def check_in(self, request, uuid=None):
        registration = get_object_or_404(Registration, ticket_uuid=uuid)
        
        # Security check: only the organizer of the event can check in people
        if registration.event.organizer != request.user:
            return Response(
                {'error': 'Only the event organizer can perform check-in.'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        if registration.is_checked_in:
            return Response(
                {
                    'message': 'Ticket already checked in!',
                    'status': 'used',
                    'attendee': registration.user.username,
                    'checked_in_at': registration.checked_in_at
                },
                status=status.HTTP_200_OK
            )
        
        registration.is_checked_in = True
        registration.checked_in_at = timezone.now()
        registration.save()
        
        return Response({
            'message': 'Ticket valid! Welcome to the event.',
            'status': 'success',
            'attendee': registration.user.username,
            'event': registration.event.title
        }, status=status.HTTP_200_OK)


# ---- FBV: Register for event ---- #
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def register_for_event(request, event_id):
    event = get_object_or_404(Event, id=event_id)

    if event.organizer == request.user:
        return Response(
            {'error': 'Organizers cannot register for their own events'},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if Registration.objects.filter(user=request.user, event=event).exclude(status='cancelled').exists():
        return Response(
            {'error': 'You are already registered for this event'},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if event.available_spots <= 0:
        return Response(
            {'error': 'No available spots'},
            status=status.HTTP_400_BAD_REQUEST,
        )

    reg_status = 'confirmed' if event.is_free else 'pending'

    # handle re-registration (IntegrityError fix)
    registration, created = Registration.objects.get_or_create(
        user=request.user,
        event=event,
        defaults={
            'status': reg_status,
            'notes': request.data.get('notes', ''),
        }
    )

    if not created:
        registration.status = reg_status
        registration.notes = request.data.get('notes', '')
        registration.save()

    serializer = RegistrationSerializer(registration)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


# ---- FBV: Cancel registration ---- #
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def cancel_registration(request, event_id):
    registration = get_object_or_404(
        Registration, user=request.user, event_id=event_id
    )
    registration.status = 'cancelled'
    registration.save()
    return Response({'message': 'Registration cancelled'})


# ---- CBV: My events (organized) ---- #
class MyEventsView(generics.ListAPIView):
    serializer_class = EventListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Event.objects.filter(organizer=self.request.user)


# ---- CBV: My registrations ---- #
class MyRegistrationsView(generics.ListAPIView):
    serializer_class = RegistrationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Registration.objects.filter(user=self.request.user).exclude(status='cancelled')
