from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'events', views.EventViewSet, basename='event')
router.register(r'registrations', views.RegistrationViewSet, basename='registration')

urlpatterns = [
    path('', include(router.urls)),
    path('categories/', views.CategoryListCreateView.as_view(), name='category-list'),
    path('events/<int:event_id>/register/', views.register_for_event, name='event-register'),
    path('events/<int:event_id>/cancel/', views.cancel_registration, name='event-cancel'),
    path('my-events/', views.MyEventsView.as_view(), name='my-events'),
    path('my-registrations/', views.MyRegistrationsView.as_view(), name='my-registrations'),
]
