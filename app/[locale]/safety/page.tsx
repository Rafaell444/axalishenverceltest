import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/cta-section"
import { Shield, FlaskConical, Microscope, Leaf, AlertTriangle, CheckCircle } from "lucide-react"
import { fetchSettings } from "@/lib/api"
import { getTranslations } from "next-intl/server"

const SAFETY_PILLARS = [
  {
    icon: FlaskConical,
    title: "ლაბორატორიული ტესტირება",
    description: "თითოეული პარტია გადის 47-ეტაპიანი ლაბორატორიული ტესტირების პროცედურას ISO 17025 სტანდარტების მიხედვით.",
    points: ["მძიმე მეტალების ანალიზი", "მიკრობიოლოგიური სიწმინდე", "ეფექტური ნივთიერებების კონცენტრაცია", "სადეზინფექციო ნარჩენები"],
  },
  {
    icon: Leaf,
    title: "ნედლეულის კონტროლი",
    description: "ნედლეული შეხდება მხოლოდ სერტიფიცირებული მომწოდებლებისგან, ეკოლოგიურად სუფთა რეგიონებიდან.",
    points: ["მომწოდებლების სერტიფიკაცია", "წარმოშობის დოკუმენტაცია", "პესტიციდების არარსებობა", "GMO-free ნედლეული"],
  },
  {
    icon: Microscope,
    title: "სიწმინდის სტანდარტები",
    description: "სამი დამოუკიდებელი ლაბორატორიის მიერ გადამოწმებული სისუფთავე. ნებისმიერი ბარიერის გადამეტება ნიშნავს პარტიის უარყოფას.",
    points: ["Pharmacopoeial სტანდარტები (USP/EP)", "99.9%+ სისუფთავის გარანტია", "დამოუკიდებელი გადამოწმება", "ყოველი პარტიის COA"],
  },
  {
    icon: Shield,
    title: "წარმოების გარემო",
    description: "GMP სერტიფიცირებული ობიექტი ISO 14644 კლასის სუფთა ოთახებით, სადაც კონტროლდება ტემპერატურა, ტენიანობა და ჰაერის ხარისხი.",
    points: ["Class 100,000 სუფთა ოთახი", "HVAC სისტემა", "ტემპერატურის მონიტორინგი 24/7", "პერსონალის SPE ტრეინინგი"],
  },
]

export default async function SafetyPage() {
  const [settings, t] = await Promise.all([
    fetchSettings().catch(() => null),
    getTranslations("nav"),
  ])

  return (
    <main className="min-h-screen bg-background">
      <Header settings={settings} />

      <section className="pt-24 md:pt-32 pb-12 md:pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-primary font-medium mb-4 block">{t("safety")}</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            პროდუქციის <span className="text-primary">უსაფრთხოება</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            ჩვენი უსაფრთხოების სტანდარტი ფარმაცევტული ინდუსტრიის უმაღლეს მოთხოვნებს შეესაბამება — ყველა ნაბიჯი, ყველა პარტია, ყოველთვის.
          </p>
        </div>
      </section>

      <section className="pb-16 md:pb-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 md:gap-8">
          {SAFETY_PILLARS.map((pillar) => {
            const Icon = pillar.icon
            return (
              <div key={pillar.title} className="bg-card border border-border rounded-2xl p-6 md:p-8 hover:border-primary/40 transition-colors">
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{pillar.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{pillar.description}</p>
                  </div>
                </div>
                <ul className="grid grid-cols-2 gap-2">
                  {pillar.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </section>

      <section className="py-12 md:py-16 px-4 bg-card/50 border-y border-border/40">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-4 p-6 bg-amber-500/10 border border-amber-500/20 rounded-2xl mb-10">
            <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-foreground mb-1">გამოყენებამდე კონსულტაცია</h4>
              <p className="text-muted-foreground text-sm">
                ნებისმიერი დანამატის მიღებამდე გირჩევთ კონსულტაციას კვალიფიციურ სპეციალისტთან, განსაკუთრებით ორსულობის, ძუძუთი კვების, ან ქრონიკული დაავადებების შემთხვევაში.
              </p>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-8">
            ჩვენი <span className="text-primary">ვალდებულება</span> თქვენს წინაშე
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { num: "100%", label: "გამჭვირვალობა", desc: "ყველა ინგრედიენტი, ყველა წყარო, ყველა ტესტი — ხელმისაწვდომია." },
              { num: "0", label: "კომპრომისი", desc: "ხარისხსა და უსაფრთხოებაზე კომპრომისი დაუშვებელია." },
              { num: "24/7", label: "მონიტორინგი", desc: "საწარმოო პირობების, ტემპერატურის და ხარისხის უწყვეტი კონტროლი." },
            ].map((item) => (
              <div key={item.label} className="bg-card border border-border rounded-xl p-6 text-center">
                <div className="text-3xl font-black text-primary mb-2">{item.num}</div>
                <h3 className="font-semibold text-foreground mb-2">{item.label}</h3>
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
