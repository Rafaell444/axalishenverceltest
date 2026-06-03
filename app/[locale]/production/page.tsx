import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/cta-section"
import { Leaf, FlaskConical, Package, Truck, Recycle, Search } from "lucide-react"
import { fetchSettings } from "@/lib/api"
import { getTranslations } from "next-intl/server"

const STEPS = [
  {
    num: "01",
    icon: Search,
    title: "დაკვირვება და შეგროვება",
    description: "ბუნებაში დიდ დროს ვატარებთ სოკოების შესწავლაში. ნაწილი პასუხისმგებლიანად შეგროვებულია ჩვენი გუნდის მიერ, ნაწილი — შერჩეული მეურნეობებიდან.",
  },
  {
    num: "02",
    icon: Leaf,
    title: "ნედლეულის შეფასება",
    description: "შემოსული ყოველი ნიმუში ყურადღებით მოწმდება, იდენტიფიცირდება სახეობა, ეტაპი და შეგროვების პირობები.",
  },
  {
    num: "03",
    icon: FlaskConical,
    title: "ლაბორატორიული ანალიზი",
    description: "თითოეული ნიმუში გადის ლაბორატორიულ ტესტირებას — სისუფთავე, ეფექტური ნაერთების კონცენტრაცია, მიკრობიოლოგიური შემოწმება.",
  },
  {
    num: "04",
    icon: Package,
    title: "ფორმულაციის შექმნა",
    description: "კვლევის, გამოცდილებისა და მუდმივი განვითარების საფუძველზე ვქმნით ბალანსირებულ ფორმულებს თანამედროვე ცხოვრების მოთხოვნებისთვის.",
  },
  {
    num: "05",
    icon: Package,
    title: "შეფუთვა",
    description: "UV-protected, BPA-free შეფუთვა სტაბილურობის შენარჩუნებისთვის. ეტიკეტზე — სრული ინფორმაცია ინგრედიენტების, ვადისა და პარტიის შესახებ.",
  },
  {
    num: "06",
    icon: Truck,
    title: "მიწოდება",
    description: "ტემპერატურის კონტროლირებადი პირობებით შენახვა და მიწოდება. თბილისში უფასო მიტანა 24 საათში.",
  },
]

export default async function ProductionPage() {
  const [settings, t] = await Promise.all([
    fetchSettings().catch(() => null),
    getTranslations("productionPage"),
  ])

  return (
    <main className="min-h-screen bg-background">
      <Header settings={settings} />

      {/* Hero / Intro */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <span className="text-primary font-medium mb-4 block">{t("eyebrow")}</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t("heading")}
          </h1>
          <p className="text-xl text-foreground/80 font-medium mb-8 leading-relaxed">
            {t("subtitle")}
          </p>
          <div className="space-y-5 text-muted-foreground text-lg leading-relaxed">
            <p>{t("p1")}</p>
            <p>{t("p2")}</p>
            <p>{t("p3")}</p>
          </div>
        </div>
      </section>

      {/* Steps timeline */}
      <section className="pb-16 md:pb-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            <div className="hidden md:block absolute left-[2.75rem] top-8 bottom-8 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />
            <div className="space-y-6 md:space-y-8">
              {STEPS.map((step) => {
                const Icon = step.icon
                return (
                  <div key={step.num} className="flex gap-4 md:gap-6 group">
                    <div className="relative shrink-0">
                      <div className="w-[5.5rem] h-[5.5rem] rounded-2xl bg-primary/10 border border-primary/20 flex flex-col items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/40 transition-all">
                        <span className="text-xs font-bold text-primary/60 mb-1">{step.num}</span>
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div className="bg-card border border-border rounded-2xl p-5 md:p-6 flex-1 group-hover:border-primary/30 transition-colors">
                      <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{step.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="py-12 md:py-16 px-4 bg-card/50 border-y border-border/40">
        <div className="max-w-4xl mx-auto text-center">
          <Recycle className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            მდგრადი <span className="text-primary">წარმოება</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            ჩვენ ვზრუნავთ არა მხოლოდ თქვენს კეთილდღეობაზე, არამედ გარემოს ჯანმრთელობაზეც.
          </p>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { value: "100%", label: "განახლებადი ენერგია" },
              { value: "Zero", label: "ნარჩენების პოლიტიკა" },
              { value: "Eco", label: "ბიოდეგრადირებადი შეფუთვა" },
            ].map((item) => (
              <div key={item.label} className="bg-card border border-border rounded-xl p-5">
                <div className="text-2xl font-black text-primary mb-1">{item.value}</div>
                <div className="text-sm text-muted-foreground">{item.label}</div>
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
