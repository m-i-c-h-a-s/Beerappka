from django.contrib import admin

from recipes.models import Style, Recipe


class StyleAdmin(admin.ModelAdmin):
    pass


class RecipeAdmin(admin.ModelAdmin):
    pass


admin.site.register(Style, StyleAdmin)
admin.site.register(Recipe, RecipeAdmin)
