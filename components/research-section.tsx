import { FileText, ExternalLink, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useTranslations } from "next-intl"
import type { Publication } from "@/lib/api"

const DEFAULT_PUBLICATIONS: Publication[] = [
  { id: 1, title: "ინოვაციური მიდგომები ქრონიკული დაავადებების მკურნალობაში", journal: "ევროპული სამედიცინო ჟურნალი", date: "2024-01-01", url: "", description: "", order: 0 },
  { id: 2, title: "პაციენტზე ორიენტირებული მედიცინის თანამედროვე მეთოდები", journal: "საერთაშორისო ჯანდაცვის მიმოხილვა", date: "2024-01-01", url: "", description: "", order: 1 },
]

interface Props {
  publications: Publication[]
}

export function ResearchSection({ publications }: Props) {
  const t = useTranslations("research")
  const items = publications.length > 0 ? publications : DEFAULT_PUBLICATIONS

  return (
    <section className="py-16 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("heading")} <span className="text-primary">{t("headingHighlight")}</span>
            </h2>
            <p className="text-muted-foreground max-w-xl">{t("description")}</p>
          </div>

          <Button variant="outline" className="border-border hover:border-primary rounded-full" asChild>
            <Link href="/blog">
              {t("allPublications")}
              <ExternalLink className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6">
          {items.map((pub) => {
            const year = pub.date ? new Date(pub.date).getFullYear() : ""
            return (
              <div
                key={pub.id}
                className="group bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all cursor-pointer"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
                        {t("researchTag")}
                      </span>
                      {year && (
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {year}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                      {pub.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{pub.journal}</p>
                  </div>

                  {pub.url ? (
                    <a href={pub.url} target="_blank" rel="noopener noreferrer" className="shrink-0">
                      <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </a>
                  ) : (
                    <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
