"use client"

import Link from "next/link"
import { MessageCircle, Phone, ArrowRight, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import type { SiteSettings } from "@/lib/api"

interface Props {
  settings?: SiteSettings | null
}

export function AppointmentCTA({ settings }: Props) {
  const t = useTranslations("appointment")
  const phone = settings?.primary_phone || "+995 555 123 456"
  const address = settings ? `${settings.address_line1}, ${settings.address_line2}` : "თბილისი, რუსთაველის გამზ. 24"
  const weekdayHours = settings?.working_hours_weekdays || "09:00 - 19:00"
  const saturdayHours = settings?.working_hours_saturday || "10:00 - 15:00"
  const mapsUrl = settings?.google_maps_embed || "#"

  return (
    <section className="py-16 md:py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 p-6 sm:p-8 md:p-12">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6">
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm font-medium">{t("badge")}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                {t("heading")}<br />
                <span className="text-white/80">{t("headingSub")}</span>
              </h2>

              <p className="text-white/80 mb-8 max-w-md">{t("description")}</p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                  <Link href="/contact">
                    {t("contactBtn")}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="ghost" className="border border-white/30 hover:bg-white/10">
                  <a href={`tel:${phone.replace(/\s/g, "")}`}>
                    <Phone className="w-4 h-4 mr-2" />
                    {phone}
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 grid gap-6">
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-foreground font-semibold mb-1">{t("workingHours")}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{t("workingHoursDesc")}</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between gap-4">
                      <span className="text-muted-foreground">{t("monFri")}</span>
                      <span className="text-foreground">{weekdayHours}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-muted-foreground">{t("sat")}</span>
                      <span className="text-foreground">{saturdayHours}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-foreground font-semibold mb-1">{t("addressHeading")}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{t("addressDesc")}</p>
                  <p className="text-foreground text-sm">{address}</p>
                  {mapsUrl && mapsUrl !== "#" && (
                    <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="link" className="text-primary p-0 h-auto mt-2 text-sm">
                        {t("viewOnMap")}
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
