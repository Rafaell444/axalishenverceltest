import { getTranslations } from "next-intl/server"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { FeaturesGrid } from "@/components/features-grid"
import { VideoSection } from "@/components/video-section"
import { StatsSection } from "@/components/stats-section"
import { BlogFaqLinks } from "@/components/blog-faq-links"
import { TestimonialsSection } from "@/components/testimonials-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { CTASection } from "@/components/cta-section"
import { PartnersSection } from "@/components/partners-section"
import { NewsWall } from "@/components/news-wall"
import { Footer } from "@/components/footer"
import {
  fetchSettings,
  fetchHero,
  fetchFeatures,
  fetchStats,
  fetchTestimonials,
  fetchPartners,
  fetchServices,
  fetchBlogPosts,
} from "@/lib/api"

export default async function Home() {
  const [settings, hero, features, stats, testimonials, partners, services, posts, tHero, tStats] =
    await Promise.all([
      fetchSettings().catch(() => null),
      fetchHero().catch(() => null),
      fetchFeatures().catch(() => []),
      fetchStats().catch(() => []),
      fetchTestimonials().catch(() => []),
      fetchPartners().catch(() => []),
      fetchServices().catch(() => []),
      fetchBlogPosts().catch(() => []),
      getTranslations("hero"),
      getTranslations("stats"),
    ])

  const heroTranslations = {
    title: tHero("title"),
    titleHighlight: tHero("titleHighlight"),
    description: tHero("description"),
    ctaPrimary: tHero("ctaPrimary"),
    ctaSecondary: tHero("ctaSecondary"),
    imageAlt: tHero("imageAlt"),
  }

  const statsTranslations = {
    default0: tStats("default0"),
    default1: tStats("default1"),
    default2: tStats("default2"),
    default3: tStats("default3"),
  }

  return (
    <main className="min-h-screen">
      <Header settings={settings} />
      <HeroSection data={hero} translations={heroTranslations} />
      <ServicesSection services={services} />
      <VideoSection />
      <StatsSection stats={stats} translations={statsTranslations} />
      <BlogFaqLinks />
      <TestimonialsSection testimonials={testimonials} />
      <PartnersSection partners={partners} />
      <NewsWall posts={posts} />
      <CTASection />
      <NewsletterSection />
      <Footer settings={settings} services={services} />
    </main>
  )
}
