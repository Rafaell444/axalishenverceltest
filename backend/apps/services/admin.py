from django.contrib import admin
from unfold.admin import ModelAdmin, TabularInline
from .models import Service, ServiceFeature


class ServiceFeatureInline(TabularInline):
    model = ServiceFeature
    extra = 1
    fields = ["text"]


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
        ("შინაარსი", {"fields": ("short_description", "full_description")}),
        ("დეტალები", {"fields": ("duration", "price")}),
    )
