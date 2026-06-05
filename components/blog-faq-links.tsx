"use client"

import { Link } from "@/i18n/navigation"
import { ArrowRight, BookOpen, HelpCircle, Microscope } from "lucide-react"
import { useTranslations } from "next-intl"

export function BlogFaqLinks() {
  const t = useTranslations("blogFaq")

  const cards = [
    {
      href: "/blog" as const,
      className: "glass-card-blog",
      icon: BookOpen,
      iconColor: "text-[#C9A664]",
      iconBg: "bg-[#C9A664]/15",
      title: t("blogTitle"),
      desc: t("blogDesc"),
    },
    {
      href: "/faq" as const,
      className: "glass-card-faq",
      icon: HelpCircle,
      iconColor: "text-[#7FA6A1]",
      iconBg: "bg-[#6E4A7E]/25",
      title: t("faqTitle"),
      desc: t("faqDesc"),
    },
    {
      href: "/blog" as const,
      className: "glass-card-science",
      icon: Microscope,
      iconColor: "text-[#7FA6A1]",
      iconBg: "bg-[#2D5D66]/30",
      title: t("scienceTitle") ?? "Science",
      desc: t("scienceDesc") ?? "Studies, data and scientific insights",
    },
  ]

  return (
    <section className="py-16 md:py-24 px-6">
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <Link
              key={card.title}
              href={card.href}
              className={`group relative ${card.className} p-8 flex flex-col min-h-[420px] lg:min-h-[460px]`}
            >
              <div className="flex items-start justify-between mb-8">
                <div className={`w-14 h-14 rounded-2xl ${card.iconBg} flex items-center justify-center`}>
                  <Icon className={`w-7 h-7 ${card.iconColor}`} />
                </div>
                <ArrowRight className="w-5 h-5 text-[#7A7A7A] group-hover:text-gold group-hover:translate-x-1 transition-all duration-300" />
              </div>

              <div className="mt-auto">
                <h3 className="text-[#F4EFE4] mb-3 group-hover:text-gold transition-colors duration-300">
                  {card.title}
                </h3>
                <p className="text-[#B8B8B8] text-[15px] leading-relaxed">{card.desc}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
