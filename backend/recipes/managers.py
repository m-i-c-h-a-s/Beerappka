from django.db import models
from django.db.models.query_utils import Q


class RecipesManager(models.Manager):

    def get_public(self):
        return self.get_queryset().filter(is_public=True)

    def get_all(self, request):
        return self.get_queryset().filter(Q(is_public=True) | Q(user=request.user))


class MaltsManager(models.Manager):

    def get_default(self):
        return self.get_queryset().filter(is_default=True)


class HopsManager(models.Manager):

    def get_default(self):
        return self.get_queryset().filter(is_default=True)


class YeastsManager(models.Manager):

    def get_default(self):
        return self.get_queryset().filter(is_default=True)