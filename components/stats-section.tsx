import { Users, Clock, Award, TrendingUp } from "lucide-react"
import type { Stat } from "@/lib/api"

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

const STAT_CONFIG = [
  { icon: Users, color: "#C9A664" },
  { icon: Clock, color: "#A6B58D" },
  { icon: Award, color: "#6E4A7E" },
  { icon: TrendingUp, color: "#7FA6A1" },
]

export function StatsSection({ stats, translations: tr }: Props) {
  const DEFAULT_STATS: Stat[] = [
    { id: 1, value: "1500+", label: tr.default0, order: 0 },
    { id: 2, value: "10+",   label: tr.default1, order: 1 },
    { id: 3, value: "20+",   label: tr.default2, order: 2 },
    { id: 4, value: "98%",   label: tr.default3, order: 3 },
  ]

  const items = stats.length > 0 ? stats : DEFAULT_STATS

  return (
    <section className="py-10 md:py-14 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="glass-bar py-8 md:py-0 md:h-[140px] grid grid-cols-2 md:grid-cols-4">
          {items.map((stat, i) => {
            const cfg = STAT_CONFIG[i % STAT_CONFIG.length]
            const Icon = cfg.icon
            const isNotLast = i < items.length - 1
            return (
              <div
                key={stat.id}
                className={`flex items-center justify-center gap-4 px-4 py-4 md:py-0 ${
                  isNotLast ? "md:border-r md:border-white/10" : ""
                }`}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${cfg.color}15` }}
                >
                  <Icon className="w-5 h-5" style={{ color: cfg.color }} />
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-[#F4EFE4] leading-none" style={{ fontFamily: 'var(--font-heading)' }}>
                    {stat.value}
                  </div>
                  <div className="text-[13px] text-[#7A7A7A] mt-1 leading-tight">{stat.label}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
