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

const DEFAULT_SERVICES_MAP: Record<string, {
  title: string; short_description: string; full_description: string;
  duration: string; icon: string;
  features: { id: number; text: string }[]
}> = {
  neurology: {
    title: "ნეიროლოგია",
    short_description: "თავის ტვინისა და ნერვული სისტემის სრული დიაგნოსტიკა და მკურნალობა.",
    full_description: `<p>ჩვენი ნეიროლოგიის განყოფილება გთავაზობთ ყველა ასაკის პაციენტებისთვის სრულ ნევროლოგიურ შეფასებასა და მკურნალობას. ვიყენებთ უახლეს დიაგნოსტიკურ მეთოდებს — EEG, EMG, ნეიროვიზუალიზაცია.</p>
<p>ჩვენი ნეიროლოგები სპეციალიზირებული არიან ეპილეფსიის, მიგრენის, ინსულტის შემდგომი რეაბილიტაციის, მულტიპლური სკლეროზისა და ნეიროდეგენერაციული დაავადებების სფეროში.</p>`,
    duration: "60 წუთი",
    icon: "Brain",
    features: [
      { id: 1, text: "EEG დიაგნოსტიკა" }, { id: 2, text: "MRI ინტერპრეტაცია" },
      { id: 3, text: "ეპილეფსიის მართვა" }, { id: 4, text: "მიგრენის თერაპია" },
      { id: 5, text: "ინსულტის რეაბილიტაცია" }, { id: 6, text: "ნერვული სისტემის დარღვევები" },
    ],
  },
  psychology: {
    title: "ფსიქოლოგია და ფსიქოთერაპია",
    short_description: "ფსიქოლოგიური კონსულტაცია, CBT თერაპია და ფსიქიკური ჯანმრთელობის მხარდაჭერა.",
    full_description: `<p>ჩვენი სერტიფიცირებული ფსიქოლოგები გთავაზობენ ინდივიდუალურ და ჯგუფურ თერაპიას. ვიყენებთ მტკიცებულებებზე დაფუძნებულ მეთოდებს, მათ შორის კოგნიტური-ბიჰევიორულ თერაპიას (CBT), EMDR-ს და ACT-ს.</p>
<p>პირველი კონსულტაცია შეფასებაა — გავარკვევთ თქვენს საჭიროებებს და შევქმნით ინდივიდუალურ სამკურნალო გეგმას.</p>`,
    duration: "50 წუთი",
    icon: "Activity",
    features: [
      { id: 1, text: "ინდივიდუალური კონსულტაცია" }, { id: 2, text: "კოგნიტური-ბიჰევიორული თერაპია" },
      { id: 3, text: "შფოთვის მართვა" }, { id: 4, text: "დეპრესიის მკურნალობა" },
      { id: 5, text: "ოჯახური კონსულტაცია" }, { id: 6, text: "ბავშვთა ფსიქოლოგია" },
    ],
  },
  "family-medicine": {
    title: "ოჯახის მედიცინა",
    short_description: "ყოვლისმომცველი პირველადი ჯანდაცვა მთელი ოჯახისთვის.",
    full_description: `<p>ჩვენი ოჯახის ექიმები უზრუნველყოფენ სრულ პირველად სამედიცინო მომსახურებას. გვჯერა, რომ ჯანმრთელობა უნდა იყოს პრევენციული, არა მხოლოდ სამკურნალო.</p>
<p>ოჯახის ექიმი გიცნობთ, გესმის თქვენი სამედიცინო ისტორია და ოჯახის ჯანმრთელობის კონტექსტი. ეს ნიშნავს უკეთეს, უფრო პერსონალიზებულ ზრუნვას.</p>`,
    duration: "30 წუთი",
    icon: "Stethoscope",
    features: [
      { id: 1, text: "ყოვლისმომცველი გამოკვლევა" }, { id: 2, text: "პრევენციული სკრინინგი" },
      { id: 3, text: "ქრონიკული დაავადებების მართვა" }, { id: 4, text: "ვაქცინაცია" },
      { id: 5, text: "ბავშვთა სამედიცინო მომსახურება" }, { id: 6, text: "ჯანმრთელობის მონიტორინგი" },
    ],
  },
  laboratory: {
    title: "ლაბორატორიული სერვისები",
    short_description: "ISO სერტიფიცირებული ლაბორატორია — 200+ ტიპის ანალიზი სწრაფი შედეგებით.",
    full_description: `<p>ჩვენი ISO 15189 სერტიფიცირებული ლაბორატორია გთავაზობთ 200-ზე მეტ ტიპის ლაბორატორიულ გამოკვლევას. შედეგები ხელმისაწვდომია 24 საათში ჩვენი პაციენტის პორტალის მეშვეობით.</p>
<p>თვითმომსახურების სადგური ხელმისაწვდომია 24/7. სისხლის ჩაბარება შეგიძლიათ წინასწარი ჩაწერის გარეშე.</p>`,
    duration: "15 წუთი",
    icon: "Microscope",
    features: [
      { id: 1, text: "სისხლის სრული ანალიზი" }, { id: 2, text: "ჰორმონალური პანელი" },
      { id: 3, text: "ვიტამინების პანელი" }, { id: 4, text: "მეტაბოლური პანელი" },
      { id: 5, text: "ონლაინ შედეგები" }, { id: 6, text: "24-საათიანი მუშაობა" },
    ],
  },
}

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
    <main className="min-h-screen bg-background">
      <Header settings={settings} />

      <section className="pt-24 md:pt-32 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("backToServices")}
          </Link>

          <div className="grid lg:grid-cols-5 gap-8 bg-card border border-border rounded-2xl overflow-hidden">
            <div className="lg:col-span-2 bg-gradient-to-br from-primary/20 to-primary/5 p-8 flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 rounded-2xl bg-primary/20 flex items-center justify-center mb-6">
                <IconComponent className="w-12 h-12 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-3">{title}</h1>
              <p className="text-muted-foreground text-sm mb-6">{short_description}</p>
              {duration && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 text-primary" />
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
                        <Check className="w-4 h-4 text-primary shrink-0" />
                        {f.text}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <div className="flex flex-wrap gap-3">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full" asChild>
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
        <section className="py-14 px-4 border-t border-border/40 bg-card/30">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl font-bold text-foreground mb-7">{t("otherServices")}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((s) => {
                const Icon = ICON_MAP[s.icon] ?? Stethoscope
                return (
                  <Link key={s.id} href={`/services/${s.slug}` as "/services"}>
                    <div className="group bg-card border border-border rounded-xl p-5 hover:border-primary/40 transition-colors h-full">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">{s.title}</h3>
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
