from django.urls import path
from .views import MatchPetView

urlpatterns = [
    path('match/',MatchPetView.as_view())
]