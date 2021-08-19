from django.contrib.auth.models import User
from django.db import models
from sorl.thumbnail import get_thumbnail

from recipes.models import Style

"""
    Model reprezentujący Profil Użytkownika
"""


class Profile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="profile",
        verbose_name="Użytkownik",
    )

    birth_date = models.DateField(null=True, blank=True, verbose_name="Data urodzenia")

    town = models.CharField(
        max_length=45, null=True, blank=True, verbose_name="Miejscowość"
    )

    website = models.CharField(
        max_length=45, null=True, blank=True, verbose_name="Strona internetowa"
    )

    instagram = models.CharField(
        max_length=30, null=True, blank=True, verbose_name="Profil na Instagramie"
    )

    brewer_since = models.DateField(null=True, blank=True, verbose_name="Piwowar od")

    favourite_beer_style = models.ManyToManyField(
        Style, blank=True, verbose_name="Ulubiony styl piwny"
    )

    about_me = models.TextField(
        max_length=255, null=True, blank=True, verbose_name="O mnie"
    )

    picture = models.ImageField(
        null=True,
        blank=True,
        upload_to="profile_pictures",
        verbose_name="Zdjęcie profilowe",
    )

    class Meta:
        verbose_name = "Profil Użytkownika"
        verbose_name_plural = "Profile Użytkownika"

    def __str__(self):
        return f"{self.user.username} {self.user.email}"

    @property
    def picture_thumb_150x150(self):
        return get_thumbnail(self.picture, "150x150", crop="center", quality=99).url

    @property
    def picture_thumb_50x50(self):
        return get_thumbnail(self.picture, "50x50", crop="center", quality=99).url
