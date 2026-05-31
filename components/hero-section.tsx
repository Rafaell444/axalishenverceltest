import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { HeroData } from "@/lib/api"

interface Props {
  data: HeroData | null
}

const DEFAULT: HeroData = {
  title: "ახალი შენ –",
  title_highlight: "ახალი ცხოვრება",
  description:
    "ჩვენი მიზანია დაგეხმაროთ კანინეთობის აღდგენაში და ცხოვრების ხარისხის გაუმჯობესებაში თანამედროვე, უსაფრთხო და ინდივიდუალური მიდგომით.",
  cta_primary_text: "დაგვიკავშირდით",
  cta_primary_link: "/contact",
  cta_secondary_text: "გაიგე მეტი",
  cta_secondary_link: "/about",
  image_url: null,
}

export function HeroSection({ data }: Props) {
  const d = data ?? DEFAULT

  return (
    <section className="relative overflow-hidden">
      {/* Background glow — kept inside overflow-hidden */}
      <div className="pointer-events-none absolute right-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/3 rounded-full bg-primary/20 blur-[120px]" />

      <div className="container mx-auto px-4 py-12 sm:py-16 lg:px-8 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Text */}
          <div className="max-w-xl text-center lg:text-left mx-auto lg:mx-0">
            <h1 className="text-balance text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
              {d.title}{" "}
              <span className="text-primary">{d.title_highlight}</span>
            </h1>
            <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              {d.description}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
              <Button size="lg" className="bg-primary hover:bg-primary/90 w-full sm:w-auto" asChild>
                <Link href={d.cta_primary_link}>{d.cta_primary_text}</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-secondary w-full sm:w-auto"
                asChild
              >
                <Link href={d.cta_secondary_link}>{d.cta_secondary_text}</Link>
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[300px] sm:max-w-[360px] md:max-w-[420px] aspect-[3/4] overflow-hidden rounded-2xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
              <Image
                src={d.image_url || "/images/hero-woman.jpg"}
                alt="Woman silhouette representing transformation"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
