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
    <div className={`flex items-center gap-0.5 rounded-lg border border-border p-0.5 bg-card/50 ${className ?? ""}`}>
      {LOCALES.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => switchLocale(code)}
          className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
            locale === code
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
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
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {settings?.announcement_text && (
        <div className="bg-primary/10 border-b border-primary/20 px-4 py-2 text-center text-xs sm:text-sm text-primary leading-snug">
          {settings.announcement_text}
        </div>
      )}

      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0 min-w-0">
          {settings?.logo_url ? (
            <img src={settings.logo_url} alt={siteName} className="h-9 w-auto" />
          ) : (
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/50">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4 text-primary">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                <path d="M12 6v6l4 2" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </div>
          )}
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-foreground truncate">{siteName}</span>
            <span className="text-xs text-muted-foreground hidden sm:block">{t("centerTagline")}</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 xl:gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm transition-colors hover:text-foreground whitespace-nowrap ${
                pathname === item.href ? "text-primary font-medium" : "text-muted-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop right side: language switcher + phone + CTA */}
        <div className="hidden items-center gap-3 lg:flex shrink-0">
          <LanguageSwitcher />
          <a
            href={`tel:${phone.replace(/\s/g, "")}`}
            className="hidden xl:flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Phone className="h-3.5 w-3.5 shrink-0" />
            <span className="whitespace-nowrap">{phone}</span>
          </a>
          <Button className="bg-primary hover:bg-primary/90 text-sm h-9 px-4" asChild>
            <Link href="/contact">{t("contactUs")}</Link>
          </Button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 lg:hidden">
          <Button variant="ghost" size="icon" className="h-10 w-10 text-foreground" asChild>
            <a href={`tel:${phone.replace(/\s/g, "")}`}>
              <Phone className="h-5 w-5" />
              <span className="sr-only">{t("call")}</span>
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="h-10 w-10 text-foreground"
            aria-label={mobileMenuOpen ? t("closeMenu") : t("openMenu")}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-background lg:hidden max-h-[calc(100vh-4rem)] overflow-y-auto">
          <nav className="container mx-auto flex flex-col px-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center py-3 text-base border-b border-border/40 last:border-0 transition-colors ${
                  pathname === item.href
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 pb-2 flex flex-col gap-3">
              <Button className="w-full bg-primary hover:bg-primary/90" asChild>
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                  {t("contactUs")}
                </Link>
              </Button>
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="flex items-center justify-center gap-2 py-2.5 text-sm text-muted-foreground border border-border rounded-lg hover:border-primary hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                {phone}
              </a>
              {/* Language switcher in mobile drawer */}
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Globe className="h-4 w-4" />
                  <span>Language</span>
                </div>
                <LanguageSwitcher />
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
