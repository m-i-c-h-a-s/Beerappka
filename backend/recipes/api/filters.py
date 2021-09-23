import django_filters

from recipes.models import Recipe


class RecipeFilter(django_filters.FilterSet):

    class Meta:
        model = Recipe
        fields = ['user__id', 'user__username']
