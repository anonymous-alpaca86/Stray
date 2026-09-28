from django.shortcuts import render
from .serializers import UserProfileSerializer,UserSerializer,PublicProfileSerializer
from django.contrib.auth import get_user_model
from rest_framework import generics
from rest_framework.permissions import AllowAny
# Create your views here.

User=get_user_model()
class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class=UserProfileSerializer
    def get_object(self):
        return self.request.user

class SignUpView(generics.CreateAPIView):
    queryset=User.objects.all()
    serializer_class=UserSerializer
    permission_classes=[AllowAny]

class PublicProfileView(generics.RetrieveAPIView):
    queryset=User.objects.all()
    serializer_class=PublicProfileSerializer
    permission_classes=[AllowAny]
        