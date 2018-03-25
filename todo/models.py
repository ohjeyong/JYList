from django.db import models
from django.utils import timezone
from django.conf import settings
from common.models import BaseModel


class Todo(BaseModel):
    CATEGORY_CHOICE = (
        ('FOOD', '먹을 곳'),
        ('PLACE', '갈 곳'),
        ('TODO', '할 것'),
    )
    content = models.CharField(max_length=100)
    category = models.CharField(max_length=10, choices=CATEGORY_CHOICE)
    like = models.PositiveIntegerField(default=0)
    is_completed = models.BooleanField(default=False)
    complete_at = models.DateTimeField(blank=True, null=True)
    complete_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="completed_todo_set", blank=True, null=True,
                                    on_delete=models.CASCADE)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    tag = models.ManyToManyField('Tag', blank=True)

    def __str__(self):
        return self.content[0:20]

    def complete(self, user) -> 'Todo':
        self.is_completed = True
        self.complete_at = timezone.now()
        self.complete_by = user
        self.save()
        return self

    def revert_complete(self) -> 'Todo':
        self.is_completed = False
        self.complete_at = None
        self.complete_by = None
        self.save()
        return self

    def add_like(self) -> 'Todo':
        self.like += 1
        self.save()
        return self


class Tag(BaseModel):
    name = models.CharField(max_length=10, unique=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class TodoComment(BaseModel):
    todo = models.ForeignKey(Todo, on_delete=models.CASCADE)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    content = models.CharField(max_length=100)

    def __str__(self):
        return self.content[0:20]
