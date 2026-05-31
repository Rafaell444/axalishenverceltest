from django.contrib import admin
from solo.admin import SingletonModelAdmin
from unfold.admin import ModelAdmin
from .models import HeroSection, Feature, Stat, ProcessStep, Testimonial, Achievement, Publication, FAQ, Partner


@admin.register(HeroSection)
class HeroSectionAdmin(SingletonModelAdmin, ModelAdmin):
    fieldsets = (
        ("ტექსტი", {"fields": ("title", "title_highlight", "description")}),
        ("ღილაკები", {"fields": ("cta_primary_text", "cta_primary_link", "cta_secondary_text", "cta_secondary_link")}),
        ("მედია", {"fields": ("image",)}),
    )


@admin.register(Feature)
class FeatureAdmin(ModelAdmin):
    list_display = ["title", "icon", "order"]
    list_editable = ["order"]
    ordering = ["order"]


@admin.register(Stat)
class StatAdmin(ModelAdmin):
    list_display = ["value", "label", "order"]
    list_editable = ["order"]
    ordering = ["order"]


@admin.register(ProcessStep)
class ProcessStepAdmin(ModelAdmin):
    list_display = ["step_number", "title", "order"]
    list_editable = ["order"]
    ordering = ["order"]


@admin.register(Testimonial)
class TestimonialAdmin(ModelAdmin):
    list_display = ["name", "role", "rating", "is_active", "order"]
    list_editable = ["is_active", "order"]
    list_filter = ["is_active", "rating"]


@admin.register(Achievement)
class AchievementAdmin(ModelAdmin):
    list_display = ["year", "title", "order"]
    list_editable = ["order"]
    ordering = ["order"]


@admin.register(Publication)
class PublicationAdmin(ModelAdmin):
    list_display = ["title", "journal", "date", "order"]
    list_editable = ["order"]
    ordering = ["order"]


@admin.register(FAQ)
class FAQAdmin(ModelAdmin):
    list_display = ["question", "is_active", "order"]
    list_editable = ["is_active", "order"]
    list_filter = ["is_active"]


@admin.register(Partner)
class PartnerAdmin(ModelAdmin):
    list_display = ["name", "url", "order"]
    list_editable = ["order"]
    ordering = ["order"]
