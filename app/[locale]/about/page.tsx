import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/cta-section"
import { fetchSettings } from "@/lib/api"
import { getTranslations } from "next-intl/server"
import { ImageIcon } from "lucide-react"

export default async function AboutPage() {
  const [settings, t] = await Promise.all([
    fetchSettings().catch(() => null),
    getTranslations("about"),
  ])

  return (
    <main className="min-h-screen">
      <Header settings={settings} />

      <section className="pt-16 md:pt-24 pb-16 md:pb-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F4EFE4] mb-4">
              {t("heading")} <span className="text-gold">{t("headingHighlight")}</span>
            </h1>
          </div>

          {/* Image placeholder */}
          <div className="w-full aspect-[16/7] rounded-2xl mb-12 flex items-center justify-center" style={{ background: 'rgba(8,18,15,0.5)', border: '1px solid rgba(201,166,100,0.15)' }}>
            <ImageIcon className="w-16 h-16 text-[#7A7A7A]/50" />
          </div>

          <div className="space-y-6 text-[#B8B8B8] text-lg leading-relaxed">
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
