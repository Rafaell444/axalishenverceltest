from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import SiteSettings
from .serializers import SiteSettingsSerializer


@api_view(["GET"])
def site_settings(request):
    settings = SiteSettings.get_solo()
    serializer = SiteSettingsSerializer(settings, context={"request": request})
    return Response(serializer.data)
