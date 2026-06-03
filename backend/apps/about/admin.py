from django.contrib import admin
from solo.admin import SingletonModelAdmin
from unfold.admin import ModelAdmin
from .models import AboutPage, CompanyValue, TeamMember, CompanyTimeline, Certification


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


@admin.register(CompanyValue)
class CompanyValueAdmin(ModelAdmin):
    list_display = ["title", "icon", "order"]
    list_editable = ["order"]
    ordering = ["order"]
    fieldsets = (
        ("ქართული", {"fields": ("icon", "title", "description", "order")}),
        ("English", {"fields": ("title_en", "description_en"), "classes": ("collapse",)}),
        ("Русский", {"fields": ("title_ru", "description_ru"), "classes": ("collapse",)}),
    )


@admin.register(TeamMember)
class TeamMemberAdmin(ModelAdmin):
    list_display = ["name", "role", "order"]
    list_editable = ["order"]
    ordering = ["order"]
    fieldsets = (
        ("ქართული", {"fields": ("name", "role", "bio", "photo", "order")}),
        ("English", {"fields": ("role_en", "bio_en"), "classes": ("collapse",)}),
        ("Русский", {"fields": ("role_ru", "bio_ru"), "classes": ("collapse",)}),
    )


@admin.register(CompanyTimeline)
class CompanyTimelineAdmin(ModelAdmin):
    list_display = ["year", "title", "order"]
    list_editable = ["order"]
    ordering = ["order"]
    fieldsets = (
        ("ქართული", {"fields": ("year", "title", "description", "order")}),
        ("English", {"fields": ("title_en", "description_en"), "classes": ("collapse",)}),
        ("Русский", {"fields": ("title_ru", "description_ru"), "classes": ("collapse",)}),
    )


@admin.register(Certification)
class CertificationAdmin(ModelAdmin):
    list_display = ["title", "issued_by", "issued_year", "order"]
    list_editable = ["order"]
    ordering = ["order"]
    fieldsets = (
        ("ქართული", {"fields": ("title", "description", "image", "issued_by", "issued_year", "order")}),
        ("English", {"fields": ("title_en", "description_en"), "classes": ("collapse",)}),
        ("Русский", {"fields": ("title_ru", "description_ru"), "classes": ("collapse",)}),
    )
