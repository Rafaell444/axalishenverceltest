import { getTranslations } from "next-intl/server"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AdvantagesSection } from "@/components/advantages-section"
import { ServicesSection } from "@/components/services-section"
import { VideoSection } from "@/components/video-section"
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
  fetchTestimonials,
  fetchPartners,
  fetchAdvantages,
  fetchServices,
  fetchBlogPosts,
} from "@/lib/api"

export default async function Home() {
  const [settings, hero, testimonials, partners, advantages, services, posts, tHero] =
    await Promise.all([
      fetchSettings().catch(() => null),
      fetchHero().catch(() => null),
      fetchTestimonials().catch(() => []),
      fetchPartners().catch(() => []),
      fetchAdvantages().catch(() => []),
      fetchServices().catch(() => []),
      fetchBlogPosts().catch(() => []),
      getTranslations("hero"),
    ])

  const heroTranslations = {
    title: tHero("title"),
    titleHighlight: tHero("titleHighlight"),
    description: tHero("description"),
    ctaPrimary: tHero("ctaPrimary"),
    ctaSecondary: tHero("ctaSecondary"),
    imageAlt: tHero("imageAlt"),
  }

  return (
    <main className="min-h-screen">
      <Header settings={settings} />
      <HeroSection data={hero} translations={heroTranslations} />
      <AdvantagesSection advantages={advantages} />
      <ServicesSection services={services} />
      <VideoSection />
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
