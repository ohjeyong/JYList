import logging

from .base import *

DEBUG = True
ALLOWED_HOSTS = ['localhost']

INSTALLED_APPS.append('nplusone.ext.django')

# insert 2? -> corsheaders middleware must be placed higher than any middleware that can generate responses.
MIDDLEWARE.insert(2, 'corsheaders.middleware.CorsMiddleware')
MIDDLEWARE.append('nplusone.ext.django.NPlusOneMiddleware')

NPLUSONE_LOGGER = logging.getLogger('nplusone')
NPLUSONE_LOG_LEVEL = logging.WARN

CORS_ORIGIN_WHITELIST = (
    'localhost:3000',
)

CORS_URLS_REGEX = r'^/api/.*$'
