from django.db import models
from solo.models import SingletonModel
from .seo import SeoFields


class SiteSettings(SingletonModel):
    site_name = models.CharField("საიტის სახელი", max_length=100, default="ახალი შენ")
    tagline = models.CharField("სლოგანი (KA)", max_length=200, default="ახალი შენ – ახალი ცხოვრება")
    tagline_en = models.CharField("სლოგანი (EN)", max_length=200, blank=True)
    tagline_ru = models.CharField("სლოგანი (RU)", max_length=200, blank=True)
    logo = models.ImageField("ლოგო", upload_to="site/", blank=True, null=True)
    favicon = models.ImageField("Favicon", upload_to="site/", blank=True, null=True)
    announcement_text = models.CharField(
        "განცხადება (KA) (header banner)", max_length=300, blank=True,
        help_text="ცარიელი = banner არ გამოჩნდება",
    )
    announcement_text_en = models.CharField(
        "განცხადება (EN)", max_length=300, blank=True,
    )
    announcement_text_ru = models.CharField(
        "განცხადება (RU)", max_length=300, blank=True,
    )

    primary_phone = models.CharField("მთავარი ტელეფონი", max_length=30, default="+995 555 123 456")
    secondary_phone = models.CharField("დამატებითი ტელეფონი", max_length=30, blank=True)
    emergency_phone = models.CharField("გადაუდებელი ხაზი", max_length=30, default="+995 322 911 911")
    email = models.EmailField("ელ-ფოსტა", default="info@akhalishen.ge")
    support_email = models.EmailField("მხარდაჭერის ელ-ფოსტა", blank=True)

    address_line1 = models.CharField("მისამართი 1", max_length=200, default="რუსთაველის გამზ. 24")
    address_line2 = models.CharField("მისამართი 2", max_length=200, blank=True, default="თბილისი, საქართველო")
    google_maps_embed = models.TextField("Google Maps embed URL", blank=True)

    working_hours_weekdays = models.CharField(
        "სამუშაო საათები (ორ-პარ)", max_length=100, default="09:00 - 19:00"
    )
    working_hours_saturday = models.CharField(
        "სამუშაო საათები (შაბ)", max_length=100, default="10:00 - 15:00"
    )
    working_hours_sunday = models.CharField(
        "სამუშაო საათები (კვი)", max_length=100, blank=True, default="დახურულია"
    )

    facebook_url = models.URLField("Facebook", blank=True)
    instagram_url = models.URLField("Instagram", blank=True)
    youtube_url = models.URLField("YouTube", blank=True)

    class Meta:
        verbose_name = "საიტის პარამეტრები"
        verbose_name_plural = "საიტის პარამეტრები"

    def __str__(self):
        return "საიტის პარამეტრები"


class PageSEO(SeoFields, models.Model):
    PAGE_CHOICES = [
        ("contact", "კონტაქტი"),
        ("products", "პროდუქტები"),
        ("services", "სერვისები"),
        ("blog", "ბლოგი"),
        ("faq", "FAQ"),
        ("certifications", "სერტიფიკაცია"),
        ("safety", "უსაფრთხოება"),
        ("production", "წარმოება"),
    ]

    page_key = models.CharField("გვერდი", max_length=50, choices=PAGE_CHOICES, unique=True)

    class Meta:
        verbose_name = "გვერდის SEO"
        verbose_name_plural = "გვერდების SEO"
        ordering = ["page_key"]

    def __str__(self):
        return dict(self.PAGE_CHOICES).get(self.page_key, self.page_key)
