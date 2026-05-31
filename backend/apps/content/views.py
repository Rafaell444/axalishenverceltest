from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics
from .models import HeroSection, Feature, Stat, ProcessStep, Testimonial, Achievement, Publication, FAQ, Partner
from .serializers import (
    HeroSectionSerializer, FeatureSerializer, StatSerializer,
    ProcessStepSerializer, TestimonialSerializer, AchievementSerializer,
    PublicationSerializer, FAQSerializer, PartnerSerializer,
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


class ProcessStepListView(generics.ListAPIView):
    queryset = ProcessStep.objects.all()
    serializer_class = ProcessStepSerializer


class TestimonialListView(generics.ListAPIView):
    queryset = Testimonial.objects.filter(is_active=True)
    serializer_class = TestimonialSerializer

    def get_serializer_context(self):
        return {"request": self.request}


class AchievementListView(generics.ListAPIView):
    queryset = Achievement.objects.all()
    serializer_class = AchievementSerializer


class PublicationListView(generics.ListAPIView):
    queryset = Publication.objects.all()
    serializer_class = PublicationSerializer


class FAQListView(generics.ListAPIView):
    queryset = FAQ.objects.filter(is_active=True)
    serializer_class = FAQSerializer


class PartnerListView(generics.ListAPIView):
    queryset = Partner.objects.all()
    serializer_class = PartnerSerializer

    def get_serializer_context(self):
        return {"request": self.request}
