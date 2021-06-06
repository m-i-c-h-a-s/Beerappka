from django.contrib.auth.models import User
from django.db import models

'''
    Model reprezentujący Styl piwa
'''


class Style(models.Model):
    # nazwa
    name = models.CharField(max_length=45)

    # rodzaj fermentacji
    fermentation_type = models.CharField(max_length=45)

    # min BLG ilość cukrów w brzeczce (skala Ballinga)
    min_blg = models.FloatField()

    # max BLG ilość cukrów w brzeczce (skala Ballinga)
    max_BLG = models.FloatField()

    # min IBU gorycz
    min_ibu = models.FloatField()

    # max IBU gorycz
    max_ibu = models.FloatField()

    class Meta:
        verbose_name = 'Styl Piwa'
        verbose_name_plural = 'Style piwa'

    def __str__(self):
        return f"{self.name}"


'''
    Model reprezentujący piwowarską recepturę
'''


class Recipe(models.Model):
    # nazwa
    name = models.CharField(max_length=45)

    # data utworzenia
    creation_date = models.DateTimeField()

    # czas gotowania
    boiling_time = models.PositiveSmallIntegerField()

    # oczekiwana ilość piwa
    expected_beer_amount = models.FloatField()

    # ilość gotowanej brzeczki
    boiled_wort_amount = models.FloatField()

    # szybkość parowania
    evaporation_rate = models.FloatField()

    # straty gotowania
    boiling_losses = models.FloatField()

    # straty fermentacji
    fermentation_losses = models.FloatField()

    # straty chmielenia na zimno
    cold_hop_losses = models.FloatField()

    # wydajność zacierania
    mashing_performance = models.FloatField()

    # stosunek wody do ziarna
    water_to_grain_ratio = models.FloatField()

    # notatki
    notes = models.TextField(null=True, blank=True)

    # BLG ilość cukrów w brzeczce (skala Ballinga)
    blg = models.FloatField()

    # ABV alkohol objętościowo
    abv = models.FloatField()

    # EBC barwa piwa
    ebc = models.FloatField()

    # użytkownik
    user = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='recipes', null=True)

    # styl
    style = models.ForeignKey(Style, on_delete=models.SET_NULL, related_name='recipes', null=True)

    class Meta:
        verbose_name = 'Receptura'
        verbose_name_plural = 'Receptury'

    def __str__(self):
        return f"{self.name}"
