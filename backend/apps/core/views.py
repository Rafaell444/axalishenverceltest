from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import SiteSettings, PageSEO
from .serializers import SiteSettingsSerializer, PageSeoSerializer


@api_view(["GET"])
def site_settings(request):
    settings = SiteSettings.get_solo()
    serializer = SiteSettingsSerializer(settings, context={"request": request})
    return Response(serializer.data)


@api_view(["GET"])
def page_seo(request, page_key):
    page = get_object_or_404(PageSEO, page_key=page_key)
    serializer = PageSeoSerializer(page, context={"request": request})
    return Response(serializer.data)
