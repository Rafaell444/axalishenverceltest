"use client"

import { useState } from "react"
import { usePathname, useRouter } from "@/i18n/navigation"
import { Link } from "@/i18n/navigation"
import { useLocale, useTranslations } from "next-intl"
import { Menu, X, Phone, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { SiteSettings } from "@/lib/api"

const LOCALES = [
  { code: "ka", label: "ქა" },
  { code: "en", label: "EN" },
  { code: "ru", label: "RU" },
]

interface Props {
  settings?: SiteSettings | null
}

function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = (next: string) => {
    router.replace(pathname, { locale: next })
  }

  return (
    <div className={`flex items-center gap-0.5 rounded-lg border border-[rgba(201,166,100,.18)] p-0.5 bg-[#08120F]/60 ${className ?? ""}`}>
      {LOCALES.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => switchLocale(code)}
          className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
            locale === code
              ? "bg-gold text-[#08120F]"
              : "text-[#7A7A7A] hover:text-[#F4EFE4] hover:bg-[#1B3B34]/50"
          }`}
          aria-label={`Switch to ${code}`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

export function Header({ settings }: Props) {
  const t = useTranslations("nav")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const phone = settings?.primary_phone || "+995 555 123 456"
  const siteName = settings?.site_name || "ახალი შენ"

  const navItems = [
    { href: "/about" as const, label: t("about") },
    { href: "/certifications" as const, label: t("certifications") },
    { href: "/safety" as const, label: t("safety") },
    { href: "/production" as const, label: t("production") },
    { href: "/products" as const, label: t("products") },
  ]

  return (
    <>
    <header className="glass-header fixed top-0 left-0 right-0 z-50 w-full">
      {settings?.announcement_text && (
        <div className="bg-gold/8 border-b border-gold/15 px-4 py-2 text-center text-xs sm:text-sm text-gold leading-snug">
          {settings.announcement_text}
        </div>
      )}

      <div className="max-w-7xl mx-auto flex h-20 items-center justify-between px-6 lg:px-12">
        <Link href="/" className="flex items-center gap-2 shrink-0 min-w-0">
          {settings?.logo_url ? (
            <img src={settings.logo_url} alt={siteName} className="h-[60px] w-auto" />
          ) : (
            <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full border border-gold/30">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6 text-gold">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                <path d="M12 6v6l4 2" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </div>
          )}
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-[#F4EFE4] truncate">{siteName}</span>
            <span className="text-xs text-[#7A7A7A] hidden sm:block">Wellness</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 xl:gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm transition-colors hover:text-[#F4EFE4] whitespace-nowrap ${
                pathname === item.href ? "text-gold font-medium" : "text-[#B8B8B8]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex shrink-0">
          <LanguageSwitcher />
          <a
            href={`tel:${phone.replace(/\s/g, "")}`}
            className="hidden xl:flex items-center gap-1.5 text-sm text-[#7A7A7A] hover:text-[#F4EFE4] transition-colors"
          >
            <Phone className="h-3.5 w-3.5 shrink-0" />
            <span className="whitespace-nowrap">{phone}</span>
          </a>
          <Button className="text-sm h-9 px-4" asChild>
            <Link href="/contact">{t("contactUs")}</Link>
          </Button>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <Button variant="ghost" size="icon" className="h-10 w-10 text-[#F4EFE4]" asChild>
            <a href={`tel:${phone.replace(/\s/g, "")}`}>
              <Phone className="h-5 w-5" />
              <span className="sr-only">{t("call")}</span>
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="h-10 w-10 text-[#F4EFE4]"
            aria-label={mobileMenuOpen ? t("closeMenu") : t("openMenu")}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-[rgba(201,166,100,.12)] bg-[#08120F]/95 backdrop-blur-xl lg:hidden max-h-[calc(100vh-5rem)] overflow-y-auto">
          <nav className="max-w-7xl mx-auto flex flex-col px-6 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center py-3 text-base border-b border-[rgba(201,166,100,.10)] last:border-0 transition-colors ${
                  pathname === item.href
                    ? "text-gold font-medium"
                    : "text-[#B8B8B8] hover:text-[#F4EFE4]"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 pb-2 flex flex-col gap-3">
              <Button className="w-full" asChild>
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                  {t("contactUs")}
                </Link>
              </Button>
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="flex items-center justify-center gap-2 py-2.5 text-sm text-[#B8B8B8] border border-[rgba(201,166,100,.18)] rounded-lg hover:border-gold hover:text-gold transition-colors"
              >
                <Phone className="h-4 w-4" />
                {phone}
              </a>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2 text-sm text-[#7A7A7A]">
                  <Globe className="h-4 w-4" />
                  <span>{t("language")}</span>
                </div>
                <LanguageSwitcher />
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
    <div className="h-20" />
    </>
  )
}
