from rest_framework import routers

from recipes.api.views import RecipesViewSet

router = routers.DefaultRouter()

router.register(r'recipes', RecipesViewSet)

urlpatterns = router.urls
