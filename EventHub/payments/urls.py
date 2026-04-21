from django.urls import path
from . import views

urlpatterns = [
    path('create-checkout/<int:registration_id>/', views.create_checkout_session, name='create-checkout'),
    path('webhook/', views.stripe_webhook, name='stripe-webhook'),
    path('verify/', views.verify_payment, name='verify-payment'),
]
