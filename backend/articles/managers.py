from django.db import models
from django.db.models.query_utils import Q


class ArticlesManager(models.Manager):

    def get_public(self):
        return self.get_queryset().filter(is_published=True)

    def get_all(self, request):
        return self.get_queryset().filter(Q(is_published=True) | Q(author=request.user))

    def get_current_user(self, request):
        return self.get_queryset().filter(
            author=request.user
        )
