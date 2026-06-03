from django.contrib import admin
from solo.admin import SingletonModelAdmin
from unfold.admin import ModelAdmin
from .models import HeroSection, Feature, Stat, Testimonial, FAQ, Partner


@admin.register(HeroSection)
class HeroSectionAdmin(SingletonModelAdmin, ModelAdmin):
    fieldsets = (
        ("ტექსტი — ქართული", {
            "fields": ("title", "title_highlight", "description"),
        }),
        ("ტექსტი — English", {
            "fields": ("title_en", "title_highlight_en", "description_en"),
            "classes": ("collapse",),
        }),
        ("ტექსტი — Русский", {
            "fields": ("title_ru", "title_highlight_ru", "description_ru"),
            "classes": ("collapse",),
        }),
        ("ღილაკები (KA)", {
            "fields": ("cta_primary_text", "cta_primary_link", "cta_secondary_text", "cta_secondary_link"),
        }),
        ("ღილაკები (EN)", {
            "fields": ("cta_primary_text_en", "cta_secondary_text_en"),
            "classes": ("collapse",),
        }),
        ("ღილაკები (RU)", {
            "fields": ("cta_primary_text_ru", "cta_secondary_text_ru"),
            "classes": ("collapse",),
        }),
        ("მედია", {"fields": ("image",)}),
    )


@admin.register(Feature)
class FeatureAdmin(ModelAdmin):
    list_display = ["title", "icon", "order"]
    list_editable = ["order"]
    ordering = ["order"]
    fieldsets = (
        ("ქართული", {"fields": ("icon", "color", "title", "description", "order")}),
        ("English", {"fields": ("title_en", "description_en"), "classes": ("collapse",)}),
        ("Русский", {"fields": ("title_ru", "description_ru"), "classes": ("collapse",)}),
    )


@admin.register(Stat)
class StatAdmin(ModelAdmin):
    list_display = ["value", "label", "order"]
    list_editable = ["order"]
    ordering = ["order"]
    fieldsets = (
        ("ძირითადი", {"fields": ("value", "label", "order")}),
        ("English", {"fields": ("label_en",), "classes": ("collapse",)}),
        ("Русский", {"fields": ("label_ru",), "classes": ("collapse",)}),
    )


@admin.register(Testimonial)
class TestimonialAdmin(ModelAdmin):
    list_display = ["name", "role", "rating", "is_active", "order"]
    list_editable = ["is_active", "order"]
    list_filter = ["is_active", "rating"]
    fieldsets = (
        ("ქართული", {"fields": ("name", "role", "content", "avatar", "rating", "is_active", "order")}),
        ("English", {"fields": ("role_en", "content_en"), "classes": ("collapse",)}),
        ("Русский", {"fields": ("role_ru", "content_ru"), "classes": ("collapse",)}),
    )


@admin.register(FAQ)
class FAQAdmin(ModelAdmin):
    list_display = ["question", "is_active", "order"]
    list_editable = ["is_active", "order"]
    list_filter = ["is_active"]
    fieldsets = (
        ("ქართული", {"fields": ("question", "answer", "is_active", "order")}),
        ("English", {"fields": ("question_en", "answer_en"), "classes": ("collapse",)}),
        ("Русский", {"fields": ("question_ru", "answer_ru"), "classes": ("collapse",)}),
    )


@admin.register(Partner)
class PartnerAdmin(ModelAdmin):
    list_display = ["name", "url", "order"]
    list_editable = ["order"]
    ordering = ["order"]
