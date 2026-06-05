import Image from "next/image"
import type { HeroData } from "@/lib/api"

interface Translations {
  title: string
  titleHighlight: string
  description: string
  ctaPrimary: string
  ctaSecondary: string
  imageAlt: string
}

interface Props {
  data: HeroData | null
  translations: Translations
}

export function HeroSection({ data, translations: tr }: Props) {
  const title = data?.title || tr.title
  const titleHighlight = data?.title_highlight || tr.titleHighlight
  const description = data?.description || tr.description
  const ctaPrimaryText = data?.cta_primary_text || tr.ctaPrimary
  const ctaPrimaryLink = data?.cta_primary_link || "/contact"
  const ctaSecondaryText = data?.cta_secondary_text || tr.ctaSecondary
  const ctaSecondaryLink = data?.cta_secondary_link || "/about"
  const imageUrl = data?.image_url || "/images/hero-woman.jpg"

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute right-0 top-1/4 h-[600px] w-[600px] -translate-y-1/2 translate-x-1/3 rounded-full bg-gold/10 blur-[150px]" />
      <div className="pointer-events-none absolute left-0 bottom-0 h-[400px] w-[400px] translate-y-1/3 -translate-x-1/3 rounded-full bg-violet/10 blur-[120px]" />

      <div className="container mx-auto px-4 py-10 sm:py-16 lg:px-8 lg:py-24">
        <div className="grid items-center gap-6 sm:gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="max-w-xl text-center lg:text-left mx-auto lg:mx-0 order-2 lg:order-1">
            <h1 className="text-balance text-2xl font-bold leading-tight tracking-tight text-[#F4EFE4] sm:text-3xl md:text-4xl lg:text-5xl">
              {title}{" "}
              <span className="text-gold text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px]">{titleHighlight}</span>
            </h1>
            <p className="mt-4 sm:mt-5 text-pretty text-sm leading-relaxed text-[#B8B8B8] sm:text-base md:text-lg">
              {description}
            </p>
          </div>

          <div className="relative flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative w-[180px] h-[180px] sm:w-[260px] sm:h-[260px] md:w-[320px] md:h-[320px] lg:w-[400px] lg:h-[400px]">
              <Image
                src={imageUrl}
                alt={tr.imageAlt}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
