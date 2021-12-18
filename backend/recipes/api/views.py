from rest_framework.decorators import action
from rest_framework.response import Response

from rest_framework import viewsets
from rest_framework import pagination

from recipes.api.filters import RecipeFilter
from recipes.api.permissions import IsRecipeOwnerOrReadOnlyPermission
from recipes.api.serializers import RecipeSerializer, RecipeCreateUpdateSerializer, MaltSerializer, \
    HopsSerializer, YeastSerializer, ManufacturerSerializer
from recipes.api.serializers_common import StyleSerializer
from recipes.models import Recipe, Style, Malt, Hops, Yeast, Manufacturer

class RecipesPagination(pagination.PageNumberPagination):
       page_size = 6
class StylesProductsPagination(pagination.PageNumberPagination):
       page_size = 100


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
    pagination_class = RecipesPagination

    def get_serializer_class(self):
        return self.serializers.get(
            self.action,
            self.serializers['default']
        )

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user=user)

    def get_queryset(self):
        return Recipe.objects.get_all(self.request).select_related(
            'user', 'user__profile', 'style'
        ).prefetch_related(
            'yeast', 'hops', 'malts'
        )

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
    pagination_class = StylesProductsPagination

class MaltsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Malt.objects.all()
    serializer_class = MaltSerializer

    @action(detail=False)
    def only_default(self, request):
        queryset = Malt.objects.get_default()
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class HopsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Hops.objects.all()
    serializer_class = HopsSerializer
    pagination_class = StylesProductsPagination

    @action(detail=False)
    def only_default(self, request):
        queryset = Hops.objects.get_default()
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class YeastViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Yeast.objects.all()
    serializer_class = YeastSerializer
    pagination_class = StylesProductsPagination

    @action(detail=False)
    def only_default(self, request):
        queryset = Yeast.objects.get_default()
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class ManufacturersViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Manufacturer.objects.all()
    serializer_class = ManufacturerSerializer
