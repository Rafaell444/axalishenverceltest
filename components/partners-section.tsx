import { useTranslations } from "next-intl"
import type { Partner } from "@/lib/api"

const DEFAULT_PARTNERS: Partner[] = [
  { id: 1, name: "Johns Hopkins Medicine", logo_url: null, url: "", order: 0 },
  { id: 2, name: "Mayo Clinic", logo_url: null, url: "", order: 1 },
  { id: 3, name: "Cleveland Clinic", logo_url: null, url: "", order: 2 },
  { id: 4, name: "Stanford Medicine", logo_url: null, url: "", order: 3 },
  { id: 5, name: "UCSF Health", logo_url: null, url: "", order: 4 },
]

interface Props {
  partners: Partner[]
}

export function PartnersSection({ partners }: Props) {
  const t = useTranslations("partners")
  const items = partners.length > 0 ? partners : DEFAULT_PARTNERS

  return (
    <section className="border-t border-border/40 bg-background py-12 lg:py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <h3 className="mb-8 text-center text-lg font-medium text-muted-foreground">{t("heading")}</h3>
        <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-8 md:gap-12 lg:gap-16">
          {items.map((partner) =>
            partner.logo_url ? (
              <a
                key={partner.id}
                href={partner.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-80"
              >
                <img src={partner.logo_url} alt={partner.name} className="h-10 object-contain grayscale hover:grayscale-0 transition-all" />
              </a>
            ) : (
              <div
                key={partner.id}
                className="text-sm sm:text-base md:text-lg font-semibold tracking-tight text-muted-foreground/60 transition-colors hover:text-muted-foreground text-center"
              >
                {partner.name}
              </div>
            )
          )}
        </div>
      </div>
    </section>
  )
}
