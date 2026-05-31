from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import BlogCategory, BlogPost
from .serializers import BlogCategorySerializer, BlogPostListSerializer, BlogPostDetailSerializer


class BlogCategoryListView(generics.ListAPIView):
    queryset = BlogCategory.objects.all()
    serializer_class = BlogCategorySerializer


class BlogPostListView(generics.ListAPIView):
    serializer_class = BlogPostListSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ["category__slug", "is_featured"]
    search_fields = ["title", "excerpt"]
    ordering_fields = ["published_at"]
    ordering = ["-published_at"]

    def get_queryset(self):
        return BlogPost.objects.filter(is_published=True).select_related("category", "author")

    def get_serializer_context(self):
        return {"request": self.request}


class BlogPostDetailView(generics.RetrieveAPIView):
    serializer_class = BlogPostDetailSerializer
    lookup_field = "slug"

    def get_queryset(self):
        return BlogPost.objects.filter(is_published=True).select_related("category", "author")

    def get_serializer_context(self):
        return {"request": self.request}
