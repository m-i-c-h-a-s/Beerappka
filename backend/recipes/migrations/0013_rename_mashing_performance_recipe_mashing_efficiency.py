# Generated by Django 3.2.7 on 2021-10-22 06:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0012_auto_20211016_1741'),
    ]

    operations = [
        migrations.RenameField(
            model_name='recipe',
            old_name='mashing_performance',
            new_name='mashing_efficiency',
        ),
    ]
