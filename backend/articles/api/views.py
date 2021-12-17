from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action

from articles.api.filters import ArticleFilter
from articles.api.permissions import IsArticleAuthorOrReadOnly
from articles.api.serializers import (
    ArticleSerializer, ArticleCreateUpdateSerializer, ArticleListSerializer
)
from articles.models import Article


class ArticlesViewSet(viewsets.ModelViewSet):
    serializer_class = ArticleSerializer
    permission_classes = [
        IsArticleAuthorOrReadOnly,
    ]
    filterset_class = ArticleFilter

    serializers = {
        'default': ArticleSerializer,
        'list': ArticleListSerializer,
        'create': ArticleCreateUpdateSerializer,
        'update': ArticleCreateUpdateSerializer,
        'my': ArticleListSerializer,
        'only_public': ArticleListSerializer
    }

    def get_queryset(self):
        return Article.objects.get_all(self.request)

    def get_serializer_class(self):
        return self.serializers.get(
            self.action,
            self.serializers['default']
        )

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(author=user)

    @action(detail=False)
    def my(self, request):
        queryset = Article.objects.get_current_user(request)
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False)
    def only_public(self, request):
        queryset = Article.objects.get_public()
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
