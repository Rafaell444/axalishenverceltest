import { Trophy, Target, TrendingUp, Star, Award, Zap, LucideIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import type { Achievement } from "@/lib/api"

const ICON_CYCLE: LucideIcon[] = [Trophy, Target, TrendingUp, Star, Award, Zap]
const COLOR_CYCLE = ["text-amber-400", "text-emerald-400", "text-blue-400", "text-purple-400", "text-rose-400", "text-cyan-400"]

const DEFAULT_ACHIEVEMENTS: Achievement[] = [
  { id: 1, year: "2024", title: "საუკეთესო კლინიკა", description: "წლის საუკეთესო სამედიცინო დაწესებულების ჯილდო", order: 0 },
  { id: 2, year: "2023", title: "ISO 9001 სერტიფიკატი", description: "ხარისხის მართვის საერთაშორისო სტანდარტი", order: 1 },
  { id: 3, year: "2022", title: "ინოვაციის ჯილდო", description: "სამედიცინო ტექნოლოგიების დანერგვისთვის", order: 2 },
  { id: 4, year: "2021", title: "პაციენტთა არჩევანი", description: "98% კმაყოფილების მაჩვენებელი", order: 3 },
]

interface Props {
  achievements: Achievement[]
}

export function AchievementsSection({ achievements }: Props) {
  const t = useTranslations("achievements")
  const items = achievements.length > 0 ? achievements : DEFAULT_ACHIEVEMENTS

  return (
    <section className="py-16 md:py-20 px-4 bg-gradient-to-b from-background via-card/50 to-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <span className="text-primary text-sm font-medium tracking-wider uppercase">{t("eyebrow")}</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            {t("heading")} <span className="text-primary">{t("headingHighlight")}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t("description")}</p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-8 md:space-y-0">
            {items.map((achievement, index) => {
              const IconComponent = ICON_CYCLE[index % ICON_CYCLE.length]
              const color = COLOR_CYCLE[index % COLOR_CYCLE.length]
              return (
                <div
                  key={achievement.id}
                  className={`md:flex items-center gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <div
                      className={`bg-card border border-border rounded-2xl p-6 ${index % 2 === 0 ? "md:ml-auto" : "md:mr-auto"} max-w-md`}
                    >
                      <span className="text-primary font-bold text-lg">{achievement.year}</span>
                      <h3 className="text-foreground font-semibold text-xl mt-2 mb-2">{achievement.title}</h3>
                      <p className="text-muted-foreground">{achievement.description}</p>
                    </div>
                  </div>

                  <div className="hidden md:flex items-center justify-center">
                    <div className="w-16 h-16 bg-card border-2 border-primary rounded-full flex items-center justify-center z-10">
                      <IconComponent className={`w-7 h-7 ${color}`} />
                    </div>
                  </div>

                  <div className="flex-1" />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
