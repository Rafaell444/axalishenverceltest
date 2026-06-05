"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { submitContact } from "@/lib/api"
import { useTranslations } from "next-intl"

export default function ContactPage() {
  const t = useTranslations("contact")
  const [formState, setFormState] = useState({ name: "", email: "", phone: "", service: "", message: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setErrorMsg("")
    try {
      await submitContact(formState)
      setStatus("success")
      setFormState({ name: "", email: "", phone: "", service: "", message: "" })
      setTimeout(() => setStatus("idle"), 5000)
    } catch (err: unknown) {
      const errObj = err as Record<string, string[]>
      const first = Object.values(errObj)[0]
      setErrorMsg(Array.isArray(first) ? first[0] : t("errorDefault"))
      setStatus("error")
    }
  }

  const contactInfo = [
    { icon: MapPin, title: t("address"), details: [t("addressLine0"), t("addressLine1")] },
    { icon: Phone, title: t("phone"), details: ["+995 555 123 456", "+995 322 123 456"] },
    { icon: Mail, title: t("email"), details: ["info@akhalishen.ge"] },
    { icon: Clock, title: t("workingHours"), details: [t("hoursLine0"), t("hoursLine1")] },
  ]

  return (
    <main className="min-h-screen">
      <Header />

      <section className="pt-24 md:pt-32 pb-12 md:pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-gold font-medium mb-4 block">{t("eyebrow")}</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t("heading")} <span className="text-gold">{t("headingHighlight")}</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t("description")}</p>
        </div>
      </section>

      <section className="pb-12 md:pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {contactInfo.map((info, index) => (
              <div key={index} className="glass-card rounded-xl p-6 hover:border-gold/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                  <info.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{info.title}</h3>
                {info.details.map((d, i) => <p key={i} className="text-muted-foreground text-sm">{d}</p>)}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 px-4 glass">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="glass-card rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="w-6 h-6 text-gold" />
                <h2 className="text-2xl font-bold text-foreground">{t("writeToUs")}</h2>
              </div>

              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">{t("successTitle")}</h3>
                  <p className="text-muted-foreground">{t("successDesc")}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">{t("nameLabel")}</label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors"
                        placeholder={t("namePlaceholder")}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">{t("phoneLabel")}</label>
                      <input
                        type="tel"
                        required
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors"
                        placeholder="+995 5XX XXX XXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">{t("emailLabel")}</label>
                    <input
                      type="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors"
                      placeholder="example@email.com"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">{t("serviceLabel")}</label>
                    <select
                      value={formState.service}
                      onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-gold transition-colors"
                    >
                      <option value="">{t("serviceDefault")}</option>
                      {[t("svcOpt1"), t("svcOpt2"), t("svcOpt3"), t("svcOpt4"), t("svcOpt5"), t("svcOpt6")].map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">{t("messageLabel")}</label>
                    <textarea
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors resize-none"
                      placeholder={t("messagePlaceholder")}
                    />
                  </div>

                  {status === "error" && (
                    <div className="flex items-center gap-2 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      {errorMsg}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-gold text-primary-foreground hover:bg-gold/90 rounded-lg py-3"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {status === "loading" ? t("sendLoading") : t("send")}
                  </Button>
                </form>
              )}
            </div>

            <div className="space-y-6">
              <div className="glass-card rounded-2xl overflow-hidden h-[300px] relative">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-gold/5 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-gold mx-auto mb-3" />
                    <p className="text-foreground font-medium">{t("addressLine1")}</p>
                    <p className="text-muted-foreground text-sm">{t("addressLine0")}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gold/20 via-card to-gold/10 border border-gold/30 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Phone className="w-6 h-6 text-gold" />
                  <h3 className="text-xl font-bold text-foreground">{t("quickContact")}</h3>
                </div>
                <p className="text-muted-foreground mb-6">{t("quickContactDesc")}</p>
                <div className="flex flex-col gap-3">
                  <Button className="bg-gold text-primary-foreground hover:bg-gold/90 rounded-lg" asChild>
                    <a href="tel:+995555123456"><Phone className="w-4 h-4 mr-2" />+995 555 123 456</a>
                  </Button>
                  <Button variant="outline" className="border-foreground/20 hover:bg-foreground/10 rounded-lg" asChild>
                    <a href="mailto:info@akhalishen.ge"><Mail className="w-4 h-4 mr-2" />info@akhalishen.ge</a>
                  </Button>
                </div>
              </div>

              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
                <h4 className="font-semibold text-red-400 mb-2">{t("emergency")}</h4>
                <p className="text-muted-foreground text-sm mb-3">{t("emergencyDesc")}</p>
                <a href="tel:+995322911911" className="text-red-400 font-bold text-xl hover:underline">+995 322 911 911</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
