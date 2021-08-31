from rest_framework import permissions

from batches.models import Batch, MeasurementBLG


class IsBatchOwnerOrReadOnlyPermission(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.user == request.user


class IsBatchOwnerForMeasurementBLGOrReadOnlyPermission(permissions.IsAuthenticated):

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.batch.user == request.user
