from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
# Create your models here.
class User(AbstractUser):
    phone_number=models.CharField(max_length=20, blank=True)
    social_media_account=models.CharField(max_length=200, blank=True)
