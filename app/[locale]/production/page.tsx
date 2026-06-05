import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/cta-section"
import { Leaf, FlaskConical, Package, Truck, Recycle, Search } from "lucide-react"
import { fetchSettings } from "@/lib/api"
import { getTranslations } from "next-intl/server"

export default async function ProductionPage() {
  const [settings, t] = await Promise.all([
    fetchSettings().catch(() => null),
    getTranslations("productionPage"),
  ])

  const STEPS = [
    { num: "01", icon: Search,       title: t("step1title"), description: t("step1desc") },
    { num: "02", icon: Leaf,         title: t("step2title"), description: t("step2desc") },
    { num: "03", icon: FlaskConical, title: t("step3title"), description: t("step3desc") },
    { num: "04", icon: Package,      title: t("step4title"), description: t("step4desc") },
    { num: "05", icon: Package,      title: t("step5title"), description: t("step5desc") },
    { num: "06", icon: Truck,        title: t("step6title"), description: t("step6desc") },
  ]

  return (
    <main className="min-h-screen relative">
      <Header settings={settings} />

      {/* Hero / Intro */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <span className="text-gold font-medium mb-4 block">{t("eyebrow")}</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t("heading")}
          </h1>
          <p className="text-xl text-foreground/80 font-medium mb-8 leading-relaxed">
            {t("subtitle")}
          </p>
          <div className="space-y-5 text-muted-foreground text-lg leading-relaxed">
            <p>{t("p1")}</p>
            <p>{t("p2")}</p>
            <p>{t("p3")}</p>
          </div>
        </div>
      </section>

      {/* Steps timeline */}
      <section className="pb-16 md:pb-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            <div className="hidden md:block absolute left-[2.75rem] top-8 bottom-8 w-px bg-gradient-to-b from-gold/50 via-gold/20 to-transparent" />
            <div className="space-y-6 md:space-y-8">
              {STEPS.map((step) => {
                const Icon = step.icon
                return (
                  <div key={step.num} className="flex gap-4 md:gap-6 group">
                    <div className="relative shrink-0">
                      <div className="w-[5.5rem] h-[5.5rem] rounded-2xl bg-gold/10 border border-gold/20 flex flex-col items-center justify-center group-hover:bg-gold/20 group-hover:border-gold/30 transition-all">
                        <span className="text-xs font-bold text-gold/60 mb-1">{step.num}</span>
                        <Icon className="w-6 h-6 text-gold" />
                      </div>
                    </div>
                    <div className="glass-card rounded-2xl p-5 md:p-6 flex-1 group-hover:border-gold/30 transition-colors">
                      <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{step.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="py-12 md:py-16 px-4 glass border-y border-gold/10">
        <div className="max-w-4xl mx-auto text-center">
          <Recycle className="w-12 h-12 text-gold mx-auto mb-6" />
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            {t("sustTitle")} <span className="text-gold">{t("sustTitleHighlight")}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            {t("sustDesc")}
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { value: "100%", label: t("sust1Label") },
              { value: "Zero", label: t("sust2Label") },
              { value: "Eco",  label: t("sust3Label") },
            ].map((item) => (
              <div key={item.label} className="glass-card rounded-xl p-5">
                <div className="text-2xl font-black text-gold mb-1">{item.value}</div>
                <div className="text-sm text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer settings={settings} />
    </main>
  )
}
