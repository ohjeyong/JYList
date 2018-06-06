import requests
from django.conf import settings


BASE_URL = 'https://api.pushbullet.com/v2'


class PushBullet:
    def __init__(self):
        self.base_url = BASE_URL

    class ErrorResponse(Exception):
        def __init__(self, messsage, raw):
            self.message = messsage
            self.raw = raw

    @staticmethod
    def get_response(response):
        result = response.json()
        if response.status_code != requests.codes.ok:
            raise PushBullet.ErrorResponse(result.get('message'), result)
        return result

    @staticmethod
    def get_headers():
        return {
            'Access-Token': settings.PUSH_BULLET_API_KEY,
            'Content-Type': 'application/json'
        }

    def _post(self, url, payload):
        response = requests.post(url, json=payload, headers=self.get_headers())
        return self.get_response(response)

    def _get(self, url, params=None):
        response = requests.get(url, params=params, headers=self.get_headers())
        return self.get_response(response)

    def get_devices(self):
        url = '{}/devices'.format(self.base_url)
        return self._get(url)['devices']
    #
    # def create_push(self, title, body, link='https://jylist.cc'):
    #     url = '{}/pushes'.format(self.base_url)
    #     device_iden = ''
    #     payload = {
    #         'type': 'link',
    #         'url': link,
    #         'title': title,
    #         'body': body,
    #         'device_iden': device_iden
    #     }
    #     return self._post(url, payload)
