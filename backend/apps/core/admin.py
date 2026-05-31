from django.contrib import admin
from solo.admin import SingletonModelAdmin
from unfold.admin import ModelAdmin
from .models import SiteSettings


@admin.register(SiteSettings)
class SiteSettingsAdmin(SingletonModelAdmin, ModelAdmin):
    fieldsets = (
        ("ბრენდი", {"fields": ("site_name", "tagline", "logo", "favicon", "announcement_text")}),
        ("კონტაქტი", {"fields": ("primary_phone", "secondary_phone", "emergency_phone", "email", "support_email")}),
        ("მისამართი", {"fields": ("address_line1", "address_line2", "google_maps_embed")}),
        ("სამუშაო საათები", {"fields": ("working_hours_weekdays", "working_hours_saturday", "working_hours_sunday")}),
        ("სოციალური ქსელები", {"fields": ("facebook_url", "instagram_url", "youtube_url")}),
    )
