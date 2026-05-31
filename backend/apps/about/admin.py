from django.contrib import admin
from solo.admin import SingletonModelAdmin
from unfold.admin import ModelAdmin
from .models import AboutPage, CompanyValue, TeamMember, CompanyTimeline, Certification


@admin.register(AboutPage)
class AboutPageAdmin(SingletonModelAdmin, ModelAdmin):
    fieldsets = (
        ("Hero", {"fields": ("hero_title", "hero_subtitle")}),
        ("კომპანია", {"fields": ("mission", "vision")}),
    )


@admin.register(CompanyValue)
class CompanyValueAdmin(ModelAdmin):
    list_display = ["title", "icon", "order"]
    list_editable = ["order"]
    ordering = ["order"]


@admin.register(TeamMember)
class TeamMemberAdmin(ModelAdmin):
    list_display = ["name", "role", "order"]
    list_editable = ["order"]
    ordering = ["order"]


@admin.register(CompanyTimeline)
class CompanyTimelineAdmin(ModelAdmin):
    list_display = ["year", "title", "order"]
    list_editable = ["order"]
    ordering = ["order"]


@admin.register(Certification)
class CertificationAdmin(ModelAdmin):
    list_display = ["title", "issued_by", "issued_year", "order"]
    list_editable = ["order"]
    ordering = ["order"]
