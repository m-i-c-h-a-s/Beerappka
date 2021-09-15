from django.db import transaction
from rest_framework import serializers

from profiles.api.serializers import UserSerializer
from recipes.models import Recipe, Malt, Hops, Yeast, RecipeMalt, RecipeHops, RecipeYeast, Manufacturer
from .serializers_common import StyleSerializer


class ManufacturerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Manufacturer
        fields = "__all__"


class MaltSerializer(serializers.ModelSerializer):

    class Meta:
        model = Malt
        fields = "__all__"


class HopsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Hops
        fields = "__all__"


class YeastSerializer(serializers.ModelSerializer):

    class Meta:
        model = Yeast
        fields = "__all__"


class RecipeHopsSerializer(serializers.ModelSerializer):
    hops = HopsSerializer()

    class Meta:
        model = RecipeHops
        exclude = ('recipe',)


class RecipeMaltSerializer(serializers.ModelSerializer):
    malt = MaltSerializer()

    class Meta:
        model = RecipeMalt
        exclude = ('recipe',)


class RecipeYeastSerializer(serializers.ModelSerializer):
    yeast = YeastSerializer()

    class Meta:
        model = RecipeYeast
        exclude = ('recipe',)


class RecipeSerializer(serializers.ModelSerializer):
    style = StyleSerializer()
    malts = RecipeMaltSerializer(many=True)
    hops = RecipeHopsSerializer(many=True)
    yeast = RecipeYeastSerializer(many=True)
    user = UserSerializer()

    class Meta:
        model = Recipe
        fields = "__all__"


class RecipeCreateUpdateSerializer(serializers.ModelSerializer):
    malts = RecipeMaltSerializer(many=True)
    hops = RecipeHopsSerializer(many=True)
    yeast = RecipeYeastSerializer(many=True)

    class Meta:
        model = Recipe
        exclude = ("user",)
        read_only_fields = ("creation_date",)

    @transaction.atomic
    def create(self, validated_data):
        malts_data = validated_data.pop('malts')
        hops_data = validated_data.pop('hops')
        yeast_data = validated_data.pop('yeast')
        recipe = Recipe.objects.create(**validated_data)
        for recipe_malt_data in malts_data:
            malt_data = recipe_malt_data.pop('malt')
            malt, _ = Malt.objects.get_or_create(**malt_data)
            RecipeMalt.objects.create(recipe=recipe, malt=malt, **recipe_malt_data)
        for recipe_hops_data in hops_data:
            h_data = recipe_hops_data.pop('hops')
            hops, _ = Hops.objects.get_or_create(**h_data)
            RecipeHops.objects.create(recipe=recipe, hops=hops, **recipe_hops_data)
        for recipe_yeast_data in yeast_data:
            y_data = recipe_yeast_data.pop('yeast')
            yeast, _ = Yeast.objects.get_or_create(**y_data)
            RecipeYeast.objects.create(recipe=recipe, yeast=yeast, **recipe_yeast_data)
        return recipe

    def update(self, instance, validated_data):
        malts_data = validated_data.pop('malts')
        hops_data = validated_data.pop('hops')
        yeast_data = validated_data.pop('yeast')

        RecipeMalt.objects.filter(recipe=instance).delete()
        for recipe_malt_data in malts_data:
            malt_data = recipe_malt_data.pop('malt')
            malt, created = Malt.objects.get_or_create(**malt_data)
            RecipeMalt.objects.create(recipe=instance, malt=malt, **recipe_malt_data)

        RecipeHops.objects.filter(recipe=instance).delete()
        for recipe_hops_data in hops_data:
            h_data = recipe_hops_data.pop('hops')
            hops, _ = Hops.objects.get_or_create(**h_data)
            RecipeHops.objects.create(recipe=instance, hops=hops, **recipe_hops_data)

        RecipeYeast.objects.filter(recipe=instance).delete()
        for recipe_yeast_data in yeast_data:
            y_data = recipe_yeast_data.pop('yeast')
            yeast, _ = Yeast.objects.get_or_create(**y_data)
            RecipeYeast.objects.create(recipe=instance, yeast=yeast, **recipe_yeast_data)
        return instance
