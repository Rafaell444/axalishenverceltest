"use client"

import { useState } from "react"
import { Mail, ArrowRight, Check, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { submitNewsletter } from "@/lib/api"
import { useTranslations } from "next-intl"

export function NewsletterSection() {
  const t = useTranslations("newsletter")
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus("loading")
    setErrorMsg("")
    try {
      await submitNewsletter(email)
      setStatus("success")
      setEmail("")
    } catch (err: unknown) {
      const errObj = err as Record<string, unknown>
      const msg =
        typeof errObj?.email === "object" && Array.isArray(errObj.email)
          ? (errObj.email as string[])[0]
          : t("errorDefault")
      setErrorMsg(msg)
      setStatus("error")
    }
  }

  return (
    <section className="py-14 md:py-18 px-4 bg-card/40 border-y border-border">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">

        <div className="flex-1 flex gap-5 items-start">
          <div className="w-1 self-stretch rounded-full bg-gradient-to-b from-primary to-accent shrink-0 hidden sm:block" />
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Mail className="w-4 h-4 text-primary" />
              <span className="text-primary text-xs font-semibold uppercase tracking-widest">{t("eyebrow")}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              {t("heading")} <span className="text-primary">{t("headingHighlight")}</span> {t("headingSuffix")}
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              {t("description")}
            </p>
          </div>
        </div>

        <div className="flex-1 w-full">
          {status === "success" ? (
            <div className="flex items-center gap-4 p-5 rounded-xl border border-primary/30 bg-primary/5">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <Check className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">{t("successTitle")}</p>
                <p className="text-muted-foreground text-xs">{t("successDesc")}</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  type="email"
                  placeholder={t("placeholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 h-11 bg-background border-border"
                  required
                />
                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="h-11 px-5 bg-primary hover:bg-primary/90 shrink-0"
                >
                  {status === "loading" ? t("subscribing") : t("subscribe")}
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </div>
              {status === "error" && (
                <div className="flex items-center gap-2 text-red-400 text-xs">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {errorMsg}
                </div>
              )}
              <p className="text-muted-foreground text-xs">
                {t("privacyPrefix")}{" "}
                <a href="/privacy" className="underline hover:text-foreground transition-colors">
                  {t("privacyLink")}
                </a>
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
