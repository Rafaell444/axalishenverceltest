from rest_framework import serializers
from .models import AboutPage, CompanyValue, TeamMember, CompanyTimeline, Certification


class CompanyValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyValue
        fields = ["id", "icon", "title", "description", "order"]


class TeamMemberSerializer(serializers.ModelSerializer):
    photo_url = serializers.SerializerMethodField()

    class Meta:
        model = TeamMember
        fields = ["id", "name", "role", "bio", "photo_url", "order"]

    def get_photo_url(self, obj):
        if obj.photo:
            request = self.context.get("request")
            return request.build_absolute_uri(obj.photo.url) if request else obj.photo.url
        return None


class CompanyTimelineSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyTimeline
        fields = ["id", "year", "title", "description", "order"]


class CertificationSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Certification
        fields = ["id", "title", "description", "image_url", "issued_by", "issued_year", "order"]

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get("request")
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return None


class AboutPageSerializer(serializers.ModelSerializer):
    values = serializers.SerializerMethodField()
    team = serializers.SerializerMethodField()
    timeline = serializers.SerializerMethodField()
    certifications = serializers.SerializerMethodField()

    class Meta:
        model = AboutPage
        fields = ["hero_title", "hero_subtitle", "mission", "vision", "values", "team", "timeline", "certifications"]

    def get_values(self, obj):
        return CompanyValueSerializer(CompanyValue.objects.all(), many=True).data

    def get_team(self, obj):
        return TeamMemberSerializer(
            TeamMember.objects.all(), many=True, context=self.context
        ).data

    def get_timeline(self, obj):
        return CompanyTimelineSerializer(CompanyTimeline.objects.all(), many=True).data

    def get_certifications(self, obj):
        return CertificationSerializer(
            Certification.objects.all(), many=True, context=self.context
        ).data
