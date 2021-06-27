from django.contrib.auth.models import User
from django.db import models

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

    class Meta:
        verbose_name = "Styl Piwa"
        verbose_name_plural = "Style piwa"

    def __str__(self):
        return f"{self.name}"


"""
    Model reprezentujący piwowarską recepturę
"""


class Recipe(models.Model):
    name = models.CharField(max_length=45, verbose_name="Nazwa")

    creation_date = models.DateTimeField(verbose_name="Data utworzenia")

    is_public = models.BooleanField(default=False, verbose_name="Czy publiczna?")

    boiling_time = models.PositiveSmallIntegerField(verbose_name="Czas gotowania")

    expected_beer_amount = models.FloatField(verbose_name="Oczekiwana ilość piwa")

    boiled_wort_amount = models.FloatField(verbose_name="Ilość gotowanej brzeczki")

    evaporation_rate = models.FloatField(verbose_name="Szybkość parowania")

    boiling_losses = models.FloatField(verbose_name="Straty gotowania")

    fermentation_losses = models.FloatField(verbose_name="Straty fermentacji")

    cold_hop_losses = models.FloatField(verbose_name="Straty chmielenia na zimno")

    mashing_performance = models.FloatField(verbose_name="Wydajność zacierania")

    water_to_grain_ratio = models.FloatField(verbose_name="Stosunek wody do ziarna")

    notes = models.TextField(null=True, blank=True, verbose_name="Notatki")

    # BLG ilość cukrów w brzeczce (skala Ballinga)
    blg = models.FloatField()

    # ABV alkohol objętościowo
    abv = models.FloatField()

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

    class Meta:
        verbose_name = "Receptura"
        verbose_name_plural = "Receptury"

    def __str__(self):
        return f"{self.name}"


"""
    Model reprezentujący Zacieranie
"""


class Mashing(models.Model):
    time = models.IntegerField(verbose_name="Czas")

    temperature = models.FloatField(verbose_name="Temperatura")

    recipe = models.ForeignKey(
        Recipe,
        on_delete=models.CASCADE,
        related_name="mashing",
        verbose_name="Przepis",
    )

    class Meta:
        verbose_name = "Zacieranie"
        verbose_name_plural = "Zacierania"

    def __str__(self):
        return f"{self.time} | {self.temperature} | {self.batch}"


""" 
    Model reprezentujący Producenta
"""


class Manufacturer(models.Model):
    name = models.CharField(max_length=45, verbose_name="Nazwa")

    # TODO dodac kategorie produktu

    class Meta:
        verbose_name = "Producent"
        verbose_name_plural = "Producenci"

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

    class Meta:
        verbose_name = "Słód"
        verbose_name_plural = "Słody"

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

    class Meta:
        verbose_name = "Chmiel"
        verbose_name_plural = "Chmiele"

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

    class Meta:
        verbose_name = "Drożdże"
        verbose_name_plural = "Drożdże"

    def __str__(self):
        return f"{self.name}"


"""
    Model reprezentujący Wodę
"""


class Water(models.Model):
    name = models.CharField(max_length=45, verbose_name="Nazwa")

    # TODO dodac typ

    manufacturer = models.ForeignKey(
        Manufacturer,
        on_delete=models.SET_NULL,
        null=True,
        verbose_name="Producent",
        related_name="water",
    )

    class Meta:
        verbose_name = "Woda"
        verbose_name_plural = "Wody"

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

    class Meta:
        verbose_name = "Chmiel"
        verbose_name_plural = "Chmiele"

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

    def __str__(self):
        return f"{self.recipe} | {self.yeast}"


"""
    Model reprezentujący powiązanie Wady z Recepturą
"""


class RecipeWater(models.Model):
    recipe = models.ForeignKey(
        Recipe, on_delete=models.CASCADE, verbose_name="Receptura", related_name="water"
    )

    water = models.ForeignKey(Water, on_delete=models.CASCADE, verbose_name="Woda")

    quantity = models.FloatField(verbose_name="Ilość")

    class Meta:
        verbose_name = "Woda"
        verbose_name_plural = "Woda"

    def __str__(self):
        return f"{self.recipe} | {self.water}"
