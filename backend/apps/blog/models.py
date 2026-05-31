from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone
from ckeditor_uploader.fields import RichTextUploadingField

User = get_user_model()


class BlogCategory(models.Model):
    name = models.CharField("სახელი", max_length=100)
    slug = models.SlugField("Slug", max_length=100, unique=True)

    class Meta:
        verbose_name = "კატეგორია"
        verbose_name_plural = "კატეგორიები"
        ordering = ["name"]

    def __str__(self):
        return self.name


class BlogPost(models.Model):
    title = models.CharField("სათაური", max_length=300)
    slug = models.SlugField("Slug", max_length=300, unique=True)
    excerpt = models.TextField("მოკლე შინაარსი", max_length=500)
    body = RichTextUploadingField("სტატიის ტექსტი")
    featured_image = models.ImageField("მთავარი სურათი", upload_to="blog/", blank=True, null=True)
    category = models.ForeignKey(
        BlogCategory, on_delete=models.SET_NULL, null=True, blank=True,
        related_name="posts", verbose_name="კატეგორია",
    )
    author = models.ForeignKey(
        User, on_delete=models.SET_NULL, null=True, blank=True,
        related_name="blog_posts", verbose_name="ავტორი",
    )
    is_published = models.BooleanField("გამოქვეყნებული", default=False)
    is_featured = models.BooleanField("გამოსახული", default=False)
    published_at = models.DateTimeField("გამოქვეყნების თარიღი", default=timezone.now)
    created_at = models.DateTimeField("შექმნის თარიღი", auto_now_add=True)
    updated_at = models.DateTimeField("განახლების თარიღი", auto_now=True)

    class Meta:
        verbose_name = "სტატია"
        verbose_name_plural = "სტატიები"
        ordering = ["-published_at"]

    def __str__(self):
        return self.title
