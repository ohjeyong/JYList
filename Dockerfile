FROM python:3.6.5

ENV PYTHONUNBUFFERED 1
ENV DJANGO_SETTINGS_MODULE config.settings.production

COPY . /jylist
WORKDIR /jylist

RUN pip install pipenv
RUN pipenv install --system
