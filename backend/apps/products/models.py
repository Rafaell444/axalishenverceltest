from django.db import models
from django.utils.text import slugify


class ProductCategory(models.Model):
    name = models.CharField("სახელი (ქა)", max_length=100)
    name_en = models.CharField("სახელი (EN)", max_length=100, blank=True)
    name_ru = models.CharField("სახელი (RU)", max_length=100, blank=True)
    slug = models.SlugField("Slug", max_length=100, unique=True)
    icon = models.CharField("ხატულა", max_length=50, blank=True)

    class Meta:
        verbose_name = "კატეგორია"
        verbose_name_plural = "კატეგორიები"
        ordering = ["name"]

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField("სახელი (ქა)", max_length=300)
    name_en = models.CharField("სახელი (EN)", max_length=300, blank=True)
    name_ru = models.CharField("სახელი (RU)", max_length=300, blank=True)
    slug = models.SlugField("Slug", max_length=300, unique=True, blank=True)
    description = models.TextField("აღწერა (ქა)", blank=True)
    description_en = models.TextField("აღწერა (EN)", blank=True)
    description_ru = models.TextField("აღწერა (RU)", blank=True)
    price = models.DecimalField("ფასი", max_digits=10, decimal_places=2)
    sale_price = models.DecimalField("სარეალიზაციო ფასი", max_digits=10, decimal_places=2, blank=True, null=True)
    category = models.ForeignKey(
        ProductCategory, on_delete=models.SET_NULL, null=True, blank=True,
        related_name="products", verbose_name="კატეგორია",
    )
    image = models.ImageField("სურათი", upload_to="products/", blank=True, null=True)
    rating = models.DecimalField("შეფასება", max_digits=3, decimal_places=1, default=5.0)
    stock_count = models.PositiveIntegerField("მარაგი", default=0)
    is_active = models.BooleanField("აქტიური", default=True)
    is_featured = models.BooleanField("გამოსახული", default=False)
    created_at = models.DateTimeField("შექმნის თარიღი", auto_now_add=True)

    class Meta:
        verbose_name = "პროდუქტი"
        verbose_name_plural = "პროდუქტები"
        ordering = ["-created_at"]

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name, allow_unicode=False) or f"product-{self.pk or 1}"
        super().save(*args, **kwargs)

    @property
    def in_stock(self):
        return self.stock_count > 0

    @property
    def effective_price(self):
        return self.sale_price if self.sale_price else self.price
