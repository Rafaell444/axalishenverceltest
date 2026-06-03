from rest_framework import serializers
from .models import Service, ServiceFeature


def t(obj, field, lang):
    if lang and lang != "ka":
        val = getattr(obj, f"{field}_{lang}", None)
        if val:
            return val
    return getattr(obj, field, "") or ""


class ServiceFeatureSerializer(serializers.ModelSerializer):
    text = serializers.SerializerMethodField()

    class Meta:
        model = ServiceFeature
        fields = ["id", "text"]

    def _lang(self):
        request = self.context.get("request")
        return request.query_params.get("lang", "ka") if request else "ka"

    def get_text(self, obj): return t(obj, "text", self._lang())


class ServiceListSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    title = serializers.SerializerMethodField()
    short_description = serializers.SerializerMethodField()

    class Meta:
        model = Service
        fields = ["id", "title", "slug", "icon", "image_url", "short_description", "duration", "price", "is_featured", "order"]

    def _lang(self):
        request = self.context.get("request")
        return request.query_params.get("lang", "ka") if request else "ka"

    def get_title(self, obj): return t(obj, "title", self._lang())
    def get_short_description(self, obj): return t(obj, "short_description", self._lang())

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get("request")
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return None


class ServiceDetailSerializer(serializers.ModelSerializer):
    features = ServiceFeatureSerializer(many=True, read_only=True)
    image_url = serializers.SerializerMethodField()
    title = serializers.SerializerMethodField()
    short_description = serializers.SerializerMethodField()
    full_description = serializers.SerializerMethodField()

    class Meta:
        model = Service
        fields = [
            "id", "title", "slug", "icon", "image_url",
            "short_description", "full_description",
            "duration", "price", "is_featured",
            "features", "order",
        ]

    def _lang(self):
        request = self.context.get("request")
        return request.query_params.get("lang", "ka") if request else "ka"

    def get_title(self, obj): return t(obj, "title", self._lang())
    def get_short_description(self, obj): return t(obj, "short_description", self._lang())
    def get_full_description(self, obj): return t(obj, "full_description", self._lang())

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get("request")
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return None
