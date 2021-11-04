# Generated by Django 3.2.7 on 2021-11-04 16:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('batches', '0004_auto_20210915_1702'),
    ]

    operations = [
        migrations.AddField(
            model_name='batch',
            name='bottling_date',
            field=models.DateField(blank=True, null=True, verbose_name='Data rozlewu'),
        ),
        migrations.CreateModel(
            name='Mashing',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.IntegerField(verbose_name='Czas')),
                ('temperature', models.FloatField(verbose_name='Temperatura')),
                ('batch', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='mashing', to='batches.batch', verbose_name='Warka')),
            ],
            options={
                'verbose_name': 'Zacieranie',
                'verbose_name_plural': 'Zacierania',
                'ordering': ['-id'],
            },
        ),
    ]
