from django.urls import path
from . import views

urlpatterns = [
    path("settings/", views.site_settings, name="site-settings"),
    path("seo/<slug:page_key>/", views.page_seo, name="page-seo"),
]
