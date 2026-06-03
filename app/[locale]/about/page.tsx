import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/cta-section"
import { Heart, Shield, GraduationCap, Users, Award, Star, LucideIcon } from "lucide-react"
import { fetchSettings, fetchAbout } from "@/lib/api"
import { getTranslations } from "next-intl/server"

const ICON_MAP: Record<string, LucideIcon> = { Heart, Shield, GraduationCap, Users, Award, Star }

const DEFAULT_ABOUT = {
  hero_title: "ახალი შენ",
  hero_subtitle: "შესახებ",
  mission: "ჩვენი მისიაა გავხადოთ ჯანმრთელობის მომსახურება ხელმისაწვდომი, ეფექტური და ინდივიდუალური. ჩვენ ვცდილობთ თითოეულ პაციენტს მივუდგეთ განსაკუთრებული სიფრთხილით.",
  vision: "გვსურს გახდეთ კავკასიის რეგიონის წამყვანი ჯანმრთელობის ცენტრი, სადაც ყველა პაციენტი მიიღებს მსოფლიო დონის სამედიცინო მომსახურებას.",
  values: [
    { id: 1, icon: "Heart", title: "თანაგრძნობა", description: "ჩვენ ვზრუნავთ თითოეულ პაციენტზე, როგორც ოჯახის წევრზე." },
    { id: 2, icon: "Shield", title: "უსაფრთხოება", description: "ISO სერტიფიცირებული პროტოკოლები და უმაღლესი სტანდარტები." },
    { id: 3, icon: "Star", title: "სიუცხოვე", description: "მხოლოდ მტკიცებულებებზე დაფუძნებული, თანამედროვე მეთოდები." },
    { id: 4, icon: "GraduationCap", title: "განათლება", description: "მუდმივი განვითარება და კვალიფიციური სპეციალისტების გუნდი." },
  ],
  timeline: [
    { id: 1, year: "2015", title: "დაარსება", description: "ახალი შენ კლინიკა დაარსდა თბილისში, მხოლოდ 5 სპეციალისტით." },
    { id: 2, year: "2018", title: "გაფართოება", description: "კლინიკა გაფართოვდა და გახდა 20+ სპეციალისტის სახლი." },
    { id: 3, year: "2021", title: "ISO სერტიფიცირება", description: "მიღებული იქნა საერთაშორისო ხარისხის მართვის სერტიფიკატი." },
    { id: 4, year: "2024", title: "წამყვანი კლინიკა", description: "1500+ კმაყოფილი პაციენტი და საქართველოს საუკეთესო კლინიკის ჯილდო." },
  ],
  team: [
    { id: 1, name: "ნინო კვარაცხელია", role: "მთავარი ნევროლოგი", bio: "15 წლიანი გამოცდილება ნეიროლოგიაში. ევროპული სერტიფიკატის მფლობელი სპეციალისტი.", photo_url: null },
    { id: 2, name: "გიორგი მამულაშვილი", role: "ფსიქოლოგი / ფსიქოთერაპევტი", bio: "კოგნიტური-ბიჰევიორული თერაპიის სერტიფიცირებული სპეციალისტი, 10 წლის პრაქტიკა.", photo_url: null },
    { id: 3, name: "მარიამ ჯავახიშვილი", role: "ოჯახის ექიმი", bio: "ოჯახის მედიცინის სპეციალისტი. ყოვლისმომცველი პირველადი ჯანდაცვის მომსახურება.", photo_url: null },
    { id: 4, name: "დავით ბერიძე", role: "ლაბორატორიის ხელმძღვანელი", bio: "კლინიკური ლაბორატორიის სპეციალისტი, ISO 15189 სერტიფიცირებული.", photo_url: null },
  ] as { id: number; name: string; role: string; bio: string; photo_url: string | null }[],
  certifications: [
    { id: 1, title: "ISO 9001:2015", issued_by: "International Organization for Standardization", issued_year: "2021", image_url: null },
    { id: 2, title: "საქართველოს ჯანმრთელობის სამინისტრო", issued_by: "ჯანმრთელობისა და სოციალური დაცვის სამინისტრო", issued_year: "2020", image_url: null },
  ] as { id: number; title: string; issued_by: string; issued_year: string; image_url: string | null }[],
}

export default async function AboutPage() {
  const [settings, aboutData, t] = await Promise.all([
    fetchSettings().catch(() => null),
    fetchAbout().catch(() => null),
    getTranslations("about"),
  ])

  const about = aboutData ?? DEFAULT_ABOUT

  return (
    <main className="min-h-screen bg-background">
      <Header settings={settings} />

      {/* Hero & Company Description */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-primary font-medium mb-4 block">{t("eyebrow")}</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-10">
            {t("heading")} <span className="text-primary">{t("headingHighlight")}</span>
          </h1>
        </div>
        <div className="max-w-3xl mx-auto space-y-6 text-muted-foreground text-lg leading-relaxed">
          <p>{t("p1")}</p>
          <p>{t("p2")}</p>
          <p>{t("p3")}</p>
        </div>
      </section>

      {/* Values */}
      {about?.values && about.values.length > 0 && (
        <section className="py-12 md:py-16 px-4 bg-card/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-8 md:mb-12">
              {t("values")} <span className="text-primary">{t("valuesHighlight")}</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {about.values.map((val) => {
                const IconComponent = ICON_MAP[val.icon] ?? Heart
                return (
                  <div key={val.id} className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{val.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{val.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* History Timeline */}
      {about?.timeline && about.timeline.length > 0 && (
        <section className="py-12 md:py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-8 md:mb-12">
              {t("history")} <span className="text-primary">{t("historyHighlight")}</span>
            </h2>
            <div className="relative">
              <div className="absolute left-5 sm:left-8 top-0 bottom-0 w-px bg-border" />
              <div className="space-y-6 md:space-y-8">
                {about.timeline.map((item) => (
                  <div key={item.id} className="flex gap-4 sm:gap-6 pl-12 sm:pl-16 relative">
                    <div className="absolute left-2 sm:left-5 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold shrink-0">
                      •
                    </div>
                    <div className="bg-card border border-border rounded-xl p-5 flex-1">
                      <span className="text-primary font-bold text-sm">{item.year}</span>
                      <h3 className="font-semibold text-foreground mt-1 mb-2">{item.title}</h3>
                      {item.description && <p className="text-muted-foreground text-sm">{item.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Team */}
      {about?.team && about.team.length > 0 && (
        <section className="py-12 md:py-16 px-4 bg-card/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-8 md:mb-12">
              {t("team")} <span className="text-primary">{t("teamHighlight")}</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {about.team.map((member) => (
                <div key={member.id} className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-colors">
                  <div className="aspect-square bg-primary/10 flex items-center justify-center overflow-hidden">
                    {member.photo_url ? (
                      <img src={member.photo_url} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <Users className="w-16 h-16 text-primary/30" />
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-foreground mb-1">{member.name}</h3>
                    <p className="text-primary text-sm mb-2">{member.role}</p>
                    {member.bio && <p className="text-muted-foreground text-sm line-clamp-3">{member.bio}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Certifications */}
      {about?.certifications && about.certifications.length > 0 && (
        <section className="py-12 md:py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-8 md:mb-12">
              {t("certs")} <span className="text-primary">{t("certsHighlight")}</span>
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {about.certifications.map((cert) => (
                <div key={cert.id} className="bg-card border border-border rounded-xl p-6 text-center">
                  {cert.image_url ? (
                    <img src={cert.image_url} alt={cert.title} className="h-20 object-contain mx-auto mb-4" />
                  ) : (
                    <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                  )}
                  <h3 className="font-semibold text-foreground mb-1">{cert.title}</h3>
                  {cert.issued_by && <p className="text-muted-foreground text-sm">{cert.issued_by}</p>}
                  {cert.issued_year && <p className="text-primary text-sm mt-1">{cert.issued_year}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
      <Footer settings={settings} />
    </main>
  )
}
