from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

from batches.api.filters import BatchFilter
from batches.api.serializers import BatchSerializer, BatchCreateSerializer, BatchUpdateSerializer, \
    MeasurementBLGSerializer, AddMashingSerializer
from batches.models import Batch, MeasurementBLG
from batches.api.permissions import IsBatchOwnerOrReadOnlyPermission, IsBatchOwnerForMeasurementBLGOrReadOnlyPermission


class BatchesViewSet(ModelViewSet):
    queryset = Batch.objects.all()
    permission_classes = [IsBatchOwnerOrReadOnlyPermission]
    serializers = {
        'default': BatchSerializer,
        'create': BatchCreateSerializer,
        'update': BatchUpdateSerializer,
        'partial_update': BatchUpdateSerializer,
        'add_mashing': AddMashingSerializer
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

    @action(detail=True, methods=['post'])
    def add_mashing(self, request, pk):
        batch = self.get_object()
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save(batch=batch)
            return Response(serializer.data)
        return Response(serializer.errors)

    @action(
        detail=True,
        methods=['delete'],
        url_path=r'delete_mashing/(?P<mashing_id>[0-9]+)'
    )
    def delete_mashing(self, request, pk, mashing_id):
        batch = self.get_object()
        mashing = batch.mashings.filter(id=mashing_id).first()
        if mashing:
            mashing.delete()
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)


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
