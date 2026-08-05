from django.shortcuts import render
from .serializers import MatchSerializer
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser
from PIL import Image
import numpy as np

from posts.models import Pet
from .ml.cat_model import load_model, get_embedding

cat_model=load_model()
# Create your views here.
class MatchPetView(APIView):
    parser_classes=[MultiPartParser]

    def post(self,request):
        image_file=request.FILES.get('image')
        if not image_file:
            return Response({'error':'no image provided'}, status=400)

        img=Image.open(image_file).convert('RGB')
        query_embedding=np.array(get_embedding(cat_model, img))

        pets=Pet.objects.exclude(embedding__isnull=True)

        results=[]
        for pet in pets:
            emb=np.array(pet.embedding)
            score=float(np.dot(query_embedding, emb))
            results.append((pet,score))
        
        results.sort(key=lambda x: x[1], reverse=True)
        top=results[:10]
        return Response(
            [
                {
                    'pet_id':pet.id,
                    'name':pet.name,
                    'image_url':request.build_absolute_uri(pet.image.url) if pet.image else None,
                    'similarity':score,
                    'status':pet.status,
                }
            for pet, score in top
            ]
        )