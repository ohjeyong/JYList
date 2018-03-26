from rest_framework import status, viewsets
from rest_framework.decorators import list_route
from rest_framework.response import Response

from user.models import User
from .user_serializers import UserSerializer, UserRegistrationSerializer


class UserViewSet(viewsets.ViewSet):

    @list_route()
    def me(self, request):
        if not request.user.is_authenticated:
            return Response(dict())
        user = UserSerializer(request.user)
        return Response(user.data)

    @list_route(methods=['POST'])
    def signup(self, request):
        data = request.data
        serializer = UserRegistrationSerializer(data=data)
        if serializer.is_valid():
            instance = serializer.save()
            return Response(UserSerializer(instance).data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors)
