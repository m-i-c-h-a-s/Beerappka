from rest_framework import serializers

from batches.models import Batch, MeasurementBLG
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


class MeasurementBLGSerializer(serializers.ModelSerializer):

    class Meta:
        model = MeasurementBLG
        fields = '__all__'

    def validate_batch(self, batch):
        if batch.user == self.context.get('request').user:
            return batch
        raise serializers.ValidationError('Warka musi należeć do zalogowanego usera.')
