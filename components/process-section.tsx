import Link from "next/link"
import { UserCheck, SearchCheck, Sparkles, HeartHandshake, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
import type { ProcessStep } from "@/lib/api"

const PROCESS_CSS = `
  .ps-panel { display: none !important; }
  .ps:has(#ps0:checked) .ps-p0,
  .ps:has(#ps1:checked) .ps-p1,
  .ps:has(#ps2:checked) .ps-p2,
  .ps:has(#ps3:checked) .ps-p3 { display: grid !important; }

  .ps:has(#ps0:checked) .ps-fill { width: 25% !important; }
  .ps:has(#ps1:checked) .ps-fill { width: 50% !important; }
  .ps:has(#ps2:checked) .ps-fill { width: 75% !important; }
  .ps:has(#ps3:checked) .ps-fill { width: 100% !important; }

  .ps-fill { transition: width 0.4s ease; }
  .ps-icon { transition: transform 0.25s ease, box-shadow 0.25s ease; }

  .ps:has(#ps0:checked) label[for="ps0"] .ps-icon,
  .ps:has(#ps1:checked) label[for="ps1"] .ps-icon,
  .ps:has(#ps2:checked) label[for="ps2"] .ps-icon,
  .ps:has(#ps3:checked) label[for="ps3"] .ps-icon {
    transform: scale(1.12);
    box-shadow: 0 0 24px rgba(139, 92, 246, 0.35);
  }
  .ps:has(#ps0:checked) label[for="ps0"] .ps-badge,
  .ps:has(#ps1:checked) label[for="ps1"] .ps-badge,
  .ps:has(#ps2:checked) label[for="ps2"] .ps-badge,
  .ps:has(#ps3:checked) label[for="ps3"] .ps-badge {
    background: #fff !important;
    color: #1a1a2e !important;
  }
`

const STEP_ICON_STYLES = [
  { Icon: UserCheck, gradient: "from-violet-500 to-purple-600", glow: "bg-violet-500/20" },
  { Icon: SearchCheck, gradient: "from-blue-500 to-cyan-500", glow: "bg-blue-500/20" },
  { Icon: Sparkles, gradient: "from-emerald-500 to-teal-500", glow: "bg-emerald-500/20" },
  { Icon: HeartHandshake, gradient: "from-amber-500 to-orange-500", glow: "bg-amber-500/20" },
]

const DEFAULT_STEPS: ProcessStep[] = [
  { id: 1, step_number: 1, title: "კონსულტაცია", description: "პირველადი შეხვედრა სპეციალისტთან და მდგომარეობის შეფასება.", order: 0 },
  { id: 2, step_number: 2, title: "დიაგნოსტიკა", description: "სრული სამედიცინო გამოკვლევა და დიაგნოზის დასმა.", order: 1 },
  { id: 3, step_number: 3, title: "მკურნალობა", description: "ინდივიდუალური მკურნალობის კურსი თანამედროვე მეთოდებით.", order: 2 },
  { id: 4, step_number: 4, title: "შედეგი", description: "მკურნალობის შედეგების შეფასება და საჭიროებისამებრ კორექტირება.", order: 3 },
]

interface Props {
  steps: ProcessStep[]
}

export function ProcessSection({ steps: apiSteps }: Props) {
  const t = useTranslations("process")
  const subtitles = [t("step0Subtitle"), t("step1Subtitle"), t("step2Subtitle"), t("step3Subtitle")]
  const rawSteps = apiSteps.length > 0 ? apiSteps : DEFAULT_STEPS
  const steps = rawSteps.map((s, i) => ({
    ...STEP_ICON_STYLES[i % STEP_ICON_STYLES.length],
    subtitle: subtitles[i % subtitles.length],
    num: String(s.step_number).padStart(2, "0"),
    title: s.title,
    description: s.description,
    id: s.id,
  }))

  return (
    <section className="py-16 md:py-24 px-4 relative overflow-hidden">
      {/* eslint-disable-next-line react/no-danger */}
      <style dangerouslySetInnerHTML={{ __html: PROCESS_CSS }} />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-primary text-sm font-medium">{t("eyebrow")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 text-balance">
            {t("heading")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              {t("headingHighlight")}
            </span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        {/* Desktop: pure-CSS radio tabs (lg+) */}
        <div className="ps hidden lg:block">
          {steps.map((_, i) => (
            <input key={i} type="radio" name="ps" id={`ps${i}`} defaultChecked={i === 0} className="sr-only" />
          ))}

          <div className="relative mb-10">
            <div className="absolute left-8 right-8 top-8 h-1">
              <div className="w-full h-full bg-border rounded-full" />
              <div className="ps-fill absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent rounded-full" />
            </div>

            <div className="relative flex justify-between">
              {steps.map((step, i) => (
                <label key={i} htmlFor={`ps${i}`} className="cursor-pointer flex flex-col items-center gap-2 group">
                  <div className={cn("ps-icon relative w-16 h-16 rounded-2xl flex items-center justify-center", `bg-gradient-to-br ${step.gradient}`)}>
                    <step.Icon className="ps-icon-inner w-7 h-7 text-white/70 group-hover:text-white" />
                    <span className="ps-badge absolute -top-2 -right-2 w-7 h-7 rounded-full bg-muted text-muted-foreground text-xs font-bold flex items-center justify-center">
                      {step.num}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground group-hover:text-foreground mt-1 max-w-[80px] text-center leading-tight">
                    {step.title}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {steps.map((step, i) => (
            <div
              key={i}
              className={cn("ps-panel", `ps-p${i}`, "grid-cols-2 gap-12 items-center", "relative bg-card/80 border border-border rounded-3xl p-10 overflow-hidden")}
            >
              <div className={cn("absolute inset-0 rounded-3xl blur-3xl opacity-20 pointer-events-none", step.glow)} />
              <div className={cn("absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none", step.glow)} />

              <div className="relative">
                <div className={cn("inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r mb-6 text-white", step.gradient)}>
                  <span className="font-bold text-lg">{step.num}</span>
                  <span className="text-white/80 text-sm">{t("step")}</span>
                </div>
                <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-primary text-lg mb-4">{step.subtitle}</p>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">{step.description}</p>

                <div className="flex items-center gap-3">
                  {i > 0 && (
                    <label htmlFor={`ps${i - 1}`} className="px-5 py-2.5 rounded-xl bg-muted text-muted-foreground hover:bg-muted/70 cursor-pointer text-sm font-medium">
                      {t("prev")}
                    </label>
                  )}
                  {i === 0 && (
                    <span className="px-5 py-2.5 rounded-xl bg-muted text-muted-foreground/30 text-sm font-medium select-none">
                      {t("prev")}
                    </span>
                  )}
                  {i < steps.length - 1 && (
                    <label
                      htmlFor={`ps${i + 1}`}
                      className={cn("flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-medium cursor-pointer bg-gradient-to-r", step.gradient)}
                    >
                      {t("next")}
                      <ArrowRight className="w-4 h-4" />
                    </label>
                  )}
                  {i === steps.length - 1 && (
                    <Link
                      href="/contact"
                      className={cn("flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-medium bg-gradient-to-r", step.gradient)}
                    >
                      {t("book")}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>

              <div className="relative">
                <div className={cn("aspect-square rounded-3xl bg-gradient-to-br p-1", step.gradient)}>
                  <div className="w-full h-full rounded-3xl bg-card flex items-center justify-center overflow-hidden">
                    <div className={cn("w-28 h-28 rounded-2xl bg-gradient-to-br flex items-center justify-center shadow-xl", step.gradient)}>
                      <step.Icon className="w-14 h-14 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: stacked cards (< lg) */}
        <div className="lg:hidden">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center flex-shrink-0">
                <div className={cn("w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center relative z-10", step.gradient)}>
                  <step.Icon className="w-6 h-6 text-white" />
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-foreground text-background text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className="w-0.5 flex-1 my-2 bg-gradient-to-b from-border to-transparent min-h-[1.5rem]" />
                )}
              </div>
              <div className="flex-1 min-w-0 pb-6">
                <h3 className="text-lg font-bold text-foreground mb-0.5 pt-1">{step.title}</h3>
                <p className="text-primary text-sm mb-2">{step.subtitle}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <p className="text-muted-foreground mb-5">{t("readyToStart")}</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-semibold hover:opacity-90 hover:-translate-y-0.5 transition-all duration-200"
          >
            {t("startJourney")}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
