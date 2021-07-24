from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets, status
from rest_framework.decorators import action, parser_classes
from rest_framework.mixins import (
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
)
from rest_framework.authtoken.admin import User
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView

from profiles.api.permissions import IsCurrentUserOrReadOnly
from profiles.api.serializers import (
    UserSerializer,
    UpdateUserSerializer,
    UpdateProfilePictureSerializer,
)


class UsersViewSet(
    viewsets.GenericViewSet,
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    serializers = {
        "default": UserSerializer,
        "update": UpdateUserSerializer,
        "partial_update": UpdateUserSerializer,
        "update_profile_picture": UpdateProfilePictureSerializer,
    }
    permission_classes = [
        IsCurrentUserOrReadOnly,
    ]
    lookup_field = "username"
    lookup_url_kwarg = "username"

    def get_serializer_class(self):
        return self.serializers.get(self.action, self.serializers["default"])

    @action(
        detail=False, methods=["post"], permission_classes=[IsCurrentUserOrReadOnly]
    )
    @parser_classes([MultiPartParser, FormParser])
    def update_profile_picture(self, request):
        serializer = self.get_serializer(
            data=request.data, instance=request.user.profile
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
