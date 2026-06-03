from django.contrib import admin
from unfold.admin import ModelAdmin
from .models import BlogCategory, BlogPost


@admin.register(BlogCategory)
class BlogCategoryAdmin(ModelAdmin):
    list_display = ["name", "slug"]
    prepopulated_fields = {"slug": ("name",)}
    search_fields = ["name"]
    fieldsets = (
        ("ქართული", {"fields": ("name", "slug")}),
        ("English", {"fields": ("name_en",), "classes": ("collapse",)}),
        ("Русский", {"fields": ("name_ru",), "classes": ("collapse",)}),
    )


@admin.register(BlogPost)
class BlogPostAdmin(ModelAdmin):
    list_display = ["title", "category", "author", "is_published", "is_featured", "published_at"]
    list_editable = ["is_published", "is_featured"]
    list_filter = ["is_published", "is_featured", "category"]
    search_fields = ["title", "excerpt"]
    prepopulated_fields = {"slug": ("title",)}
    date_hierarchy = "published_at"
    fieldsets = (
        ("ძირითადი", {"fields": ("title", "slug", "category", "author", "featured_image", "is_published", "is_featured", "published_at")}),
        ("შინაარსი — ქართული", {"fields": ("excerpt", "body")}),
        ("შინაარსი — English", {
            "fields": ("title_en", "excerpt_en", "body_en"),
            "classes": ("collapse",),
        }),
        ("შინაარსი — Русский", {
            "fields": ("title_ru", "excerpt_ru", "body_ru"),
            "classes": ("collapse",),
        }),
    )
    autocomplete_fields = ["category"]
