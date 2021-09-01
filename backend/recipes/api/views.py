from rest_framework import viewsets

from recipes.api.permissions import IsRecipeOwnerOrReadOnlyPermission
from recipes.api.serializers import RecipeSerializer, RecipeCreateUpdateSerializer, StyleSerializer, MaltSerializer, \
    HopsSerializer, YeastSerializer, ManufacturerSerializer
from recipes.models import Recipe, Style, Malt, Hops, Yeast, Manufacturer


class RecipesViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    serializers = {
        'default': RecipeSerializer,
        'create': RecipeCreateUpdateSerializer,
        'update': RecipeCreateUpdateSerializer,
        'partial_update': RecipeCreateUpdateSerializer
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


class MaltsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Malt.objects.all()
    serializer_class = MaltSerializer


class HopsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Hops.objects.all()
    serializer_class = HopsSerializer


class YeastViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Yeast.objects.all()
    serializer_class = YeastSerializer


class ManufacturersViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Manufacturer.objects.all()
    serializer_class = ManufacturerSerializer

