import { useTranslations } from "next-intl"
import type { Feature } from "@/lib/api"
import { CheckCircle, Leaf, Heart, Shield } from "lucide-react"

const THEME = [
  { icon: CheckCircle, bg: "bg-[#475A3F]/30", color: "text-[#C9A664]" },
  { icon: Leaf,        bg: "bg-[#D9C7A3]/15", color: "text-[#A6B58D]" },
  { icon: Heart,       bg: "bg-[#6E4A7E]/25", color: "text-[#7FA6A1]" },
  { icon: Shield,      bg: "bg-[#2D5D66]/30", color: "text-[#A6B58D]" },
]

interface Props {
  features: Feature[]
}

export function FeaturesGrid({ features }: Props) {
  const t = useTranslations("features")

  const DEFAULT_FEATURES: Feature[] = [
    { id: 1, icon: "success",  title: t("dt1title"), description: t("dt1desc"), order: 0 },
    { id: 2, icon: "peace",    title: t("dt2title"), description: t("dt2desc"), order: 1 },
    { id: 3, icon: "wellness", title: t("dt3title"), description: t("dt3desc"), order: 2 },
    { id: 4, icon: "healing",  title: t("dt4title"), description: t("dt4desc"), order: 3 },
  ]

  const items = features.length > 0 ? features : DEFAULT_FEATURES

  return (
    <section className="py-16 lg:py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center mb-10 md:mb-14">
          {t("heading")}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((feature, i) => {
            const cfg = THEME[i % THEME.length]
            const Icon = cfg.icon
            return (
              <div
                key={feature.id}
                className="glass-card p-7 text-center transition-all duration-300 hover:border-[rgba(201,166,100,.45)]"
              >
                <div className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${cfg.bg}`}>
                  <Icon className={`h-7 w-7 ${cfg.color}`} />
                </div>
                <h3 className="text-[#F4EFE4] mb-3 text-xl">{feature.title}</h3>
                <p className="text-[15px] leading-relaxed text-[#B8B8B8]">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
