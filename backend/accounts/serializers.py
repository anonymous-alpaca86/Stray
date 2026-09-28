from django.contrib.auth import get_user_model
from rest_framework import serializers

User=get_user_model()
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=["id","username","email","first_name","last_name","phone_number","social_media_account"]
        read_only_fields=["id"]
#serializer for creating new account. This should be named SignUpSerializer but I'm to lazy to change.
class UserSerializer(serializers.ModelSerializer):
    
    password=serializers.CharField(write_only=True)
    class Meta:
        model=User
        fields=['id','username','email','password',"first_name", "last_name","phone_number","social_media_account"]
    def create(self,validated_data):
        return User.objects.create_user(**validated_data) 
class PublicProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id','username','first_name','last_name','phone_number','social_media_account']
