from django.contrib import admin
from solo.admin import SingletonModelAdmin
from unfold.admin import ModelAdmin
from .models import SiteSettings, PageSEO
from .seo import SEO_FIELDSETS


@admin.register(SiteSettings)
class SiteSettingsAdmin(SingletonModelAdmin, ModelAdmin):
    fieldsets = (
        ("ბრენდი (KA)", {"fields": ("site_name", "tagline", "logo", "favicon", "announcement_text")}),
        ("ბრენდი – English", {
            "fields": ("tagline_en", "announcement_text_en"),
            "classes": ("collapse",),
        }),
        ("ბრენდი – Русский", {
            "fields": ("tagline_ru", "announcement_text_ru"),
            "classes": ("collapse",),
        }),
        ("კონტაქტი", {"fields": ("primary_phone", "secondary_phone", "emergency_phone", "email", "support_email")}),
        ("მისამართი", {"fields": ("address_line1", "address_line2", "google_maps_embed")}),
        ("სამუშაო საათები", {"fields": ("working_hours_weekdays", "working_hours_saturday", "working_hours_sunday")}),
        ("სოციალური ქსელები", {"fields": ("facebook_url", "instagram_url", "youtube_url")}),
    )


@admin.register(PageSEO)
class PageSEOAdmin(ModelAdmin):
    list_display = ["page_key", "meta_title"]
    search_fields = ["meta_title", "meta_description", "page_key"]
    fieldsets = (
        ("გვერდი", {"fields": ("page_key",)}),
        *SEO_FIELDSETS,
    )
