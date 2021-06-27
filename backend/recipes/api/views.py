from rest_framework import viewsets

from recipes.api.permissions import IsRecipeOwnerOrReadOnlyPermission
from recipes.api.serializers import RecipeSerializer
from recipes.models import Recipe


class RecipesViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    permission_classes = [
        IsRecipeOwnerOrReadOnlyPermission,
    ]
