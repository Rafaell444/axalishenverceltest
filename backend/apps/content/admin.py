from django.contrib import admin
from solo.admin import SingletonModelAdmin
from unfold.admin import ModelAdmin
from apps.core.seo import SEO_FIELDSETS
from .models import HeroSection, Advantage, Testimonial, FAQ, Partner


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
        ("მედია", {"fields": ("image",)}),
        *SEO_FIELDSETS,
    )


@admin.register(Advantage)
class AdvantageAdmin(ModelAdmin):
    list_display = ["title", "slug", "is_active", "order"]
    list_editable = ["is_active", "order"]
    list_filter = ["is_active"]
    search_fields = ["title", "short_description"]
    prepopulated_fields = {"slug": ("title",)}
    fieldsets = (
        ("ძირითადი", {"fields": ("title", "slug", "icon", "is_active", "order")}),
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
