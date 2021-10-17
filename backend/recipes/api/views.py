from rest_framework.decorators import action
from rest_framework.response import Response

from rest_framework import viewsets

from recipes.api.filters import RecipeFilter
from recipes.api.permissions import IsRecipeOwnerOrReadOnlyPermission
from recipes.api.serializers import RecipeSerializer, RecipeCreateUpdateSerializer, MaltSerializer, \
    HopsSerializer, YeastSerializer, ManufacturerSerializer
from recipes.api.serializers_common import StyleSerializer
from recipes.models import Recipe, Style, Malt, Hops, Yeast, Manufacturer


class RecipesViewSet(viewsets.ModelViewSet):
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
    filterset_class = RecipeFilter

    def get_serializer_class(self):
        return self.serializers.get(
            self.action,
            self.serializers['default']
        )

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user=user)

    def get_queryset(self):
            return Recipe.objects.get_all(self.request)

    @action(detail=False)
    def only_public(self, request):
        queryset = Recipe.objects.get_public()
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class StylesViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Style.objects.all()
    serializer_class = StyleSerializer


class MaltsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Malt.objects.all()
    serializer_class = MaltSerializer

class DefaultMaltsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Malt.objects.get_default()
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
