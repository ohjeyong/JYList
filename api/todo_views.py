from rest_framework import status, viewsets
from rest_framework.decorators import action
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

    @action(methods=['POST'], detail=True)
    def complete(self, request, pk=None):
        todo = self.get_object()
        todo.complete(request.user)
        return Response(self.get_serializer(todo).data)

    @action(methods=['POST'], detail=True)
    def revert_complete(self, request, pk=None):
        todo = self.get_object()
        todo.revert_complete()
        return Response(self.get_serializer(todo).data)

    @action(methods=['POST'], detail=True)
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
            return Response({'todo_id': data['todo_id'], 'comment': serializer.data}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors)

    def update(self, request, *args, **kwargs):
        comment = self.get_object()
        if request.user.id != comment.author_id:
            raise PermissionDenied()
        return super(TodoCommentViewSet, self).update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        comment = self.get_object()
        pk = comment.id
        todo_pk = comment.todo_id
        if request.user.id != comment.author_id:
            raise PermissionDenied()
        self.perform_destroy(comment)
        return Response({"id": pk, "todo_id": todo_pk})


class TagViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False)
    def search(self, request):
        term = request.query_params.get('q', None)
        if term is None or term == '':
            return Response(status=status.HTTP_400_BAD_REQUEST)
        qs = self.queryset.filter(name__icontains=term)
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)
