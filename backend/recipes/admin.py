from django.contrib import admin

from recipes.models import (
    Style, Recipe, Malt, Hops, Yeast,
    Water, Manufacturer, RecipeHops,
    RecipeMalt, RecipeYeast, RecipeWater
)


class RecipeHopsAdmin(admin.TabularInline):
    model = RecipeHops
    extra = 1


class RecipeMaltAdmin(admin.TabularInline):
    model = RecipeMalt
    extra = 1


class RecipeYeastAdmin(admin.TabularInline):
    model = RecipeYeast
    extra = 1


class RecipeWaterAdmin(admin.TabularInline):
    model = RecipeWater
    extra = 1


class StyleAdmin(admin.ModelAdmin):
    pass


class RecipeAdmin(admin.ModelAdmin):
    inlines = [
        RecipeHopsAdmin, RecipeMaltAdmin,
        RecipeYeastAdmin, RecipeWaterAdmin
    ]


admin.site.register(Style, StyleAdmin)
admin.site.register(Recipe, RecipeAdmin)
admin.site.register(Malt)
admin.site.register(Hops)
admin.site.register(Yeast)
admin.site.register(Water)
admin.site.register(Manufacturer)
