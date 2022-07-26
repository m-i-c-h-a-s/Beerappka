# Generated by Django 3.2.3 on 2021-06-06 12:07

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
            name="Profile",
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
                ("birth_date", models.DateField()),
                ("town", models.CharField(max_length=45)),
                ("website", models.CharField(max_length=45)),
                ("instagram_link", models.URLField()),
                ("brewer_since", models.DateField()),
                ("favourite_beer_style", models.CharField(max_length=45)),
                ("about_me", models.TextField(max_length=255)),
                (
                    "user",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]
