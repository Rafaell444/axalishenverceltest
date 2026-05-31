"""
Run with: py manage.py shell < seed_data.py
Seeds the database with the default content from the frontend.
"""
import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from apps.core.models import SiteSettings
from apps.content.models import HeroSection, Feature, Stat, ProcessStep, Testimonial, Achievement, Publication, FAQ, Partner
from apps.services.models import Service, ServiceFeature
from apps.blog.models import BlogCategory, BlogPost
from apps.about.models import AboutPage, CompanyValue, TeamMember, CompanyTimeline

# ── Site Settings ─────────────────────────────────────────────────────────────
s = SiteSettings.get_solo()
s.site_name = "ახალი შენ"
s.tagline = "ახალი შენ – ახალი ცხოვრება"
s.primary_phone = "+995 555 123 456"
s.secondary_phone = "+995 322 123 456"
s.emergency_phone = "+995 322 911 911"
s.email = "info@akhalishen.ge"
s.support_email = "support@akhalishen.ge"
s.address_line1 = "რუსთაველის გამზ. 24"
s.address_line2 = "თბილისი, საქართველო"
s.working_hours_weekdays = "09:00 - 19:00"
s.working_hours_saturday = "10:00 - 15:00"
s.working_hours_sunday = "დახურულია"
s.save()
print("✓ SiteSettings")

# ── Hero ──────────────────────────────────────────────────────────────────────
h = HeroSection.get_solo()
h.title = "ახალი შენ –"
h.title_highlight = "ახალი ცხოვრება"
h.description = (
    "ჩვენი მიზანია დაგეხმაროთ კანინეთობის აღდგენაში და ცხოვრების ხარისხის "
    "გაუმჯობესებაში თანამედროვე, უსაფრთხო და ინდივიდუალური მიდგომით."
)
h.cta_primary_text = "დაგვიკავშირდით"
h.cta_primary_link = "/contact"
h.cta_secondary_text = "გაიგე მეტი"
h.cta_secondary_link = "/about"
h.save()
print("✓ HeroSection")

# ── Features ──────────────────────────────────────────────────────────────────
Feature.objects.all().delete()
features_data = [
    ("Shield", "from-violet-500/20 to-purple-500/20", "უსაფრთხოება", "ISO სერტიფიცირებული უსაფრთხოების სტანდარტები"),
    ("Clock", "from-blue-500/20 to-cyan-500/20", "24/7 მხარდაჭერა", "მრგვალსაათიანი სამედიცინო კონსულტაცია"),
    ("Users", "from-emerald-500/20 to-green-500/20", "ექსპერტთა გუნდი", "50+ კვალიფიციური სპეციალისტი"),
    ("Award", "from-amber-500/20 to-orange-500/20", "სერტიფიკაცია", "საერთაშორისო აკრედიტაცია"),
    ("HeartPulse", "from-rose-500/20 to-pink-500/20", "პერსონალური მიდგომა", "ინდივიდუალური მკურნალობის გეგმა"),
    ("Microscope", "from-indigo-500/20 to-violet-500/20", "თანამედროვე ტექნოლოგიები", "უახლესი სამედიცინო აღჭურვილობა"),
    ("Leaf", "from-teal-500/20 to-emerald-500/20", "ბუნებრივი მეთოდები", "ჰოლისტიკური მიდგომა ჯანმრთელობისადმი"),
    ("Zap", "from-yellow-500/20 to-amber-500/20", "სწრაფი შედეგი", "ეფექტური მკურნალობის პროტოკოლები"),
]
for i, (icon, color, title, desc) in enumerate(features_data):
    Feature.objects.create(icon=icon, color=color, title=title, description=desc, order=i)
print("✓ Features")

# ── Stats ─────────────────────────────────────────────────────────────────────
Stat.objects.all().delete()
for i, (value, label) in enumerate([
    ("1500+", "გამოჯანმრთელებული პაციენტი"),
    ("10+", "წლის გამოცდილება"),
    ("20+", "კვალიფიციური სპეციალისტი"),
    ("98%", "პაციენტების კმაყოფილება"),
]):
    Stat.objects.create(value=value, label=label, order=i)
print("✓ Stats")

# ── Process Steps ─────────────────────────────────────────────────────────────
ProcessStep.objects.all().delete()
for i, (num, title, desc) in enumerate([
    (1, "კონსულტაცია", "პირველადი შეხვედრა სპეციალისტთან და მდგომარეობის შეფასება."),
    (2, "დიაგნოსტიკა", "სრული სამედიცინო გამოკვლევა და დიაგნოზის დასმა."),
    (3, "მკურნალობა", "ინდივიდუალური მკურნალობის კურსი თანამედროვე მეთოდებით."),
    (4, "შედეგი", "მკურნალობის შედეგების შეფასება და საჭიროებისამებრ კორექტირება."),
]):
    ProcessStep.objects.create(step_number=num, title=title, description=desc, order=i)
print("✓ ProcessSteps")

# ── Testimonials ──────────────────────────────────────────────────────────────
Testimonial.objects.all().delete()
for i, (name, content) in enumerate([
    ("ნინო გელაშვილი", "პროფესიონალური მიდგომა და ინდივიდუალური მკურნალობის გეგმა. ძალიან კმაყოფილი ვარ მიღებული შედეგებით."),
    ("გიორგი ბერიძე", "თანამედროვე აპარატურა და მაღალკვალიფიციური პერსონალი. რეკომენდაციას ვუწევ ყველას."),
    ("მარიამ წულუკიძე", "მადლობა გუნდს პროფესიონალიზმისთვის. მკურნალობის პროცესი იყო კომფორტული და ეფექტური."),
]):
    Testimonial.objects.create(name=name, role="პაციენტი", content=content, rating=5, order=i)
print("✓ Testimonials")

# ── Achievements ──────────────────────────────────────────────────────────────
Achievement.objects.all().delete()
for i, (year, title) in enumerate([
    ("2021", "კლინიკის დაარსება და ISO სერტიფიცირება"),
    ("2022", "საერთაშორისო პარტნიორობის დამყარება"),
    ("2023", "500+ პაციენტის წარმატებული მკურნალობა"),
    ("2024", "საუკეთესო კლინიკის ჯილდო"),
]):
    Achievement.objects.create(year=year, title=title, order=i)
print("✓ Achievements")

# ── Publications ──────────────────────────────────────────────────────────────
Publication.objects.all().delete()
for i, (title, journal) in enumerate([
    ("ნარკოდამოკიდებულების მკურნალობის თანამედროვე მეთოდები", "Georgian Medical Journal"),
    ("ორგანიზმის დეტოქსიკაცია: ეფექტური მიდგომები", "Journal of Detox Medicine"),
    ("ფსიქიკური კანინეთობის კომპლექსური მკურნალობა", "Mental Health Review"),
]):
    Publication.objects.create(title=title, journal=journal, order=i)
print("✓ Publications")

# ── FAQ ───────────────────────────────────────────────────────────────────────
FAQ.objects.all().delete()
faqs = [
    ("როგორ შემიძლია მივიღო კონსულტაცია?",
     "კონსულტაციის მისაღებად შეგიძლიათ დაგვირეკოთ ტელეფონზე ან მოგვწეროთ ელ-ფოსტაზე."),
    ("რა ღირს პირველადი კონსულტაცია?",
     "პირველადი კონსულტაციის ფასი დამოკიდებულია სპეციალისტზე. დეტალებისთვის დაგვიკავშირდით."),
    ("გაქვთ დაზღვევასთან თანამშრომლობა?",
     "დიახ, ჩვენ ვთანამშრომლობთ საქართველოს წამყვან სადაზღვევო კომპანიებთან."),
    ("რა არის თქვენი სამუშაო საათები?",
     "ჩვენი კლინიკა მუშაობს ორშაბათიდან პარასკევამდე 09:00–19:00, შაბათს 10:00–15:00."),
    ("რამდენი ხანი გრძელდება მკურნალობის კურსი?",
     "მკურნალობის ხანგრძლივობა ინდივიდუალურია. პირველადი კონსულტაციის შემდეგ ექიმი განსაზღვრავს ვადებს."),
]
for i, (q, a) in enumerate(faqs):
    FAQ.objects.create(question=q, answer=a, order=i)
print("✓ FAQ")

# ── Partners ──────────────────────────────────────────────────────────────────
Partner.objects.all().delete()
for i, name in enumerate(["Johns Hopkins Medicine", "Mayo Clinic", "Cleveland Clinic", "Harvard Medical", "Stanford Health"]):
    Partner.objects.create(name=name, order=i)
print("✓ Partners")

# ── Services ──────────────────────────────────────────────────────────────────
Service.objects.all().delete()
services_data = [
    ("Brain", "narkodam", "ნარკოდამოკიდებულება",
     "დამოკიდებულებისგან გამოჯანმრთელება და ადამიანის მკურნალობა.",
     ["სრული დეტოქსიკაცია", "ფსიქოლოგიური მხარდაჭერა", "ოჯახის კონსულტაცია"]),
    ("Stethoscope", "konsultacia", "კონსულტაცია",
     "კონსულტაცია დაავადების დიაგნოსტიკა და მკურნალობა.",
     ["ყოვლისმომცველი გამოკვლევა", "ექსპერტთა მოსაზრება", "მკურნალობის გეგმა"]),
    ("Shield", "parazitebi", "პარაზიტები",
     "ორგანიზმის გაწმენდა პარაზიტებისგან და ინფექციების სამკურნალო.",
     ["ლაბორატორიული ანალიზი", "ბუნებრივი მეთოდები", "პრევენციის გეგმა"]),
    ("Server", "imunuri-sistema", "იმუნური სისტემა",
     "იმუნიტეტის გამძლიერება და ორგანიზმის სარეპონ დაცვა.",
     ["იმუნოლოგიური გამოკვლევა", "ვიტამინოთერაპია", "ცხოვრების წესის ოპტიმიზაცია"]),
    ("Activity", "fsiqikuri-jansagheba", "ფსიქიკური კანინეთობა",
     "სტრესი, შფოთვა და დეპრესია – ფსიქიკური კანინეთობა აღდგენება.",
     ["ფსიქოთერაპია", "CBT სეანსები", "სტრეს-მენეჯმენტი"]),
    ("Microscope", "detoqsikacia", "დეტოქსიკაცია",
     "ორგანიზმის დეტოქსიკაცია და კანინეთობის გამიზანება და კონსულტაცია.",
     ["ორგანული დეტოქსი", "IV თერაპია", "კვების ოპტიმიზაცია"]),
]
for i, (icon, slug, title, short_desc, feature_texts) in enumerate(services_data):
    svc = Service.objects.create(
        icon=icon, slug=slug, title=title,
        short_description=short_desc, full_description=short_desc,
        price="კონსულტაციით", is_active=True, is_featured=True, order=i,
    )
    for ft in feature_texts:
        ServiceFeature.objects.create(service=svc, text=ft)
print("✓ Services")

# ── About page ────────────────────────────────────────────────────────────────
ap = AboutPage.get_solo()
ap.hero_title = "ჩვენ შესახებ"
ap.hero_subtitle = "ახალი შენ – პიონერი ჯანმრთელობის აღდგენის სფეროში"
ap.mission = "ჩვენი მისიაა უმაღლეს სტანდარტზე მოვუარო პაციენტებს."
ap.vision = "ხდები ჩვენი ვიზია ხელი შეუწყოს ყველა ადამიანს ახალ ცხოვრებას."
ap.save()

CompanyValue.objects.all().delete()
for i, (icon, title, desc) in enumerate([
    ("Heart", "გულწრფელობა", "ჩვენ ვზრუნავთ ყოველ პაციენტზე, როგორც ოჯახის წევრზე."),
    ("Shield", "უსაფრთხოება", "ყველა პროცედურა ტარდება საერთაშორისო სტანდარტებით."),
    ("Users", "გუნდური მიდგომა", "მულტიდისციპლინური გუნდი მუშაობს თქვენი ჯანმრთელობისთვის."),
    ("Award", "ხარისხი", "ჩვენ არ ვიდავით ხარისხზე – ეს ჩვენი ვალდებულებაა."),
]):
    CompanyValue.objects.create(icon=icon, title=title, description=desc, order=i)

TeamMember.objects.all().delete()
for i, (name, role) in enumerate([
    ("დავით კვარაცხელია", "მთავარი ექიმი, ნარკოლოგი"),
    ("ნინო ბერიძე", "ფსიქიატრი"),
    ("გიორგი ჩიქოვანი", "ნევროლოგი"),
    ("მარინე გოგია", "კლინიკური ფსიქოლოგი"),
]):
    TeamMember.objects.create(name=name, role=role, order=i)

CompanyTimeline.objects.all().delete()
for i, (year, title, desc) in enumerate([
    ("2021", "კლინიკის დაარსება", "ახალი შენ-ის დაარსება თბილისში."),
    ("2022", "ISO სერტიფიცირება", "მიღება ISO 9001:2015 სერტიფიკატი."),
    ("2023", "გუნდის გაფართოება", "20+ სპეციალისტის გუნდის ჩამოყალიბება."),
    ("2024", "500+ პაციენტი", "წარმატებული 500+ მკურნალობის კურსი."),
    ("2025", "საერთაშორისო პარტნიორობა", "ამერიკის წამყვან კლინიკებთან პარტნიორობა."),
]):
    CompanyTimeline.objects.create(year=year, title=title, description=desc, order=i)
print("✓ About")

# ── Blog ──────────────────────────────────────────────────────────────────────
BlogCategory.objects.all().delete()
cats = {}
for name, slug in [
    ("ჯანმრთელობა", "jansagheba"), ("მკურნალობა", "mkurnalobas"), ("ცხოვრების წესი", "cxovrebis-wesi"),
    ("სიახლეები", "siaxleebi"), ("კვლევები", "kvlevebi"),
]:
    cats[slug] = BlogCategory.objects.create(name=name, slug=slug)

from django.contrib.auth import get_user_model
User = get_user_model()
admin_user = User.objects.filter(is_superuser=True).first()

BlogPost.objects.all().delete()
for i, (title, slug, excerpt, cat_slug) in enumerate([
    ("ნარკოდამოკიდებულებიდან გამოჯანმრთელების 5 ეტაპი",
     "narkodamokladebuleba-5-etapi",
     "გამოჯანმრთელების პროცესი რთულია, მაგრამ შესაძლებელი. ვისაუბრეთ 5 მთავარ ეტაპზე.",
     "mkurnalobas"),
    ("ჯანსაღი კვება ორგანიზმის გაძლიერებისთვის",
     "jansaghi-kveba-organizmi",
     "სწორი კვება ეხმარება ორგანიზმს აღდგენაში და იმუნიტეტის გაძლიერებაში.",
     "jansagheba"),
    ("სტრესი და მისი გავლენა ჯანმრთელობაზე",
     "stresi-jansagheloba",
     "ქრონიკული სტრესი სერიოზული საფრთხეა. როგორ ვებრძვით მას ეფექტურად.",
     "cxovrebis-wesi"),
]):
    BlogPost.objects.create(
        title=title, slug=slug, excerpt=excerpt,
        body=f"<p>{excerpt}</p>",
        category=cats[cat_slug],
        author=admin_user,
        is_published=True, is_featured=(i == 0),
    )
print("✓ Blog")

print("\n✅ Seed complete! All default content loaded.")
