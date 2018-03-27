import abc
import re
from io import StringIO

from django.core.management import call_command
from django.db import connection
from rest_framework.authtoken.models import Token

from todo.models import Todo, TodoComment, Tag
from user.models import User
from .legacy_models import TodoTag, TodoTodo, TodoTodoTag, TodoTodocomment, UserUser, UserUserFriends


class MigrateLegacy(metaclass=abc.ABCMeta):
    legacy_model = None
    model = None

    @abc.abstractmethod
    def get_new_instance(self, legacy_instance):
        pass

    def post_migrate(self):
        pass

    @classmethod
    def migrate(cls):
        migrator = cls()
        bulk_list = list()
        for legacy_instance in migrator.legacy_model.objects.using('legacy').all():
            new_instance = migrator.get_new_instance(legacy_instance)
            bulk_list.append(new_instance)
        migrator.model.objects.bulk_create(bulk_list)
        migrator.post_migrate()


class MigrateUser(MigrateLegacy):
    legacy_model = UserUser
    model = User

    def get_new_instance(self, legacy_instance):
        return self.model(
            id=legacy_instance.id,
            password=legacy_instance.password,
            last_login=legacy_instance.last_login,
            is_superuser=legacy_instance.is_superuser,
            username=legacy_instance.username,
            is_staff=legacy_instance.is_staff,
            is_active=legacy_instance.is_active,
            created_at=legacy_instance.date_joined,
            name=legacy_instance.name
        )

    def post_migrate(self):
        for friends_rel in UserUserFriends.objects.using('legacy').all():
            from_user = User.objects.get(id=friends_rel.from_user_id)
            from_user.friends.add(friends_rel.to_user_id)
        for user in User.objects.all():
            Token.objects.get_or_create(user=user)


class MigrateTodo(MigrateLegacy):
    legacy_model = TodoTodo
    model = Todo

    def get_new_instance(self, legacy_instance):
        return self.model(
            id=legacy_instance.id,
            created_at=legacy_instance.created_at,
            content=legacy_instance.content,
            category=legacy_instance.category,
            is_completed=legacy_instance.is_completed,
            complete_at=legacy_instance.complete_at,
            author_id=legacy_instance.author_id,
            like=legacy_instance.like,
            complete_by_id=legacy_instance.complete_by_id
        )


class MigrateComment(MigrateLegacy):
    legacy_model = TodoTodocomment
    model = TodoComment

    def get_new_instance(self, legacy_instance):
        return self.model(
            id=legacy_instance.id,
            created_at=legacy_instance.created_at,
            todo_id=legacy_instance.todo_id,
            content=legacy_instance.content,
            author_id=legacy_instance.author_id,
        )


class MigrateTag(MigrateLegacy):
    legacy_model = TodoTag
    model = Tag

    def get_new_instance(self, legacy_instance):
        return self.model(
            id=legacy_instance.id,
            created_at=legacy_instance.created_at,
            name=legacy_instance.name,
            author_id=legacy_instance.created_by_id
        )

    def post_migrate(self):
        for tag_rel in TodoTodoTag.objects.using('legacy').all():
            todo = Todo.objects.get(id=tag_rel.todo_id)
            todo.tag.add(tag_rel.tag_id)


def migrate():
    print("Start migrating User model...")
    MigrateUser.migrate()
    print("Start migrating Todo model...")
    MigrateTodo.migrate()
    print("Start migrating Comment model...")
    MigrateComment.migrate()
    print("Start migrating Tag model...")
    MigrateTag.migrate()

    print("Reset SQL sequence...")
    output = StringIO()
    call_command('sqlsequencereset', 'user', 'todo', stdout=output)
    sql = output.getvalue()

    ansi_escape = re.compile(r'\x1b[^m]*m')
    sql = ansi_escape.sub('', sql)

    with connection.cursor() as cursor:
        cursor.execute(sql)
    output.close()
    print("Migration has successfully completed.")
