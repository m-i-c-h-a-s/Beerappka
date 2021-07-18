from rest_framework import routers

from recipes.api.views import RecipesViewSet, StylesViewSet

router = routers.DefaultRouter()

router.register(r"recipes", RecipesViewSet)
router.register(r"beer-styles", StylesViewSet)

urlpatterns = router.urls
