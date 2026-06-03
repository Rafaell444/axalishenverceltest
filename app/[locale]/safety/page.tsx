import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/cta-section"
import { AlertTriangle, XCircle, MessageCircle, FlaskConical, Leaf, Microscope, Shield, CheckCircle } from "lucide-react"
import { fetchSettings } from "@/lib/api"
import { getTranslations } from "next-intl/server"

const PILLARS = [
  {
    icon: FlaskConical,
    title: "ლაბორატორიული ტესტირება",
    description: "თითოეული პარტია გადის ლაბორატორიული ტესტირების პროცედურას ISO 17025 სტანდარტების მიხედვით.",
    points: ["მძიმე მეტალების ანალიზი", "მიკრობიოლოგიური სიწმინდე", "ეფექტური ნივთიერებების კონცენტრაცია", "სადეზინფექციო ნარჩენები"],
  },
  {
    icon: Leaf,
    title: "ნედლეულის კონტროლი",
    description: "ნედლეული მოდის მხოლოდ სერტიფიცირებული წყაროებიდან — ეკოლოგიურად სუფთა ბუნებრივი გარემოდან ან შერჩეული მეურნეობებიდან.",
    points: ["სახეობის იდენტიფიკაცია", "წარმოშობის დოკუმენტაცია", "პესტიციდების არარსებობა", "GMO-free ნედლეული"],
  },
  {
    icon: Microscope,
    title: "სიწმინდის სტანდარტები",
    description: "დამოუკიდებელი ლაბორატორიის მიერ გადამოწმებული სისუფთავე. ნებისმიერი სტანდარტის გადამეტება ნიშნავს პარტიის უარყოფას.",
    points: ["99%+ სისუფთავის გარანტია", "დამოუკიდებელი გადამოწმება", "ყოველი პარტიის COA", "Pharmacopoeial სტანდარტები"],
  },
  {
    icon: Shield,
    title: "შენახვა და მიწოდება",
    description: "ტემპერატურის კონტროლირებადი პირობებით შენახვა. UV-protected, BPA-free შეფუთვა სტაბილურობის შენარჩუნებისთვის.",
    points: ["ტემპერატურის მონიტორინგი", "სინათლისგან დაცვა", "ტენიანობის კონტროლი", "ვადის თვალყურის დევნება"],
  },
]

export default async function SafetyPage() {
  const [settings, t] = await Promise.all([
    fetchSettings().catch(() => null),
    getTranslations("safetyPage"),
  ])

  const bullets = [t("b1"), t("b2"), t("b3"), t("b4"), t("b5")]

  return (
    <main className="min-h-screen bg-background">
      <Header settings={settings} />

      {/* Hero / Intro */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <span className="text-primary font-medium mb-4 block">{t("eyebrow")}</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t("heading")} <span className="text-primary">{t("headingHighlight")}</span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {t("p1")}
          </p>
        </div>
      </section>

      {/* Safety pillars */}
      <section className="pb-16 md:pb-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 md:gap-8">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon
            return (
              <div key={pillar.title} className="bg-card border border-border rounded-2xl p-6 md:p-8 hover:border-primary/40 transition-colors">
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{pillar.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{pillar.description}</p>
                  </div>
                </div>
                <ul className="grid grid-cols-2 gap-2">
                  {pillar.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </section>

      {/* Functional mushrooms + precautions */}
      <section className="py-12 md:py-16 px-4 bg-card/50 border-y border-border/40">
        <div className="max-w-3xl mx-auto">
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-6">
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
          <div className="flex items-start gap-3 p-5 bg-amber-500/10 border border-amber-500/20 rounded-xl mb-4">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-muted-foreground text-sm leading-relaxed">{t("disclaimer")}</p>
          </div>

          {/* Warnings */}
          <div className="space-y-3 mb-8">
            <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <p className="text-muted-foreground text-sm">{t("warning1")}</p>
            </div>
            <div className="flex items-start gap-3 p-4 bg-primary/10 border border-primary/20 rounded-xl">
              <MessageCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <p className="text-muted-foreground text-sm">{t("warning2")}</p>
            </div>
          </div>

          <p className="text-center text-muted-foreground text-sm italic">
            {t("footer")}
          </p>
        </div>
      </section>

      <CTASection />
      <Footer settings={settings} />
    </main>
  )
}
