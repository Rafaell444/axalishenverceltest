import { Button } from "@/components/ui/button"
import { Phone, MessageCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "next-intl"

export function CTASection() {
  const t = useTranslations("cta")

  return (
    <section className="py-16 lg:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-[28px] glass-card p-8 md:p-16">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold/6 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#2D5D66]/10 rounded-full blur-[80px]" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left max-w-xl">
              <h2 className="mb-4">
                {t("heading")} <span className="text-gold">{t("headingHighlight")}</span>
              </h2>
              <p className="text-[#B8B8B8] text-lg">{t("description")}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-full px-8 gap-2" asChild>
                <Link href="/contact">
                  <MessageCircle className="w-5 h-5" />
                  {t("contactBtn")}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-8 gap-2">
                <Phone className="w-5 h-5" />
                +995 555 123 456
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
