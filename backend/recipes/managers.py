from django.db import models


class RecipesManager(models.Manager):

    def get_public(self):
        return self.get_queryset().filter(is_public=True)
