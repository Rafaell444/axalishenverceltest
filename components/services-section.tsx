import { ArrowRight, Brain, Stethoscope, Shield, Server, Activity, Microscope, LucideIcon } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import type { Service } from "@/lib/api"

const ICON_MAP: Record<string, LucideIcon> = {
  Brain, Stethoscope, Shield, Server, Activity, Microscope,
}

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
    <section className="py-16 lg:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="mb-10 md:mb-14 text-center">
          {t("heading")}
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((service) => {
            const IconComponent = ICON_MAP[service.icon] ?? Stethoscope
            return (
              <div
                key={service.id}
                className="group glass-card p-7 transition-all duration-300 hover:border-[rgba(201,166,100,.45)]"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10">
                  <IconComponent className="h-6 w-6 text-gold" />
                </div>
                <h3 className="mb-3 text-[#F4EFE4]">{service.title}</h3>
                <p className="mb-5 text-[15px] leading-relaxed text-[#B8B8B8]">{service.short_description}</p>
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-1.5 text-[15px] text-gold transition-colors hover:text-ivory"
                >
                  {t("learnMore")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
