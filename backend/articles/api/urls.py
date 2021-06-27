from rest_framework import routers

from articles.api.views import ArticlesViewSet


router = routers.DefaultRouter()
router.register(r"articles", ArticlesViewSet)

urlpatterns = router.urls
