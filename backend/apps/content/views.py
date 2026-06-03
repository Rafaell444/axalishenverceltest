from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics
from .models import HeroSection, Feature, Stat, Testimonial, FAQ, Partner
from .serializers import (
    HeroSectionSerializer, FeatureSerializer, StatSerializer,
    TestimonialSerializer, FAQSerializer, PartnerSerializer,
)


@api_view(["GET"])
def hero(request):
    obj = HeroSection.get_solo()
    return Response(HeroSectionSerializer(obj, context={"request": request}).data)


class FeatureListView(generics.ListAPIView):
    queryset = Feature.objects.all()
    serializer_class = FeatureSerializer

    def get_serializer_context(self):
        return {"request": self.request}


class StatListView(generics.ListAPIView):
    queryset = Stat.objects.all()
    serializer_class = StatSerializer

    def get_serializer_context(self):
        return {"request": self.request}


class TestimonialListView(generics.ListAPIView):
    queryset = Testimonial.objects.filter(is_active=True)
    serializer_class = TestimonialSerializer

    def get_serializer_context(self):
        return {"request": self.request}


class FAQListView(generics.ListAPIView):
    queryset = FAQ.objects.filter(is_active=True)
    serializer_class = FAQSerializer

    def get_serializer_context(self):
        return {"request": self.request}


class PartnerListView(generics.ListAPIView):
    queryset = Partner.objects.all()
    serializer_class = PartnerSerializer

    def get_serializer_context(self):
        return {"request": self.request}
