# Generated by Django 3.2.7 on 2021-11-03 10:51

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('recipes', '0014_auto_20211102_1726'),
    ]

    operations = [
        migrations.CreateModel(
            name='Batch',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=45, verbose_name='Nazwa')),
                ('number', models.PositiveIntegerField(verbose_name='Numer')),
                ('brewing_date', models.DateField(verbose_name='Data warzenia')),
                ('bottling_date', models.DateField(blank=True, null=True, verbose_name='Data rozlewu')),
                ('recipe', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='batches', to='recipes.recipe', verbose_name='Przepis')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='batches', to=settings.AUTH_USER_MODEL, verbose_name='Użytkownik')),
            ],
            options={
                'verbose_name': 'Warka',
                'verbose_name_plural': 'Warki',
                'ordering': ['-id'],
            },
        ),
        migrations.CreateModel(
            name='MeasurementBLG',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(verbose_name='Data')),
                ('blg', models.FloatField(verbose_name='BLG')),
                ('beer_temperature', models.FloatField(verbose_name='Temperatura piwa')),
                ('ambient_temperature', models.FloatField(verbose_name='Temperatura otoczenia')),
                ('batch', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='measurement_blg', to='batches.batch', verbose_name='Warka')),
            ],
            options={
                'verbose_name': 'Pomiar BLG',
                'verbose_name_plural': 'Pomiary BLG',
                'ordering': ['-id'],
            },
        ),
    ]
