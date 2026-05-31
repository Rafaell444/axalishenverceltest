from django.urls import path
from . import views

urlpatterns = [
    path("hero/", views.hero, name="hero"),
    path("features/", views.FeatureListView.as_view(), name="features"),
    path("stats/", views.StatListView.as_view(), name="stats"),
    path("process-steps/", views.ProcessStepListView.as_view(), name="process-steps"),
    path("testimonials/", views.TestimonialListView.as_view(), name="testimonials"),
    path("achievements/", views.AchievementListView.as_view(), name="achievements"),
    path("publications/", views.PublicationListView.as_view(), name="publications"),
    path("faq/", views.FAQListView.as_view(), name="faq"),
    path("partners/", views.PartnerListView.as_view(), name="partners"),
]
