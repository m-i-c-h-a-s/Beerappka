from rest_framework.viewsets import ModelViewSet

from batches.api.filters import BatchFilter
from batches.api.serializers import BatchSerializer, BatchCreateSerializer, BatchUpdateSerializer, \
    MeasurementBLGSerializer
from batches.models import Batch, MeasurementBLG
from batches.api.permissions import IsBatchOwnerOrReadOnlyPermission, IsBatchOwnerForMeasurementBLGOrReadOnlyPermission


class BatchesViewSet(ModelViewSet):
    queryset = Batch.objects.all()
    permission_classes = [IsBatchOwnerOrReadOnlyPermission]
    serializers = {
        'default': BatchSerializer,
        'create': BatchCreateSerializer,
        'update': BatchUpdateSerializer,
        'partial_update': BatchUpdateSerializer
    }
    filterset_class = BatchFilter

    def get_serializer_class(self):
        return self.serializers.get(
            self.action,
            self.serializers['default']
        )

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user=user)


class MeasurementBLGViewSet(ModelViewSet):
    queryset = MeasurementBLG.objects.all()
    permission_classes = [IsBatchOwnerForMeasurementBLGOrReadOnlyPermission,]
    serializers = {
        'default': MeasurementBLGSerializer
    }

    def get_serializer_class(self):
        return self.serializers.get(
            self.action,
            self.serializers.get('default')
        )
