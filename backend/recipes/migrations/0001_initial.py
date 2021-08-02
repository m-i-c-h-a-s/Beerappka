# Generated by Django 3.2.3 on 2021-06-06 15:11

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Style",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=45)),
                ("fermentation_type", models.CharField(max_length=45)),
                ("min_blg", models.FloatField()),
                ("max_BLG", models.FloatField()),
                ("min_ibu", models.FloatField()),
                ("max_ibu", models.FloatField()),
            ],
            options={
                "verbose_name": "Styl Piwa",
                "verbose_name_plural": "Style piwa",
            },
        ),
        migrations.CreateModel(
            name="Recipe",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=45)),
                ("creation_date", models.DateTimeField()),
                ("boiling_time", models.PositiveSmallIntegerField()),
                ("expected_beer_amount", models.FloatField()),
                ("boiled_wort_amount", models.FloatField()),
                ("evaporation_rate", models.FloatField()),
                ("boiling_losses", models.FloatField()),
                ("fermentation_losses", models.FloatField()),
                ("cold_hop_losses", models.FloatField()),
                ("mashing_performance", models.FloatField()),
                ("water_to_grain_ratio", models.FloatField()),
                ("notes", models.TextField(blank=True, null=True)),
                ("blg", models.FloatField()),
                ("abv", models.FloatField()),
                ("ebc", models.FloatField()),
                (
                    "style",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="recipes",
                        to="recipes.style",
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="recipes",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "verbose_name": "Receptura",
                "verbose_name_plural": "Receptury",
            },
        ),
    ]