import { Users, CheckCircle, Award, Heart, TrendingUp, Star, LucideIcon } from "lucide-react"
import type { Stat } from "@/lib/api"

const STAT_ICONS: LucideIcon[] = [Users, CheckCircle, Award, Heart, TrendingUp, Star]

const DEFAULT_STATS: Stat[] = [
  { id: 1, value: "1500+", label: "კმაყოფილი პაციენტი", order: 0 },
  { id: 2, value: "10+", label: "წლის გამოცდილება", order: 1 },
  { id: 3, value: "20+", label: "სპეციალისტი", order: 2 },
  { id: 4, value: "98%", label: "წარმატების მაჩვენებელი", order: 3 },
]

interface Props {
  stats: Stat[]
}

export function StatsSection({ stats }: Props) {
  const items = stats.length > 0 ? stats : DEFAULT_STATS

  return (
    <section className="border-t border-border/40 bg-card/50 py-12 lg:py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-8">
          {items.map((stat, index) => {
            const IconComponent = STAT_ICONS[index % STAT_ICONS.length]
            return (
              <div key={stat.id} className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 md:h-12 md:w-12">
                  <IconComponent className="h-5 w-5 text-primary md:h-6 md:w-6" />
                </div>
                <div className="min-w-0">
                  <div className="text-xl font-bold text-primary md:text-2xl lg:text-3xl">{stat.value}</div>
                  <div className="text-xs text-muted-foreground leading-tight">{stat.label}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
