import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
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

      <div className="container mx-auto px-4 py-12 sm:py-16 lg:px-8 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="max-w-xl text-center lg:text-left mx-auto lg:mx-0">
            <h1 className="text-balance text-3xl font-bold leading-tight tracking-tight text-[#F4EFE4] sm:text-4xl md:text-5xl lg:text-6xl">
              {title}{" "}
              <span className="text-gold">{titleHighlight}</span>
            </h1>
            <p className="mt-5 text-pretty text-base leading-relaxed text-[#B8B8B8] sm:text-lg">
              {description}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
              <Button size="lg" className="bg-gold hover:bg-gold/90 text-[#08120F] font-semibold w-full sm:w-auto" asChild>
                <Link href={ctaPrimaryLink}>{ctaPrimaryText}</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gold/30 text-gold hover:bg-gold/10 w-full sm:w-auto"
                asChild
              >
                <Link href={ctaSecondaryLink}>{ctaSecondaryText}</Link>
              </Button>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[300px] sm:max-w-[360px] md:max-w-[420px] aspect-[3/4] overflow-hidden rounded-2xl mx-auto ring-1 ring-gold/20">
              <div className="absolute inset-0 bg-gradient-to-t from-[#08120F] via-transparent to-transparent z-10" />
              <Image
                src={imageUrl}
                alt={tr.imageAlt}
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
