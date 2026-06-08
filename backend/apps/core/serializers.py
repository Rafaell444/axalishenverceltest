from rest_framework import serializers
from .models import SiteSettings, PageSEO
from .seo_serializers import SeoSerializerMixin


def t(obj, field, lang):
    """Return translated field value, falling back to Georgian."""
    if lang and lang != "ka":
        val = getattr(obj, f"{field}_{lang}", None)
        if val:
            return val
    return getattr(obj, field, "") or ""


class SiteSettingsSerializer(serializers.ModelSerializer):
    logo_url = serializers.SerializerMethodField()
    favicon_url = serializers.SerializerMethodField()
    tagline = serializers.SerializerMethodField()
    announcement_text = serializers.SerializerMethodField()

    class Meta:
        model = SiteSettings
        fields = [
            "site_name", "tagline", "logo_url", "favicon_url", "announcement_text",
            "primary_phone", "secondary_phone", "emergency_phone",
            "email", "support_email",
            "address_line1", "address_line2", "google_maps_embed",
            "working_hours_weekdays", "working_hours_saturday", "working_hours_sunday",
            "facebook_url", "instagram_url", "youtube_url",
        ]

    def _lang(self):
        request = self.context.get("request")
        return request.query_params.get("lang", "ka") if request else "ka"

    def get_tagline(self, obj): return t(obj, "tagline", self._lang())
    def get_announcement_text(self, obj): return t(obj, "announcement_text", self._lang())

    def get_logo_url(self, obj):
        if obj.logo:
            request = self.context.get("request")
            return request.build_absolute_uri(obj.logo.url) if request else obj.logo.url
        return None

    def get_favicon_url(self, obj):
        if obj.favicon:
            request = self.context.get("request")
            return request.build_absolute_uri(obj.favicon.url) if request else obj.favicon.url
        return None


class PageSeoSerializer(SeoSerializerMixin, serializers.ModelSerializer):
    class Meta:
        model = PageSEO
        fields = ["page_key", "meta_title", "meta_description"]

    def _lang(self):
        request = self.context.get("request")
        return request.query_params.get("lang", "ka") if request else "ka"
