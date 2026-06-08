from rest_framework import serializers
from apps.core.seo_serializers import SeoSerializerMixin
from .models import BlogCategory, BlogPost


def t(obj, field, lang):
    if lang and lang != "ka":
        val = getattr(obj, f"{field}_{lang}", None)
        if val:
            return val
    return getattr(obj, field, "") or ""


class BlogCategorySerializer(serializers.ModelSerializer):
    post_count = serializers.SerializerMethodField()
    name = serializers.SerializerMethodField()

    class Meta:
        model = BlogCategory
        fields = ["id", "name", "slug", "post_count"]

    def _lang(self):
        request = self.context.get("request")
        return request.query_params.get("lang", "ka") if request else "ka"

    def get_name(self, obj): return t(obj, "name", self._lang())

    def get_post_count(self, obj):
        return obj.posts.filter(is_published=True).count()


class BlogPostListSerializer(serializers.ModelSerializer):
    category = BlogCategorySerializer(read_only=True)
    author_name = serializers.SerializerMethodField()
    featured_image_url = serializers.SerializerMethodField()
    title = serializers.SerializerMethodField()
    excerpt = serializers.SerializerMethodField()

    class Meta:
        model = BlogPost
        fields = [
            "id", "title", "slug", "excerpt", "featured_image_url",
            "category", "author_name", "is_featured", "published_at",
        ]

    def _lang(self):
        request = self.context.get("request")
        return request.query_params.get("lang", "ka") if request else "ka"

    def get_title(self, obj): return t(obj, "title", self._lang())
    def get_excerpt(self, obj): return t(obj, "excerpt", self._lang())

    def get_author_name(self, obj):
        if obj.author:
            return obj.author.get_full_name() or obj.author.username
        return None

    def get_featured_image_url(self, obj):
        if obj.featured_image:
            request = self.context.get("request")
            return request.build_absolute_uri(obj.featured_image.url) if request else obj.featured_image.url
        return None


class BlogPostDetailSerializer(SeoSerializerMixin, BlogPostListSerializer):
    body = serializers.SerializerMethodField()

    class Meta(BlogPostListSerializer.Meta):
        fields = BlogPostListSerializer.Meta.fields + [
            "body", "meta_title", "meta_description", "created_at", "updated_at",
        ]

    def get_body(self, obj): return t(obj, "body", self._lang())
