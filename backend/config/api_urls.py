from django.urls import path, include

urlpatterns = [
    path("", include("apps.core.urls")),
    path("", include("apps.content.urls")),
    path("", include("apps.services.urls")),
    path("", include("apps.blog.urls")),
    path("", include("apps.products.urls")),
    path("", include("apps.about.urls")),
    path("", include("apps.contact.urls")),
]
