from django.contrib import admin

from .models import Todo, TodoComment, Tag


admin.site.register(Todo)
admin.site.register(TodoComment)
admin.site.register(Tag)
