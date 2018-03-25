from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

from common.models import BaseModel
from .managers import UserManager


class User(BaseModel, AbstractBaseUser, PermissionsMixin):
    username = models.EmailField(unique=True)
    name = models.CharField(max_length=10)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    friends = models.ManyToManyField("self", blank=True)

    EMAIL_FIELD = 'username'
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['name']

    object = UserManager()
