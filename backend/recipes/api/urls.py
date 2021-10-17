from rest_framework import routers

from recipes.api.views import RecipesViewSet, AllRecipesViewSet, StylesViewSet, MaltsViewSet, HopsViewSet, YeastViewSet, \
    ManufacturersViewSet

router = routers.DefaultRouter()

router.register(r"recipes", RecipesViewSet)
router.register(r"all-recipes", AllRecipesViewSet)
router.register(r"beer-styles", StylesViewSet)
router.register(r"malts", MaltsViewSet)
router.register(r"hops", HopsViewSet)
router.register(r"yeast", YeastViewSet)
router.register(r"manufacturers", ManufacturersViewSet)

urlpatterns = router.urls
