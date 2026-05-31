from rest_framework import serializers
from .models import BlogCategory, BlogPost


class BlogCategorySerializer(serializers.ModelSerializer):
    post_count = serializers.SerializerMethodField()

    class Meta:
        model = BlogCategory
        fields = ["id", "name", "slug", "post_count"]

    def get_post_count(self, obj):
        return obj.posts.filter(is_published=True).count()


class BlogPostListSerializer(serializers.ModelSerializer):
    category = BlogCategorySerializer(read_only=True)
    author_name = serializers.SerializerMethodField()
    featured_image_url = serializers.SerializerMethodField()

    class Meta:
        model = BlogPost
        fields = [
            "id", "title", "slug", "excerpt", "featured_image_url",
            "category", "author_name", "is_featured", "published_at",
        ]

    def get_author_name(self, obj):
        if obj.author:
            return obj.author.get_full_name() or obj.author.username
        return None

    def get_featured_image_url(self, obj):
        if obj.featured_image:
            request = self.context.get("request")
            return request.build_absolute_uri(obj.featured_image.url) if request else obj.featured_image.url
        return None


class BlogPostDetailSerializer(BlogPostListSerializer):
    class Meta(BlogPostListSerializer.Meta):
        fields = BlogPostListSerializer.Meta.fields + ["body", "created_at", "updated_at"]
