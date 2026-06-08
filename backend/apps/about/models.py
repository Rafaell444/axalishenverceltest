from django.db import models
from solo.models import SingletonModel
from apps.core.seo import SeoFields


class AboutPage(SeoFields, SingletonModel):
    hero_title = models.CharField("სათაური — თეთრი (ქა)", max_length=200, default="ჩვენს")
    hero_title_highlight = models.CharField("სათაური — ოქროსფერი (ქა)", max_length=200, default="შესახებ")
    hero_title_en = models.CharField("სათაური — თეთრი (EN)", max_length=200, blank=True, default="About")
    hero_title_highlight_en = models.CharField("სათაური — ოქროსფერი (EN)", max_length=200, blank=True, default="Us")
    hero_title_ru = models.CharField("სათაური — თეთრი (RU)", max_length=200, blank=True, default="О")
    hero_title_highlight_ru = models.CharField("სათაური — ოქროსფერი (RU)", max_length=200, blank=True, default="нас")
    hero_subtitle = models.CharField("Hero ქვესათაური (ქა)", max_length=300, blank=True)
    hero_subtitle_en = models.CharField("Hero ქვესათაური (EN)", max_length=300, blank=True)
    hero_subtitle_ru = models.CharField("Hero ქვესათაური (RU)", max_length=300, blank=True)
    mission = models.TextField("მისია (ქა)", blank=True)
    mission_en = models.TextField("მისია (EN)", blank=True)
    mission_ru = models.TextField("მისია (RU)", blank=True)
    vision = models.TextField("ვიზია (ქა)", blank=True)
    vision_en = models.TextField("ვიზია (EN)", blank=True)
    vision_ru = models.TextField("ვიზია (RU)", blank=True)
    image = models.ImageField("სურათი", upload_to="about/", blank=True, null=True)
    video = models.FileField("ვიდეო", upload_to="about/videos/", blank=True, null=True,
        help_text="MP4 ფაილი. თუ ვიდეო ატვირთულია, სურათი არ გამოჩნდება.")

    class Meta:
        verbose_name = "გვერდის კონტენტი"
        verbose_name_plural = "გვერდის კონტენტი"

    def __str__(self):
        return "გვერდის კონტენტი"


class CompanyValue(models.Model):
    icon = models.CharField("ხატულა (lucide icon name)", max_length=50, default="Heart")
    title = models.CharField("სათაური (ქა)", max_length=100)
    title_en = models.CharField("სათაური (EN)", max_length=100, blank=True)
    title_ru = models.CharField("სათაური (RU)", max_length=100, blank=True)
    description = models.TextField("აღწერა (ქა)")
    description_en = models.TextField("აღწერა (EN)", blank=True)
    description_ru = models.TextField("აღწერა (RU)", blank=True)
    order = models.PositiveIntegerField("თანმიმდევრობა", default=0)

    class Meta:
        verbose_name = "ღირებულება"
        verbose_name_plural = "ღირებულებები"
        ordering = ["order"]

    def __str__(self):
        return self.title


class TeamMember(models.Model):
    name = models.CharField("სახელი", max_length=200)
    role = models.CharField("პოზიცია (ქა)", max_length=200)
    role_en = models.CharField("პოზიცია (EN)", max_length=200, blank=True)
    role_ru = models.CharField("პოზიცია (RU)", max_length=200, blank=True)
    bio = models.TextField("ბიოგრაფია (ქა)", blank=True)
    bio_en = models.TextField("ბიოგრაფია (EN)", blank=True)
    bio_ru = models.TextField("ბიოგრაფია (RU)", blank=True)
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
    title = models.CharField("სათაური (ქა)", max_length=200)
    title_en = models.CharField("სათაური (EN)", max_length=200, blank=True)
    title_ru = models.CharField("სათაური (RU)", max_length=200, blank=True)
    description = models.TextField("აღწერა (ქა)", blank=True)
    description_en = models.TextField("აღწერა (EN)", blank=True)
    description_ru = models.TextField("აღწერა (RU)", blank=True)
    order = models.PositiveIntegerField("თანმიმდევრობა", default=0)

    class Meta:
        verbose_name = "ისტორიის ჩანაწერი"
        verbose_name_plural = "კომპანიის ისტორია"
        ordering = ["order"]

    def __str__(self):
        return f"{self.year} — {self.title}"


class Certification(models.Model):
    title = models.CharField("სათაური (ქა)", max_length=200)
    title_en = models.CharField("სათაური (EN)", max_length=200, blank=True)
    title_ru = models.CharField("სათაური (RU)", max_length=200, blank=True)
    description = models.TextField("აღწერა (ქა)", blank=True)
    description_en = models.TextField("აღწერა (EN)", blank=True)
    description_ru = models.TextField("აღწერა (RU)", blank=True)
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
