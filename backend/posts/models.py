from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
# Create your models here.



    

class Pet(models.Model):
    SPECIES_CHOICES =[
        ('cat','Cat'),
        ('dog','Dog'),
        ('other','Other'),
    ]
    species=models.CharField(max_length=100, choices=SPECIES_CHOICES,blank=True)
    name=models.CharField(max_length=100, blank=True)
    message=models.TextField(blank=True)
    image=models.ImageField(upload_to='pets/', null=True)
    posted_by=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE)
    created_at=models.DateTimeField(auto_now_add=True)
    STATUS_CHOICES =[
        ('lost','Lost'),
        ('stray','Stray'),
        ('fostered','Fostered'),
        ('reunited','Reunited'),
        ('adopted','Adopted'),
        ('claimed', 'Claimed'),
    ]
    status=models.CharField(max_length=100, choices= STATUS_CHOICES)
    COLOR_CHOICES = [
        ('black','Black'),
        ('white','White'),
        ('orange','Orange'),
        ('grey', 'Grey'),
        ('other', 'Other'),
    ]
    color=models.CharField(max_length=100, choices=COLOR_CHOICES, blank=True)
    SEX_CHOICES=[
        ('male','Male'),
        ('female','Female'),
        ('unknown','Unknown'),
    ]
    sex=models.CharField(max_length=100, choices=SEX_CHOICES,default='unknown')
    def __str__(self):
        return self.name
    location=models.CharField(max_length=200,default="unknown",null=True,blank=True)
    embedding=models.JSONField(null=True,blank=True)
    AREA_CHOICES = [
    ("district_1", "District 1"),
    ("district_2", "District 2"),

    ("district_3", "District 3"),
    ("district_4", "District 4"),
    ("district_5", "District 5"),
    ("district_6", "District 6"),
    ("district_7", "District 7"),
    ("district_8", "District 8"),
    ("district_10", "District 10"),
    ("district_11", "District 11"),
    ("district_12", "District 12"),
    ("binh_tan", "Binh Tan District"),
    ("binh_thanh", "Binh Thanh District"),
    ("go_vap", "Go Vap District"),
    ("phu_nhuan", "Phu Nhuan District"),
    ("tan_binh", "Tan Binh District"),
    ("tan_phu", "Tan Phu District"),
    ("thu_duc", "Thu Duc City"),
    ("binh_chanh", "Binh Chanh District"),
    ("can_gio", "Can Gio District"),
    ("cu_chi", "Cu Chi District"),
    ("hoc_mon", "Hoc Mon District"),
    ("nha_be", "Nha Be District"),
]
    area=models.CharField(max_length=100, choices=AREA_CHOICES, blank=True)
    