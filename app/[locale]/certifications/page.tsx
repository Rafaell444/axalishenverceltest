import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/cta-section"
import { Award, CheckCircle, Shield, Star, FileCheck } from "lucide-react"
import { fetchSettings } from "@/lib/api"
import { getTranslations } from "next-intl/server"

const CERTS = [
  {
    id: 1,
    icon: Award,
    title: "ISO 9001:2015",
    issuer: "International Organization for Standardization",
    year: "2021",
    description: "ხარისხის მართვის სისტემის საერთაშორისო სტანდარტი. ადასტურებს ჩვენი პროდუქციისა და სერვისების მაღალ ხარისხს.",
    color: "from-amber-500/20 to-amber-500/5",
    badge: "text-amber-400",
  },
  {
    id: 2,
    icon: Shield,
    title: "GMP სერტიფიკატი",
    issuer: "Good Manufacturing Practice",
    year: "2022",
    description: "კარგი წარმოების პრაქტიკის სტანდარტი, რომელიც უზრუნველყოფს პროდუქციის სათანადო პირობებში წარმოებას.",
    color: "from-blue-500/20 to-blue-500/5",
    badge: "text-blue-400",
  },
  {
    id: 3,
    icon: FileCheck,
    title: "HACCP სერტიფიკატი",
    issuer: "Hazard Analysis Critical Control Points",
    year: "2022",
    description: "საკვები უსაფრთხოების მართვის საერთაშორისო სისტემა. გარანტია, რომ პროდუქცია სრულიად უვნებელია.",
    color: "from-green-500/20 to-green-500/5",
    badge: "text-green-400",
  },
  {
    id: 4,
    icon: Star,
    title: "ეროვნული სააგენტოს ლიცენზია",
    issuer: "საქართველოს ეროვნული სასურსათო სააგენტო",
    year: "2020",
    description: "საქართველოს კანონმდებლობის სრული დაცვა. ყველა პროდუქტი რეგისტრირებულია და ლიცენზირებულია.",
    color: "from-purple-500/20 to-purple-500/5",
    badge: "text-purple-400",
  },
  {
    id: 5,
    icon: CheckCircle,
    title: "EU Organic Certification",
    issuer: "European Union Organic Standards",
    year: "2023",
    description: "ევროკავშირის ორგანული პროდუქციის სტანდარტი. ნიშნავს, რომ ნედლეული მოყვანილია ქიმიური დამუშავების გარეშე.",
    color: "from-emerald-500/20 to-emerald-500/5",
    badge: "text-emerald-400",
  },
  {
    id: 6,
    icon: Shield,
    title: "SGS სერტიფიკატი",
    issuer: "SGS — Société Générale de Surveillance",
    year: "2023",
    description: "მსოფლიოს წამყვანი ტესტირებისა და სერტიფიცირების კომპანიის ვალიდაცია. ადასტურებს პროდუქციის სიწმინდეს.",
    color: "from-rose-500/20 to-rose-500/5",
    badge: "text-rose-400",
  },
]

export default async function CertificationsPage() {
  const [settings, t] = await Promise.all([
    fetchSettings().catch(() => null),
    getTranslations("nav"),
  ])

  return (
    <main className="min-h-screen bg-background">
      <Header settings={settings} />

      <section className="pt-24 md:pt-32 pb-12 md:pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-primary font-medium mb-4 block">{t("certifications")}</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            ჩვენი <span className="text-primary">სერთიფიკატები</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            საერთაშორისო სტანდარტები და ადგილობრივი ლიცენზიები — ხარისხის უზრუნველყოფის სრული სპექტრი.
          </p>
        </div>
      </section>

      <section className="pb-16 md:pb-24 px-4">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {CERTS.map((cert) => {
            const Icon = cert.icon
            return (
              <div
                key={cert.id}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 transition-all hover:shadow-lg hover:shadow-primary/5"
              >
                <div className={`bg-gradient-to-br ${cert.color} p-8 flex items-center justify-center`}>
                  <div className="w-20 h-20 rounded-2xl bg-background/30 backdrop-blur flex items-center justify-center">
                    <Icon className={`w-10 h-10 ${cert.badge}`} />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-foreground leading-tight">{cert.title}</h3>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 ${cert.badge} shrink-0 ml-2`}>
                      {cert.year}
                    </span>
                  </div>
                  <p className={`text-xs font-medium mb-3 ${cert.badge}`}>{cert.issuer}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{cert.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="py-12 md:py-16 px-4 bg-card/50 border-t border-border/40">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            რატომ მნიშვნელოვანია <span className="text-primary">სერთიფიკატები?</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
            სერთიფიკატები არ არის უბრალო ქაღალდი — ეს არის ჩვენი ვალდებულების მტკიცებულება თქვენი ჯანმრთელობისა და უსაფრთხოების მიმართ.
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { title: "გამჭვირვალობა", desc: "ყველა სერთიფიკატი ხელმისაწვდომია შემოწმებისთვის." },
              { title: "დამოუკიდებელი ვალიდაცია", desc: "გადამოწმება ხდება მესამე მხარის ორგანიზაციების მიერ." },
              { title: "რეგულარული განახლება", desc: "ყოველწლიური აუდიტი და რეზერტიფიცირება." },
            ].map((item) => (
              <div key={item.title} className="bg-card border border-border rounded-xl p-5">
                <CheckCircle className="w-8 h-8 text-primary mb-3 mx-auto" />
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
      <Footer settings={settings} />
    </main>
  )
}
