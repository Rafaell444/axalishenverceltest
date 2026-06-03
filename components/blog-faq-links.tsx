"use client"

import { Link } from "@/i18n/navigation"
import { ArrowRight, BookOpen, HelpCircle } from "lucide-react"
import { useTranslations } from "next-intl"

export function BlogFaqLinks() {
  const t = useTranslations("nav")

  return (
    <section className="py-10 px-4">
      <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-4 md:gap-6">
        {/* Blog */}
        <Link
          href="/blog"
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-background border border-primary/20 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10 p-7 flex flex-col"
        >
          <div className="flex items-start justify-between mb-6">
            <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
              <BookOpen className="w-7 h-7 text-primary" />
            </div>
            <ArrowRight className="w-5 h-5 text-primary/50 group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>
          <div className="mt-auto">
            <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
              {t("blog")}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              სამეცნიერო სტატიები, ჯანმრთელობის რჩევები და სიახლეები ჩვენი სპეციალისტებისგან.
            </p>
          </div>
          <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors" />
        </Link>

        {/* FAQ */}
        <Link
          href="/faq"
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-500/20 via-violet-500/10 to-background border border-violet-500/20 hover:border-violet-500/50 transition-all hover:shadow-lg hover:shadow-violet-500/10 p-7 flex flex-col"
        >
          <div className="flex items-start justify-between mb-6">
            <div className="w-14 h-14 rounded-2xl bg-violet-500/20 flex items-center justify-center group-hover:bg-violet-500/30 transition-colors">
              <HelpCircle className="w-7 h-7 text-violet-400" />
            </div>
            <ArrowRight className="w-5 h-5 text-violet-400/50 group-hover:text-violet-400 group-hover:translate-x-1 transition-all" />
          </div>
          <div className="mt-auto">
            <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-violet-400 transition-colors">
              {t("faq")}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              პასუხები ყველაზე ხშირად დასმულ კითხვებზე ჩვენი პროდუქციისა და სერვისების შესახებ.
            </p>
          </div>
          <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-violet-500/5 group-hover:bg-violet-500/10 transition-colors" />
        </Link>
      </div>
    </section>
  )
}
