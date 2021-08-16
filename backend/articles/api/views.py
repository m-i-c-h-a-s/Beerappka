from rest_framework import viewsets

from articles.api.permissions import IsArticleAuthorOrReadOnly
from articles.api.serializers import ArticleSerializer, ArticleCreateSerializer
from articles.models import Article


class ArticlesViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.get_public()
    serializer_class = ArticleSerializer
    permission_classes = [
        IsArticleAuthorOrReadOnly,
    ]

    serializers = {
        'default': ArticleSerializer,
        'create': ArticleCreateSerializer
    }

    def get_serializer_class(self):
        return self.serializers.get(
            self.action,
            self.serializers['default']
        )

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(author=user)
