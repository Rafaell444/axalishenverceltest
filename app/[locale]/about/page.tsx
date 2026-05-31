import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/cta-section"
import { Heart, Shield, GraduationCap, Users, Award, Star, LucideIcon } from "lucide-react"
import { fetchSettings, fetchAbout } from "@/lib/api"
import { getTranslations } from "next-intl/server"

const ICON_MAP: Record<string, LucideIcon> = { Heart, Shield, GraduationCap, Users, Award, Star }

export default async function AboutPage() {
  const [settings, about, t] = await Promise.all([
    fetchSettings().catch(() => null),
    fetchAbout().catch(() => null),
    getTranslations("about"),
  ])

  return (
    <main className="min-h-screen bg-background">
      <Header settings={settings} />

      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-primary font-medium mb-4 block">{t("eyebrow")}</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            {about?.hero_title || t("eyebrow")}{" "}
            <span className="text-primary">{about?.hero_subtitle || ""}</span>
          </h1>
          {about?.mission && (
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{about.mission}</p>
          )}
        </div>
      </section>

      {/* Mission & Vision */}
      {about && (about.mission || about.vision) && (
        <section className="pb-12 md:pb-16 px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 md:gap-8">
            {about.mission && (
              <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{t("mission")}</h3>
                <p className="text-muted-foreground leading-relaxed">{about.mission}</p>
              </div>
            )}
            {about.vision && (
              <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{t("vision")}</h3>
                <p className="text-muted-foreground leading-relaxed">{about.vision}</p>
              </div>
            )}
          </div>
        </section>
      )}

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
