from django.contrib import admin
from unfold.admin import ModelAdmin
from .models import BlogCategory, BlogPost


@admin.register(BlogCategory)
class BlogCategoryAdmin(ModelAdmin):
    list_display = ["name", "slug"]
    prepopulated_fields = {"slug": ("name",)}
    search_fields = ["name"]


@admin.register(BlogPost)
class BlogPostAdmin(ModelAdmin):
    list_display = ["title", "category", "author", "is_published", "is_featured", "published_at"]
    list_editable = ["is_published", "is_featured"]
    list_filter = ["is_published", "is_featured", "category"]
    search_fields = ["title", "excerpt"]
    prepopulated_fields = {"slug": ("title",)}
    date_hierarchy = "published_at"
    fieldsets = (
        ("ძირითადი", {"fields": ("title", "slug", "category", "author", "featured_image")}),
        ("შინაარსი", {"fields": ("excerpt", "body")}),
        ("პარამეტრები", {"fields": ("is_published", "is_featured", "published_at")}),
    )
    autocomplete_fields = ["category"]
