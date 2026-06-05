"use client"

import { Link } from "@/i18n/navigation"
import { ArrowRight, BookOpen, HelpCircle, Microscope } from "lucide-react"
import { useTranslations } from "next-intl"

export function BlogFaqLinks() {
  const t = useTranslations("blogFaq")

  const items = [
    { href: "/blog" as const, icon: BookOpen, title: t("blogTitle"), desc: t("blogDesc"), iconColor: "text-[#C9A664]", iconBg: "bg-[#475A3F]/40" },
    { href: "/faq" as const, icon: HelpCircle, title: t("faqTitle"), desc: t("faqDesc"), iconColor: "text-[#7FA6A1]", iconBg: "bg-[#6E4A7E]/30" },
    { href: "/blog" as const, icon: Microscope, title: t("scienceTitle"), desc: t("scienceDesc"), iconColor: "text-[#7FA6A1]", iconBg: "bg-[#2D5D66]/30" },
  ]

  return (
    <section className="py-6 px-4">
      <div
        className="mx-auto rounded-2xl px-6 py-5 md:px-10 md:py-6"
        style={{
          maxWidth: '1160px',
          background: 'rgba(8,18,15,0.45)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(201,166,100,0.12)',
        }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
          {items.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.title} href={item.href} className="group flex items-center gap-3 md:gap-4">
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full ${item.iconBg} flex items-center justify-center shrink-0`}>
                  <Icon className={`w-5 h-5 md:w-6 md:h-6 ${item.iconColor}`} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[#F4EFE4] font-semibold text-sm md:text-base leading-tight group-hover:text-gold transition-colors">{item.title}</h3>
                  <p className="text-[#7A7A7A] text-xs md:text-sm leading-snug line-clamp-2">{item.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#7A7A7A] group-hover:text-gold group-hover:translate-x-1 transition-all shrink-0 hidden sm:block" />
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
