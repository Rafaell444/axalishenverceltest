from django.db import models
from solo.models import SingletonModel


class HeroSection(SingletonModel):
    title = models.CharField("სათაური (ქა)", max_length=200, default="ახალი შენ –")
    title_en = models.CharField("სათაური (EN)", max_length=200, blank=True)
    title_ru = models.CharField("სათაური (RU)", max_length=200, blank=True)
    title_highlight = models.CharField("გამოკვეთილი ტექსტი (ქა)", max_length=200, default="ახალი ცხოვრება")
    title_highlight_en = models.CharField("გამოკვეთილი ტექსტი (EN)", max_length=200, blank=True)
    title_highlight_ru = models.CharField("გამოკვეთილი ტექსტი (RU)", max_length=200, blank=True)
    description = models.TextField("აღწერა (ქა)", default="ჩვენი მიზანია დაგეხმაროთ.")
    description_en = models.TextField("აღწერა (EN)", blank=True)
    description_ru = models.TextField("აღწერა (RU)", blank=True)
    cta_primary_text = models.CharField("ღილაკი 1 ტექსტი", max_length=100, default="დაგვიკავშირდით")
    cta_primary_link = models.CharField("ღილაკი 1 ბმული", max_length=200, default="/contact")
    cta_secondary_text = models.CharField("ღილაკი 2 ტექსტი", max_length=100, default="გაიგე მეტი")
    cta_secondary_link = models.CharField("ღილაკი 2 ბმული", max_length=200, default="/about")
    image = models.ImageField("სურათი", upload_to="hero/", blank=True, null=True)

    class Meta:
        verbose_name = "Hero სექცია"
        verbose_name_plural = "Hero სექცია"

    def __str__(self):
        return "Hero სექცია"


class Feature(models.Model):
    icon = models.CharField("ხატულა (lucide icon name)", max_length=50, default="Shield",
        help_text="lucide-react ხატულის სახელი, მაგ: Shield, Clock, Users")
    color = models.CharField("ფერის კლასი (Tailwind gradient)", max_length=100,
        default="from-violet-500/20 to-purple-500/20")
    title = models.CharField("სათაური (ქა)", max_length=100)
    title_en = models.CharField("სათაური (EN)", max_length=100, blank=True)
    title_ru = models.CharField("სათაური (RU)", max_length=100, blank=True)
    description = models.CharField("აღწერა (ქა)", max_length=300)
    description_en = models.CharField("აღწერა (EN)", max_length=300, blank=True)
    description_ru = models.CharField("აღწერა (RU)", max_length=300, blank=True)
    order = models.PositiveIntegerField("თანმიმდევრობა", default=0)

    class Meta:
        verbose_name = "უპირატესობა"
        verbose_name_plural = "უპირატესობები"
        ordering = ["order"]

    def __str__(self):
        return self.title


class Stat(models.Model):
    value = models.CharField("მნიშვნელობა", max_length=50, help_text="მაგ: 1500+")
    label = models.CharField("ლეიბლი (ქა)", max_length=100)
    label_en = models.CharField("ლეიბლი (EN)", max_length=100, blank=True)
    label_ru = models.CharField("ლეიბლი (RU)", max_length=100, blank=True)
    order = models.PositiveIntegerField("თანმიმდევრობა", default=0)

    class Meta:
        verbose_name = "სტატისტიკა"
        verbose_name_plural = "სტატისტიკა"
        ordering = ["order"]

    def __str__(self):
        return f"{self.value} — {self.label}"


class ProcessStep(models.Model):
    step_number = models.PositiveIntegerField("ნომერი")
    title = models.CharField("სათაური", max_length=100)
    description = models.TextField("აღწერა")
    order = models.PositiveIntegerField("თანმიმდევრობა", default=0)

    class Meta:
        verbose_name = "პროცესის ნაბიჯი"
        verbose_name_plural = "პროცესის ნაბიჯები"
        ordering = ["order"]

    def __str__(self):
        return f"{self.step_number}. {self.title}"


class Testimonial(models.Model):
    name = models.CharField("სახელი", max_length=100)
    role = models.CharField("როლი (ქა)", max_length=100, default="მომხმარებელი")
    role_en = models.CharField("როლი (EN)", max_length=100, blank=True)
    role_ru = models.CharField("როლი (RU)", max_length=100, blank=True)
    content = models.TextField("შეფასება (ქა)")
    content_en = models.TextField("შეფასება (EN)", blank=True)
    content_ru = models.TextField("შეფასება (RU)", blank=True)
    avatar = models.ImageField("ფოტო", upload_to="testimonials/", blank=True, null=True)
    rating = models.PositiveSmallIntegerField("შეფასება (1-5)", default=5)
    is_active = models.BooleanField("აქტიური", default=True)
    order = models.PositiveIntegerField("თანმიმდევრობა", default=0)

    class Meta:
        verbose_name = "მიმოხილვა"
        verbose_name_plural = "მიმოხილვები"
        ordering = ["order"]

    def __str__(self):
        return self.name


class Achievement(models.Model):
    year = models.CharField("წელი", max_length=10)
    title = models.CharField("სათაური", max_length=200)
    description = models.TextField("აღწერა", blank=True)
    order = models.PositiveIntegerField("თანმიმდევრობა", default=0)

    class Meta:
        verbose_name = "მიღწევა"
        verbose_name_plural = "მიღწევები"
        ordering = ["order"]

    def __str__(self):
        return f"{self.year} — {self.title}"


class Publication(models.Model):
    title = models.CharField("სათაური", max_length=300)
    journal = models.CharField("ჟურნალი / წყარო", max_length=200)
    date = models.DateField("თარიღი", blank=True, null=True)
    url = models.URLField("ბმული", blank=True)
    description = models.TextField("აღწერა", blank=True)
    order = models.PositiveIntegerField("თანმიმდევრობა", default=0)

    class Meta:
        verbose_name = "პუბლიკაცია"
        verbose_name_plural = "პუბლიკაციები"
        ordering = ["order"]

    def __str__(self):
        return self.title


class FAQ(models.Model):
    question = models.CharField("კითხვა (ქა)", max_length=300)
    question_en = models.CharField("კითხვა (EN)", max_length=300, blank=True)
    question_ru = models.CharField("კითხვა (RU)", max_length=300, blank=True)
    answer = models.TextField("პასუხი (ქა)")
    answer_en = models.TextField("პასუხი (EN)", blank=True)
    answer_ru = models.TextField("პასუხი (RU)", blank=True)
    is_active = models.BooleanField("აქტიური", default=True)
    order = models.PositiveIntegerField("თანმიმდევრობა", default=0)

    class Meta:
        verbose_name = "FAQ"
        verbose_name_plural = "FAQ"
        ordering = ["order"]

    def __str__(self):
        return self.question


class Partner(models.Model):
    name = models.CharField("სახელი", max_length=200)
    logo = models.ImageField("ლოგო", upload_to="partners/", blank=True, null=True)
    url = models.URLField("ვებ-გვერდი", blank=True)
    order = models.PositiveIntegerField("თანმიმდევრობა", default=0)

    class Meta:
        verbose_name = "პარტნიორი"
        verbose_name_plural = "პარტნიორები"
        ordering = ["order"]

    def __str__(self):
        return self.name
