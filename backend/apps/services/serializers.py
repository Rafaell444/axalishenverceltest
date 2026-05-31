from rest_framework import serializers
from .models import Service, ServiceFeature


class ServiceFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceFeature
        fields = ["id", "text"]


class ServiceListSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Service
        fields = ["id", "title", "slug", "icon", "image_url", "short_description", "duration", "price", "is_featured", "order"]

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get("request")
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return None


class ServiceDetailSerializer(serializers.ModelSerializer):
    features = ServiceFeatureSerializer(many=True, read_only=True)
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Service
        fields = [
            "id", "title", "slug", "icon", "image_url",
            "short_description", "full_description",
            "duration", "price", "is_featured",
            "features", "order",
        ]

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get("request")
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return None
