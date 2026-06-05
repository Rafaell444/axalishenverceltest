"use client"

import { Link } from "@/i18n/navigation"
import { ArrowRight, BookOpen, HelpCircle } from "lucide-react"
import { useTranslations } from "next-intl"

export function BlogFaqLinks() {
  const t = useTranslations("blogFaq")

  return (
    <section className="py-10 px-4">
      <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-4 md:gap-6">
        {/* Blog — gold/forest tones */}
        <Link
          href="/blog"
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1B3B34]/80 via-[#1B3B34]/40 to-transparent border border-gold/20 hover:border-gold/50 transition-all hover:shadow-lg hover:shadow-gold/10 p-7 flex flex-col glass-card"
        >
          <div className="flex items-start justify-between mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gold/15 flex items-center justify-center group-hover:bg-gold/25 transition-colors">
              <BookOpen className="w-7 h-7 text-gold" />
            </div>
            <ArrowRight className="w-5 h-5 text-gold/50 group-hover:text-gold group-hover:translate-x-1 transition-all" />
          </div>
          <div className="mt-auto">
            <h3 className="text-2xl font-bold text-offwhite mb-2 group-hover:text-gold transition-colors">
              {t("blogTitle")}
            </h3>
            <p className="text-sage text-sm leading-relaxed">{t("blogDesc")}</p>
          </div>
          <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-gold/5 group-hover:bg-gold/10 transition-colors" />
        </Link>

        {/* FAQ — purple tones */}
        <Link
          href="/faq"
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-deep/60 via-purple/30 to-transparent border border-purple/20 hover:border-purple/50 transition-all hover:shadow-lg hover:shadow-purple/10 p-7 flex flex-col glass-card"
        >
          <div className="flex items-start justify-between mb-6">
            <div className="w-14 h-14 rounded-2xl bg-purple/20 flex items-center justify-center group-hover:bg-purple/30 transition-colors">
              <HelpCircle className="w-7 h-7 text-purple" />
            </div>
            <ArrowRight className="w-5 h-5 text-purple/50 group-hover:text-purple group-hover:translate-x-1 transition-all" />
          </div>
          <div className="mt-auto">
            <h3 className="text-2xl font-bold text-offwhite mb-2 group-hover:text-purple transition-colors">
              {t("faqTitle")}
            </h3>
            <p className="text-cream text-sm leading-relaxed">{t("faqDesc")}</p>
          </div>
          <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-purple/5 group-hover:bg-purple/10 transition-colors" />
        </Link>
      </div>
    </section>
  )
}
