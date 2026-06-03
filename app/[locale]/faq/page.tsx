import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/cta-section"
import { FAQSection } from "@/components/faq-section"
import { fetchSettings, fetchFAQ } from "@/lib/api"
import { getTranslations } from "next-intl/server"

export default async function FAQPage() {
  const [settings, faqs, t] = await Promise.all([
    fetchSettings().catch(() => null),
    fetchFAQ().catch(() => []),
    getTranslations("faq"),
  ])

  return (
    <main className="min-h-screen bg-background">
      <Header settings={settings} />

      <section className="pt-24 md:pt-32 pb-4 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-primary font-medium mb-4 block">{t("eyebrow")}</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t("heading")} <span className="text-primary">{t("headingHighlight")}</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t("description")}</p>
        </div>
      </section>

      <FAQSection faqs={faqs} />

      <CTASection />
      <Footer settings={settings} />
    </main>
  )
}
