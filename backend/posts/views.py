from django.shortcuts import render

# Create your views here.
from rest_framework import generics, status, filters
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import PetSerializer, SavedPetSerizalier
from accounts.serializers import UserSerializer
from .models import Pet, SavedPets
from rest_framework.pagination import PageNumberPagination
from rest_framework.parsers import MultiPartParser, FormParser
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import BasePermission
from django.http import JsonResponse
from django_filters.rest_framework import DjangoFilterBackend
from PIL import Image
from matching.ml.cat_model import load_model, get_embedding
from .serializers import PetSerializer
from rest_framework.permissions import AllowAny,IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend

cat_model = load_model()  
class IsOwnerOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in ['GET','HEAD','OPTIONS']:
            return True
        return obj.posted_by == request.user
class PetPagination(PageNumberPagination):
    page_size = 4
    page_size_query_param = 'page_size'  # user can change page size
    max_page_size = 50

class PetListView(generics.ListCreateAPIView):
    queryset=Pet.objects.all()
    serializer_class=PetSerializer
    filterset_fields=['species','status','location','area','name']
    pagination_class = PetPagination
    parser_classes = [MultiPartParser, FormParser]
    filter_backends = [DjangoFilterBackend,filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name','location', 'color','area','species','status']
    ordering_fields = ['created_at', 'species']
    ordering = ['-created_at'] 
    def perform_create(self, serializer):
        pet=serializer.save(posted_by=self.request.user)
        image = Image.open(pet.image.path).convert('RGB')
        embedding = get_embedding(cat_model, image)
        pet.embedding = embedding.tolist()
        pet.save()
        
class PetDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset=Pet.objects.all()
    serializer_class=PetSerializer
    permission_classes=[IsOwnerOrReadOnly]

       
class ClaimPetView(APIView):
    def post(self,request,pk):
        pet=get_object_or_404(Pet, pk=pk)
        pet.status="claimed"
        pet.save()
        return Response({
            "status":"claimed"
        })
class MyPetView(generics.ListAPIView):
    serializer_class=PetSerializer
    def get_queryset(self):
        return Pet.objects.filter(posted_by=self.request.user)



def index(request):
    return JsonResponse({
        "message":"Welcome to the Stray API",
        "version":"1.0",
    })
class UserPetsView(generics.ListAPIView):
    serializer_class=PetSerializer
    permission_classes=[AllowAny]
    def get_queryset(self):
        return Pet.objects.filter(posted_by=self.kwargs["user_id"])


class SavedPetListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = SavedPetSerizalier
    def post (self, request, pet_id):
            pet=get_object_or_404(Pet, pk=pet_id)
            SavedPets.objects.get_or_create(
                user=request.user,
                pet=pet
            )
            return Response({"saved": True})
    
    def delete(self, request, pet_id):
        pet=get_object_or_404(Pet, pk=pet_id)
        SavedPets.objects.filter(
            user=request.user,
            pet=pet
        ).delete()
        return Response({"saved":False})
    def get_queryset(self):
        return SavedPets.objects.filter(user=self.request.user)