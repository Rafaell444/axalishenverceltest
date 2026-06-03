import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/cta-section"
import { Calendar, ArrowLeft, User, Tag } from "lucide-react"
import { Link } from "@/i18n/navigation"
import { fetchSettings, fetchBlogPost, fetchBlogPosts } from "@/lib/api"
import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"

const DEFAULT_POSTS_MAP: Record<string, {
  title: string; excerpt: string; body: string; published_at: string;
  author_name: string | null; category: { id: number; name: string; slug: string; post_count: number } | null
}> = {
  "stress-management": {
    title: "სტრესის ეფექტური მართვა — 7 მეცნიერულად დადასტურებული მეთოდი",
    excerpt: "თანამედროვე ცხოვრების ტემპი ხშირად გვაიძულებს გამუდმებით მაღალი სტრესის ქვეშ ვიმყოფებოდეთ.",
    body: `<p>სტრესი ჩვენი ყოველდღიური ცხოვრების განუყოფელი ნაწილია, მაგრამ მისი გამუდმებული ზემოქმედება ჯანმრთელობისთვის საზიანოა. კვლევები გვიჩვენებს, რომ ქრონიკული სტრესი ზრდის გულ-სისხლძარღვთა დაავადებების, დეპრესიის და იმუნური სისტემის დასუსტების რისკს.</p>
<h2>1. დიაფრაგმული სუნთქვა</h2>
<p>ღრმა, ნელი სუნთქვა ააქტიურებს პარასიმპათიკურ ნერვულ სისტემას — "დასვენება და მოფიქრება" პასუხს. 4-7-8 ტექნიკა: ჩაისუნთქეთ 4 წამი, შეიკავეთ 7 წამი, ამოისუნთქეთ 8 წამი.</p>
<h2>2. ფიზიკური აქტივობა</h2>
<p>30 წუთის ზომიერი ვარჯიში ამცირებს კორტიზოლის დონეს და ზრდის ენდორფინების გამოყოფას. კვირაში 5 დღე ვარჯიში 50%-ით ამცირებს შფოთვის სიმპტომებს.</p>
<h2>3. მაინდფულნეს მედიტაცია</h2>
<p>MBSR (Mindfulness-Based Stress Reduction) პროგრამა კლინიკურად დამტკიცებულია. 8-კვირიანი კურსი მნიშვნელოვნად ამცირებს სტრეს-ჰორმონების დონეს.</p>
<h2>4. ძილის ჰიგიენა</h2>
<p>ძილი სტრესის ყველაზე ეფექტური "ანტიდოტია". ყოველდღე ერთ და იმავე დროს ძილი და გაღვიძება სტაბილიზებს ციკადიან რიტმს.</p>
<h2>5. სოციალური კავშირი</h2>
<p>მეგობრებთან და ოჯახთან ურთიერთობა ოქსიტოცინს გამოყოფს — ბუნებრივ სტრეს-შემამცირებელ ჰორმონს.</p>
<h2>6. ბუნებაში ყოფნა</h2>
<p>ტყეში 20-წუთიანი გასეირნება ამცირებს კორტიზოლს 12.5%-ით. "ტყის აბაზანა" (shinrin-yoku) იაპონიაში ოფიციალური სამკურნალო მეთოდია.</p>
<h2>7. პროფესიული დახმარება</h2>
<p>როცა სტრესი გახდება ქრონიკული — ფსიქოლოგთან კონსულტაცია არ არის სისუსტე, ეს არის ყველაზე ჭკვიანი გადაწყვეტა.</p>`,
    published_at: "2026-05-01T10:00:00Z",
    author_name: "ნინო კვარაცხელია",
    category: { id: 2, name: "ფსიქოლოგია", slug: "psychology", post_count: 3 },
  },
  "healthy-nutrition": {
    title: "ჯანსაღი კვება ტვინის ჯანმრთელობისთვის",
    excerpt: "კვლევები ადასტურებს, რომ ჩვენი კვება პირდაპირ გავლენას ახდენს ტვინის ფუნქციონირებაზე.",
    body: `<p>ტვინი სხეულის წონის მხოლოდ 2%-ს შეადგენს, მაგრამ ენერგიის 20%-ს მოიხმარს. სწორი კვება კრიტიკულია ოპტიმალური კოგნიტიური ფუნქციისთვის.</p>
<h2>ომეგა-3 ცხიმოვანი მჟავები</h2>
<p>DHA ომეგა-3 ტვინის 60%-ს შეადგენს. ცხიმოვანი თევზი (ორაგული, სარდინი), თხილეული და სელის თესლი მდიდარია ომეგა-3-ით. კვლევებმა აჩვენა მათი კავშირი დეპრესიის შემცირებასთან.</p>
<h2>ანტიოქსიდანტები</h2>
<p>მოცვი, ბროკოლი, ისპანახი — ეს პროდუქტები ანელებენ ოქსიდაციურ სტრესსა და ტვინის "დაბერებას".</p>
<h2>B ვიტამინები</h2>
<p>B12 და ფოლიუმის მჟავა აუცილებელია ნეიროტრანსმიტერების სინთეზისთვის. მათი დეფიციტი პირდაპირ კავშირშია დეპრესიასთან.</p>
<h2>მაგნიუმი</h2>
<p>სტრესი ამცირებს მაგნიუმის დონეს, ხოლო მაგნიუმის დეფიციტი ზრდის სტრეს-პასუხს. ბოსტნეული, თხილეული, შოკოლადი — საუკეთესო წყაროები.</p>`,
    published_at: "2026-04-20T09:00:00Z",
    author_name: "მარიამ ჯავახიშვილი",
    category: { id: 3, name: "კვება", slug: "nutrition", post_count: 1 },
  },
  "new-product-launch-2026": {
    title: "ახალი პროდუქტის პრეზენტაცია — ომეგა-3 Ultra Pure",
    excerpt: "ჩვენ წარვადგენთ ჩვენს ყველაზე სუფთა ომეგა-3 ფორმულას.",
    body: `<p>დღეს ჩვენ სიამაყით წარვადგენთ ჩვენს ახალ ფლაგმანურ პროდუქტს — <strong>Omega-3 Ultra Pure 1200mg</strong>. ეს პროდუქტი სამი წლის R&D კვლევის შედეგია.</p>
<h2>რა ხდის მას განსაკუთრებულს?</h2>
<p>99.2% სისუფთავე — ბაზარზე ყველაზე მაღალი. ნედლეული მოდის ისლანდიური ცივი ზღვის სარდინებიდან, სადაც დაბინძურება მინიმალურია. ყოველი კაფსულა შეიცავს 800mg EPA + 400mg DHA ოპტიმალური თანაფარდობით.</p>
<h2>წარმოება</h2>
<p>სამ დამოუკიდებელ ლაბორატორიაში ტესტირება. IFOS 5-ვარსკვლავიანი სერტიფიკაცია. Mercury, Lead, PCBs — ყველა 5-ჯერ ქვემოთ WHO ლიმიტებზე.</p>
<h2>ხელმისაწვდომობა</h2>
<p>პროდუქტი ხელმისაწვდომია 30 და 90 კაფსულის შეფუთვებში. შეუკვეთეთ ახლავე ჩვენს ვებსაიტზე ან ფარმაცევტულ ქსელში.</p>`,
    published_at: "2026-05-20T10:00:00Z",
    author_name: "ახალი შენ",
    category: { id: 10, name: "სიახლეები", slug: "news", post_count: 3 },
  },
  "iso-certification-renewal": {
    title: "ISO 9001:2015 სერთიფიკატის განახლება წარმატებით დასრულდა",
    excerpt: "2026 წლის მაისში ჩვენმა საწარმომ წარმატებით გაიარა ISO 9001:2015 სერტიფიკაციის განახლების აუდიტი.",
    body: `<p>2026 წლის 5-8 მაისს ჩვენს საწარმოში ჩატარდა ISO 9001:2015 სერტიფიკაციის განახლების გარე აუდიტი. სიამოვნებით გვაცნობება, რომ აუდიტი დასრულდა <strong>ნულოვანი შეუსაბამობით</strong>.</p>
<h2>აუდიტის შედეგები</h2>
<p>SGS-ის ორი სტარშ-აუდიტორი 3 დღის განმავლობაში შეამოწმა ჩვენი ხარისხის მართვის სისტემის 14 პროცესი. ყველა მაჩვენებელი შეესაბამება ან აჭარბებს სტანდარტის მოთხოვნებს.</p>
<h2>გამოყოფილი ძლიერი მხარეები</h2>
<p>აუდიტორებმა განსაკუთრებულად შეაფასეს: ლაბორატორიული ტესტირების სისტემა, სახელმძღვანელო დოკუმენტაცია, პერსონალის ტრეინინგ პროგრამა და მომხმარებელთა კმაყოფილების მდევნება.</p>`,
    published_at: "2026-05-10T09:00:00Z",
    author_name: "ახალი შენ",
    category: { id: 10, name: "სიახლეები", slug: "news", post_count: 3 },
  },
  "partnership-announcement": {
    title: "ახალი პარტნიორობა ევროპულ განაწილების ქსელთან",
    excerpt: "ხელი მოეწერა ხელშეკრულებას EvroDistrib-თან.",
    body: `<p>2026 წლის 28 აპრილს ხელი მოეწერა სტრატეგიული პარტნიორობის შეთანხმებას EvroDistrib GmbH-თან — ევროპის ერთ-ერთ წამყვან ჯანმრთელობის პროდუქტების განაწილების კომპანიასთან.</p>
<h2>პარტნიორობის პირობები</h2>
<p>ექსკლუზიური განაწილების უფლება საქართველოს ბრენდებისთვის გერმანიაში, ავსტრიაში, შვეიცარიაში და კიდევ 9 EU ქვეყანაში. პირველი მიწოდება დაგეგმილია 2026 წლის IV კვარტლისთვის.</p>
<h2>მოსალოდნელი გავლენა</h2>
<p>ეს პარტნიორობა საშუალებას მოგვცემს 3-ჯერ გავზარდოთ ჩვენი ექსპორტი 2027 წლამდე. ევროპული ბაზარი მნიშვნელოვანი ნაბიჯია ჩვენი საერთაშორისო ზრდის სტრატეგიაში.</p>`,
    published_at: "2026-04-28T14:00:00Z",
    author_name: "ახალი შენ",
    category: { id: 10, name: "სიახლეები", slug: "news", post_count: 3 },
  },
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug } = await params
  const [settings, t] = await Promise.all([
    fetchSettings().catch(() => null),
    getTranslations("blog"),
  ])

  const post = await fetchBlogPost(slug).catch(() => null)
  const defaultPost = DEFAULT_POSTS_MAP[slug]

  if (!post && !defaultPost) notFound()

  const title = post?.title ?? defaultPost.title
  const excerpt = post?.excerpt ?? defaultPost.excerpt
  const body = post?.body ?? defaultPost.body
  const published_at = post?.published_at ?? defaultPost.published_at
  const author_name = post?.author_name ?? defaultPost.author_name
  const category = post?.category ?? defaultPost.category

  const relatedPosts = await fetchBlogPosts().catch(() => [])
  const related = relatedPosts.filter((p) => p.slug !== slug).slice(0, 3)

  return (
    <main className="min-h-screen bg-background">
      <Header settings={settings} />

      <article className="pt-24 md:pt-32 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Back */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("backToBlog")}
          </Link>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            {category && (
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary">
                {category.name}
              </span>
            )}
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(published_at).toLocaleDateString("ka-GE", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            {author_name && (
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <User className="w-3.5 h-3.5" />
                {author_name}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed border-l-2 border-primary/40 pl-4">
            {excerpt}
          </p>

          {/* Body */}
          <div
            className="prose prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-h2:text-xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-3 max-w-none"
            dangerouslySetInnerHTML={{ __html: body ?? "" }}
          />
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="py-14 px-4 border-t border-border/40 bg-card/30">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl font-bold text-foreground mb-7">{t("related")}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((p) => (
                <Link key={p.id} href={`/blog/${p.slug}` as "/blog"}>
                  <article className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 transition-colors h-full">
                    <div className="aspect-[16/9] bg-primary/5 flex items-center justify-center">
                      {p.featured_image_url ? (
                        <img src={p.featured_image_url} alt={p.title} className="w-full h-full object-cover" />
                      ) : (
                        <Tag className="w-8 h-8 text-primary/20" />
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 text-sm mb-1">
                        {p.title}
                      </h3>
                      <span className="text-xs text-muted-foreground">
                        {new Date(p.published_at).toLocaleDateString("ka-GE")}
                      </span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
      <Footer settings={settings} />
    </main>
  )
}
