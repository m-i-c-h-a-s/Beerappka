from rest_framework import viewsets

from recipes.api.permissions import IsRecipeOwnerOrReadOnlyPermission
from recipes.api.serializers import RecipeSerializer, RecipeCreateSerializer, StyleSerializer
from recipes.models import Recipe, Style


class RecipesViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    serializers = {
        'default': RecipeSerializer,
        'create': RecipeCreateSerializer
    }
    permission_classes = [
        IsRecipeOwnerOrReadOnlyPermission,
    ]

    def get_serializer_class(self):
        return self.serializers.get(
            self.action,
            self.serializers['default']
        )

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user=user)


class StylesViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Style.objects.all()
    serializer_class = StyleSerializer
