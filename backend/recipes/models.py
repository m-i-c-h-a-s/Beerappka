from django.contrib.auth.models import User
from django.db import models

'''
    Model reprezentujący Styl piwa
'''


class Style(models.Model):
    name = models.CharField(max_length=45, verbose_name='Nazwa')

    fermentation_type = models.CharField(max_length=45, verbose_name='Rodzaj fermentacji')

    # min BLG ilość cukrów w brzeczce (skala Ballinga)
    min_blg = models.FloatField()

    # max BLG ilość cukrów w brzeczce (skala Ballinga)
    max_blg = models.FloatField()

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
    name = models.CharField(max_length=45, verbose_name='Nazwa')

    creation_date = models.DateTimeField(verbose_name='Data utworzenia')

    boiling_time = models.PositiveSmallIntegerField(verbose_name='Czas gotowania')

    expected_beer_amount = models.FloatField(verbose_name='Oczekiwana ilość piwa')

    boiled_wort_amount = models.FloatField(verbose_name='Ilość gotowanej brzeczki')

    evaporation_rate = models.FloatField(verbose_name='Szybkość parowania')

    boiling_losses = models.FloatField(verbose_name='Straty gotowania')

    fermentation_losses = models.FloatField(verbose_name='Straty fermentacji')

    cold_hop_losses = models.FloatField(verbose_name='Straty chmielenia na zimno')

    mashing_performance = models.FloatField(verbose_name='Wydajność zacierania')

    water_to_grain_ratio = models.FloatField(verbose_name='Stosunek wody do ziarna')

    notes = models.TextField(null=True, blank=True, verbose_name='Notatki')

    # BLG ilość cukrów w brzeczce (skala Ballinga)
    blg = models.FloatField()

    # ABV alkohol objętościowo
    abv = models.FloatField()

    # EBC barwa piwa
    ebc = models.FloatField()

    user = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        related_name='recipes',
        null=True,
        verbose_name='Użytkownik'
    )

    style = models.ForeignKey(
        Style,
        on_delete=models.SET_NULL,
        related_name='recipes',
        null=True,
        verbose_name='Styl'
    )

    class Meta:
        verbose_name = 'Receptura'
        verbose_name_plural = 'Receptury'

    def __str__(self):
        return f"{self.name}"
