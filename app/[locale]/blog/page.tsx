import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { NewsletterSection } from "@/components/newsletter-section"
import { Calendar, ArrowRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { fetchSettings, fetchBlogPosts, fetchBlogCategories } from "@/lib/api"
import { getTranslations } from "next-intl/server"

const DEFAULT_CATEGORIES = [
  { id: 1, name: "ჯანმრთელობა", post_count: 2 },
  { id: 2, name: "ფსიქოლოგია", post_count: 2 },
  { id: 3, name: "კვება", post_count: 1 },
]

const DEFAULT_POSTS = [
  {
    id: 1,
    slug: "stress-management",
    title: "სტრესის ეფექტური მართვა — 7 მეცნიერულად დადასტურებული მეთოდი",
    excerpt: "თანამედროვე ცხოვრების ტემპი ხშირად გვაიძულებს გამუდმებით მაღალი სტრესის ქვეშ ვიმყოფებოდეთ. ამ სტატიაში განვიხილავთ 7 მტკიცებულებებზე დაფუძნებულ მეთოდს სტრესის შესამცირებლად.",
    featured_image_url: null,
    is_featured: true,
    published_at: "2026-05-01T10:00:00Z",
    category: { id: 2, name: "ფსიქოლოგია" },
  },
  {
    id: 2,
    slug: "healthy-nutrition",
    title: "ჯანსაღი კვება ტვინის ჯანმრთელობისთვის",
    excerpt: "კვლევები ადასტურებს, რომ ჩვენი კვება პირდაპირ გავლენას ახდენს ტვინის ფუნქციონირებაზე, განწყობასა და კოგნიტიურ შესაძლებლობებზე.",
    featured_image_url: null,
    is_featured: true,
    published_at: "2026-04-20T09:00:00Z",
    category: { id: 3, name: "კვება" },
  },
  {
    id: 3,
    slug: "exercise-mental-health",
    title: "ვარჯიში და ფსიქიკური ჯანმრთელობა — განუყოფელი კავშირი",
    excerpt: "რეგულარული ფიზიკური აქტივობა ერთ-ერთი ყველაზე ეფექტური ბუნებრივი ანტიდეპრესანტია. შეიტყვეთ, რატომ.",
    featured_image_url: null,
    is_featured: false,
    published_at: "2026-04-10T08:00:00Z",
    category: { id: 2, name: "ფსიქოლოგია" },
  },
  {
    id: 4,
    slug: "sleep-health",
    title: "ძილის ხარისხი და ჯანმრთელობა — ყველაფერი რაც უნდა იცოდეთ",
    excerpt: "ძილი ჩვენი ჯანმრთელობის ერთ-ერთი ყველაზე მნიშვნელოვანი კომპონენტია. გაიგეთ, როგორ გააუმჯობესოთ ძილის ხარისხი.",
    featured_image_url: null,
    is_featured: false,
    published_at: "2026-03-28T11:00:00Z",
    category: { id: 1, name: "ჯანმრთელობა" },
  },
  {
    id: 5,
    slug: "vitamin-d-deficiency",
    title: "ვიტამინი D-ს დეფიციტი — გავრცელებული სიმპტომები და გადაწყვეტა",
    excerpt: "საქართველოში მოსახლეობის 70%-ზე მეტს აქვს ვიტამინი D-ს დეფიციტი. შეიტყვეთ, როგორ ამოიცნოთ და გამოასწოროთ.",
    featured_image_url: null,
    is_featured: false,
    published_at: "2026-03-15T09:30:00Z",
    category: { id: 1, name: "ჯანმრთელობა" },
  },
  {
    id: 6,
    slug: "anxiety-tips",
    title: "შფოთვასთან გამკლავება — პრაქტიკული სახელმძღვანელო",
    excerpt: "შფოთვა ერთ-ერთი ყველაზე გავრცელებული ფსიქოლოგიური პრობლემაა. ამ სახელმძღვანელოში ნახავთ კონკრეტულ ტექნიკებს.",
    featured_image_url: null,
    is_featured: false,
    published_at: "2026-03-05T14:00:00Z",
    category: { id: 2, name: "ფსიქოლოგია" },
  },
]

export default async function BlogPage() {
  const [settings, categoriesData, postsData, t] = await Promise.all([
    fetchSettings().catch(() => null),
    fetchBlogCategories().catch(() => null),
    fetchBlogPosts().catch(() => null),
    getTranslations("blog"),
  ])

  const categories = (categoriesData && categoriesData.length > 0) ? categoriesData : DEFAULT_CATEGORIES
  const posts = (postsData && postsData.length > 0) ? postsData : DEFAULT_POSTS

  const featuredPosts = posts.filter((p) => p.is_featured)

  return (
    <main className="min-h-screen bg-background">
      <Header settings={settings} />

      <section className="pt-24 md:pt-32 pb-12 md:pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <span className="text-primary font-medium mb-4 block">{t("eyebrow")}</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
              {t("heading")} <span className="text-primary">{t("headingHighlight")}</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t("description")}</p>
          </div>
          <div className="max-w-xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder={t("searchPlaceholder")}
                className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-full text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>
        </div>
      </section>

      {featuredPosts.length > 0 && (
        <section className="pb-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-8">{t("featured")}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-colors"
                >
                  <div className="aspect-[16/9] overflow-hidden bg-primary/10">
                    {post.featured_image_url ? (
                      <img
                        src={post.featured_image_url}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-primary/30 text-6xl font-bold">
                        {post.title.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-3 mb-3">
                      {post.category && (
                        <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary/20 text-primary">
                          {post.category.name}
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.published_at).toLocaleDateString("ka-GE")}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3 mb-12">
            <span className="px-4 py-2 rounded-full text-sm font-medium bg-primary text-primary-foreground">
              {t("all")} ({posts.length})
            </span>
            {categories.map((cat) => (
              <span
                key={cat.id}
                className="px-4 py-2 rounded-full text-sm font-medium bg-card border border-border text-muted-foreground hover:border-primary hover:text-foreground cursor-pointer"
              >
                {cat.name} ({cat.post_count})
              </span>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <article className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors h-full">
                  <div className="aspect-[16/10] overflow-hidden bg-primary/10">
                    {post.featured_image_url ? (
                      <img
                        src={post.featured_image_url}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-primary/30 text-5xl font-bold">
                        {post.title.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    {post.category && (
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                        {post.category.name}
                      </span>
                    )}
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mt-3 mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.published_at).toLocaleDateString("ka-GE")}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">{t("notFound")}</p>
            </div>
          )}

          {posts.length > 0 && (
            <div className="text-center mt-12">
              <Button variant="outline" className="border-border hover:border-primary rounded-full px-8">
                {t("loadMore")}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </section>

      <NewsletterSection />
      <Footer settings={settings} />
    </main>
  )
}
