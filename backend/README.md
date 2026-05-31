# ახალი შენ — Django CMS Backend

## Stack
- **Django 5** + **Django REST Framework** — REST API
- **django-unfold** — Modern admin panel (CMS)
- **django-solo** — Singleton models (SiteSettings, Hero, etc.)
- **django-ckeditor** — Rich text editor for blog & services
- **SQLite** (dev) — switch to PostgreSQL for production

## Setup

```bash
# 1. Create virtual environment (recommended)
py -m venv venv
venv\Scripts\activate   # Windows
# source venv/bin/activate  # Mac/Linux

# 2. Install dependencies
py -m pip install -r requirements.txt

# 3. Copy env file
copy .env.example .env   # Windows
# cp .env.example .env   # Mac/Linux

# 4. Run migrations
py manage.py migrate

# 5. Create superuser
py manage.py createsuperuser

# 6. Seed default content (optional)
py seed_data.py

# 7. Start server
py manage.py runserver 8000
```

## URLs
| URL | Description |
|-----|-------------|
| `http://127.0.0.1:8000/admin/` | CMS Admin Panel |
| `http://127.0.0.1:8000/api/v1/` | REST API root |
| `http://127.0.0.1:8000/api/v1/settings/` | Site settings |
| `http://127.0.0.1:8000/api/v1/hero/` | Hero section |
| `http://127.0.0.1:8000/api/v1/services/` | Services list |
| `http://127.0.0.1:8000/api/v1/blog/posts/` | Blog posts |
| `http://127.0.0.1:8000/api/v1/products/` | Products |
| `http://127.0.0.1:8000/api/v1/about/` | About page data |
| `http://127.0.0.1:8000/api/v1/contact/` | POST contact message |
| `http://127.0.0.1:8000/api/v1/newsletter/` | POST newsletter |

## Default admin credentials
- **Username:** admin
- **Password:** (set during `createsuperuser`)
- To reset: `py manage.py changepassword admin`

## Admin sections
- **საიტის პარამეტრები** — Site name, phone, email, address, social links
- **მთავარი გვერდი** — Hero, Features, Stats, Process, Testimonials, FAQ, Partners
- **სერვისები** — Services with rich text and feature bullets
- **ბლოგი** — Blog posts (CKEditor) + categories
- **პროდუქტები** — Products + categories + stock management
- **ჩვენ შესახებ** — Team, values, timeline, certifications
- **CRM** — Contact messages inbox, consultations, newsletter subscribers
