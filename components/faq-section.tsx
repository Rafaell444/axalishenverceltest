import { Plus, Minus } from "lucide-react"
import { useTranslations } from "next-intl"
import type { FAQ } from "@/lib/api"

const FAQ_CSS = `
  details.faq-item > summary { list-style: none; cursor: pointer; }
  details.faq-item > summary::-webkit-details-marker { display: none; }
  details.faq-item .faq-body {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.32s ease;
  }
  details.faq-item[open] .faq-body {
    grid-template-rows: 1fr;
  }
  details.faq-item .faq-body > div { overflow: hidden; }
  details.faq-item .faq-plus  { display: block; }
  details.faq-item .faq-minus { display: none;  }
  details.faq-item[open] .faq-plus  { display: none;  }
  details.faq-item[open] .faq-minus { display: block; }
  details.faq-item[open] {
    border-color: oklch(0.65 0.18 280 / 0.4) !important;
  }
  details.faq-item[open] summary .faq-icon-wrap {
    background: oklch(0.65 0.18 280 / 0.2);
  }
  details.faq-item > summary:hover .faq-icon-wrap {
    background: oklch(0.65 0.18 280 / 0.15);
  }
`

const DEFAULT_FAQS: FAQ[] = [
  { id: 1, question: "როგორ შემიძლია მივიღო კონსულტაცია?", answer: "კონსულტაციის მისაღებად შეგიძლიათ დაგვირეკოთ ტელეფონზე ან მოგვწეროთ ელ-ფოსტაზე. ჩვენი გუნდი სამუშაო საათებში ყოველთვის მზად არის დასახმარებლად.", order: 0 },
  { id: 2, question: "რა ღირს პირველადი კონსულტაცია?", answer: "ფასი დამოკიდებულია სპეციალისტზე და სერვისის სახეობაზე. დეტალური ინფორმაციისთვის გთხოვთ დაგვიკავშირდეთ ტელეფონით ან ელ-ფოსტით.", order: 1 },
  { id: 3, question: "გაქვთ დაზღვევასთან თანამშრომლობა?", answer: "დიახ, ჩვენ ვთანამშრომლობთ რამდენიმე სადაზღვევო კომპანიასთან. გთხოვთ გამოგვიგზავნოთ თქვენი სადაზღვევო პოლისის ინფორმაცია.", order: 2 },
  { id: 4, question: "რა არის თქვენი სამუშაო საათები?", answer: "ჩვენ ვმუშაობთ ორშაბათიდან პარასკევამდე 09:00-დან 19:00-მდე, შაბათს 10:00-დან 15:00-მდე. კვირას განსაკუთრებული შეთანხმებით.", order: 3 },
  { id: 5, question: "რამდენი ხანი გრძელდება მკურნალობის კურსი?", answer: "კურსის ხანგრძლივობა ინდივიდუალურია და დამოკიდებულია პრობლემის სახეობასა და სიმძიმეზე. საშუალოდ კურსი გრძელდება 4-12 კვირა.", order: 4 },
]

interface Props {
  faqs: FAQ[]
}

export function FAQSection({ faqs }: Props) {
  const t = useTranslations("faq")
  const items = faqs.length > 0 ? faqs : DEFAULT_FAQS

  return (
    <section className="py-16 md:py-20 px-4 bg-card/50">
      {/* eslint-disable-next-line react/no-danger */}
      <style dangerouslySetInnerHTML={{ __html: FAQ_CSS }} />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("heading")} <span className="text-primary">{t("headingHighlight")}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t("description")}</p>
        </div>

        <div className="space-y-3">
          {items.map((faq, index) => (
            <details
              key={faq.id}
              className="faq-item bg-card border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-colors"
              open={index === 0}
            >
              <summary className="flex items-center justify-between p-5 md:p-6 text-left select-none">
                <span className="font-medium text-foreground pr-4 leading-snug">{faq.question}</span>
                <span className="faq-icon-wrap shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center transition-colors">
                  <Plus  className="faq-plus  w-4 h-4 text-primary" />
                  <Minus className="faq-minus w-4 h-4 text-primary" />
                </span>
              </summary>

              <div className="faq-body">
                <div>
                  <p className="px-5 md:px-6 pb-5 md:pb-6 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
