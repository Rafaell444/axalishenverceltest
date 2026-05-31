from django.urls import path
from . import views

urlpatterns = [
    path("blog/categories/", views.BlogCategoryListView.as_view(), name="blog-categories"),
    path("blog/posts/", views.BlogPostListView.as_view(), name="blog-posts"),
    path("blog/posts/<slug:slug>/", views.BlogPostDetailView.as_view(), name="blog-post-detail"),
]
