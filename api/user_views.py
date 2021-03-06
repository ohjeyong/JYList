from django.contrib.auth import login, logout, authenticate
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import ParseError, AuthenticationFailed
from rest_framework.response import Response

from .user_serializers import UserSerializer, UserRegistrationSerializer


class UserViewSet(viewsets.ViewSet):

    @action(methods=['POST'], detail=False)
    def login(self, request):
        data = request.data
        username = data.get('username')
        password = data.get('password')
        if username is None or password is None:
            raise ParseError("username, password 는 필수 요소입니다.")
        user = authenticate(request, username=username, password=password)
        if user is None:
            raise AuthenticationFailed("아이디나 비밀번호가 올바르지 않습니다.")
        login(request, user)
        user_serializer = UserSerializer(user)
        return Response(user_serializer.data)

    @action(detail=False)
    def logout(self, request):
        logout(request)
        return Response(status=status.HTTP_204_NO_CONTENT)

    @action(detail=False)
    def me(self, request):
        if not request.user.is_authenticated:
            return Response(dict())
        user_serializer = UserSerializer(request.user)
        return Response(user_serializer.data)

    @action(methods=['POST'], detail=False)
    def signup(self, request):
        data = request.data
        serializer = UserRegistrationSerializer(data=data)
        if serializer.is_valid():
            instance = serializer.save()
            login(request, instance)
            return Response(UserSerializer(instance).data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors)
