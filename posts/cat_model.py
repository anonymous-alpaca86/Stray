import os
import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image

MODEL_PATH = os.path.join(os.path.dirname(__file__), '..', 'ml', 'cat_model.pt')

class CatIdentityModel(nn.Module):
    def __init__(self, embedding_dim=512):
        super().__init__()
        resnet = models.resnet50(weights=models.ResNet50_Weights.DEFAULT)
        self.backbone = nn.Sequential(*list(resnet.children())[:-1])
        self.embedding = nn.Sequential(
            nn.Linear(2048, 512),
            nn.ReLU(),
            nn.Linear(512, embedding_dim)
        )
    
    def forward(self, x):
        features = self.backbone(x)
        features = features.squeeze()
        embedding = self.embedding(features)
        return embedding / embedding.norm(dim=-1, keepdim=True)

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225])
])

def load_model():
    model = CatIdentityModel()
    model.load_state_dict(torch.load(MODEL_PATH, map_location='cpu'))
    model.eval()
    return model

def get_embedding(model, image):
    tensor = transform(image).unsqueeze(0)
    with torch.no_grad():
        return model(tensor).squeeze()