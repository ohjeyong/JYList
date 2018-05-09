import logging
import os

from django.conf import settings
from django.http import HttpResponse
from django.views.generic import View


class FrontEndAppView(View):
    def get(self, request):
        try:
            with open(os.path.join(settings.STATIC_ROOT, 'front-end', 'index.html')) as f:
                return HttpResponse(f.read())
        except FileNotFoundError:
            logging.exception("Production build of app not found")
            return HttpResponse("""
            No app.
            """, status=501)
