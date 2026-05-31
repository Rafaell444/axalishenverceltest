from rest_framework import serializers
from .models import ProductCategory, Product


class ProductCategorySerializer(serializers.ModelSerializer):
    product_count = serializers.SerializerMethodField()

    class Meta:
        model = ProductCategory
        fields = ["id", "name", "slug", "icon", "product_count"]

    def get_product_count(self, obj):
        return obj.products.filter(is_active=True).count()


class ProductSerializer(serializers.ModelSerializer):
    category = ProductCategorySerializer(read_only=True)
    image_url = serializers.SerializerMethodField()
    in_stock = serializers.BooleanField(read_only=True)
    effective_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = Product
        fields = [
            "id", "name", "slug", "description",
            "price", "sale_price", "effective_price",
            "category", "image_url",
            "rating", "stock_count", "in_stock",
            "is_featured",
        ]

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get("request")
            return request.build_absolute_uri(obj.image.url) if request else obj.image.url
        return None
