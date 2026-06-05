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
    <section className="py-6 px-4">
      <div
        className="mx-auto rounded-2xl px-6 py-5 md:px-10 md:py-6"
        style={{
          maxWidth: '1160px',
          background: 'rgba(8,18,15,0.45)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(201,166,100,0.12)',
        }}
      >
        <h3 className="mb-5 text-center text-sm font-medium text-[#7A7A7A] uppercase tracking-widest">{t("heading")}</h3>
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
                className="text-sm sm:text-base font-semibold tracking-tight text-[#B8B8B8]/50 transition-colors hover:text-[#B8B8B8] text-center"
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
