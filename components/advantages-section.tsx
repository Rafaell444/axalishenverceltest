import { ArrowRight, Brain, Stethoscope, Shield, Server, Activity, Microscope, LucideIcon } from "lucide-react"
import { Link } from "@/i18n/navigation"
import { getTranslations } from "next-intl/server"
import type { Advantage } from "@/lib/api"

const ICON_MAP: Record<string, LucideIcon> = {
  Brain, Stethoscope, Shield, Server, Activity, Microscope,
}

const BG_IMAGES = [
  "/images/blog-bg.png",
  "/images/faq-bg.png",
  "/images/science-bg.png",
]

interface Props {
  advantages: Advantage[]
}

export async function AdvantagesSection({ advantages }: Props) {
  const t = await getTranslations("services")
  const items = advantages.slice(0, 3)

  if (items.length === 0) return null

  return (
    <section className="py-16 lg:py-24 px-4">
      <div className="container mx-auto lg:px-8">
        <h2 className="mb-3 text-center text-sm uppercase tracking-widest text-gold">
          Უპირატესობები
        </h2>
        <h3 className="mb-8 md:mb-12 text-center text-xl sm:text-2xl font-semibold text-[#F4EFE4] md:text-3xl">
          What is <span className="text-gold">Mushroom</span>
        </h3>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => {
            const Icon = ICON_MAP[item.icon] ?? Brain
            const bgImage = item.image_url ?? BG_IMAGES[index % BG_IMAGES.length]
            const isUrl = bgImage.startsWith("http") || bgImage.startsWith("/images/")
            return (
              <Link
                key={item.id}
                href={`/advantages/${item.slug}` as any}
                className="group relative overflow-hidden rounded-2xl border border-[rgba(201,166,100,0.25)] hover:border-gold/50 transition-all min-h-[300px] flex flex-col"
                style={{ boxShadow: '0 20px 60px rgba(0,0,0,.45)' }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: isUrl ? `url('${bgImage}')` : undefined }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08120F]/95 via-[#08120F]/50 to-transparent" />
                <div className="relative z-10 p-6 mt-auto">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gold/15 backdrop-blur-sm">
                    <Icon className="h-5 w-5 text-gold" />
                  </div>
                  <h3 className="mb-2 text-lg font-medium text-[#F4EFE4]">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-[#B8B8B8] mb-4">{item.short_description}</p>
                  <div className="flex items-center gap-1 text-sm text-gold group-hover:text-[#D9C7A3] transition-colors">
                    {t("learnMore")}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
