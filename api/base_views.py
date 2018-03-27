class FriendsQuerysetMixin:
    def get_queryset(self):
        user = self.request.user
        share_todo_user_id_list = [friend.id for friend in user.friends.all()]
        share_todo_user_id_list.append(user.id)
        return self.queryset.filter(author_id__in=share_todo_user_id_list)
