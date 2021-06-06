from django.contrib.auth.models import User
from django.db import models

'''
    Model reprezentujący Profil Użytkownika
'''


class Profile(models.Model):
    # relacja 1:1 z modelem User
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')

    # data urodzenia
    birth_date = models.DateField(null=True, blank=True)

    # miejscowosc
    town = models.CharField(max_length=45, null=True, blank=True)

    # strona internetowa
    website = models.CharField(max_length=45, null=True, blank=True)

    # profil na Instagramie
    # URLField defaultowo max_length=200
    instagram_link = models.URLField(null=True, blank=True)

    # piwowar od
    brewer_since = models.DateField(null=True, blank=True)

    # ulubiony styl piwny
    favourite_beer_style = models.CharField(max_length=45, null=True, blank=True)

    # o mnie
    about_me = models.TextField(max_length=255, null=True, blank=True)

    class Meta:
        verbose_name = 'Profil Użytkownika'
        verbose_name_plural = 'Profile Użytkownika'

    def __str__(self):
        return f"{self.user.username} {self.user.email}"
