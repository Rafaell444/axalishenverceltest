from django.db import models
from solo.models import SingletonModel


class AboutPage(SingletonModel):
    hero_title = models.CharField("Hero სათაური", max_length=200, default="ჩვენ შესახებ")
    hero_subtitle = models.CharField("Hero ქვესათაური", max_length=300, blank=True)
    mission = models.TextField("მისია", blank=True)
    vision = models.TextField("ვიზია", blank=True)

    class Meta:
        verbose_name = "ჩვენ შესახებ გვერდი"
        verbose_name_plural = "ჩვენ შესახებ გვერდი"

    def __str__(self):
        return "ჩვენ შესახებ"


class CompanyValue(models.Model):
    icon = models.CharField("ხატულა (lucide icon name)", max_length=50, default="Heart")
    title = models.CharField("სათაური", max_length=100)
    description = models.TextField("აღწერა")
    order = models.PositiveIntegerField("თანმიმდევრობა", default=0)

    class Meta:
        verbose_name = "ღირებულება"
        verbose_name_plural = "ღირებულებები"
        ordering = ["order"]

    def __str__(self):
        return self.title


class TeamMember(models.Model):
    name = models.CharField("სახელი", max_length=200)
    role = models.CharField("პოზიცია", max_length=200)
    bio = models.TextField("ბიოგრაფია", blank=True)
    photo = models.ImageField("ფოტო", upload_to="team/", blank=True, null=True)
    order = models.PositiveIntegerField("თანმიმდევრობა", default=0)

    class Meta:
        verbose_name = "გუნდის წევრი"
        verbose_name_plural = "გუნდი"
        ordering = ["order"]

    def __str__(self):
        return f"{self.name} — {self.role}"


class CompanyTimeline(models.Model):
    year = models.CharField("წელი", max_length=10)
    title = models.CharField("სათაური", max_length=200)
    description = models.TextField("აღწერა", blank=True)
    order = models.PositiveIntegerField("თანმიმდევრობა", default=0)

    class Meta:
        verbose_name = "ისტორიის ჩანაწერი"
        verbose_name_plural = "კომპანიის ისტორია"
        ordering = ["order"]

    def __str__(self):
        return f"{self.year} — {self.title}"


class Certification(models.Model):
    title = models.CharField("სათაური", max_length=200)
    description = models.TextField("აღწერა", blank=True)
    image = models.ImageField("სერტიფიკატის სურათი", upload_to="certifications/", blank=True, null=True)
    issued_by = models.CharField("გამცემი ორგანიზაცია", max_length=200, blank=True)
    issued_year = models.CharField("გაცემის წელი", max_length=10, blank=True)
    order = models.PositiveIntegerField("თანმიმდევრობა", default=0)

    class Meta:
        verbose_name = "სერტიფიკატი"
        verbose_name_plural = "სერტიფიკატები"
        ordering = ["order"]

    def __str__(self):
        return self.title
