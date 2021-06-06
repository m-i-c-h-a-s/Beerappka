# Generated by Django 3.2.3 on 2021-06-06 13:41
from django.contrib.auth.models import User
from django.db import migrations

from profiles.models import Profile


def create_profiles(apps, schema_editor):
    users = User.objects.all()
    for u in users:
        if not hasattr(u, 'profile'):
            Profile.objects.create(user=u)


def delete_profiles(apps, schema_editor):
    users = User.objects.all()
    for u in users:
        u.profile.delete()
        u.save()


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0002_auto_20210606_1540'),
    ]

    operations = [
        migrations.RunPython(create_profiles, delete_profiles)
    ]
