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
    <section className="py-6 px-4">
      <div
        className="mx-auto rounded-2xl px-6 py-5 md:px-10 md:py-6"
        style={{
          maxWidth: '1160px',
          background: 'rgba(8,18,15,0.45)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(201,166,100,0.12)',
        }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {items.map((stat, index) => {
            const IconComponent = STAT_ICONS[index % STAT_ICONS.length]
            return (
              <div key={stat.id} className="flex items-center gap-3 md:gap-4">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#475A3F]/40 flex items-center justify-center shrink-0">
                  <IconComponent className="w-5 h-5 md:w-6 md:h-6 text-[#C9A664]" />
                </div>
                <div className="min-w-0">
                  <div className="text-xl font-bold text-[#C9A664] md:text-2xl leading-tight">{stat.value}</div>
                  <div className="text-xs md:text-sm text-[#7A7A7A] leading-snug">{stat.label}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
