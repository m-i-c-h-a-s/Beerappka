# Generated by Django 3.2.7 on 2021-11-17 21:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('batches', '0005_auto_20211104_1653'),
    ]

    operations = [
        migrations.AlterField(
            model_name='batch',
            name='number',
            field=models.PositiveIntegerField(blank=True, null=True, verbose_name='Numer'),
        ),
        migrations.AlterField(
            model_name='mashing',
            name='batch',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='mashings', to='batches.batch', verbose_name='Warka'),
        ),
        migrations.AlterField(
            model_name='measurementblg',
            name='batch',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='measurements_blg', to='batches.batch', verbose_name='Warka'),
        ),
    ]