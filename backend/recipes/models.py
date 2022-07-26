from django.contrib.auth.models import User
from django.db import models

from recipes.managers import RecipesManager
from recipes.managers import MaltsManager
from recipes.managers import HopsManager
from recipes.managers import YeastsManager


"""
    Model reprezentujący Styl piwa
"""


class Style(models.Model):
    name = models.CharField(max_length=45, verbose_name="Nazwa")

    UPPER_FERMENTATION = "uf"
    LOWER_FERMENTATION = "lf"

    FERMENTATION_TYPES = [
        (UPPER_FERMENTATION, "Górna fermentacja"),
        (LOWER_FERMENTATION, "Dolna fermentacja"),
    ]

    fermentation_type = models.CharField(
        max_length=2, choices=FERMENTATION_TYPES, verbose_name="Rodzaj fermentacji"
    )

    # min BLG ilość cukrów w brzeczce (skala Ballinga)
    min_blg = models.FloatField()

    # max BLG ilość cukrów w brzeczce (skala Ballinga)
    max_blg = models.FloatField()

    # min IBU gorycz
    min_ibu = models.FloatField()

    # max IBU gorycz
    max_ibu = models.FloatField()

    # min poziom nasycenia CO2
    min_carbonation = models.FloatField()

    # max poziom nasycenia CO2
    max_carbonation = models.FloatField()

    class Meta:
        verbose_name = "Styl Piwa"
        verbose_name_plural = "Style piwa"
        ordering = ["-id"]

    def __str__(self):
        return f"{self.name}"


"""
    Model reprezentujący piwowarską recepturę
"""


class Recipe(models.Model):
    name = models.CharField(max_length=45, verbose_name="Nazwa")

    MASHING = "m"
    EXTRACTS = "e"
    BREWKIT = "b"

    RECIPE_TYPES = [
        (MASHING, "Zacieranie"),
        (EXTRACTS, "Ekstrakty"),
        (BREWKIT, "Brewkit"),
    ]

    type = models.CharField(max_length=1, choices=RECIPE_TYPES, verbose_name="Typ", null=True)

    creation_date = models.DateTimeField(verbose_name="Data utworzenia", auto_now_add=True)

    is_public = models.BooleanField(default=False, verbose_name="Czy publiczna?")

    boiling_time = models.PositiveSmallIntegerField(verbose_name="Czas gotowania")

    expected_beer_amount = models.FloatField(verbose_name="Oczekiwana ilość piwa")

    boiled_wort_amount = models.FloatField(verbose_name="Ilość gotowanej brzeczki")

    evaporation_rate = models.FloatField(verbose_name="Szybkość parowania")

    boiling_losses = models.FloatField(verbose_name="Straty gotowania")

    fermentation_losses = models.FloatField(verbose_name="Straty fermentacji")

    cold_hop_losses = models.FloatField(verbose_name="Straty chmielenia na zimno")

    mashing_efficiency = models.FloatField(verbose_name="Wydajność zacierania")

    water_to_grain_ratio = models.FloatField(verbose_name="Stosunek wody do ziarna")

    notes = models.TextField(null=True, blank=True, verbose_name="Notatki")

    # BLG ilość cukrów w brzeczce (skala Ballinga)
    blg = models.FloatField()

    # IBU - goryczka w skali IBU
    ibu = models.FloatField()

    # EBC barwa piwa
    ebc = models.FloatField()

    user = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        related_name="recipes",
        null=True,
        verbose_name="Użytkownik",
    )

    style = models.ForeignKey(
        Style,
        on_delete=models.SET_NULL,
        related_name="recipes",
        null=True,
        verbose_name="Styl",
    )

    objects = RecipesManager()

    class Meta:
        verbose_name = "Receptura"
        verbose_name_plural = "Receptury"
        ordering = ["-id"]

    def __str__(self):
        return f"{self.name}"



"""
    Model reprezentujący Producenta
"""


class Manufacturer(models.Model):
    name = models.CharField(max_length=45, verbose_name="Nazwa")

    class Meta:
        verbose_name = "Producent"
        verbose_name_plural = "Producenci"
        ordering = ["-id"]

    def __str__(self):
        return f"{self.name}"


"""
    Model reprezentujący Słód
"""


class Malt(models.Model):
    name = models.CharField(max_length=45, verbose_name="Nazwa")

    extractivity = models.FloatField(verbose_name="Ekstraktywność")

    GRAIN = "gr"
    DRY_EXTRACT = "de"
    LIQUID_EXTRACT = "le"
    SUGAR = "su"

    MALT_TYPES = [
        (GRAIN, "Ziarno"),
        (DRY_EXTRACT, "Ekstrakt Suchy"),
        (LIQUID_EXTRACT, "Ekstrakt płynny"),
        (SUGAR, "Cukier"),
    ]

    type = models.CharField(max_length=2, choices=MALT_TYPES, verbose_name="Typ")

    color = models.FloatField(verbose_name="Barwa")


    manufacturer = models.ForeignKey(
        Manufacturer,
        on_delete=models.SET_NULL,
        null=True,
        verbose_name="Producent",
        related_name="malts",
    )

    is_default = models.BooleanField(default=False, verbose_name="Czy domyślny?")

    objects = MaltsManager()

    class Meta:
        verbose_name = "Słód"
        verbose_name_plural = "Słody"
        ordering = ["-id"]

    def __str__(self):
        return f"{self.name}"


"""
    Model reprezentujący Chmiel
"""


class Hops(models.Model):
    name = models.CharField(max_length=45, verbose_name="Nazwa")

    BITTER = "bi"
    AROMATIC = "ar"

    HOPS_TYPES = [
        (BITTER, "Goryczkowy"),
        (AROMATIC, "Aromatyczny"),
    ]

    type = models.CharField(
        max_length=2, choices=HOPS_TYPES, verbose_name="Typ", null=True, blank=True
    )

    origin = models.CharField(max_length=45, verbose_name="Pochodzenie")

    alpha_acids = models.FloatField(verbose_name="Kwasy alfa")

    manufacturer = models.ForeignKey(
        Manufacturer,
        on_delete=models.SET_NULL,
        null=True,
        verbose_name="Producent",
        related_name="hops",
    )

    is_default = models.BooleanField(default=False, verbose_name="Czy domyślny?")

    objects = HopsManager()

    class Meta:
        verbose_name = "Chmiel"
        verbose_name_plural = "Chmiele"
        ordering = ["-id"]

    def __str__(self):
        return f"{self.name}"


"""
    Model reprezentujący Drożdże
"""


class Yeast(models.Model):
    name = models.CharField(max_length=45, verbose_name="Nazwa")

    UPPER_FERMENTATION = "uf"
    LOWER_FERMENTATION = "lf"

    YEAST_TYPES = [
        (UPPER_FERMENTATION, "Górnofermentacyjne"),
        (LOWER_FERMENTATION, "Dolnofermentacyjne"),
    ]

    type = models.CharField(max_length=2, choices=YEAST_TYPES, verbose_name="Typ")

    manufacturer = models.ForeignKey(
        Manufacturer,
        on_delete=models.SET_NULL,
        null=True,
        verbose_name="Producent",
        related_name="yeast",
    )

    is_default = models.BooleanField(default=False, verbose_name="Czy domyślny?")

    objects = YeastsManager()

    class Meta:
        verbose_name = "Drożdże"
        verbose_name_plural = "Drożdże"
        ordering = ["-id"]

    def __str__(self):
        return f"{self.name}"



"""
    Model reprezentujący powiązanie Słodu z Recepturą
"""


class RecipeMalt(models.Model):
    recipe = models.ForeignKey(
        Recipe, on_delete=models.CASCADE, verbose_name="Receptura", related_name="malts"
    )

    malt = models.ForeignKey(Malt, on_delete=models.CASCADE, verbose_name="Słód")

    quantity = models.FloatField(verbose_name="Ilość")

    class Meta:
        verbose_name = "Słód"
        verbose_name_plural = "Słody"
        ordering = ["-id"]

    def __str__(self):
        return f"{self.recipe} | {self.malt}"


"""
    Model reprezentujący powiązanie Chmielu z Recepturą
"""


class RecipeHops(models.Model):

    recipe = models.ForeignKey(
        Recipe, on_delete=models.CASCADE, verbose_name="Receptura", related_name="hops"
    )

    hops = models.ForeignKey(Hops, on_delete=models.CASCADE, verbose_name="Chmiel")

    quantity = models.FloatField(verbose_name="Ilość")

    MASHING = "ma"
    FRONT_WORT = "fw"
    BOILING = "bo"
    AROMA = "ar"
    WHIRLPOOL = "wh"
    COLD = "co"

    HOPS_USAGE_TYPES = [
        (MASHING, "Zacieranie"),
        (FRONT_WORT, "Brzeczka przednia"),
        (BOILING, "Gotowanie"),
        (AROMA, "Aromat"),
        (WHIRLPOOL, "Whirlpool"),
        (COLD, "Na zimno"),
    ]

    used_for = models.CharField(
        max_length=2,
        choices=HOPS_USAGE_TYPES,
        verbose_name="Użyty do",
        null=True,
        blank=True,
    )

    boiling_time = models.FloatField(verbose_name="Czas gotowania")

    class Meta:
        verbose_name = "Chmiel"
        verbose_name_plural = "Chmiele"
        ordering = ["-id"]

    def __str__(self):
        return f"{self.recipe} | {self.hops}"


"""
    Model reprezentujący powiązanie Drożdży z Recepturą
"""


class RecipeYeast(models.Model):
    recipe = models.ForeignKey(
        Recipe, on_delete=models.CASCADE, verbose_name="Receptura", related_name="yeast"
    )

    yeast = models.ForeignKey(Yeast, on_delete=models.CASCADE, verbose_name="Drożdże")

    quantity = models.FloatField(verbose_name="Ilość")

    # suche/płynne/gęstwa/fermentacja spontaniczna
    DRY = "dr"
    LIQUID = "li"
    THICKETS = "th"
    SPONTANEOUS_FERMENTATION = "sp"

    YEAST_FORMS = [
        (DRY, "Suche"),
        (LIQUID, "Płynne"),
        (THICKETS, "Gęstwa"),
        (SPONTANEOUS_FERMENTATION, "Fermentacja spontaniczna"),
    ]

    form = models.CharField(
        max_length=2, choices=YEAST_FORMS, verbose_name="Postać", null=True, blank=True
    )

    class Meta:
        verbose_name = "Drożdże"
        verbose_name_plural = "Drożdże"
        ordering = ["-id"]

    def __str__(self):
        return f"{self.recipe} | {self.yeast}"


