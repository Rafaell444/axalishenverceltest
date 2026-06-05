"use client"

import { Link } from "@/i18n/navigation"
import { ArrowRight, BookOpen, HelpCircle, Microscope } from "lucide-react"
import { useTranslations } from "next-intl"

export function BlogFaqLinks() {
  const t = useTranslations("blogFaq")

  return (
    <section className="py-10 px-4">
      <div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-4 md:gap-6">
        {/* Blog — mushroom photo */}
        <Link
          href="/blog"
          className="group relative overflow-hidden rounded-2xl border border-[rgba(201,166,100,0.25)] hover:border-gold/50 transition-all p-7 flex flex-col min-h-[280px]"
          style={{ boxShadow: '0 20px 60px rgba(0,0,0,.45)' }}
        >
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/blog-bg.png')" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08120F]/90 via-[#08120F]/40 to-transparent" />
          <div className="relative z-10 flex items-start justify-between mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gold/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-gold/30 transition-colors">
              <BookOpen className="w-7 h-7 text-gold" />
            </div>
            <ArrowRight className="w-5 h-5 text-gold/50 group-hover:text-gold group-hover:translate-x-1 transition-all" />
          </div>
          <div className="relative z-10 mt-auto">
            <h3 className="text-2xl font-bold text-[#F4EFE4] mb-2 group-hover:text-gold transition-colors">
              {t("blogTitle")}
            </h3>
            <p className="text-[#B8B8B8] text-sm leading-relaxed">{t("blogDesc")}</p>
          </div>
        </Link>

        {/* FAQ — purple mushroom photo */}
        <Link
          href="/faq"
          className="group relative overflow-hidden rounded-2xl border border-[rgba(201,166,100,0.25)] hover:border-gold/50 transition-all p-7 flex flex-col min-h-[280px]"
          style={{ boxShadow: '0 20px 60px rgba(0,0,0,.45)' }}
        >
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/faq-bg.png')" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08120F]/90 via-[#08120F]/40 to-transparent" />
          <div className="relative z-10 flex items-start justify-between mb-6">
            <div className="w-14 h-14 rounded-2xl bg-violet/30 backdrop-blur-sm flex items-center justify-center group-hover:bg-violet/50 transition-colors">
              <HelpCircle className="w-7 h-7 text-mist" />
            </div>
            <ArrowRight className="w-5 h-5 text-mist/50 group-hover:text-mist group-hover:translate-x-1 transition-all" />
          </div>
          <div className="relative z-10 mt-auto">
            <h3 className="text-2xl font-bold text-[#F4EFE4] mb-2 group-hover:text-mist transition-colors">
              {t("faqTitle")}
            </h3>
            <p className="text-[#B8B8B8] text-sm leading-relaxed">{t("faqDesc")}</p>
          </div>
        </Link>

        {/* Science — microscope photo */}
        <Link
          href="/blog"
          className="group relative overflow-hidden rounded-2xl border border-[rgba(201,166,100,0.25)] hover:border-gold/50 transition-all p-7 flex flex-col min-h-[280px]"
          style={{ boxShadow: '0 20px 60px rgba(0,0,0,.45)' }}
        >
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/science-bg.png')" }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08120F]/90 via-[#08120F]/40 to-transparent" />
          <div className="relative z-10 flex items-start justify-between mb-6">
            <div className="w-14 h-14 rounded-2xl bg-teal/30 backdrop-blur-sm flex items-center justify-center group-hover:bg-teal/50 transition-colors">
              <Microscope className="w-7 h-7 text-mist" />
            </div>
            <ArrowRight className="w-5 h-5 text-mist/50 group-hover:text-mist group-hover:translate-x-1 transition-all" />
          </div>
          <div className="relative z-10 mt-auto">
            <h3 className="text-2xl font-bold text-[#F4EFE4] mb-2 group-hover:text-mist transition-colors">
              {t("scienceTitle")}
            </h3>
            <p className="text-[#B8B8B8] text-sm leading-relaxed">{t("scienceDesc")}</p>
          </div>
        </Link>
      </div>
    </section>
  )
}
