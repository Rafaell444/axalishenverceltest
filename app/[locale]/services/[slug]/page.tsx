import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/cta-section"
import { ArrowLeft, Clock, Check, ArrowRight, Brain, Stethoscope, Activity, Microscope } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import { fetchSettings, fetchService, fetchServices } from "@/lib/api"
import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"
import type { LucideIcon } from "lucide-react"

const ICON_MAP: Record<string, LucideIcon> = { Brain, Activity, Stethoscope, Microscope }

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug } = await params
  const [settings, t] = await Promise.all([
    fetchSettings().catch(() => null),
    getTranslations("servicesPage"),
  ])

  const DEFAULT_SERVICES_MAP: Record<string, {
    title: string; short_description: string; full_description: string;
    duration: string; icon: string; features: { id: number; text: string }[]
  }> = {
    "lions-mane": { title: t("ds1title"), short_description: t("ds1short"), full_description: t("ds1full"), duration: t("ds1dur"), icon: "Brain", features: [{ id: 1, text: t("ds1f1") }, { id: 2, text: t("ds1f2") }, { id: 3, text: t("ds1f3") }, { id: 4, text: t("ds1f4") }] },
    "reishi":     { title: t("ds2title"), short_description: t("ds2short"), full_description: t("ds2full"), duration: t("ds2dur"), icon: "Activity", features: [{ id: 1, text: t("ds2f1") }, { id: 2, text: t("ds2f2") }, { id: 3, text: t("ds2f3") }, { id: 4, text: t("ds2f4") }] },
    "cordyceps":  { title: t("ds3title"), short_description: t("ds3short"), full_description: t("ds3full"), duration: t("ds3dur"), icon: "Stethoscope", features: [{ id: 1, text: t("ds3f1") }, { id: 2, text: t("ds3f2") }, { id: 3, text: t("ds3f3") }, { id: 4, text: t("ds3f4") }] },
  }

  const service = await fetchService(slug).catch(() => null)
  const defaultService = DEFAULT_SERVICES_MAP[slug]

  if (!service && !defaultService) notFound()

  const title = service?.title ?? defaultService.title
  const short_description = service?.short_description ?? defaultService.short_description
  const full_description = service?.full_description ?? defaultService.full_description
  const duration = service?.duration ?? defaultService.duration
  const icon = service?.icon ?? defaultService.icon
  const features = service?.features ?? defaultService.features

  const IconComponent = ICON_MAP[icon] ?? Stethoscope

  const allServices = await fetchServices().catch(() => [])
  const related = allServices.filter((s) => s.slug !== slug).slice(0, 3)

  return (
    <main className="min-h-screen">
      <Header settings={settings} />

      <section className="pt-24 md:pt-32 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("backToServices")}
          </Link>

          <div className="grid lg:grid-cols-5 gap-8 glass-card rounded-2xl overflow-hidden">
            <div className="lg:col-span-2 bg-gradient-to-br from-gold/20 to-gold/5 p-8 flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 rounded-2xl bg-gold/20 flex items-center justify-center mb-6">
                <IconComponent className="w-12 h-12 text-gold" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-3">{title}</h1>
              <p className="text-muted-foreground text-sm mb-6">{short_description}</p>
              {duration && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 text-gold" />
                  {duration}
                </div>
              )}
            </div>

            <div className="lg:col-span-3 p-8">
              {full_description && (
                <div
                  className="text-foreground/80 mb-8 leading-relaxed prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: full_description }}
                />
              )}

              {features && features.length > 0 && (
                <>
                  <h3 className="font-semibold text-foreground mb-4">{t("includes")}</h3>
                  <ul className="grid md:grid-cols-2 gap-3 mb-8">
                    {features.map((f) => (
                      <li key={f.id} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-gold shrink-0" />
                        {f.text}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <div className="flex flex-wrap gap-3">
                <Button className="bg-gold text-primary-foreground hover:bg-gold/90 rounded-full" asChild>
                  <Link href="/contact">
                    {t("book")}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-14 px-4 border-t border-gold/10 glass">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl font-bold text-foreground mb-7">{t("otherServices")}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((s) => {
                const Icon = ICON_MAP[s.icon] ?? Stethoscope
                return (
                  <Link key={s.id} href={`/services/${s.slug}` as "/services"}>
                    <div className="group glass-card rounded-xl p-5 hover:border-gold/30 transition-colors h-full">
                      <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center mb-3 group-hover:bg-gold/20 transition-colors">
                        <Icon className="w-5 h-5 text-gold" />
                      </div>
                      <h3 className="font-semibold text-foreground group-hover:text-gold transition-colors mb-1">{s.title}</h3>
                      <p className="text-muted-foreground text-xs line-clamp-2">{s.short_description}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      <CTASection />
      <Footer settings={settings} />
    </main>
  )
}
