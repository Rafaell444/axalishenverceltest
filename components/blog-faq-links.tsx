"use client"

import { Link } from "@/i18n/navigation"
import { ArrowRight, BookOpen, HelpCircle } from "lucide-react"
import { useTranslations } from "next-intl"

export function BlogFaqLinks() {
  const t = useTranslations("blogFaq")

  return (
    <section className="py-10 px-4">
      <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-4 md:gap-6">
        {/* Blog — default card (forest) */}
        <Link
          href="/blog"
          className="group relative overflow-hidden glass-card hover:border-gold/50 transition-all p-7 flex flex-col"
        >
          <div className="flex items-start justify-between mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gold/15 flex items-center justify-center group-hover:bg-gold/25 transition-colors">
              <BookOpen className="w-7 h-7 text-gold" />
            </div>
            <ArrowRight className="w-5 h-5 text-gold/50 group-hover:text-gold group-hover:translate-x-1 transition-all" />
          </div>
          <div className="mt-auto">
            <h3 className="text-2xl font-bold text-[#F4EFE4] mb-2 group-hover:text-gold transition-colors">
              {t("blogTitle")}
            </h3>
            <p className="text-[#B8B8B8] text-sm leading-relaxed">{t("blogDesc")}</p>
          </div>
          <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-gold/5 group-hover:bg-gold/10 transition-colors" />
        </Link>

        {/* FAQ — violet card */}
        <Link
          href="/faq"
          className="group relative overflow-hidden glass-card-faq hover:border-gold/50 transition-all p-7 flex flex-col"
        >
          <div className="flex items-start justify-between mb-6">
            <div className="w-14 h-14 rounded-2xl bg-violet/30 flex items-center justify-center group-hover:bg-violet/50 transition-colors">
              <HelpCircle className="w-7 h-7 text-mist" />
            </div>
            <ArrowRight className="w-5 h-5 text-mist/50 group-hover:text-mist group-hover:translate-x-1 transition-all" />
          </div>
          <div className="mt-auto">
            <h3 className="text-2xl font-bold text-[#F4EFE4] mb-2 group-hover:text-mist transition-colors">
              {t("faqTitle")}
            </h3>
            <p className="text-[#B8B8B8] text-sm leading-relaxed">{t("faqDesc")}</p>
          </div>
          <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-violet/10 group-hover:bg-violet/20 transition-colors" />
        </Link>
      </div>
    </section>
  )
}
