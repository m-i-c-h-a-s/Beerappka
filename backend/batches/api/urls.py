from rest_framework import routers

from batches.api.views import BatchesViewSet

router = routers.DefaultRouter()
router.register('batches', BatchesViewSet)

urlpatterns = router.urls
