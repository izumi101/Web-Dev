from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Category, Event, Registration


# ---- ModelSerializer ---- #
class CategorySerializer(serializers.ModelSerializer):
    event_count = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'icon', 'event_count']

    def get_event_count(self, obj):
        return obj.events.filter(status='published').count()


# ---- Serializer (manual) for event creation ---- #
class EventCreateSerializer(serializers.Serializer):
    """Manual Serializer for creating events."""
    id = serializers.IntegerField(read_only=True)
    status = serializers.CharField(read_only=True)
    title = serializers.CharField(max_length=200)
    description = serializers.CharField()
    category_id = serializers.IntegerField()
    date = serializers.DateTimeField()
    end_date = serializers.DateTimeField(required=False, allow_null=True)
    location = serializers.CharField(max_length=300)
    address = serializers.CharField(required=False, allow_blank=True)
    image = serializers.ImageField(required=False, allow_null=True)
    price = serializers.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    max_participants = serializers.IntegerField(default=100)
    is_online = serializers.BooleanField(default=False)
    online_link = serializers.URLField(required=False, allow_blank=True)

    def validate_category_id(self, value):
        if not Category.objects.filter(id=value).exists():
            raise serializers.ValidationError('Category does not exist.')
        return value

    def create(self, validated_data):
        category_id = validated_data.pop('category_id')
        category = Category.objects.get(id=category_id)
        organizer = self.context['request'].user
        event = Event.objects.create(
            organizer=organizer,
            category=category,
            **validated_data,
        )
        return event

    def update(self, instance, validated_data):
        category_id = validated_data.pop('category_id', None)
        if category_id:
            instance.category = Category.objects.get(id=category_id)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


class OrganizerMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name']


# ---- ModelSerializer ---- #
class EventListSerializer(serializers.ModelSerializer):
    organizer = OrganizerMiniSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    available_spots = serializers.ReadOnlyField()
    is_free = serializers.ReadOnlyField()
    registered_count = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = [
            'id', 'title', 'description', 'organizer', 'category',
            'date', 'end_date', 'location', 'address', 'image',
            'price', 'max_participants', 'status', 'is_online',
            'online_link', 'available_spots', 'is_free',
            'registered_count', 'created_at',
        ]

    def get_registered_count(self, obj):
        return obj.registrations.filter(status='confirmed').count()


# ---- ModelSerializer ---- #
class RegistrationSerializer(serializers.ModelSerializer):
    event = EventListSerializer(read_only=True)
    username = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Registration
        fields = [
            'id', 'event', 'username', 'status', 'registered_at', 
            'notes', 'ticket_uuid', 'is_checked_in', 'checked_in_at'
        ]
        read_only_fields = ['id', 'registered_at', 'status', 'ticket_uuid', 'is_checked_in', 'checked_in_at']
