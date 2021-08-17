from django.db import models


class ArticlesManager(models.Manager):

    def get_public(self):
        return self.get_queryset().filter(is_published=True)
