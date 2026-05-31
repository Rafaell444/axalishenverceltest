from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import ContactMessageSerializer, ConsultationSerializer, NewsletterSubscriberSerializer


@api_view(["POST"])
def contact(request):
    serializer = ContactMessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "შეტყობინება წარმატებით გაიგზავნა."}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def consultation(request):
    serializer = ConsultationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "კონსულტაციის მოთხოვნა მიღებულია."}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def newsletter(request):
    serializer = NewsletterSubscriberSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "წარმატებით გამოიწერეთ."}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
