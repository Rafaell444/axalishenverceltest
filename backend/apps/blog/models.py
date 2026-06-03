from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone
from ckeditor_uploader.fields import RichTextUploadingField

User = get_user_model()


class BlogCategory(models.Model):
    name = models.CharField("სახელი (ქა)", max_length=100)
    name_en = models.CharField("სახელი (EN)", max_length=100, blank=True)
    name_ru = models.CharField("სახელი (RU)", max_length=100, blank=True)
    slug = models.SlugField("Slug", max_length=100, unique=True)

    class Meta:
        verbose_name = "კატეგორია"
        verbose_name_plural = "კატეგორიები"
        ordering = ["name"]

    def __str__(self):
        return self.name


class BlogPost(models.Model):
    title = models.CharField("სათაური (ქა)", max_length=300)
    title_en = models.CharField("სათაური (EN)", max_length=300, blank=True)
    title_ru = models.CharField("სათაური (RU)", max_length=300, blank=True)
    slug = models.SlugField("Slug", max_length=300, unique=True)
    excerpt = models.TextField("მოკლე შინაარსი (ქა)", max_length=500)
    excerpt_en = models.TextField("მოკლე შინაარსი (EN)", max_length=500, blank=True)
    excerpt_ru = models.TextField("მოკლე შინაარსი (RU)", max_length=500, blank=True)
    body = RichTextUploadingField("სტატიის ტექსტი (ქა)")
    body_en = RichTextUploadingField("სტატიის ტექსტი (EN)", blank=True)
    body_ru = RichTextUploadingField("სტატიის ტექსტი (RU)", blank=True)
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
