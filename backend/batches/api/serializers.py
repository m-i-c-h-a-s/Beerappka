from django.db import transaction
from rest_framework import serializers

from batches.models import Batch, Mashing, MeasurementBLG
from profiles.api.serializers import UserSerializer
from recipes.api.serializers import RecipeSerializer


class MashingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Mashing
        fields = '__all__'


class AddEditMashingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Mashing
        fields = '__all__'
        read_only_fields = ('id', 'batch')

    
class MeasurementBLGSerializer(serializers.ModelSerializer):

    class Meta:
        model = MeasurementBLG
        fields = '__all__'


class AddEditMeasurementBLGSerializer(serializers.ModelSerializer):

    class Meta:
        model = MeasurementBLG
        fields = '__all__'
        read_only_fields = ('id', 'batch')


class BatchSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    recipe = RecipeSerializer()
    mashings = MashingSerializer(many=True)
    measurements_blg = MeasurementBLGSerializer(many=True)

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


class BatchCreateUpdateSerializer(serializers.ModelSerializer):
    measurements_blg = AddEditMeasurementBLGSerializer(many=True)
    mashings = AddEditMashingSerializer(many=True)

    class Meta:
        model = Batch
        exclude = ("user",)

    @transaction.atomic
    def create(self, validated_data):
        measurements_blg = validated_data.pop('measurements_blg')
        mashings = validated_data.pop('mashings')
        batch = Batch.objects.create(**validated_data)
        for m_blg in measurements_blg:
            MeasurementBLG.objects.create(**m_blg, batch=batch)
        for mashing in mashings:
            Mashing.objects.create(**mashing, batch=batch)
        return batch

    @transaction.atomic
    def update(self, instance, validated_data):
        measurements_blg = validated_data.pop('measurements_blg')
        mashings = validated_data.pop('mashings')

        MeasurementBLG.objects.filter(batch=instance).delete()
        for m_blg in measurements_blg:
            MeasurementBLG.objects.create(**m_blg, batch=instance)

        Mashing.objects.filter(batch=instance).delete()
        for mashing in mashings:
            Mashing.objects.create(**mashing, batch=instance)

        return instance
