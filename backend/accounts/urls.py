from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import ProfileView,SignUpView, PublicProfileView

urlpatterns = [
    path("signup/", SignUpView.as_view()),
    path("auth/token/", obtain_auth_token),
    path('profile/',ProfileView.as_view()),
    path('user/<int:pk>/', PublicProfileView.as_view()),
]