import { Button } from "@/components/ui/button"
import { Phone, MessageCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "next-intl"

export function CTASection() {
  const t = useTranslations("cta")

  return (
    <section className="py-16 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gold/15 via-[#132a25] to-teal/10 border border-gold/20 p-6 sm:p-8 md:p-16">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal/5 rounded-full blur-2xl" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left max-w-xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t("heading")} <span className="text-primary">{t("headingHighlight")}</span>
              </h2>
              <p className="text-muted-foreground text-lg">{t("description")}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 gap-2"
                asChild
              >
                <Link href="/contact">
                  <MessageCircle className="w-5 h-5" />
                  {t("contactBtn")}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-foreground/20 hover:bg-foreground/10 rounded-full px-8 gap-2"
              >
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
