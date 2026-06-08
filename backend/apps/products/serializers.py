from rest_framework import serializers
from apps.core.seo_serializers import SeoSerializerMixin
from .models import ProductCategory, Product


def t(obj, field, lang):
    if lang and lang != "ka":
        val = getattr(obj, f"{field}_{lang}", None)
        if val:
            return val
    return getattr(obj, field, "") or ""


class ProductCategorySerializer(serializers.ModelSerializer):
    product_count = serializers.SerializerMethodField()
    name = serializers.SerializerMethodField()

    class Meta:
        model = ProductCategory
        fields = ["id", "name", "slug", "icon", "product_count"]

    def _lang(self):
        request = self.context.get("request")
        return request.query_params.get("lang", "ka") if request else "ka"

    def get_name(self, obj): return t(obj, "name", self._lang())

    def get_product_count(self, obj):
        return obj.products.filter(is_active=True).count()


class ProductSerializer(SeoSerializerMixin, serializers.ModelSerializer):
    category = ProductCategorySerializer(read_only=True)
    image_url = serializers.SerializerMethodField()
    in_stock = serializers.BooleanField(read_only=True)
    effective_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    name = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            "id", "name", "slug", "description",
            "price", "sale_price", "effective_price",
            "category", "image_url",
            "rating", "stock_count", "in_stock",
            "is_featured", "meta_title", "meta_description",
        ]

    def _lang(self):
        request = self.context.get("request")
        return request.query_params.get("lang", "ka") if request else "ka"

    def get_name(self, obj): return t(obj, "name", self._lang())
    def get_description(self, obj): return t(obj, "description", self._lang())

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get("request")
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return None
