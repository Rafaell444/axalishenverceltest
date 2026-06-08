from django.db import models

SEO_FIELDSET_KA = ("SEO — ქართული", {"fields": ("meta_title", "meta_description")})
SEO_FIELDSET_EN = (
    "SEO — English",
    {"fields": ("meta_title_en", "meta_description_en"), "classes": ("collapse",)},
)
SEO_FIELDSET_RU = (
    "SEO — Русский",
    {"fields": ("meta_title_ru", "meta_description_ru"), "classes": ("collapse",)},
)
SEO_FIELDSETS = [SEO_FIELDSET_KA, SEO_FIELDSET_EN, SEO_FIELDSET_RU]


class SeoFields(models.Model):
    meta_title = models.CharField("SEO სათაური (ქა)", max_length=70, blank=True)
    meta_title_en = models.CharField("SEO სათაური (EN)", max_length=70, blank=True)
    meta_title_ru = models.CharField("SEO სათაური (RU)", max_length=70, blank=True)
    meta_description = models.CharField("SEO აღწერა (ქა)", max_length=160, blank=True)
    meta_description_en = models.CharField("SEO აღწერა (EN)", max_length=160, blank=True)
    meta_description_ru = models.CharField("SEO აღწერა (RU)", max_length=160, blank=True)

    class Meta:
        abstract = True
