import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { Header } from "@/components/header"
import { buildMetadata } from "@/lib/seo"
import { Footer } from "@/components/footer"
import { ContactContent } from "@/components/contact-content"
import { fetchSettings, fetchPageSeo } from "@/lib/api"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const [seo, t] = await Promise.all([
    fetchPageSeo("contact", locale).catch(() => null),
    getTranslations({ locale, namespace: "contact" }),
  ])
  return buildMetadata(seo, {
    title: `${t("heading")} ${t("headingHighlight")}`,
    description: t("description"),
  })
}

export default async function ContactPage() {
  const settings = await fetchSettings().catch(() => null)

  return (
    <main className="min-h-screen">
      <Header settings={settings} />
      <ContactContent />
      <Footer settings={settings} />
    </main>
  )
}
