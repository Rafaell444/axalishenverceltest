"use client"

import { useState } from "react"
import { Play, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

export function VideoSection() {
  const t = useTranslations("video")
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <section className="py-16 md:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-teal/10" />

          <div className="relative aspect-video md:aspect-[21/9] glass-card overflow-hidden bg-gradient-to-br from-[#1B3B34]/80 to-[#3B1E4D]/40">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-20"
              style={{ backgroundImage: "url('/placeholder.svg?height=600&width=1200')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08120F]/80 via-transparent to-transparent" />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4">{t("eyebrow")}</span>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground mb-4 max-w-3xl">
                {t("heading")} <span className="text-primary">{t("headingHighlight")}</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mb-8">{t("description")}</p>

              <button onClick={() => setIsPlaying(true)} className="group relative">
                <div className="absolute inset-0 bg-gold/30 rounded-full blur-xl group-hover:bg-gold/50 transition-colors" />
                <div className="relative w-20 h-20 md:w-24 md:h-24 bg-gold rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground ml-1" fill="currentColor" />
                </div>
              </button>
            </div>

            <div className="absolute top-8 left-8 w-24 h-24 border border-gold/20 rounded-full" />
            <div className="absolute bottom-8 right-8 w-32 h-32 border border-teal/15 rounded-full" />
          </div>
        </div>

        {isPlaying && (
          <div className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-4">
            <Button variant="ghost" size="icon" className="absolute top-4 right-4 text-foreground" onClick={() => setIsPlaying(false)}>
              <X className="w-6 h-6" />
            </Button>
            <div className="w-full max-w-5xl aspect-video bg-card rounded-2xl flex items-center justify-center">
              <p className="text-muted-foreground">{t("videoPlayer")}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
