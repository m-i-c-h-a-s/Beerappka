from django.contrib import admin

from recipes.models import (
    Style,
    Recipe,
    Malt,
    Hops,
    Yeast,
    Manufacturer,
    RecipeHops,
    RecipeMalt,
    RecipeYeast,
)


class RecipeHopsInline(admin.TabularInline):
    model = RecipeHops
    extra = 1


class RecipeMaltInline(admin.TabularInline):
    model = RecipeMalt
    extra = 1


class RecipeYeastInline(admin.TabularInline):
    model = RecipeYeast
    extra = 1


class StyleAdmin(admin.ModelAdmin):
    pass



class RecipeAdmin(admin.ModelAdmin):
    inlines = [
        RecipeHopsInline,
        RecipeMaltInline,
        RecipeYeastInline,
    ]


admin.site.register(Style, StyleAdmin)
admin.site.register(Recipe, RecipeAdmin)
admin.site.register(Malt)
admin.site.register(Hops)
admin.site.register(Yeast)
admin.site.register(Manufacturer)
