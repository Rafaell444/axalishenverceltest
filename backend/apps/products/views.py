from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import ProductCategory, Product
from .serializers import ProductCategorySerializer, ProductSerializer


class ProductCategoryListView(generics.ListAPIView):
    queryset = ProductCategory.objects.all()
    serializer_class = ProductCategorySerializer


class ProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ["category__slug", "is_featured"]
    search_fields = ["name", "description"]
    ordering_fields = ["price", "rating", "created_at"]
    ordering = ["-created_at"]

    def get_queryset(self):
        return Product.objects.filter(is_active=True).select_related("category")

    def get_serializer_context(self):
        return {"request": self.request}


class ProductDetailView(generics.RetrieveAPIView):
    serializer_class = ProductSerializer
    lookup_field = "slug"

    def get_queryset(self):
        return Product.objects.filter(is_active=True).select_related("category")

    def get_serializer_context(self):
        return {"request": self.request}
