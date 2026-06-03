import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/cta-section"
import { AlertTriangle, XCircle, MessageCircle } from "lucide-react"
import { fetchSettings } from "@/lib/api"
import { getTranslations } from "next-intl/server"

export default async function SafetyPage() {
  const [settings, t] = await Promise.all([
    fetchSettings().catch(() => null),
    getTranslations("safetyPage"),
  ])

  const bullets = [t("b1"), t("b2"), t("b3"), t("b4"), t("b5")]

  return (
    <main className="min-h-screen bg-background">
      <Header settings={settings} />

      <section className="pt-24 md:pt-32 pb-10 px-4">
        <div className="max-w-3xl mx-auto">
          <span className="text-primary font-medium mb-4 block">{t("eyebrow")}</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-8">
            {t("heading")} <span className="text-primary">{t("headingHighlight")}</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed mb-12">
            {t("p1")}
          </p>

          {/* Functional mushrooms */}
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-8">
            <h2 className="text-xl font-bold text-foreground mb-3">{t("fungiHeading")}</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">{t("fungiList")}</p>

            <h3 className="font-semibold text-foreground mb-4">{t("considerHeading")}</h3>
            <ul className="space-y-3">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="flex items-start gap-3 p-5 bg-amber-500/10 border border-amber-500/20 rounded-xl mb-6">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-muted-foreground text-sm leading-relaxed">{t("disclaimer")}</p>
          </div>

          {/* Warnings */}
          <div className="space-y-3 mb-10">
            <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <p className="text-muted-foreground text-sm">{t("warning1")}</p>
            </div>
            <div className="flex items-start gap-3 p-4 bg-primary/10 border border-primary/20 rounded-xl">
              <MessageCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <p className="text-muted-foreground text-sm">{t("warning2")}</p>
            </div>
          </div>

          {/* Footer note */}
          <p className="text-center text-muted-foreground text-sm italic border-t border-border/40 pt-8">
            {t("footer")}
          </p>
        </div>
      </section>

      <CTASection />
      <Footer settings={settings} />
    </main>
  )
}
