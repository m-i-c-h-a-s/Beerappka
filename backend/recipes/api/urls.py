from rest_framework import routers

from recipes.api.views import RecipesViewSet, StylesViewSet, MaltsViewSet, DefaultMaltsViewSet, HopsViewSet, YeastViewSet, \
    ManufacturersViewSet

router = routers.DefaultRouter()

router.register(r"recipes", RecipesViewSet, basename='Recipe')
router.register(r"beer-styles", StylesViewSet)
router.register(r"malts", MaltsViewSet)
router.register(r"default-malts", DefaultMaltsViewSet)
router.register(r"hops", HopsViewSet)
router.register(r"yeast", YeastViewSet)
router.register(r"manufacturers", ManufacturersViewSet)

urlpatterns = router.urls
