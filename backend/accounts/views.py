from django.shortcuts import render
from .serializers import UserProfileSerializer,UserSerializer
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import AllowAny
# Create your views here.

class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class=UserProfileSerializer
    def get_object(self):
        return self.request.user

class SignUpView(generics.CreateAPIView):
    queryset=User.objects.all()
    serializer_class=UserSerializer
    permission_classes=[AllowAny]