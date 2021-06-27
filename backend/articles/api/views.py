from rest_framework import viewsets

from articles.api.permissions import IsArticleAuthorOrReadOnly
from articles.api.serializers import ArticleSerializer
from articles.models import Article


class ArticlesViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [
        IsArticleAuthorOrReadOnly,
    ]
