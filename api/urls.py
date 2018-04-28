from django.urls import path
from rest_framework.routers import DefaultRouter

from .todo_views import TodoViewSet, TodoCommentViewSet, TagViewSet
from .user_views import UserViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet, base_name='user')
router.register(r'todo', TodoViewSet, base_name='todo')
router.register(r'todo-comment', TodoCommentViewSet, base_name='todo_comment')
router.register(r'tag-list', TagViewSet, base_name='tag_list')

urlpatterns = [
    *router.urls,
]
