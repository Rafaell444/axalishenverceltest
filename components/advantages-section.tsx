"use client"

import { useState } from "react"
import { ChevronDown, Brain, Stethoscope, Shield } from "lucide-react"
import { useTranslations } from "next-intl"

const ADVANTAGES = [
  { icon: Brain, image: "/images/blog-bg.png", titleKey: "ds1title", descKey: "ds1desc" },
  { icon: Stethoscope, image: "/images/faq-bg.png", titleKey: "ds2title", descKey: "ds2desc" },
  { icon: Shield, image: "/images/science-bg.png", titleKey: "ds3title", descKey: "ds3desc" },
]

export function AdvantagesSection() {
  const t = useTranslations("services")
  const [openIndex, setOpenIndex] = useState<number | null>(null)

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
          {ADVANTAGES.map((item, index) => {
            const Icon = item.icon
            const isOpen = openIndex === index
            return (
              <div key={index} className="flex flex-col gap-0">
                <div
                  className="group relative overflow-hidden rounded-2xl border border-[rgba(201,166,100,0.25)] hover:border-gold/50 transition-all min-h-[300px] flex flex-col"
                  style={{ boxShadow: '0 20px 60px rgba(0,0,0,.45)' }}
                >
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${item.image}')` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08120F]/95 via-[#08120F]/50 to-transparent" />
                  <div className="relative z-10 p-6 mt-auto">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gold/15 backdrop-blur-sm">
                      <Icon className="h-5 w-5 text-gold" />
                    </div>
                    <h3 className="mb-2 text-lg font-medium text-[#F4EFE4]">{t(item.titleKey)}</h3>
                    <p className="text-sm leading-relaxed text-[#B8B8B8]">{t(item.descKey)}</p>
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="mt-4 flex items-center justify-center w-8 h-8 rounded-full border border-gold/30 text-gold hover:bg-gold/10 transition-all"
                      aria-label="Expand"
                    >
                      <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
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
                    {t(item.descKey)}
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
