from django.urls import path
from .views import PetListView, PetDetailView, MyPetView, ClaimPetView, UserPetsView, SavedPetListView
from .admin import admin
urlpatterns = [
    path('pets/',PetListView.as_view()),
    path('pets/my-pets/',MyPetView.as_view()),
    path('pets/<int:pk>/',PetDetailView.as_view()),
    path('pets/<int:pk>/claim/',ClaimPetView.as_view()),
    path('user/<int:user_id>/pets/',UserPetsView.as_view()),
    path('pets/<int:pk>/update/', PetDetailView.as_view()),
    path('pets/my-saved-pets/', SavedPetListView.as_view(), name="saved-pets-list"),
    path('pets/my-saved-pets/<int:pet_id>/', SavedPetListView.as_view(),name="saved-pets-detail"),


]