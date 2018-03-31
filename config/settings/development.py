from .base import *

DEBUG = True
ALLOWED_HOSTS = ['localhost']


# insert 2? -> corsheaders middleware must be placed higher than any middleware that can generate responses.
MIDDLEWARE.insert(2, 'corsheaders.middleware.CorsMiddleware')

CORS_ORIGIN_WHITELIST = (
    'localhost:3000',
)

CORS_URLS_REGEX = r'^/api/.*$'
