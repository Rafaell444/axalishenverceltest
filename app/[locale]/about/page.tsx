import type { Metadata } from "next"
import { Header } from "@/components/header"
import { buildMetadata } from "@/lib/seo"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/cta-section"
import { fetchSettings, fetchAbout } from "@/lib/api"
import { getLocale, getTranslations } from "next-intl/server"
import { ImageIcon } from "lucide-react"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const [about, t] = await Promise.all([
    fetchAbout(locale).catch(() => null),
    getTranslations({ locale, namespace: "about" }),
  ])
  return buildMetadata(about, {
    title: `${t("heading")} ${t("headingHighlight")}`,
    description: t("p1"),
  })
}

export default async function AboutPage() {
  const locale = await getLocale()
  const [settings, about, t] = await Promise.all([
    fetchSettings().catch(() => null),
    fetchAbout(locale).catch(() => null),
    getTranslations("about"),
  ])

  const heading = about?.hero_title_highlight
    ? (about.hero_title || t("heading"))
    : t("heading")
  const headingHighlight = about?.hero_title_highlight || t("headingHighlight")
  const paragraphs = [
    about?.hero_subtitle || t("p1"),
    about?.mission || t("p2"),
    about?.vision || t("p3"),
  ].filter(Boolean)

  const hasVideo = !!about?.video_url
  const hasImage = !!about?.image_url

  return (
    <main className="min-h-screen">
      <Header settings={settings} />

      <section className="pt-16 md:pt-24 pb-16 md:pb-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F4EFE4] mb-4">
              {heading}{" "}
              <span className="text-gold">{headingHighlight}</span>
            </h1>
          </div>

          <div className="w-full rounded-2xl overflow-hidden mb-12" style={{ border: '1px solid rgba(201,166,100,0.15)' }}>
            {hasVideo ? (
              <video
                src={about!.video_url!}
                controls
                autoPlay
                muted
                loop
                playsInline
                className="w-full max-h-[520px] object-cover"
              />
            ) : hasImage ? (
              <img
                src={about!.image_url!}
                alt={`${heading} ${headingHighlight}`}
                className="w-full max-h-[520px] object-cover"
              />
            ) : (
              <div className="w-full aspect-[16/7] flex items-center justify-center" style={{ background: 'rgba(8,18,15,0.5)' }}>
                <ImageIcon className="w-16 h-16 text-[#7A7A7A]/50" />
              </div>
            )}
          </div>

          <div className="space-y-6 text-[#B8B8B8] text-lg leading-relaxed">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer settings={settings} />
    </main>
  )
}
