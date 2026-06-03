from django.contrib import admin
from unfold.admin import ModelAdmin, TabularInline
from .models import Service, ServiceFeature


class ServiceFeatureInline(TabularInline):
    model = ServiceFeature
    extra = 1
    fields = ["text", "text_en", "text_ru"]


@admin.register(Service)
class ServiceAdmin(ModelAdmin):
    list_display = ["title", "slug", "duration", "price", "is_featured", "is_active", "order"]
    list_editable = ["is_featured", "is_active", "order"]
    list_filter = ["is_active", "is_featured"]
    search_fields = ["title", "short_description"]
    prepopulated_fields = {"slug": ("title",)}
    inlines = [ServiceFeatureInline]
    fieldsets = (
        ("ძირითადი", {"fields": ("title", "slug", "icon", "image", "is_featured", "is_active", "order")}),
        ("შინაარსი — ქართული", {"fields": ("short_description", "full_description")}),
        ("შინაარსი — English", {
            "fields": ("title_en", "short_description_en", "full_description_en"),
            "classes": ("collapse",),
        }),
        ("შინაარსი — Русский", {
            "fields": ("title_ru", "short_description_ru", "full_description_ru"),
            "classes": ("collapse",),
        }),
        ("დეტალები", {"fields": ("duration", "price")}),
    )
