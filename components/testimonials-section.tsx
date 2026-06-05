import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
import type { Testimonial } from "@/lib/api"

const MAX = 8

const TS_CSS = Array.from({ length: MAX }, (_, i) => `
  .ts:has(#ts${i}:checked) .ts-p${i}.ts-card  { display: block !important; }
  .ts:has(#ts${i}:checked) .ts-p${i}.ts-arrow { display: flex  !important; }
  .ts:has(#ts${i}:checked) label[for="ts${i}"].ts-dot { background: #C9A664 !important; width: 1.5rem !important; }
`).join("") + `
  .ts-card  { display: none !important; }
  .ts-arrow { display: none !important; align-items: center; justify-content: center; }
`

interface Props {
  testimonials: Testimonial[]
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 justify-center mb-6">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={cn("w-5 h-5", i < rating ? "fill-amber-400 text-amber-400" : "text-border")} />
      ))}
    </div>
  )
}

export function TestimonialsSection({ testimonials }: Props) {
  const t = useTranslations("testimonials")
  const DEFAULT_TESTIMONIALS: Testimonial[] = [
    { id: 1, name: t("d1name"), role: t("role"), content: t("d1content"), avatar_url: null, rating: 5, order: 0 },
    { id: 2, name: t("d2name"), role: t("role"), content: t("d2content"), avatar_url: null, rating: 5, order: 1 },
    { id: 3, name: t("d3name"), role: t("role"), content: t("d3content"), avatar_url: null, rating: 5, order: 2 },
  ]
  const items = (testimonials.length > 0 ? testimonials : DEFAULT_TESTIMONIALS).slice(0, MAX)
  const n = items.length

  return (
    <section className="py-16 md:py-20 px-4">
      {/* eslint-disable-next-line react/no-danger */}
      <style dangerouslySetInnerHTML={{ __html: TS_CSS }} />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("heading")} <span className="text-primary">{t("headingHighlight")}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t("description")}</p>
        </div>

        <div className="ts">
          {items.map((_, i) => (
            <input key={i} type="radio" name="ts" id={`ts${i}`} defaultChecked={i === 0} className="sr-only" />
          ))}

          {items.map((item, i) => (
            <div key={item.id} className={`ts-card ts-p${i}`}>
              <div className="glass-card p-7 md:p-12 relative overflow-hidden">
                <Quote className="absolute top-5 left-5 md:top-7 md:left-7 w-9 h-9 md:w-14 md:h-14 text-gold/15" />
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 text-center">
                  <Stars rating={item.rating ?? 5} />
                  <p className="text-base md:text-xl text-foreground/90 mb-8 leading-relaxed max-w-2xl mx-auto">
                    &ldquo;{item.content}&rdquo;
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold to-teal flex items-center justify-center text-[#08120F] font-bold text-lg border-2 border-gold/40">
                      {item.name.charAt(0)}
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-foreground">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-center gap-4 mt-8">
            {items.map((_, i) => {
              const prevIdx = (i - 1 + n) % n
              return (
                <label
                  key={`prev-${i}`}
                  htmlFor={`ts${prevIdx}`}
                  className={cn("ts-arrow", `ts-p${i}`, "w-10 h-10 rounded-full border border-border", "cursor-pointer hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors text-foreground")}
                  aria-label={t("prev")}
                >
                  <ChevronLeft className="w-5 h-5" />
                </label>
              )
            })}

            <div className="flex items-center gap-2">
              {items.map((_, i) => (
                <label key={i} htmlFor={`ts${i}`} className="ts-dot w-2 h-2 rounded-full bg-border cursor-pointer transition-all" aria-label={`${t("slide")} ${i + 1}`} />
              ))}
            </div>

            {items.map((_, i) => {
              const nextIdx = (i + 1) % n
              return (
                <label
                  key={`next-${i}`}
                  htmlFor={`ts${nextIdx}`}
                  className={cn("ts-arrow", `ts-p${i}`, "w-10 h-10 rounded-full border border-border", "cursor-pointer hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors text-foreground")}
                  aria-label={t("next")}
                >
                  <ChevronRight className="w-5 h-5" />
                </label>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
