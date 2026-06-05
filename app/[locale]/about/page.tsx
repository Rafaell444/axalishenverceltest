import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/cta-section"
import { Heart, Shield, GraduationCap, Users, Award, Star, LucideIcon } from "lucide-react"
import { fetchSettings, fetchAbout } from "@/lib/api"
import { getTranslations } from "next-intl/server"

const ICON_MAP: Record<string, LucideIcon> = { Heart, Shield, GraduationCap, Users, Award, Star }

export default async function AboutPage() {
  const [settings, aboutData, t] = await Promise.all([
    fetchSettings().catch(() => null),
    fetchAbout().catch(() => null),
    getTranslations("about"),
  ])

  const DEFAULT_ABOUT = {
    hero_title: t("dHeroTitle"),
    hero_subtitle: t("dHeroSubtitle"),
    mission: t("dMission"),
    vision: t("dVision"),
    values: [
      { id: 1, icon: "Heart", title: t("dV1title"), description: t("dV1desc") },
      { id: 2, icon: "Shield", title: t("dV2title"), description: t("dV2desc") },
      { id: 3, icon: "Star", title: t("dV3title"), description: t("dV3desc") },
      { id: 4, icon: "GraduationCap", title: t("dV4title"), description: t("dV4desc") },
    ],
    timeline: [
      { id: 1, year: t("dT1year"), title: t("dT1title"), description: t("dT1desc") },
      { id: 2, year: t("dT2year"), title: t("dT2title"), description: t("dT2desc") },
      { id: 3, year: t("dT3year"), title: t("dT3title"), description: t("dT3desc") },
      { id: 4, year: t("dT4year"), title: t("dT4title"), description: t("dT4desc") },
    ],
    team: [
      { id: 1, name: t("dM1name"), role: t("dM1role"), bio: "", photo_url: null },
      { id: 2, name: t("dM2name"), role: t("dM2role"), bio: "", photo_url: null },
      { id: 3, name: t("dM3name"), role: t("dM3role"), bio: "", photo_url: null },
      { id: 4, name: t("dM4name"), role: t("dM4role"), bio: "", photo_url: null },
    ] as { id: number; name: string; role: string; bio: string; photo_url: string | null }[],
    certifications: [
      { id: 1, title: "ISO 9001:2015", issued_by: "International Organization for Standardization", issued_year: "2023", image_url: null },
      { id: 2, title: "GMP", issued_by: "Good Manufacturing Practice", issued_year: "2023", image_url: null },
    ] as { id: number; title: string; issued_by: string; issued_year: string; image_url: string | null }[],
  }

  const about = aboutData ?? DEFAULT_ABOUT

  return (
    <main className="min-h-screen relative">
      <Header settings={settings} />

      {/* Hero & Company Description */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-gold font-medium mb-4 block">{t("eyebrow")}</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-10">
            {t("heading")} <span className="text-gold">{t("headingHighlight")}</span>
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
        <section className="py-12 md:py-16 px-4 glass">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F4EFE4] text-center mb-8 md:mb-12">
              {t("values")} <span className="text-gold">{t("valuesHighlight")}</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {about.values.map((val) => {
                const IconComponent = ICON_MAP[val.icon] ?? Heart
                return (
                  <div key={val.id} className="glass-card p-6 hover:border-gold/30 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                      <IconComponent className="w-6 h-6 text-gold" />
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
              {t("history")} <span className="text-gold">{t("historyHighlight")}</span>
            </h2>
            <div className="relative">
              <div className="absolute left-5 sm:left-8 top-0 bottom-0 w-px bg-border" />
              <div className="space-y-6 md:space-y-8">
                {about.timeline.map((item) => (
                  <div key={item.id} className="flex gap-4 sm:gap-6 pl-12 sm:pl-16 relative">
                    <div className="absolute left-2 sm:left-5 w-6 h-6 rounded-full bg-gold flex items-center justify-center text-[#08120F] text-xs font-bold shrink-0">
                      •
                    </div>
                    <div className="glass-card p-5 flex-1">
                      <span className="text-gold font-bold text-sm">{item.year}</span>
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
        <section className="py-12 md:py-16 px-4 glass">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#F4EFE4] text-center mb-8 md:mb-12">
              {t("team")} <span className="text-gold">{t("teamHighlight")}</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {about.team.map((member) => (
                <div key={member.id} className="glass-card overflow-hidden hover:border-gold/30 transition-colors">
                  <div className="aspect-square bg-teal/10 flex items-center justify-center overflow-hidden">
                    {member.photo_url ? (
                      <img src={member.photo_url} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <Users className="w-16 h-16 text-gold/30" />
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-foreground mb-1">{member.name}</h3>
                    <p className="text-gold text-sm mb-2">{member.role}</p>
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
              {t("certs")} <span className="text-gold">{t("certsHighlight")}</span>
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {about.certifications.map((cert) => (
                <div key={cert.id} className="glass-card p-6 text-center">
                  {cert.image_url ? (
                    <img src={cert.image_url} alt={cert.title} className="h-20 object-contain mx-auto mb-4" />
                  ) : (
                    <Award className="w-12 h-12 text-gold mx-auto mb-4" />
                  )}
                  <h3 className="font-semibold text-foreground mb-1">{cert.title}</h3>
                  {cert.issued_by && <p className="text-muted-foreground text-sm">{cert.issued_by}</p>}
                  {cert.issued_year && <p className="text-gold text-sm mt-1">{cert.issued_year}</p>}
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
