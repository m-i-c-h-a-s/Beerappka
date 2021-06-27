from rest_framework import routers

from profiles.api.views import UsersViewSet

router = routers.DefaultRouter()
router.register(r"users", UsersViewSet)

urlpatterns = router.urls
