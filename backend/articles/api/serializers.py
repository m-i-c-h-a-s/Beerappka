from rest_framework import serializers

from articles.models import Article
from profiles.api.serializers import UserSerializer


class ArticleSerializer(serializers.ModelSerializer):
    author = UserSerializer()

    class Meta:
        model = Article
        fields = "__all__"


class ArticleCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Article
        fields = ('title', 'content', 'is_published')
