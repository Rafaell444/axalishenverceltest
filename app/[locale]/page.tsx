import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { FeaturesGrid } from "@/components/features-grid"
import { VideoSection } from "@/components/video-section"
import { ProcessSection } from "@/components/process-section"
import { StatsSection } from "@/components/stats-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { AchievementsSection } from "@/components/achievements-section"
import { ResearchSection } from "@/components/research-section"
import { FAQSection } from "@/components/faq-section"
import { AppointmentCTA } from "@/components/appointment-cta"
import { NewsletterSection } from "@/components/newsletter-section"
import { CTASection } from "@/components/cta-section"
import { PartnersSection } from "@/components/partners-section"
import { Footer } from "@/components/footer"
import {
  fetchSettings,
  fetchHero,
  fetchFeatures,
  fetchStats,
  fetchProcessSteps,
  fetchTestimonials,
  fetchAchievements,
  fetchPublications,
  fetchFAQ,
  fetchPartners,
  fetchServices,
} from "@/lib/api"

export default async function Home() {
  const [settings, hero, features, stats, steps, testimonials, achievements, publications, faqs, partners, services] =
    await Promise.all([
      fetchSettings().catch(() => null),
      fetchHero().catch(() => null),
      fetchFeatures().catch(() => []),
      fetchStats().catch(() => []),
      fetchProcessSteps().catch(() => []),
      fetchTestimonials().catch(() => []),
      fetchAchievements().catch(() => []),
      fetchPublications().catch(() => []),
      fetchFAQ().catch(() => []),
      fetchPartners().catch(() => []),
      fetchServices().catch(() => []),
    ])

  return (
    <main className="min-h-screen bg-background">
      <Header settings={settings} />
      <HeroSection data={hero} />
      <FeaturesGrid features={features} />
      <ServicesSection services={services} />
      <VideoSection />
      <ProcessSection steps={steps} />
      <StatsSection stats={stats} />
      <TestimonialsSection testimonials={testimonials} />
      <AchievementsSection achievements={achievements} />
      <AppointmentCTA settings={settings} />
      <ResearchSection publications={publications} />
      <PartnersSection partners={partners} />
      <CTASection />
      <FAQSection faqs={faqs} />
      <NewsletterSection />
      <Footer settings={settings} services={services} />
    </main>
  )
}
