from django.db import transaction
from rest_framework import serializers

from recipes.models import Recipe, Style, Malt, Hops, Yeast, RecipeMalt, RecipeHops, RecipeYeast


class StyleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Style
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


class RecipeHopsForCreateSerializer(serializers.ModelSerializer):
    hops = HopsSerializer()

    class Meta:
        model = RecipeHops
        exclude = ('recipe',)


class RecipeMaltForCreateSerializer(serializers.ModelSerializer):
    malt = MaltSerializer()

    class Meta:
        model = RecipeMalt
        exclude = ('recipe',)


class RecipeYeastForCreateSerializer(serializers.ModelSerializer):
    yeast = YeastSerializer()

    class Meta:
        model = RecipeYeast
        exclude = ('recipe',)


class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = "__all__"


class RecipeCreateSerializer(serializers.ModelSerializer):
    malts = RecipeMaltForCreateSerializer(many=True)
    hops = RecipeHopsForCreateSerializer(many=True)
    yeast = RecipeYeastForCreateSerializer(many=True)

    class Meta:
        model = Recipe
        exclude = ("user",)

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
