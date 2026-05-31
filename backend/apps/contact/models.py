from django.db import models


class ContactMessage(models.Model):
    name = models.CharField("სახელი", max_length=200)
    email = models.EmailField("ელ-ფოსტა", blank=True)
    phone = models.CharField("ტელეფონი", max_length=30)
    service = models.CharField("სერვისი", max_length=200, blank=True)
    message = models.TextField("შეტყობინება", blank=True)
    submitted_at = models.DateTimeField("გაგზავნის თარიღი", auto_now_add=True)
    is_read = models.BooleanField("წაკითხული", default=False)

    class Meta:
        verbose_name = "შეტყობინება"
        verbose_name_plural = "შეტყობინებები"
        ordering = ["-submitted_at"]

    def __str__(self):
        return f"{self.name} — {self.submitted_at:%Y-%m-%d %H:%M}"


class Consultation(models.Model):
    STATUS_CHOICES = [
        ("new", "ახალი"),
        ("contacted", "დაკავშირებული"),
        ("scheduled", "ჩანიშნული"),
        ("completed", "დასრულებული"),
        ("cancelled", "გაუქმებული"),
    ]

    patient_name = models.CharField("პაციენტის სახელი", max_length=200)
    phone = models.CharField("ტელეფონი", max_length=30)
    email = models.EmailField("ელ-ფოსტა", blank=True)
    service = models.CharField("სერვისი", max_length=200, blank=True)
    preferred_date = models.DateTimeField("სასურველი თარიღი", blank=True, null=True)
    notes = models.TextField("შენიშვნა", blank=True)
    status = models.CharField("სტატუსი", max_length=20, choices=STATUS_CHOICES, default="new")
    created_at = models.DateTimeField("შექმნის თარიღი", auto_now_add=True)
    updated_at = models.DateTimeField("განახლების თარიღი", auto_now=True)

    class Meta:
        verbose_name = "კონსულტაცია"
        verbose_name_plural = "კონსულტაციები"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.patient_name} — {self.status}"


class NewsletterSubscriber(models.Model):
    email = models.EmailField("ელ-ფოსტა", unique=True)
    subscribed_at = models.DateTimeField("გამოწერის თარიღი", auto_now_add=True)
    is_active = models.BooleanField("აქტიური", default=True)

    class Meta:
        verbose_name = "Newsletter გამომწერი"
        verbose_name_plural = "Newsletter გამომწერები"
        ordering = ["-subscribed_at"]

    def __str__(self):
        return self.email
