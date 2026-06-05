import {
  Shield, Clock, Users, Award, HeartPulse, Microscope, Leaf, Zap,
  Brain, Stethoscope, Activity, Server, Star, Heart, CheckCircle,
  Sparkles, Globe, Lock, Smile, Droplets, RefreshCw, LucideIcon,
} from "lucide-react"
import { useTranslations } from "next-intl"
import type { Feature } from "@/lib/api"

const ICON_MAP: Record<string, LucideIcon> = {
  Shield, Clock, Users, Award, HeartPulse, Microscope, Leaf, Zap,
  Brain, Stethoscope, Activity, Server, Star, Heart, CheckCircle,
  Sparkles, Globe, Lock, Smile, Droplets, RefreshCw,
}

interface Props {
  features: Feature[]
}

export function FeaturesGrid({ features }: Props) {
  const t = useTranslations("features")
  const DEFAULT_FEATURES: Feature[] = [
    { id: 1, icon: "Leaf", color: "success", title: t("d1title"), description: t("d1desc"), order: 0 },
    { id: 2, icon: "Heart", color: "peace", title: t("d2title"), description: t("d2desc"), order: 1 },
    { id: 3, icon: "Droplets", color: "wellness", title: t("d3title"), description: t("d3desc"), order: 2 },
    { id: 4, icon: "RefreshCw", color: "healing", title: t("d4title"), description: t("d4desc"), order: 3 },
  ]
  const items = features.length > 0 ? features : DEFAULT_FEATURES

  const THEME_COLORS: Record<string, { icon: string; iconBg: string }> = {
    success: { icon: "text-[#C9A664]", iconBg: "bg-[#475A3F]/40" },
    peace:   { icon: "text-[#D9C7A3]", iconBg: "bg-[#A6B58D]/20" },
    wellness:{ icon: "text-[#7FA6A1]", iconBg: "bg-[#6E4A7E]/30" },
    healing: { icon: "text-[#A6B58D]", iconBg: "bg-[#2D5D66]/30" },
  }

  const fallbackTheme = { icon: "text-gold", iconBg: "bg-gold/15" }

  return (
    <section className="py-6 px-4">
      <div
        className="max-w-5xl mx-auto rounded-2xl px-6 py-5 md:px-10 md:py-6"
        style={{
          background: 'rgba(8,18,15,0.45)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(201,166,100,0.12)',
        }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {items.map((feature) => {
            const IconComponent = ICON_MAP[feature.icon] ?? Shield
            const theme = THEME_COLORS[feature.color] ?? fallbackTheme
            return (
              <div key={feature.id} className="flex items-center gap-3 md:gap-4">
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full ${theme.iconBg} flex items-center justify-center shrink-0`}>
                  <IconComponent className={`w-5 h-5 md:w-6 md:h-6 ${theme.icon}`} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[#F4EFE4] font-semibold text-sm md:text-base uppercase tracking-wide leading-tight">{feature.title}</h3>
                  <p className="text-[#7A7A7A] text-xs md:text-sm leading-snug">{feature.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
