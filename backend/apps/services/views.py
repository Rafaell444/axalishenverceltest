from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend
from .models import Service
from .serializers import ServiceListSerializer, ServiceDetailSerializer


class ServiceListView(generics.ListAPIView):
    serializer_class = ServiceListSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["is_featured"]

    def get_queryset(self):
        return Service.objects.filter(is_active=True)

    def get_serializer_context(self):
        return {"request": self.request}


class ServiceDetailView(generics.RetrieveAPIView):
    serializer_class = ServiceDetailSerializer
    lookup_field = "slug"

    def get_queryset(self):
        return Service.objects.filter(is_active=True)

    def get_serializer_context(self):
        return {"request": self.request}
