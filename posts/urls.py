from django.urls import path
from .views import PetListView, PetDetailView, MyPetView, ClaimPetView
from .admin import admin
urlpatterns = [
    path('admin/', admin.site.urls),
    path('pets/',PetListView.as_view()),
    path('pets/my-pets/',MyPetView.as_view()),
    path('pets/<int:pk>/',PetDetailView.as_view()),
    path('pets/<int:pk>/claim/',ClaimPetView.as_view()),
]