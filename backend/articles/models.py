from django.contrib.auth.models import User
from django.db import models

from articles.managers import ArticlesManager

"""
    Model reprezentujący Artykuł
"""


class Article(models.Model):
    title = models.CharField(max_length=255, verbose_name="Tytuł")

    content = models.TextField(verbose_name="Treść")

    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="articles", verbose_name="Autor"
    )

    creation_date = models.DateField(auto_now_add=True, verbose_name="Data dodania")

    last_modification_date = models.DateField(
        auto_now=True, verbose_name="Data ostatniej modyfikacji"
    )

    is_published = models.BooleanField(default=False, verbose_name="Opublikowany")

    objects = ArticlesManager()

    class Meta:
        verbose_name = "Artykuł"
        verbose_name_plural = "Artykuły"

    def __str__(self):
        return f"{self.title}"
