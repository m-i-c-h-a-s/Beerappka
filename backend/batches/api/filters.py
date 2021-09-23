import django_filters

from batches.models import Batch


class BatchFilter(django_filters.FilterSet):

    class Meta:
        model = Batch
        fields = ['user__id', 'user__username']
