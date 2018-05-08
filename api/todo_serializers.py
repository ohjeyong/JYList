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

    def validate(self, data):
        author = data['author']
        author_and_friends = data['todo'].get_author_and_friends()
        if author not in author_and_friends:
            raise serializers.ValidationError({
                'todo_id': "권한이 없습니다."
            })
        return data


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'content', 'like', 'category', 'is_completed', 'complete_at', 'complete_by', 'author',
                  'author_id', 'created_at', 'comment_list', 'tag_list')

    complete_by = UserSerializer(read_only=True)
    author = UserSerializer(read_only=True)
    author_id = serializers.PrimaryKeyRelatedField(write_only=True, queryset=User.objects.all(), source='author')
    comment_list = CommentSerializer(source='todocomment_set.all', many=True, read_only=True)
    tag_list = TagSerializer(read_only=True, many=True, source='tag')

    def create(self, validated_data):
        tag_list = self.initial_data.get('tag_list', list())
        todo = Todo.objects.create(**validated_data)
        for each_tag in tag_list:
            tag = Tag.objects.filter(name=each_tag['name'])
            if tag:
                tag.first().todo_set.add(todo)
            else:
                tag = Tag.objects.create(name=each_tag['name'], author=self.validated_data['author'])
                tag.todo_set.add(todo)
        return todo
