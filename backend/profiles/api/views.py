from rest_framework import viewsets
from rest_framework.mixins import (
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
)
from rest_framework.authtoken.admin import User

from profiles.api.permissions import IsCurrentUserOrReadOnly
from profiles.api.serializers import UserSerializer


class UsersViewSet(
    viewsets.GenericViewSet,
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [
        IsCurrentUserOrReadOnly,
    ]
    lookup_field = "username"
    lookup_url_kwarg = "username"
