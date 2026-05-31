"use client"

import { useState } from "react"
import { Users, Microscope, HeartPulse, ArrowRight, Check, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

const steps = [
  {
    step: 1,
    title: "კონსულტაცია",
    desc: "სპეციალისტთან შეხვედრა",
    fullDesc: "გამოცდილი სპეციალისტი შეაფასებს თქვენს მდგომარეობას",
    icon: Users,
    color: "from-violet-500 to-purple-600",
    bgColor: "bg-violet-500/10",
    borderColor: "border-violet-500/30",
    textColor: "text-violet-400"
  },
  {
    step: 2,
    title: "დიაგნოსტიკა",
    desc: "სრული გამოკვლევა",
    fullDesc: "თანამედროვე აპარატურით ჩატარებული დიაგნოსტიკა",
    icon: Microscope,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    textColor: "text-blue-400"
  },
  {
    step: 3,
    title: "მკურნალობა",
    desc: "ინდივიდუალური გეგმა",
    fullDesc: "პერსონალიზებული მკურნალობის გეგმა თქვენთვის",
    icon: HeartPulse,
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    textColor: "text-emerald-400"
  },
  {
    step: 4,
    title: "შედეგი",
    desc: "თქვენი ტრანსფორმაცია",
    fullDesc: "მიიღეთ სასურველი შედეგი და ახალი ცხოვრება",
    icon: Sparkles,
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    textColor: "text-amber-400"
  }
]

export function ProcessSteps() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Desktop: Horizontal cards */}
        <div className="hidden md:block">
          <div className="relative">
            <div className="grid grid-cols-4 gap-6">
              {steps.map((step, index) => (
                <div 
                  key={step.step}
                  className="relative"
                  onMouseEnter={() => setHoveredStep(step.step)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  {/* Card */}
                  <div className={cn(
                    "relative p-6 rounded-2xl border transition-all duration-500 cursor-pointer group",
                    "bg-card hover:bg-card/80",
                    hoveredStep === step.step 
                      ? `${step.borderColor} shadow-lg shadow-${step.textColor}/10` 
                      : "border-border"
                  )}>
                    {/* Step number badge */}
                    <div className={cn(
                      "absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white transition-all duration-300",
                      `bg-gradient-to-br ${step.color}`,
                      hoveredStep === step.step ? "scale-110" : ""
                    )}>
                      {hoveredStep === step.step ? <Check className="w-4 h-4" /> : step.step}
                    </div>
                    
                    {/* Icon */}
                    <div className={cn(
                      "w-16 h-16 rounded-xl flex items-center justify-center mb-4 transition-all duration-300",
                      step.bgColor,
                      hoveredStep === step.step ? "scale-110" : ""
                    )}>
                      <step.icon className={cn("w-8 h-8 transition-colors", step.textColor)} />
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-lg font-bold text-foreground mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{step.desc}</p>
                    
                    {/* Expanded content on hover */}
                    <div className={cn(
                      "overflow-hidden transition-all duration-300",
                      hoveredStep === step.step ? "max-h-20 opacity-100 mt-3" : "max-h-0 opacity-0"
                    )}>
                      <div className={cn("h-px w-full mb-3", step.bgColor)} />
                      <p className="text-xs text-muted-foreground">{step.fullDesc}</p>
                    </div>
                    
                    {/* Arrow to next step */}
                    {index < steps.length - 1 && (
                      <div className={cn(
                        "absolute -right-4 top-1/2 -translate-y-1/2 z-10 transition-all duration-300",
                        hoveredStep === step.step ? "opacity-100 translate-x-1" : "opacity-30"
                      )}>
                        <ArrowRight className={cn("w-5 h-5", step.textColor)} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: Vertical cards with line */}
        <div className="md:hidden space-y-4">
          {steps.map((step, index) => (
            <div key={step.step} className="relative flex gap-4">
              {/* Vertical line */}
              <div className="flex flex-col items-center">
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                  `bg-gradient-to-br ${step.color}`
                )}>
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                {index < steps.length - 1 && (
                  <div className={cn(
                    "w-0.5 flex-1 min-h-[2rem] mt-2",
                    `bg-gradient-to-b ${step.color}`
                  )} />
                )}
              </div>
              
              {/* Content */}
              <div className={cn(
                "flex-1 p-4 rounded-xl border transition-all",
                step.borderColor,
                step.bgColor
              )}>
                <div className="flex items-center gap-2 mb-1">
                  <span className={cn("text-xs font-semibold", step.textColor)}>
                    ნაბიჯი {step.step}
                  </span>
                </div>
                <h3 className="font-bold text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
