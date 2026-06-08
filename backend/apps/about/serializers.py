from rest_framework import serializers
from apps.core.seo_serializers import SeoSerializerMixin
from .models import AboutPage, CompanyValue, TeamMember, CompanyTimeline, Certification


def t(obj, field, lang):
    if lang and lang != "ka":
        val = getattr(obj, f"{field}_{lang}", None)
        if val:
            return val
    return getattr(obj, field, "") or ""


class CompanyValueSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()

    class Meta:
        model = CompanyValue
        fields = ["id", "icon", "title", "description", "order"]

    def _lang(self):
        request = self.context.get("request")
        return request.query_params.get("lang", "ka") if request else "ka"

    def get_title(self, obj): return t(obj, "title", self._lang())
    def get_description(self, obj): return t(obj, "description", self._lang())


class TeamMemberSerializer(serializers.ModelSerializer):
    photo_url = serializers.SerializerMethodField()
    role = serializers.SerializerMethodField()
    bio = serializers.SerializerMethodField()

    class Meta:
        model = TeamMember
        fields = ["id", "name", "role", "bio", "photo_url", "order"]

    def _lang(self):
        request = self.context.get("request")
        return request.query_params.get("lang", "ka") if request else "ka"

    def get_role(self, obj): return t(obj, "role", self._lang())
    def get_bio(self, obj): return t(obj, "bio", self._lang())

    def get_photo_url(self, obj):
        if obj.photo:
            request = self.context.get("request")
            return request.build_absolute_uri(obj.photo.url) if request else obj.photo.url
        return None


class CompanyTimelineSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()

    class Meta:
        model = CompanyTimeline
        fields = ["id", "year", "title", "description", "order"]

    def _lang(self):
        request = self.context.get("request")
        return request.query_params.get("lang", "ka") if request else "ka"

    def get_title(self, obj): return t(obj, "title", self._lang())
    def get_description(self, obj): return t(obj, "description", self._lang())


class CertificationSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()

    class Meta:
        model = Certification
        fields = ["id", "title", "description", "image_url", "issued_by", "issued_year", "order"]

    def _lang(self):
        request = self.context.get("request")
        return request.query_params.get("lang", "ka") if request else "ka"

    def get_title(self, obj): return t(obj, "title", self._lang())
    def get_description(self, obj): return t(obj, "description", self._lang())

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get("request")
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return None


class AboutPageSerializer(SeoSerializerMixin, serializers.ModelSerializer):
    values = serializers.SerializerMethodField()
    team = serializers.SerializerMethodField()
    timeline = serializers.SerializerMethodField()
    certifications = serializers.SerializerMethodField()
    hero_title = serializers.SerializerMethodField()
    hero_title_highlight = serializers.SerializerMethodField()
    hero_subtitle = serializers.SerializerMethodField()
    mission = serializers.SerializerMethodField()
    vision = serializers.SerializerMethodField()
    image_url = serializers.SerializerMethodField()
    video_url = serializers.SerializerMethodField()

    class Meta:
        model = AboutPage
        fields = [
            "hero_title", "hero_title_highlight", "hero_subtitle", "mission", "vision",
            "image_url", "video_url",
            "meta_title", "meta_description",
            "values", "team", "timeline", "certifications",
        ]

    def _lang(self):
        request = self.context.get("request")
        return request.query_params.get("lang", "ka") if request else "ka"

    def get_hero_title(self, obj): return t(obj, "hero_title", self._lang())
    def get_hero_title_highlight(self, obj): return t(obj, "hero_title_highlight", self._lang())
    def get_hero_subtitle(self, obj): return t(obj, "hero_subtitle", self._lang())
    def get_mission(self, obj): return t(obj, "mission", self._lang())
    def get_vision(self, obj): return t(obj, "vision", self._lang())

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

    def get_values(self, obj):
        return CompanyValueSerializer(CompanyValue.objects.all(), many=True, context=self.context).data

    def get_team(self, obj):
        return TeamMemberSerializer(TeamMember.objects.all(), many=True, context=self.context).data

    def get_timeline(self, obj):
        return CompanyTimelineSerializer(CompanyTimeline.objects.all(), many=True, context=self.context).data

    def get_certifications(self, obj):
        return CertificationSerializer(Certification.objects.all(), many=True, context=self.context).data
