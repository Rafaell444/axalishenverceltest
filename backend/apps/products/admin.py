from django.contrib import admin
from unfold.admin import ModelAdmin
from apps.core.seo import SEO_FIELDSETS
from .models import ProductCategory, Product


@admin.register(ProductCategory)
class ProductCategoryAdmin(ModelAdmin):
    list_display = ["name", "slug", "icon"]
    prepopulated_fields = {"slug": ("name",)}
    search_fields = ["name"]
    fieldsets = (
        ("ქართული", {"fields": ("name", "slug", "icon")}),
        ("English", {"fields": ("name_en",), "classes": ("collapse",)}),
        ("Русский", {"fields": ("name_ru",), "classes": ("collapse",)}),
    )


@admin.register(Product)
class ProductAdmin(ModelAdmin):
    list_display = ["name", "category", "price", "sale_price", "stock_count", "is_active", "is_featured"]
    list_editable = ["is_active", "is_featured", "stock_count"]
    list_filter = ["is_active", "is_featured", "category"]
    search_fields = ["name", "description"]
    prepopulated_fields = {"slug": ("name",)}
    fieldsets = (
        ("ძირითადი", {"fields": ("name", "slug", "category", "image", "is_active", "is_featured")}),
        ("შინაარსი — ქართული", {"fields": ("description",)}),
        ("შინაარსი — English", {
            "fields": ("name_en", "description_en"),
            "classes": ("collapse",),
        }),
        ("შინაარსი — Русский", {
            "fields": ("name_ru", "description_ru"),
            "classes": ("collapse",),
        }),
        ("ფასი და მარაგი", {"fields": ("price", "sale_price", "stock_count", "rating")}),
        *SEO_FIELDSETS,
    )
