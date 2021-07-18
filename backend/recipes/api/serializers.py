from rest_framework import serializers

from recipes.models import Recipe, Style


class StyleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Style
        fields = "__all__"


class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = "__all__"
