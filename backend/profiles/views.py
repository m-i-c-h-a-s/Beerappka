from django.shortcuts import  redirect
from django.http import Http404
from django.conf import settings

from allauth.account import views as allauth_views
from allauth.account import app_settings


class ConfirmEmailView(allauth_views.ConfirmEmailView):
    
    def get(self, *args, **kwargs):
        try:
            self.object = self.get_object()
            if app_settings.CONFIRM_EMAIL_ON_GET:
                return self.post(*args, **kwargs)
        except Http404:
            redirect_url = self.get_redirect_url()
            return redirect(redirect_url)

    def get_redirect_url(self):
        return f'{settings.FRONTEND_URL}{settings.REDIRECT_CONFIRM_EMAIL}'