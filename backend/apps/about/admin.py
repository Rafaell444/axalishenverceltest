from django.contrib import admin
from solo.admin import SingletonModelAdmin
from unfold.admin import ModelAdmin
from apps.core.seo import SEO_FIELDSETS
from .models import AboutPage


@admin.register(AboutPage)
class AboutPageAdmin(SingletonModelAdmin, ModelAdmin):
    fieldsets = (
        ("მედია", {
            "fields": ("image", "video"),
            "description": "ატვირთეთ სურათი ან ვიდეო (MP4). ვიდეო პრიორიტეტულია.",
        }),
        ("ქართული", {
            "fields": ("hero_title", "hero_title_highlight", "hero_subtitle", "mission", "vision"),
            "description": "სათაური ორ ნაწილად (თეთრი + ოქროსფერი), შემდეგ სამი პარაგრაფი.",
        }),
        ("English", {
            "fields": ("hero_title_en", "hero_title_highlight_en", "hero_subtitle_en", "mission_en", "vision_en"),
            "classes": ("collapse",),
        }),
        ("Русский", {
            "fields": ("hero_title_ru", "hero_title_highlight_ru", "hero_subtitle_ru", "mission_ru", "vision_ru"),
            "classes": ("collapse",),
        }),
        *SEO_FIELDSETS,
    )
