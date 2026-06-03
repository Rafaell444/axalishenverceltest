from django.urls import path
from . import views

urlpatterns = [
    path("hero/", views.hero, name="hero"),
    path("features/", views.FeatureListView.as_view(), name="features"),
    path("stats/", views.StatListView.as_view(), name="stats"),
    path("testimonials/", views.TestimonialListView.as_view(), name="testimonials"),
    path("faq/", views.FAQListView.as_view(), name="faq"),
    path("partners/", views.PartnerListView.as_view(), name="partners"),
]
