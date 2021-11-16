from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response

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
        'not_bottled': BatchSerializer
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

    @action(detail=False)
    def not_bottled(self, request):
        queryset = self.get_queryset().filter(bottling_date__isnull=True)
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True, context={
                'request': request
            })
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True, context={
            'request': request
        })
        return Response(serializer.data) 