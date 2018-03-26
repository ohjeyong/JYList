from rest_framework.routers import DefaultRouter
from .user_views import UserViewSet


user_router = DefaultRouter()
user_router.register(r'users', UserViewSet, base_name='user')


urlpatterns = user_router.urls
