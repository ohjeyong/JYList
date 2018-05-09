"""
Django settings for config project.

Generated by 'django-admin startproject' using Django 2.0.3.

For more information on this file, see
https://docs.djangoproject.com/en/2.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.0/ref/settings/
"""

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.0/howto/deployment/checklist/


import codecs
import os

from django.core.exceptions import ImproperlyConfigured

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Abount .env file -----------------------------------------------------------------------------------------------------
"""
프로젝트 루트에 .env 파일이 있을 경우 .env 파일을 읽은 후 environment variable 에 덮어 씀.
"""


def _parse_env_line(line):
    """
    .env 파일의 한 줄을 읽어 variable name 과 값을 parsing 하여 return
    """
    line: str = line.strip()

    # Ignore lines with `#` or which doesn't have `=` in it.
    if not line or line.startswith('#') or '=' not in line:
        return None, None

    k, v = line.split('=', 1)

    # Remove any leading and trailing spaces in key, value
    k, v = k.strip(), v.strip()

    if v:
        v = v.encode('unicode-escape').decode('ascii')
        quoted = v[0] == v[-1] in ['"', "'"]
        if quoted:
            v = codecs.getdecoder('unicode_escape')(v[1:-1])[0]
    return k, v


def read_and_set_environment():
    try:
        env_file = open('{}/.env'.format(BASE_DIR), 'r')
        lines = env_file.readlines()
        for line in lines:
            name, value = _parse_env_line(line)
            if name is not None and value is not None:
                os.environ[name] = value
        return True
    except FileNotFoundError:
        return


read_and_set_environment()


# ----------------------------------------------------------------------------------------------------------------------


def get_env(name):
    try:
        return os.environ[name]
    except KeyError:
        raise ImproperlyConfigured(
            '{} is not configured. Please define this value in .env file or environment variable.'.format(name))


# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = get_env('SECRET_KEY')

# Application definition
DJANGO_BASIC_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

CUSTOM_APPS = [
    'user.apps.UserConfig',
    'todo',
    'migrate_legacy'
]

THIRD_PARTY_APPS = [
    'rest_framework',
    'rest_framework.authtoken',
    'corsheaders'
]

INSTALLED_APPS = DJANGO_BASIC_APPS + CUSTOM_APPS + THIRD_PARTY_APPS


MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'

# Database
# https://docs.djangoproject.com/en/2.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': get_env('DB_NAME'),
        'USER': get_env('DB_USER'),
        'PASSWORD': get_env('DB_PASSWORD'),
        'HOST': get_env('DB_HOST'),
        'PORT': 5432
    },
    'legacy': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': get_env('LEGACY_DB_NAME'),
        'USER': get_env('LEGACY_DB_USER'),
        'PASSWORD': get_env('LEGACY_DB_PASSWORD'),
        'HOST': get_env('LEGACY_DB_HOST'),
        'PORT': 5432
    }
}

# Password validation
# https://docs.djangoproject.com/en/2.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/2.0/topics/i18n/

LANGUAGE_CODE = 'ko-kr'

TIME_ZONE = 'Asia/Seoul'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.0/howto/static-files/

STATIC_URL = '/static/'
FRONT_APP_DIR = os.path.join(BASE_DIR, 'front-end')
STATICFILES_DIRS = [
    ('front-end', os.path.join(FRONT_APP_DIR, 'build'))
]
STATIC_ROOT = os.path.join(BASE_DIR, 'stroot/')

AUTH_USER_MODEL = 'user.User'

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
    )
}
