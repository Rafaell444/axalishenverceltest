import { ArrowRight, Brain, Stethoscope, Shield, Server, Activity, Microscope, LucideIcon } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import type { Service } from "@/lib/api"

const ICON_MAP: Record<string, LucideIcon> = {
  Brain, Stethoscope, Shield, Server, Activity, Microscope,
}

const SERVICE_IMAGES = [
  "/images/blog-bg.png",
  "/images/faq-bg.png",
  "/images/science-bg.png",
]

interface Props {
  services: Service[]
}

export function ServicesSection({ services }: Props) {
  const t = useTranslations("services")
  const DEFAULT_SERVICES: Service[] = [
    { id: 1, icon: "Brain", title: t("ds1title"), slug: "functional-mushrooms", short_description: t("ds1desc"), price: "", duration: "", is_featured: true, order: 0, image_url: null },
    { id: 2, icon: "Stethoscope", title: t("ds2title"), slug: "bio-supplements", short_description: t("ds2desc"), price: "", duration: "", is_featured: true, order: 1, image_url: null },
    { id: 3, icon: "Shield", title: t("ds3title"), slug: "wellness-consultation", short_description: t("ds3desc"), price: "", duration: "", is_featured: true, order: 2, image_url: null },
  ]
  const items = services.length > 0 ? services : DEFAULT_SERVICES

  return (
    <section className="py-16 lg:py-24 px-4">
      <div className="container mx-auto lg:px-8">
        <h2 className="mb-8 md:mb-12 text-center text-xl sm:text-2xl font-semibold text-[#F4EFE4] md:text-3xl">
          What is <span className="text-gold">Mushroom</span>
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((service, index) => {
            const IconComponent = ICON_MAP[service.icon] ?? Stethoscope
            const bgImage = SERVICE_IMAGES[index % SERVICE_IMAGES.length]
            return (
              <div
                key={service.id}
                className="group relative overflow-hidden rounded-2xl border border-[rgba(201,166,100,0.25)] hover:border-gold/50 transition-all min-h-[300px] flex flex-col"
                style={{ boxShadow: '0 20px 60px rgba(0,0,0,.45)' }}
              >
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${bgImage}')` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08120F]/95 via-[#08120F]/50 to-transparent" />
                <div className="relative z-10 p-6 mt-auto">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gold/15 backdrop-blur-sm">
                    <IconComponent className="h-5 w-5 text-gold" />
                  </div>
                  <h3 className="mb-2 text-lg font-medium text-[#F4EFE4]">{service.title}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-[#B8B8B8]">{service.short_description}</p>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1 text-sm text-gold transition-colors hover:text-[#D9C7A3]"
                  >
                    {t("learnMore")}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
