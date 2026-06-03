import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { FeaturesGrid } from "@/components/features-grid"
import { VideoSection } from "@/components/video-section"
import { StatsSection } from "@/components/stats-section"
import { TestimonialsSection } from "@/components/testimonials-section"
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
  fetchTestimonials,
  fetchPartners,
  fetchServices,
} from "@/lib/api"

export default async function Home() {
  const [settings, hero, features, stats, testimonials, partners, services] =
    await Promise.all([
      fetchSettings().catch(() => null),
      fetchHero().catch(() => null),
      fetchFeatures().catch(() => []),
      fetchStats().catch(() => []),
      fetchTestimonials().catch(() => []),
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
      <StatsSection stats={stats} />
      <TestimonialsSection testimonials={testimonials} />
      <AppointmentCTA settings={settings} />
      <PartnersSection partners={partners} />
      <CTASection />
      <NewsletterSection />
      <Footer settings={settings} services={services} />
    </main>
  )
}
