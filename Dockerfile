FROM python:3.6.5

ENV PYTHONUNBUFFERED 1
ENV DJANGO_SETTINGS_MODULE config.settings.production
RUN mkdir /code
WORKDIR /code
ADD . /code/
RUN pip install pipenv
RUN pipenv install --dev --system

