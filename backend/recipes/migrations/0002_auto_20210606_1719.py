# Generated by Django 3.2.3 on 2021-06-06 15:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("recipes", "0001_initial"),
    ]

    operations = [
        migrations.RenameField(
            model_name="style",
            old_name="max_BLG",
            new_name="max_blg",
        ),
        migrations.AlterField(
            model_name="style",
            name="fermentation_type",
            field=models.CharField(max_length=45, verbose_name="Rodzaj fermentacji"),
        ),
        migrations.AlterField(
            model_name="style",
            name="name",
            field=models.CharField(max_length=45, verbose_name="Nazwa"),
        ),
    ]
