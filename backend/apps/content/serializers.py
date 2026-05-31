from rest_framework import serializers
from .models import HeroSection, Feature, Stat, ProcessStep, Testimonial, Achievement, Publication, FAQ, Partner


class HeroSectionSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = HeroSection
        fields = [
            "title", "title_highlight", "description",
            "cta_primary_text", "cta_primary_link",
            "cta_secondary_text", "cta_secondary_link",
            "image_url",
        ]

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get("request")
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return None


class FeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feature
        fields = ["id", "icon", "color", "title", "description", "order"]


class StatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stat
        fields = ["id", "value", "label", "order"]


class ProcessStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProcessStep
        fields = ["id", "step_number", "title", "description", "order"]


class TestimonialSerializer(serializers.ModelSerializer):
    avatar_url = serializers.SerializerMethodField()

    class Meta:
        model = Testimonial
        fields = ["id", "name", "role", "content", "avatar_url", "rating", "order"]

    def get_avatar_url(self, obj):
        if obj.avatar:
            request = self.context.get("request")
            return request.build_absolute_uri(obj.avatar.url) if request else obj.avatar.url
        return None


class AchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Achievement
        fields = ["id", "year", "title", "description", "order"]


class PublicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publication
        fields = ["id", "title", "journal", "date", "url", "description", "order"]


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = ["id", "question", "answer", "order"]


class PartnerSerializer(serializers.ModelSerializer):
    logo_url = serializers.SerializerMethodField()

    class Meta:
        model = Partner
        fields = ["id", "name", "logo_url", "url", "order"]

    def get_logo_url(self, obj):
        if obj.logo:
            request = self.context.get("request")
            return request.build_absolute_uri(obj.logo.url) if request else obj.logo.url
        return None
