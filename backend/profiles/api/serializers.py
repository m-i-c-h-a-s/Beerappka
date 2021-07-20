from rest_framework import serializers
from rest_framework.authtoken.admin import User

from profiles.models import Profile
from recipes.api.serializers import StyleSerializer


class UpdateProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        exclude = ("user",)
        read_only_fields = ("picture",)


class ProfileSerializer(serializers.ModelSerializer):
    favourite_beer_style = StyleSerializer(many=True)

    class Meta:
        model = Profile
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "is_active",
            "date_joined",
            "last_login",
            "profile",
        ]


class UpdateUserSerializer(serializers.ModelSerializer):
    profile = UpdateProfileSerializer()

    class Meta:
        model = User
        fields = [
            "username",
            "first_name",
            "last_name",
            "email",
            "profile",
        ]
        read_only_fields = ["id", "last_login"]

    def update(self, instance, validated_data):
        profile_data = validated_data.pop("profile", None)
        if profile_data:
            profile = instance.profile
            favourite_beer_style = profile_data.pop("favourite_beer_style", [])
            profile.favourite_beer_style.set(favourite_beer_style)
            for attr, value in profile_data.items():
                setattr(profile, attr, value)
            profile.save()
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


class UpdateProfilePictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ("picture",)

    def save(self, *args, **kwargs):
        if self.instance.picture:
            self.instance.picture.delete()
        return super().save(*args, **kwargs)
