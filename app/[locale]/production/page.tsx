import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/cta-section"
import { fetchSettings } from "@/lib/api"
import { getTranslations } from "next-intl/server"

export default async function ProductionPage() {
  const [settings, t] = await Promise.all([
    fetchSettings().catch(() => null),
    getTranslations("productionPage"),
  ])

  return (
    <main className="min-h-screen bg-background">
      <Header settings={settings} />

      <section className="pt-24 md:pt-32 pb-20 md:pb-32 px-4">
        <div className="max-w-3xl mx-auto">
          <span className="text-primary font-medium mb-4 block">{t("eyebrow")}</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t("heading")}
            {t("headingHighlight") && (
              <> <span className="text-primary">{t("headingHighlight")}</span></>
            )}
          </h1>
          <p className="text-xl text-foreground/80 font-medium mb-10 leading-relaxed">
            {t("subtitle")}
          </p>
          <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
            <p>{t("p1")}</p>
            <p>{t("p2")}</p>
            <p>{t("p3")}</p>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer settings={settings} />
    </main>
  )
}
