import { Users, CheckCircle, Award, Heart, TrendingUp, Star, LucideIcon } from "lucide-react"
import type { Stat } from "@/lib/api"

const STAT_ICONS: LucideIcon[] = [Users, CheckCircle, Award, Heart, TrendingUp, Star]

interface Translations {
  default0: string
  default1: string
  default2: string
  default3: string
}

interface Props {
  stats: Stat[]
  translations: Translations
}

export function StatsSection({ stats, translations: tr }: Props) {
  const DEFAULT_STATS: Stat[] = [
    { id: 1, value: "1500+", label: tr.default0, order: 0 },
    { id: 2, value: "10+",   label: tr.default1, order: 1 },
    { id: 3, value: "20+",   label: tr.default2, order: 2 },
    { id: 4, value: "98%",   label: tr.default3, order: 3 },
  ]

  const items = stats.length > 0 ? stats : DEFAULT_STATS

  return (
    <section className="border-t border-gold/10 py-12 lg:py-16" style={{ background: 'rgba(8,18,15,0.35)', backdropFilter: 'blur(8px)' }}>
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
