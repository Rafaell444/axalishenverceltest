from pathlib import Path
from decouple import config
from django.urls import reverse_lazy
import dj_database_url

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = config("SECRET_KEY", default="django-insecure-dev-key-change-in-production")
DEBUG = config("DEBUG", default=True, cast=bool)
ALLOWED_HOSTS = config("ALLOWED_HOSTS", default="localhost,127.0.0.1").split(",")

DJANGO_APPS = [
    "unfold",
    "unfold.contrib.filters",
    "unfold.contrib.forms",
    "unfold.contrib.inlines",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
]

THIRD_PARTY_APPS = [
    "rest_framework",
    "corsheaders",
    "solo",
    "ckeditor",
    "ckeditor_uploader",
    "django_filters",
]

LOCAL_APPS = [
    "apps.core",
    "apps.content",
    "apps.services",
    "apps.blog",
    "apps.products",
    "apps.about",
    "apps.contact",
]

INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"

_db_url = config("DATABASE_URL", default="")
if _db_url:
    DATABASES = {"default": dj_database_url.parse(_db_url, conn_max_age=600)}
else:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        }
    }

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

LANGUAGE_CODE = "ka"
TIME_ZONE = "Asia/Tbilisi"
USE_I18N = True
USE_TZ = True

STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
STATICFILES_DIRS = [BASE_DIR / "static"] if (BASE_DIR / "static").exists() else []

STORAGES = {
    "default": {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / config("MEDIA_ROOT", default="media")

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# ── Production security (applied only when DEBUG=False) ─────────────────────
if not DEBUG:
    SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
    SECURE_HSTS_SECONDS = 31536000
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_CONTENT_TYPE_NOSNIFF = True
    SECURE_BROWSER_XSS_FILTER = True

SILENCED_SYSTEM_CHECKS = ["ckeditor.W001"]

# ── CORS ────────────────────────────────────────────────────────────────────
CORS_ALLOWED_ORIGINS = config(
    "CORS_ALLOWED_ORIGINS",
    default="http://localhost:3000,http://127.0.0.1:3000",
).split(",")
CORS_ALLOW_CREDENTIALS = True

# ── Django REST Framework ────────────────────────────────────────────────────
REST_FRAMEWORK = {
    "DEFAULT_RENDERER_CLASSES": ["rest_framework.renderers.JSONRenderer"],
    "DEFAULT_FILTER_BACKENDS": [
        "django_filters.rest_framework.DjangoFilterBackend",
        "rest_framework.filters.SearchFilter",
        "rest_framework.filters.OrderingFilter",
    ],
    "DEFAULT_PERMISSION_CLASSES": ["rest_framework.permissions.AllowAny"],
}

# ── CKEditor ─────────────────────────────────────────────────────────────────
CKEDITOR_UPLOAD_PATH = "uploads/"
CKEDITOR_IMAGE_BACKEND = "pillow"
CKEDITOR_CONFIGS = {
    "default": {
        "toolbar": "Custom",
        "toolbar_Custom": [
            ["Bold", "Italic", "Underline", "Strike"],
            ["NumberedList", "BulletedList", "-", "Outdent", "Indent"],
            ["JustifyLeft", "JustifyCenter", "JustifyRight"],
            ["Link", "Unlink"],
            ["Image", "Table"],
            ["Format", "FontSize"],
            ["TextColor", "BGColor"],
            ["Undo", "Redo"],
            ["Source"],
        ],
        "height": 400,
        "width": "100%",
        "removePlugins": "elementspath",
        "resize_enabled": False,
    },
}

# ── django-unfold ────────────────────────────────────────────────────────────
UNFOLD = {
    "SITE_TITLE": "ახალი შენ | CMS",
    "SITE_HEADER": "ახალი შენ",
    "SITE_URL": "/",
    "SITE_SYMBOL": "medical_services",
    "SHOW_HISTORY": True,
    "SHOW_VIEW_ON_SITE": True,
    "COLORS": {
        "primary": {
            "50": "250 245 255",
            "100": "243 232 255",
            "200": "233 213 255",
            "300": "216 180 254",
            "400": "192 132 252",
            "500": "168 85 247",
            "600": "147 51 234",
            "700": "126 34 206",
            "800": "107 33 168",
            "900": "88 28 135",
            "950": "59 7 100",
        },
    },
    "SIDEBAR": {
        "show_search": True,
        "show_all_applications": False,
        "navigation": [
            {
                "title": "მთავარი",
                "separator": False,
                "items": [
                    {
                        "title": "Dashboard",
                        "icon": "dashboard",
                        "link": reverse_lazy("admin:index"),
                    },
                ],
            },
            {
                "title": "საიტის პარამეტრები",
                "separator": True,
                "items": [
                    {
                        "title": "საიტის პარამეტრები",
                        "icon": "settings",
                        "link": reverse_lazy("admin:core_sitesettings_changelist"),
                    },
                ],
            },
            {
                "title": "მთავარი გვერდი",
                "separator": True,
                "items": [
                    {
                        "title": "Hero სექცია",
                        "icon": "panorama",
                        "link": reverse_lazy("admin:content_herosection_changelist"),
                    },
                    {
                        "title": "უპირატესობები",
                        "icon": "star",
                        "link": reverse_lazy("admin:content_feature_changelist"),
                    },
                    {
                        "title": "სტატისტიკა",
                        "icon": "bar_chart",
                        "link": reverse_lazy("admin:content_stat_changelist"),
                    },
                    {
                        "title": "მიმოხილვები",
                        "icon": "rate_review",
                        "link": reverse_lazy("admin:content_testimonial_changelist"),
                    },
                    {
                        "title": "FAQ",
                        "icon": "help",
                        "link": reverse_lazy("admin:content_faq_changelist"),
                    },
                    {
                        "title": "პარტნიორები",
                        "icon": "handshake",
                        "link": reverse_lazy("admin:content_partner_changelist"),
                    },
                ],
            },
            {
                "title": "სერვისები",
                "separator": True,
                "items": [
                    {
                        "title": "სერვისები",
                        "icon": "medical_services",
                        "link": reverse_lazy("admin:services_service_changelist"),
                    },
                ],
            },
            {
                "title": "ბლოგი",
                "separator": True,
                "items": [
                    {
                        "title": "სტატიები",
                        "icon": "article",
                        "link": reverse_lazy("admin:blog_blogpost_changelist"),
                    },
                    {
                        "title": "კატეგორიები",
                        "icon": "category",
                        "link": reverse_lazy("admin:blog_blogcategory_changelist"),
                    },
                ],
            },
            {
                "title": "პროდუქტები",
                "separator": True,
                "items": [
                    {
                        "title": "პროდუქტები",
                        "icon": "inventory_2",
                        "link": reverse_lazy("admin:products_product_changelist"),
                    },
                    {
                        "title": "კატეგორიები",
                        "icon": "category",
                        "link": reverse_lazy("admin:products_productcategory_changelist"),
                    },
                ],
            },
            {
                "title": "ჩვენ შესახებ",
                "separator": True,
                "items": [
                    {
                        "title": "გვერდის კონტენტი",
                        "icon": "info",
                        "link": reverse_lazy("admin:about_aboutpage_changelist"),
                    },
                    {
                        "title": "გუნდი",
                        "icon": "group",
                        "link": reverse_lazy("admin:about_teammember_changelist"),
                    },
                    {
                        "title": "ღირებულებები",
                        "icon": "favorite",
                        "link": reverse_lazy("admin:about_companyvalue_changelist"),
                    },
                    {
                        "title": "ისტორია",
                        "icon": "timeline",
                        "link": reverse_lazy("admin:about_companytimeline_changelist"),
                    },
                    {
                        "title": "სერტიფიკატები",
                        "icon": "verified",
                        "link": reverse_lazy("admin:about_certification_changelist"),
                    },
                ],
            },
            {
                "title": "CRM",
                "separator": True,
                "items": [
                    {
                        "title": "შეტყობინებები",
                        "icon": "mail",
                        "link": reverse_lazy("admin:contact_contactmessage_changelist"),
                    },
                    {
                        "title": "Newsletter",
                        "icon": "mark_email_read",
                        "link": reverse_lazy("admin:contact_newslettersubscriber_changelist"),
                    },
                ],
            },
            {
                "title": "მომხმარებლები",
                "separator": True,
                "items": [
                    {
                        "title": "მომხმარებლები",
                        "icon": "person",
                        "link": reverse_lazy("admin:auth_user_changelist"),
                    },
                    {
                        "title": "ჯგუფები",
                        "icon": "group",
                        "link": reverse_lazy("admin:auth_group_changelist"),
                    },
                ],
            },
        ],
    },
}
