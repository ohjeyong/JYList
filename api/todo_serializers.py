from rest_framework import serializers

from todo.models import TodoComment, Todo, Tag
from user.models import User
from .user_serializers import UserSerializer


class TagSerializer(serializers.ModelSerializer):
    author_id = serializers.PrimaryKeyRelatedField(write_only=True, queryset=User.objects.all(), source='author')

    class Meta:
        model = Tag
        fields = ('id', 'name', 'author_id')


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodoComment
        fields = ('id', 'todo_id', 'author_id', 'created_at', 'content', 'author')

    todo_id = serializers.PrimaryKeyRelatedField(write_only=True, queryset=Todo.objects.all(), source='todo')
    author_id = serializers.PrimaryKeyRelatedField(write_only=True, queryset=User.objects.all(), source='author')
    author = UserSerializer(read_only=True)


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'content', 'like', 'category', 'is_completed', 'complete_at', 'author', 'author_id',
                  'created_at', 'comment_list', 'tag_list')

    author = UserSerializer(read_only=True)
    author_id = serializers.PrimaryKeyRelatedField(write_only=True, queryset=User.objects.all(), source='author')
    comment_list = CommentSerializer(source='todocomment_set.all', many=True, read_only=True)
    tag_list = TagSerializer(source='tag.all', many=True, required=False)

    def create(self, validated_data):
        tag_list = validated_data.pop('tag', dict()).get('all', list())
        todo = Todo.objects.create(**validated_data)
        for each_tag in tag_list:
            Tag.objects.create(todo=todo, **each_tag)
        return todo
