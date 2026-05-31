from django.db import models
from django.utils.text import slugify
from ckeditor.fields import RichTextField


class Service(models.Model):
    title = models.CharField("სათაური", max_length=200)
    slug = models.SlugField("Slug", max_length=200, unique=True, blank=True)
    icon = models.CharField(
        "ხატულა (lucide icon name)", max_length=50, default="Stethoscope",
        help_text="lucide-react ხატულის სახელი, მაგ: Brain, Shield, Activity",
    )
    image = models.ImageField("სურათი", upload_to="services/", blank=True, null=True)
    short_description = models.CharField("მოკლე აღწერა", max_length=300)
    full_description = RichTextField("სრული აღწერა", blank=True)
    duration = models.CharField("ხანგრძლივობა", max_length=100, blank=True, help_text="მაგ: 30-60 წუთი")
    price = models.CharField("ფასი", max_length=100, blank=True, default="კონსულტაციით")
    is_featured = models.BooleanField("გამოსახული", default=False)
    is_active = models.BooleanField("აქტიური", default=True)
    order = models.PositiveIntegerField("თანმიმდევრობა", default=0)

    class Meta:
        verbose_name = "სერვისი"
        verbose_name_plural = "სერვისები"
        ordering = ["order"]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title, allow_unicode=False) or f"service-{self.pk or 1}"
        super().save(*args, **kwargs)


class ServiceFeature(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name="features", verbose_name="სერვისი")
    text = models.CharField("ტექსტი", max_length=200)

    class Meta:
        verbose_name = "სერვისის მახასიათებელი"
        verbose_name_plural = "სერვისის მახასიათებლები"

    def __str__(self):
        return self.text
