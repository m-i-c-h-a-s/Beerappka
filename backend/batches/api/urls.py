from rest_framework import routers

from batches.api.views import BatchesViewSet, MeasurementBLGViewSet

router = routers.DefaultRouter()
router.register('batches', BatchesViewSet)
router.register('measurement-blg', MeasurementBLGViewSet)

urlpatterns = router.urls
