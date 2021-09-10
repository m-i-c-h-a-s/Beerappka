from rest_framework import serializers
from recipes.models import Style


class StyleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Style
        fields = "__all__"
