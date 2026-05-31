import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/cta-section"
import { Brain, Leaf, Bug, Shield, Activity, Microscope, Stethoscope, ArrowRight, Check, Clock, Users, Award, LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { fetchSettings, fetchServices } from "@/lib/api"
import { getTranslations } from "next-intl/server"

const ICON_MAP: Record<string, LucideIcon> = {
  Brain, Leaf, Bug, Shield, Activity, Microscope, Stethoscope, Users, Award,
}

const DEFAULT_SERVICES = [
  {
    id: 1,
    slug: "neurology",
    icon: "Brain",
    title: "ნეიროლოგია",
    short_description: "თავის ტვინისა და ნერვული სისტემის სრული დიაგნოსტიკა და მკურნალობა.",
    full_description: "<p>ჩვენი ნეიროლოგიის განყოფილება გთავაზობთ ყველა ასაკის პაციენტებისთვის სრულ ნევროლოგიურ შეფასებასა და მკურნალობას. ვიყენებთ უახლეს დიაგნოსტიკურ მეთოდებს საუკეთესო შედეგების მისაღებად.</p>",
    duration: "60 წუთი",
    features: [
      { id: 1, text: "EEG დიაგნოსტიკა" },
      { id: 2, text: "MRI ინტერპრეტაცია" },
      { id: 3, text: "ეპილეფსიის მართვა" },
      { id: 4, text: "მიგრენის თერაპია" },
      { id: 5, text: "ინსულტის რეაბილიტაცია" },
      { id: 6, text: "ნერვული სისტემის დარღვევები" },
    ],
  },
  {
    id: 2,
    slug: "psychology",
    icon: "Activity",
    title: "ფსიქოლოგია და ფსიქოთერაპია",
    short_description: "ფსიქოლოგიური კონსულტაცია, CBT თერაპია და ფსიქიკური ჯანმრთელობის მხარდაჭერა.",
    full_description: "<p>ჩვენი სერტიფიცირებული ფსიქოლოგები გთავაზობენ ინდივიდუალურ და ჯგუფურ თერაპიას. ვიყენებთ მტკიცებულებებზე დაფუძნებულ მეთოდებს, მათ შორის კოგნიტური-ბიჰევიორულ თერაპიას.</p>",
    duration: "50 წუთი",
    features: [
      { id: 1, text: "ინდივიდუალური კონსულტაცია" },
      { id: 2, text: "კოგნიტური-ბიჰევიორული თერაპია" },
      { id: 3, text: "შფოთვის მართვა" },
      { id: 4, text: "დეპრესიის მკურნალობა" },
      { id: 5, text: "ოჯახური კონსულტაცია" },
      { id: 6, text: "ბავშვთა ფსიქოლოგია" },
    ],
  },
  {
    id: 3,
    slug: "family-medicine",
    icon: "Stethoscope",
    title: "ოჯახის მედიცინა",
    short_description: "ყოვლისმომცველი პირველადი ჯანდაცვა მთელი ოჯახისთვის, ყველა ასაკის პაციენტებისთვის.",
    full_description: "<p>ჩვენი ოჯახის ექიმები უზრუნველყოფენ სრულ პირველად სამედიცინო მომსახურებას. პრევენციული მედიცინიდან ქრონიკულ დაავადებათა მართვამდე — ჩვენ ზრუნავთ თქვენს ჯანმრთელობაზე.</p>",
    duration: "30 წუთი",
    features: [
      { id: 1, text: "ყოვლისმომცველი გამოკვლევა" },
      { id: 2, text: "პრევენციული სკრინინგი" },
      { id: 3, text: "ქრონიკული დაავადებების მართვა" },
      { id: 4, text: "ვაქცინაცია" },
      { id: 5, text: "ბავშვთა სამედიცინო მომსახურება" },
      { id: 6, text: "ჯანმრთელობის მონიტორინგი" },
    ],
  },
  {
    id: 4,
    slug: "laboratory",
    icon: "Microscope",
    title: "ლაბორატორიული სერვისები",
    short_description: "ISO სერტიფიცირებული ლაბორატორია — 200+ ტიპის ანალიზი სწრაფი შედეგებით.",
    full_description: "<p>ჩვენი ISO 15189 სერტიფიცირებული ლაბორატორია გთავაზობთ 200-ზე მეტ ტიპის ლაბორატორიულ გამოკვლევას. შედეგები ხელმისაწვდომია 24 საათში, ონლაინ პლატფორმის მეშვეობით.</p>",
    duration: "15 წუთი",
    features: [
      { id: 1, text: "სისხლის სრული ანალიზი" },
      { id: 2, text: "ჰორმონალური პანელი" },
      { id: 3, text: "ვიტამინების პანელი" },
      { id: 4, text: "მეტაბოლური პანელი" },
      { id: 5, text: "ონლაინ შედეგები" },
      { id: 6, text: "24-საათიანი მუშაობა" },
    ],
  },
]

export default async function ServicesPage() {
  const [settings, servicesData, t] = await Promise.all([
    fetchSettings().catch(() => null),
    fetchServices().catch(() => null),
    getTranslations("servicesPage"),
  ])

  const services = (servicesData && servicesData.length > 0) ? servicesData : DEFAULT_SERVICES

  return (
    <main className="min-h-screen bg-background">
      <Header settings={settings} />

      <section className="pt-24 md:pt-32 pb-12 md:pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-primary font-medium mb-4 block">{t("eyebrow")}</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t("heading")} <span className="text-primary">{t("headingHighlight")}</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t("description")}</p>
        </div>
      </section>

      <section className="py-12 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-6 md:gap-8">
            {services.map((service, index) => {
              const IconComponent = ICON_MAP[service.icon] ?? Stethoscope
              return (
                <div
                  key={service.id}
                  className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-colors"
                >
                  <div className="grid lg:grid-cols-5 gap-0">
                    <div
                      className={`lg:col-span-2 bg-gradient-to-br from-primary/20 to-primary/5 p-6 sm:p-8 flex flex-col justify-center items-center ${
                        index % 2 === 1 ? "lg:order-2" : ""
                      }`}
                    >
                      <div className="w-24 h-24 rounded-2xl bg-primary/20 flex items-center justify-center mb-6">
                        <IconComponent className="w-12 h-12 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground text-center mb-2">{service.title}</h3>
                      <p className="text-muted-foreground text-center text-sm">{service.short_description}</p>
                      {service.duration && (
                        <div className="flex items-center gap-2 mt-6 text-sm">
                          <Clock className="w-4 h-4 text-primary" />
                          <span className="text-muted-foreground">{service.duration}</span>
                        </div>
                      )}
                    </div>

                    <div className={`lg:col-span-3 p-6 sm:p-8 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                      {service.full_description && (
                        <div
                          className="text-foreground/80 mb-6 leading-relaxed prose prose-invert max-w-none"
                          dangerouslySetInnerHTML={{ __html: service.full_description }}
                        />
                      )}

                      {service.features && service.features.length > 0 && (
                        <>
                          <h4 className="font-semibold text-foreground mb-4">{t("includes")}</h4>
                          <ul className="grid md:grid-cols-2 gap-3 mb-6">
                            {service.features.map((f) => (
                              <li key={f.id} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Check className="w-4 h-4 text-primary shrink-0" />
                                {f.text}
                              </li>
                            ))}
                          </ul>
                        </>
                      )}

                      <div className="flex flex-wrap gap-4">
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full" asChild>
                          <Link href="/contact">
                            {t("book")}
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                        <Button variant="outline" className="border-border hover:border-primary rounded-full" asChild>
                          <Link href={`/services/${service.slug}`}>{t("learnMore")}</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 px-4 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("whyUs")} <span className="text-primary">{t("whyUsHighlight")}</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Users, title: t("team"), desc: t("teamDesc") },
              { icon: Award, title: t("certified"), desc: t("certifiedDesc") },
              { icon: Shield, title: t("privacy"), desc: t("privacyDesc") },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer settings={settings} services={services} />
    </main>
  )
}
