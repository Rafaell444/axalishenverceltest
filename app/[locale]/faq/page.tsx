import type { Metadata } from "next"
import { Header } from "@/components/header"
import { buildMetadata } from "@/lib/seo"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/cta-section"
import { FAQSection } from "@/components/faq-section"
import { fetchSettings, fetchFAQ, fetchPageSeo } from "@/lib/api"
import { getTranslations } from "next-intl/server"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const [seo, t] = await Promise.all([
    fetchPageSeo("faq", locale).catch(() => null),
    getTranslations({ locale, namespace: "faq" }),
  ])
  return buildMetadata(seo, {
    title: `${t("heading")} ${t("headingHighlight")}`,
    description: t("description"),
  })
}

export default async function FAQPage() {
  const [settings, faqs, t] = await Promise.all([
    fetchSettings().catch(() => null),
    fetchFAQ().catch(() => []),
    getTranslations("faq"),
  ])

  return (
    <main className="min-h-screen">
      <Header settings={settings} />

      <section className="pt-24 md:pt-32 pb-4 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-gold font-medium mb-4 block">{t("eyebrow")}</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t("heading")} <span className="text-gold">{t("headingHighlight")}</span>
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
