from rest_framework import serializers

from batches.models import Batch
from profiles.api.serializers import UserSerializer
from recipes.api.serializers import RecipeSerializer


class BatchSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    recipe = RecipeSerializer()

    class Meta:
        model = Batch
        fields = "__all__"


class BatchCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Batch
        exclude = ("user",)


class BatchUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Batch
        exclude = ("user", "recipe")

