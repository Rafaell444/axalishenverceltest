from rest_framework import serializers
from apps.core.seo_serializers import SeoSerializerMixin
from .models import HeroSection, Advantage, Feature, Stat, Testimonial, FAQ, Partner


def t(obj, field, lang):
    """Return translated field value, falling back to Georgian."""
    if lang and lang != "ka":
        val = getattr(obj, f"{field}_{lang}", None)
        if val:
            return val
    return getattr(obj, field, "") or ""


class HeroSectionSerializer(SeoSerializerMixin, serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    title = serializers.SerializerMethodField()
    title_highlight = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    cta_primary_text = serializers.SerializerMethodField()
    cta_secondary_text = serializers.SerializerMethodField()

    class Meta:
        model = HeroSection
        fields = [
            "title", "title_highlight", "description",
            "cta_primary_text", "cta_primary_link",
            "cta_secondary_text", "cta_secondary_link",
            "image_url", "meta_title", "meta_description",
        ]

    def _lang(self):
        request = self.context.get("request")
        return request.query_params.get("lang", "ka") if request else "ka"

    def get_title(self, obj): return t(obj, "title", self._lang())
    def get_title_highlight(self, obj): return t(obj, "title_highlight", self._lang())
    def get_description(self, obj): return t(obj, "description", self._lang())
    def get_cta_primary_text(self, obj): return t(obj, "cta_primary_text", self._lang())
    def get_cta_secondary_text(self, obj): return t(obj, "cta_secondary_text", self._lang())

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get("request")
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return None


class AdvantageListSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    title = serializers.SerializerMethodField()
    short_description = serializers.SerializerMethodField()

    class Meta:
        model = Advantage
        fields = ["id", "title", "slug", "icon", "image_url", "short_description", "order"]

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


class AdvantageDetailSerializer(SeoSerializerMixin, serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    video_url = serializers.SerializerMethodField()
    title = serializers.SerializerMethodField()
    short_description = serializers.SerializerMethodField()
    full_description = serializers.SerializerMethodField()

    class Meta:
        model = Advantage
        fields = [
            "id", "title", "slug", "icon",
            "image_url", "video_url",
            "short_description", "full_description",
            "meta_title", "meta_description",
            "order",
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

    def get_video_url(self, obj):
        if obj.video:
            request = self.context.get("request")
            return request.build_absolute_uri(obj.video.url) if request else obj.video.url
        return None


class FeatureSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()

    class Meta:
        model = Feature
        fields = ["id", "icon", "color", "title", "description", "order"]

    def _lang(self):
        request = self.context.get("request")
        return request.query_params.get("lang", "ka") if request else "ka"

    def get_title(self, obj): return t(obj, "title", self._lang())
    def get_description(self, obj): return t(obj, "description", self._lang())


class StatSerializer(serializers.ModelSerializer):
    label = serializers.SerializerMethodField()

    class Meta:
        model = Stat
        fields = ["id", "value", "label", "order"]

    def _lang(self):
        request = self.context.get("request")
        return request.query_params.get("lang", "ka") if request else "ka"

    def get_label(self, obj): return t(obj, "label", self._lang())


class TestimonialSerializer(serializers.ModelSerializer):
    avatar_url = serializers.SerializerMethodField()
    role = serializers.SerializerMethodField()
    content = serializers.SerializerMethodField()

    class Meta:
        model = Testimonial
        fields = ["id", "name", "role", "content", "avatar_url", "rating", "order"]

    def _lang(self):
        request = self.context.get("request")
        return request.query_params.get("lang", "ka") if request else "ka"

    def get_role(self, obj): return t(obj, "role", self._lang())
    def get_content(self, obj): return t(obj, "content", self._lang())

    def get_avatar_url(self, obj):
        if obj.avatar:
            request = self.context.get("request")
            return request.build_absolute_uri(obj.avatar.url) if request else obj.avatar.url
        return None


class FAQSerializer(serializers.ModelSerializer):
    question = serializers.SerializerMethodField()
    answer = serializers.SerializerMethodField()

    class Meta:
        model = FAQ
        fields = ["id", "question", "answer", "order"]

    def _lang(self):
        request = self.context.get("request")
        return request.query_params.get("lang", "ka") if request else "ka"

    def get_question(self, obj): return t(obj, "question", self._lang())
    def get_answer(self, obj): return t(obj, "answer", self._lang())


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
