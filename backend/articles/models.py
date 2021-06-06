from django.contrib.auth.models import User
from django.db import models

'''
    Model reprezentujący Artykuł
'''


class Article(models.Model):
    # tytuł
    title = models.CharField(max_length=255)

    # treść
    content = models.TextField()

    # autor
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='articles')

    # data dodania
    creation_date = models.DateField(auto_now_add=True)

    # data ostatniej modyfikacji
    last_modification_date = models.DateField(auto_now=True)

    # czy opublikowany
    is_published = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'Artykuł'
        verbose_name_plural = 'Artykuły'

    def __str__(self):
        return f"{self.title}"
