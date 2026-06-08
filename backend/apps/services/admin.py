from django.contrib import admin
from unfold.admin import ModelAdmin
from apps.core.seo import SEO_FIELDSETS
from .models import Service


@admin.register(Service)
class ServiceAdmin(ModelAdmin):
    list_display = ["title", "slug", "is_featured", "is_active", "order"]
    list_editable = ["is_featured", "is_active", "order"]
    list_filter = ["is_active", "is_featured"]
    search_fields = ["title", "short_description"]
    prepopulated_fields = {"slug": ("title",)}
    fieldsets = (
        ("ძირითადი", {"fields": ("title", "slug", "icon", "is_featured", "is_active", "order")}),
        ("მედია", {
            "fields": ("image", "video"),
            "description": "ატვირთეთ სურათი ან ვიდეო (MP4). ვიდეო პრიორიტეტულია.",
        }),
        ("შინაარსი — ქართული", {"fields": ("short_description", "full_description")}),
        ("შინაარსი — English", {
            "fields": ("title_en", "short_description_en", "full_description_en"),
            "classes": ("collapse",),
        }),
        ("შინაარსი — Русский", {
            "fields": ("title_ru", "short_description_ru", "full_description_ru"),
            "classes": ("collapse",),
        }),
        *SEO_FIELDSETS,
    )
