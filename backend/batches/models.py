from django.db import models
from rest_framework.authtoken.admin import User

from recipes.models import Recipe

"""
    Model reprezentujący Warkę
"""


class Batch(models.Model):
    name = models.CharField(max_length=45, verbose_name="Nazwa")

    # określa, która to jest warka w życiu danego piwowara
    number = models.PositiveIntegerField(verbose_name="Numer")

    brewing_date = models.DateField(verbose_name="Data warzenia")

    bottling_date = models.DateField(null=True, blank=True, verbose_name="Data rozlewu")

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="batches",
        verbose_name="Użytkownik",
    )

    recipe = models.ForeignKey(
        Recipe, on_delete=models.CASCADE, related_name="batches", verbose_name="Przepis"
    )

    class Meta:
        verbose_name = "Warka"
        verbose_name_plural = "Warki"
        ordering = ["-id"]

    def __str__(self):
        return f"{self.name}"


"""
    Model reprezentujący PomiarBLG
"""


class MeasurementBLG(models.Model):
    date = models.DateTimeField(verbose_name="Data")

    blg = models.FloatField(verbose_name="BLG")

    beer_temperature = models.FloatField(verbose_name="Temperatura piwa")

    ambient_temperature = models.FloatField(verbose_name="Temperatura otoczenia")

    batch = models.ForeignKey(
        Batch,
        on_delete=models.CASCADE,
        related_name="measurement_blg",
        verbose_name="Warka",
    )

    class Meta:
        verbose_name = "Pomiar BLG"
        verbose_name_plural = "Pomiary BLG"
        ordering = ["-id"]

    def __str__(self):
        return f"{self.date} | {self.batch}"
