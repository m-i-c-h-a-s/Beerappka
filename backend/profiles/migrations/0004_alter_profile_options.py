# Generated by Django 3.2.3 on 2021-06-06 14:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0003_add_profile_to_existing_users'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='profile',
            options={'verbose_name': 'Profil Użytkownika', 'verbose_name_plural': 'Profile Użytkownika'},
        ),
    ]
