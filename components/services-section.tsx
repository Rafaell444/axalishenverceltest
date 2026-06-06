"use client"

import { useState } from "react"
import { ChevronDown, Brain, Stethoscope, Shield, Server, Activity, Microscope, LucideIcon } from "lucide-react"
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
  const [openId, setOpenId] = useState<number | null>(null)

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
          {t("heading")}
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((service) => {
            const IconComponent = ICON_MAP[service.icon] ?? Stethoscope
            const isOpen = openId === service.id
            return (
              <div key={service.id} className="flex flex-col gap-0">
                <div
                  className="rounded-2xl p-6 transition-all hover:border-gold/50"
                  style={{
                    background: 'linear-gradient(145deg, rgba(27,59,52,0.8), rgba(8,18,15,0.95))',
                    border: '1px solid rgba(201,166,100,0.25)',
                    boxShadow: '0 20px 60px rgba(0,0,0,.45)',
                    backdropFilter: 'blur(20px)',
                  }}
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/15">
                    <IconComponent className="h-6 w-6 text-gold" />
                  </div>
                  <h3 className="mb-2 text-lg font-medium text-[#F4EFE4]">{service.title}</h3>
                  <p className="text-sm leading-relaxed text-[#B8B8B8]">{service.short_description}</p>
                  <button
                    onClick={() => setOpenId(isOpen ? null : service.id)}
                    className="mt-4 flex items-center justify-center w-8 h-8 rounded-full border border-gold/30 text-gold hover:bg-gold/10 transition-all"
                    aria-label="Expand"
                  >
                    <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                {/* Expand panel */}
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: isOpen ? '300px' : '0px' }}
                >
                  <div
                    className="mt-2 rounded-2xl px-5 py-4 text-sm text-[#B8B8B8] leading-relaxed"
                    style={{
                      background: 'rgba(8,18,15,0.45)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      border: '1px solid rgba(201,166,100,0.12)',
                    }}
                  >
                    {service.short_description}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
