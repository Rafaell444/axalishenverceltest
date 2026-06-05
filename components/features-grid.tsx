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
    { id: 1, icon: "Leaf", color: "success", title: t("d1title"), description: t("d1desc"), order: 0 },
    { id: 2, icon: "Heart", color: "peace", title: t("d2title"), description: t("d2desc"), order: 1 },
    { id: 3, icon: "Sparkles", color: "wellness", title: t("d3title"), description: t("d3desc"), order: 2 },
    { id: 4, icon: "HeartPulse", color: "healing", title: t("d4title"), description: t("d4desc"), order: 3 },
  ]
  const items = features.length > 0 ? features : DEFAULT_FEATURES

  const THEME_COLORS: Record<string, { bg: string; icon: string; border: string; glow: string }> = {
    success: { bg: "bg-[#C9A664]/15", icon: "text-[#C9A664]", border: "border-[#C9A664]/30 hover:border-[#C9A664]/60", glow: "bg-[#C9A664]/10" },
    peace:   { bg: "bg-[#D9C7A3]/15", icon: "text-[#D9C7A3]", border: "border-[#A6B58D]/30 hover:border-[#A6B58D]/60", glow: "bg-[#A6B58D]/10" },
    wellness:{ bg: "bg-[#6E4A7E]/20", icon: "text-[#7FA6A1]", border: "border-[#6E4A7E]/30 hover:border-[#6E4A7E]/60", glow: "bg-[#6E4A7E]/10" },
    healing: { bg: "bg-[#2D5D66]/20", icon: "text-[#7FA6A1]", border: "border-[#2D5D66]/30 hover:border-[#2D5D66]/60", glow: "bg-[#2D5D66]/10" },
  }

  const fallbackTheme = { bg: "bg-gold/15", icon: "text-gold", border: "border-gold/30 hover:border-gold/60", glow: "bg-gold/10" }

  return (
    <section className="py-16 md:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-16">
          <span className="text-gold text-sm font-medium tracking-wider uppercase">{t("eyebrow")}</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-offwhite mt-2 mb-4">
            {t("heading")} <span className="text-gold">{t("headingHighlight")}</span>
          </h2>
          <p className="text-sage max-w-2xl mx-auto text-sm sm:text-base">
            {t("description")}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {items.map((feature) => {
            const IconComponent = ICON_MAP[feature.icon] ?? Shield
            const theme = THEME_COLORS[feature.color] ?? fallbackTheme
            return (
              <div key={feature.id} className="group relative w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(25%-1.125rem)] min-w-[200px]">
                <div
                  className={`absolute inset-0 ${theme.glow} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl`}
                />
                <div className={`relative glass-card ${theme.border} p-6 transition-colors duration-300 h-full flex flex-col items-center text-center`}>
                  <div className={`w-12 h-12 rounded-xl ${theme.bg} flex items-center justify-center mb-4`}>
                    <IconComponent className={`w-6 h-6 ${theme.icon}`} />
                  </div>
                  <h3 className="text-offwhite font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sage text-sm">{feature.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
