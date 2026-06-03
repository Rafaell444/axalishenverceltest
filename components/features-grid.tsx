import {
  Shield, Clock, Users, Award, HeartPulse, Microscope, Leaf, Zap,
  Brain, Stethoscope, Activity, Server, Star, Heart, CheckCircle,
  Sparkles, Globe, Lock, Smile, LucideIcon,
} from "lucide-react"
import { useTranslations } from "next-intl"
import type { Feature } from "@/lib/api"

const ICON_MAP: Record<string, LucideIcon> = {
  Shield, Clock, Users, Award, HeartPulse, Microscope, Leaf, Zap,
  Brain, Stethoscope, Activity, Server, Star, Heart, CheckCircle,
  Sparkles, Globe, Lock, Smile,
}

interface Props {
  features: Feature[]
}

export function FeaturesGrid({ features }: Props) {
  const t = useTranslations("features")
  const DEFAULT_FEATURES: Feature[] = [
    { id: 1, icon: "Shield", color: "from-violet-500/20 to-purple-500/20", title: t("d1title"), description: t("d1desc"), order: 0 },
    { id: 2, icon: "Clock", color: "from-blue-500/20 to-cyan-500/20", title: t("d2title"), description: t("d2desc"), order: 1 },
    { id: 3, icon: "Users", color: "from-emerald-500/20 to-green-500/20", title: t("d3title"), description: t("d3desc"), order: 2 },
    { id: 4, icon: "Award", color: "from-amber-500/20 to-orange-500/20", title: t("d4title"), description: t("d4desc"), order: 3 },
  ]
  const items = features.length > 0 ? features : DEFAULT_FEATURES

  return (
    <section className="py-16 md:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <span className="text-primary text-sm font-medium tracking-wider uppercase">{t("eyebrow")}</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            {t("heading")} <span className="text-primary">{t("headingHighlight")}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            {t("description")}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {items.map((feature) => {
            const IconComponent = ICON_MAP[feature.icon] ?? Shield
            return (
              <div key={feature.id} className="group relative w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(25%-1.125rem)] min-w-[200px]">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl`}
                />
                <div className="relative bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-colors duration-300 h-full flex flex-col items-center text-center">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-foreground font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
