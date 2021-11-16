from rest_framework.viewsets import ModelViewSet

from batches.api.filters import BatchFilter
from batches.api.serializers import BatchSerializer, BatchCreateUpdateSerializer
from batches.models import Batch
from batches.api.permissions import IsBatchOwnerOrReadOnlyPermission


class BatchesViewSet(ModelViewSet):
    queryset = Batch.objects.all()
    permission_classes = [IsBatchOwnerOrReadOnlyPermission]
    serializers = {
        'default': BatchSerializer,
        'create': BatchCreateUpdateSerializer,
        'update': BatchCreateUpdateSerializer,
        'partial_update': BatchCreateUpdateSerializer,
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
