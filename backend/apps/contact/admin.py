from django.contrib import admin
from unfold.admin import ModelAdmin
from .models import ContactMessage, Consultation, NewsletterSubscriber


@admin.register(ContactMessage)
class ContactMessageAdmin(ModelAdmin):
    list_display = ["name", "phone", "email", "service", "submitted_at", "is_read"]
    list_editable = ["is_read"]
    list_filter = ["is_read", "service"]
    search_fields = ["name", "email", "phone", "message"]
    readonly_fields = ["name", "email", "phone", "service", "message", "submitted_at"]
    ordering = ["-submitted_at"]

    def has_add_permission(self, request):
        return False


@admin.register(Consultation)
class ConsultationAdmin(ModelAdmin):
    list_display = ["patient_name", "phone", "email", "service", "status", "preferred_date", "created_at"]
    list_editable = ["status"]
    list_filter = ["status", "service"]
    search_fields = ["patient_name", "phone", "email"]
    ordering = ["-created_at"]
    fieldsets = (
        ("პაციენტი", {"fields": ("patient_name", "phone", "email")}),
        ("მოთხოვნა", {"fields": ("service", "preferred_date", "notes")}),
        ("სტატუსი", {"fields": ("status",)}),
    )


@admin.register(NewsletterSubscriber)
class NewsletterSubscriberAdmin(ModelAdmin):
    list_display = ["email", "subscribed_at", "is_active"]
    list_editable = ["is_active"]
    list_filter = ["is_active"]
    search_fields = ["email"]
    readonly_fields = ["email", "subscribed_at"]

    def has_add_permission(self, request):
        return False
