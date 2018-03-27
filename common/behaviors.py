class FriendsMixin:
    def get_author_and_friends(self):
        author = self.author
        friends = author.friends.all()
        author_and_friends = list(friends)
        author_and_friends.append(author)
        return author_and_friends
