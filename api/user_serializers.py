from django import forms
from django.contrib.auth import password_validation
from rest_framework import serializers

from user.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'name', 'auth_token')

    def create(self, validated_data):
        raise NotImplementedError()

    def update(self, instance, validated_data):
        raise NotImplementedError()


class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'name', 'password1', 'password2')

    password1 = serializers.CharField(max_length=128)
    password2 = serializers.CharField(max_length=128)

    def validate_password1(self, value):
        try:
            password_validation.validate_password(value)
        except forms.ValidationError as error:
            raise serializers.ValidationError(error.messages)
        return value

    def validate(self, data):
        password1 = data['password1']
        password2 = data['password2']
        error_msg = "비밀번호가 일치하지 않습니다."
        if password1 and password2 and password1 != password2:
            raise serializers.ValidationError({
                'password1': error_msg,
                'password2': error_msg
            })
        return data

    def create(self, validated_data):
        return User.objects.create_user(validated_data['username'], validated_data['name'], validated_data['password1'])

    def update(self, instance, validated_data):
        raise NotImplementedError()
