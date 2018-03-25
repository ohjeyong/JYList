from django.contrib import admin

from .models import Todo, TodoComment, Tag


@admin.register(Todo)
class TodoAdmin(admin.ModelAdmin):
    search_fields = ['content']
    autocomplete_fields = ['tag', 'author', 'complete_by']


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    search_fields = ['name']
    autocomplete_fields = ['author']


@admin.register(TodoComment)
class TodoCommentAdmin(admin.ModelAdmin):
    search_fields = ['content']
    autocomplete_fields = ['author']
