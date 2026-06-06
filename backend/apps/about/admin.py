from django.contrib import admin
from solo.admin import SingletonModelAdmin
from unfold.admin import ModelAdmin
from .models import AboutPage


@admin.register(AboutPage)
class AboutPageAdmin(SingletonModelAdmin, ModelAdmin):
    fieldsets = (
        ("Hero — ქართული", {"fields": ("hero_title", "hero_subtitle", "mission", "vision")}),
        ("Hero — English", {
            "fields": ("hero_title_en", "hero_subtitle_en", "mission_en", "vision_en"),
            "classes": ("collapse",),
        }),
        ("Hero — Русский", {
            "fields": ("hero_title_ru", "hero_subtitle_ru", "mission_ru", "vision_ru"),
            "classes": ("collapse",),
        }),
    )
