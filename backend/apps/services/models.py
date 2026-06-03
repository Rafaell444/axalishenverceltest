from django.db import models
from django.utils.text import slugify
from ckeditor.fields import RichTextField


class Service(models.Model):
    title = models.CharField("სათაური (ქა)", max_length=200)
    title_en = models.CharField("სათაური (EN)", max_length=200, blank=True)
    title_ru = models.CharField("სათაური (RU)", max_length=200, blank=True)
    slug = models.SlugField("Slug", max_length=200, unique=True, blank=True)
    icon = models.CharField("ხატულა (lucide icon name)", max_length=50, default="Stethoscope",
        help_text="lucide-react ხატულის სახელი, მაგ: Brain, Shield, Activity")
    image = models.ImageField("სურათი", upload_to="services/", blank=True, null=True)
    short_description = models.CharField("მოკლე აღწერა (ქა)", max_length=300)
    short_description_en = models.CharField("მოკლე აღწერა (EN)", max_length=300, blank=True)
    short_description_ru = models.CharField("მოკლე აღწერა (RU)", max_length=300, blank=True)
    full_description = RichTextField("სრული აღწერა (ქა)", blank=True)
    full_description_en = RichTextField("სრული აღწერა (EN)", blank=True)
    full_description_ru = RichTextField("სრული აღწერა (RU)", blank=True)
    duration = models.CharField("ხანგრძლივობა", max_length=100, blank=True)
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
    text = models.CharField("ტექსტი (ქა)", max_length=200)
    text_en = models.CharField("ტექსტი (EN)", max_length=200, blank=True)
    text_ru = models.CharField("ტექსტი (RU)", max_length=200, blank=True)

    class Meta:
        verbose_name = "სერვისის მახასიათებელი"
        verbose_name_plural = "სერვისის მახასიათებლები"

    def __str__(self):
        return self.text
