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
    <section className="relative overflow-hidden py-20 sm:py-28 lg:py-36">
      <div className="pointer-events-none absolute right-0 top-1/4 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/4 rounded-full bg-[#C9A664]/8 blur-[160px]" />
      <div className="pointer-events-none absolute left-0 bottom-0 h-[300px] w-[300px] translate-y-1/4 -translate-x-1/4 rounded-full bg-[#3B1E4D]/15 blur-[120px]" />

      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          <div className="max-w-xl mx-auto lg:mx-0">
            <h1 className="mb-8">
              {title}{" "}
              <span className="text-gold">{titleHighlight}</span>
            </h1>
            <p className="text-[#B8B8B8] text-lg leading-relaxed mb-10 max-w-md">
              {description}
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="px-8" asChild>
                <Link href={ctaPrimaryLink}>{ctaPrimaryText}</Link>
              </Button>
              <Button size="lg" variant="outline" className="px-8" asChild>
                <Link href={ctaSecondaryLink}>{ctaSecondaryText}</Link>
              </Button>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[340px] sm:max-w-[400px] aspect-[3/4] overflow-hidden rounded-3xl ring-1 ring-[#C9A664]/20">
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
