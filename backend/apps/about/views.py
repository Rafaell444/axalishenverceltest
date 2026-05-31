from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import AboutPage
from .serializers import AboutPageSerializer


@api_view(["GET"])
def about(request):
    obj = AboutPage.get_solo()
    serializer = AboutPageSerializer(obj, context={"request": request})
    return Response(serializer.data)
