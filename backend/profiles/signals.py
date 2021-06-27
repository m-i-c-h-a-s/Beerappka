from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

from profiles.models import Profile


"""
    create_user_profile - po utworzeniu Użytkownika, tworzony jest jego Profil
    save_user_profile - po zapisaniu Użytkownika, następuje także zapis jego profilu
"""


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
