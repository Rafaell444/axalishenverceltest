from django.contrib import admin
from unfold.admin import ModelAdmin
from .models import ProductCategory, Product


@admin.register(ProductCategory)
class ProductCategoryAdmin(ModelAdmin):
    list_display = ["name", "slug", "icon"]
    prepopulated_fields = {"slug": ("name",)}
    search_fields = ["name"]


@admin.register(Product)
class ProductAdmin(ModelAdmin):
    list_display = ["name", "category", "price", "sale_price", "stock_count", "is_active", "is_featured"]
    list_editable = ["is_active", "is_featured", "stock_count"]
    list_filter = ["is_active", "is_featured", "category"]
    search_fields = ["name", "description"]
    prepopulated_fields = {"slug": ("name",)}
    fieldsets = (
        ("ძირითადი", {"fields": ("name", "slug", "category", "image", "is_active", "is_featured")}),
        ("შინაარსი", {"fields": ("description",)}),
        ("ფასი და მარაგი", {"fields": ("price", "sale_price", "stock_count", "rating")}),
    )
