from django.db import migrations

PAGE_KEYS = [
    "contact",
    "products",
    "services",
    "blog",
    "faq",
    "certifications",
    "safety",
    "production",
]


def seed_pages(apps, schema_editor):
    PageSEO = apps.get_model("core", "PageSEO")
    for key in PAGE_KEYS:
        PageSEO.objects.get_or_create(page_key=key)


def unseed_pages(apps, schema_editor):
    PageSEO = apps.get_model("core", "PageSEO")
    PageSEO.objects.filter(page_key__in=PAGE_KEYS).delete()


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0003_seo_fields"),
    ]

    operations = [
        migrations.RunPython(seed_pages, unseed_pages),
    ]
