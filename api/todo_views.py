from rest_framework import status, viewsets, generics
from rest_framework.decorators import detail_route
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from todo.models import Todo, TodoComment, Tag
from .base_views import FriendsQuerysetMixin
from .todo_serializers import TodoSerializer, TagSerializer, CommentSerializer


class TodoViewSet(FriendsQuerysetMixin, viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    permission_classes = [IsAuthenticated]
    queryset = Todo.objects.select_related('author', 'complete_by')\
        .prefetch_related('todocomment_set', 'tag', 'todocomment_set__author', 'todocomment_set__author__auth_token',
                          'author__auth_token', 'complete_by__auth_token').all().order_by('-created_at')

    def create(self, request, *args, **kwargs):
        """
        request.data
        1. content: required.
        2. category: required. choice field.
        3. tag_list: optional
            - [
                {
                    name: required
                }
            ]
        """
        data = request.data
        user = request.user
        data['author_id'] = user.id
        if 'tag_list' in data:
            for each_tag in data['tag_list']:
                each_tag['author_id'] = user.id
        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        pk = instance.id
        self.perform_destroy(instance)
        return Response({"id": pk})

    @detail_route(methods=['POST'])
    def complete(self, request, pk=None):
        todo = self.get_object()
        todo.complete(request.user)
        return Response(self.get_serializer(todo).data)

    @detail_route(methods=['POST'])
    def revert_complete(self, request, pk=None):
        todo = self.get_object()
        todo.revert_complete()
        return Response(self.get_serializer(todo).data)

    @detail_route(methods=['POST'])
    def add_like(self, request, pk=None):
        todo = self.get_object()
        todo.add_like()
        return Response(self.get_serializer(todo).data)


class TodoCommentViewSet(FriendsQuerysetMixin, viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = TodoComment.objects.all()
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        return Response(status=status.HTTP_404_NOT_FOUND)

    def create(self, request, *args, **kwargs):
        data = request.data
        data['author_id'] = request.user.id
        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors)

    def update(self, request, *args, **kwargs):
        comment = self.get_object()
        if request.user.id != comment.author_id:
            raise PermissionDenied()
        return super(TodoCommentViewSet, self).update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        comment = self.get_object()
        if request.user.id != comment.author_id:
            raise PermissionDenied()
        return super(TodoCommentViewSet, self).destroy(request, *args, **kwargs)


class TagListView(generics.ListAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
