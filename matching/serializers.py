from rest_framework import serializers

class MatchSerializer(serializers.Serializer):
    image=serializers.ImageField()
   