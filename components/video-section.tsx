"use client"

import { useState } from "react"
import { Play, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

export function VideoSection() {
  const t = useTranslations("video")
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <section className="py-16 lg:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="relative aspect-video md:aspect-[21/9] glass-card overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1B3B34]/60 to-[#3B1E4D]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08120F]/80 via-transparent to-transparent" />

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
            <span className="text-gold text-sm font-medium tracking-wider uppercase mb-4">{t("eyebrow")}</span>
            <h2 className="text-[#F4EFE4] mb-4 max-w-3xl">
              {t("heading")} <span className="text-gold">{t("headingHighlight")}</span>
            </h2>
            <p className="text-[#B8B8B8] max-w-xl mb-8">{t("description")}</p>

            <button onClick={() => setIsPlaying(true)} className="group relative">
              <div className="absolute inset-0 bg-gold/25 rounded-full blur-xl group-hover:bg-gold/40 transition-colors" />
              <div className="relative w-20 h-20 md:w-24 md:h-24 bg-gold rounded-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <Play className="w-8 h-8 md:w-10 md:h-10 text-[#08120F] ml-1" fill="currentColor" />
              </div>
            </button>
          </div>

          <div className="absolute top-8 left-8 w-24 h-24 border border-gold/15 rounded-full" />
          <div className="absolute bottom-8 right-8 w-32 h-32 border border-[#2D5D66]/20 rounded-full" />
        </div>

        {isPlaying && (
          <div className="fixed inset-0 z-50 bg-[#08120F]/95 backdrop-blur-sm flex items-center justify-center p-4">
            <Button variant="ghost" size="icon" className="absolute top-4 right-4" onClick={() => setIsPlaying(false)}>
              <X className="w-6 h-6" />
            </Button>
            <div className="w-full max-w-5xl aspect-video glass-card rounded-2xl flex items-center justify-center">
              <p className="text-[#7A7A7A]">{t("videoPlayer")}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
