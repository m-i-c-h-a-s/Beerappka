from rest_framework import serializers

from batches.models import Batch


class BatchSerializer(serializers.ModelSerializer):

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

