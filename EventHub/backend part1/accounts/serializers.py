from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile


# ---- Serializer (manual) ---- #
class RegisterSerializer(serializers.Serializer):
    """Manual Serializer for user registration."""
    username = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=8)
    password2 = serializers.CharField(write_only=True, min_length=8)
    first_name = serializers.CharField(max_length=150, required=False, allow_blank=True)
    last_name = serializers.CharField(max_length=150, required=False, allow_blank=True)
    phone = serializers.CharField(max_length=20, required=False, allow_blank=True)
    role = serializers.ChoiceField(choices=[('attendee', 'Attendee'), ('organizer', 'Organizer')], default='attendee')

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError('Username already exists.')
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError('Email already registered.')
        return value

    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError('Password must be at least 8 characters.')
        if not any(c.isdigit() for c in value):
            raise serializers.ValidationError('Password must contain at least one digit.')
        return value

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({'password': 'Passwords do not match.'})
        return data

    def create(self, validated_data):
        validated_data.pop('password2')
        first_name = validated_data.pop('first_name', '')
        last_name = validated_data.pop('last_name', '')
        phone = validated_data.pop('phone', '')
        role = validated_data.pop('role', 'attendee')

        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=first_name,
            last_name=last_name
        )
        
        # Profile is created by signal, so we update it
        profile = user.profile
        profile.phone = phone
        profile.role = role
        profile.save()
        
        return user


# ---- Serializer (manual) ---- #
class LoginSerializer(serializers.Serializer):
    """Manual Serializer for login."""
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)


# ---- ModelSerializer ---- #
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['bio', 'phone', 'avatar', 'location', 'website']


# ---- ModelSerializer ---- #
class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'profile', 'is_staff', 'is_superuser']
        read_only_fields = ['id', 'username', 'email', 'is_staff', 'is_superuser']

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', {})
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.save()

        profile = instance.profile
        for attr, value in profile_data.items():
            setattr(profile, attr, value)
        profile.save()
        return instance
