import type { Metadata } from "next"
import { Header } from "@/components/header"
import { buildMetadata } from "@/lib/seo"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/cta-section"
import { fetchSettings, fetchAdvantage } from "@/lib/api"
import { notFound } from "next/navigation"
import { getLocale } from "next-intl/server"
import { ImageIcon } from "lucide-react"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}): Promise<Metadata> {
  const { slug, locale } = await params
  const advantage = await fetchAdvantage(slug, locale).catch(() => null)
  return buildMetadata(advantage, {
    title: advantage?.title || slug,
    description: advantage?.short_description || "",
  })
}

export default async function AdvantageDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug } = await params
  const locale = await getLocale()

  const [settings, advantage] = await Promise.all([
    fetchSettings().catch(() => null),
    fetchAdvantage(slug, locale).catch(() => null),
  ])

  if (!advantage) notFound()

  const hasVideo = !!advantage.video_url
  const hasImage = !!advantage.image_url

  return (
    <main className="min-h-screen">
      <Header settings={settings} />

      <section className="pt-16 md:pt-24 pb-16 md:pb-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="w-full rounded-2xl overflow-hidden mb-10" style={{ border: '1px solid rgba(201,166,100,0.15)' }}>
            {hasVideo ? (
              <video
                src={advantage.video_url!}
                controls
                autoPlay
                muted
                loop
                playsInline
                className="w-full max-h-[520px] object-cover"
              />
            ) : hasImage ? (
              <img
                src={advantage.image_url!}
                alt={advantage.title}
                className="w-full max-h-[520px] object-cover"
              />
            ) : (
              <div
                className="w-full aspect-[16/7] flex items-center justify-center"
                style={{ background: 'rgba(8,18,15,0.5)' }}
              >
                <ImageIcon className="w-16 h-16 text-[#7A7A7A]/50" />
              </div>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F4EFE4] mb-6">
            {advantage.title}
          </h1>

          {advantage.short_description && (
            <p className="text-lg text-[#B8B8B8] leading-relaxed mb-8 border-l-2 border-gold/40 pl-4">
              {advantage.short_description}
            </p>
          )}

          {advantage.full_description && (
            <div
              className="prose prose-invert prose-headings:text-[#F4EFE4] prose-p:text-[#B8B8B8] prose-p:leading-relaxed prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-8 prose-h2:mb-3 max-w-none text-[#B8B8B8]"
              dangerouslySetInnerHTML={{ __html: advantage.full_description }}
            />
          )}
        </div>
      </section>

      <CTASection />
      <Footer settings={settings} />
    </main>
  )
}
