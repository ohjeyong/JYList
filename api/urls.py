from django.urls import path

from rest_framework.routers import DefaultRouter
from .todo_views import TodoViewSet, TodoCommentViewSet, TagListView
from .user_views import UserViewSet


router = DefaultRouter()
router.register(r'users', UserViewSet, base_name='user')
router.register(r'todo', TodoViewSet, base_name='todo')
router.register(r'todo-comment', TodoCommentViewSet, base_name='todo_comment')


urlpatterns = [
    *router.urls,
    path('tag-list/', TagListView.as_view())
]
