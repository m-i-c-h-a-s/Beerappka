import django_filters

from articles.models import Article


class ArticleFilter(django_filters.FilterSet):

    class Meta:
        model = Article
        fields = ['author__id', 'author__username']
