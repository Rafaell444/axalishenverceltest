import Link from "next/link"
import { Phone, MapPin, Mail, Clock } from "lucide-react"
import { useTranslations } from "next-intl"
import type { SiteSettings, Service } from "@/lib/api"

interface Props {
  settings?: SiteSettings | null
  services?: Service[]
}

export function Footer({ settings, services = [] }: Props) {
  const t = useTranslations("footer")
  const phone = settings?.primary_phone || "+995 555 123 456"
  const email = settings?.email || "info@akhalishen.ge"
  const address = settings?.address_line2 || t("address")
  const hours = `${t("monFri")} ${settings?.working_hours_weekdays || "09:00 - 19:00"}`
  const siteName = settings?.site_name || "ახალი შენ"

  const companyLinks = [
    { label: t("about"), href: "/about" },
    { label: t("blog"), href: "/blog" },
    { label: t("contact"), href: "/contact" },
  ]

  const defaultServices = [
    { label: t("service0"), href: "/services/narkodam" },
    { label: t("service1"), href: "/services/konsultacia" },
    { label: t("service2"), href: "/services/detoqsikacia" },
  ]

  return (
    <footer className="border-t border-border/40 bg-card/30">
      <div className="container mx-auto px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              {settings?.logo_url ? (
                <img src={settings.logo_url} alt={siteName} className="h-10 w-auto" />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/50">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5 text-primary">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                    <path d="M12 6v6l4 2" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                </div>
              )}
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-foreground">{siteName}</span>
                <span className="text-xs text-muted-foreground">{t("centerTagline")}</span>
              </div>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {settings?.tagline || t("tagline")}
            </p>
            <div className="mt-4 flex gap-3">
              {settings?.facebook_url && (
                <a href={settings.facebook_url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm">Facebook</a>
              )}
              {settings?.instagram_url && (
                <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm">Instagram</a>
              )}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">{t("services")}</h4>
            <ul className="space-y-2">
              {services.length > 0
                ? services.map((s) => (
                    <li key={s.id}>
                      <Link href={`/services/${s.slug}`} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                        {s.title}
                      </Link>
                    </li>
                  ))
                : defaultServices.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                        {link.label}
                      </Link>
                    </li>
                  ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">{t("company")}</h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">{t("contact")}</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-foreground transition-colors">{phone}</a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-foreground transition-colors">{email}</a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                {address}
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 text-primary shrink-0" />
                {hours}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border/40 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {siteName}. {t("rights")}
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">{t("privacy")}</Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">{t("terms")}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
