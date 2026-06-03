import { Link } from "@/i18n/navigation"
import { Calendar, ArrowRight, Newspaper } from "lucide-react"
import { getTranslations } from "next-intl/server"
import type { BlogPost } from "@/lib/api"

const DEFAULT_NEWS: BlogPost[] = [
  {
    id: 101,
    slug: "new-product-launch-2026",
    title: "ახალი პროდუქტის პრეზენტაცია — ომეგა-3 Ultra Pure",
    excerpt: "ჩვენ წარვადგენთ ჩვენს ყველაზე სუფთა ომეგა-3 ფორმულას — 99.2% სისუფთავით, ისლანდიური ცივი ზღვის თევზიდან.",
    featured_image_url: null,
    category: { id: 10, name: "სიახლეები", slug: "news", post_count: 3 },
    author_name: "ახალი შენ",
    is_featured: false,
    published_at: "2026-05-20T10:00:00Z",
  },
  {
    id: 102,
    slug: "iso-certification-renewal",
    title: "ISO 9001:2015 სერთიფიკატის განახლება წარმატებით დასრულდა",
    excerpt: "2026 წლის მაისში ჩვენმა საწარმომ წარმატებით გაიარა ISO 9001:2015 სერტიფიკაციის განახლების აუდიტი ნულოვანი შენიშვნებით.",
    featured_image_url: null,
    category: { id: 10, name: "სიახლეები", slug: "news", post_count: 3 },
    author_name: "ახალი შენ",
    is_featured: false,
    published_at: "2026-05-10T09:00:00Z",
  },
  {
    id: 103,
    slug: "partnership-announcement",
    title: "ახალი პარტნიორობა ევროპულ განაწილების ქსელთან",
    excerpt: "ხელი მოეწერა ხელშეკრულებას EvroDistrib-თან, რაც საშუალებას მოგვცემს 2026 წლის IV კვარტლიდან გავაფართოვოთ ექსპორტი 12 ქვეყანაში.",
    featured_image_url: null,
    category: { id: 10, name: "სიახლეები", slug: "news", post_count: 3 },
    author_name: "ახალი შენ",
    is_featured: false,
    published_at: "2026-04-28T14:00:00Z",
  },
]

function isNewsPost(post: BlogPost) {
  if (!post.category) return false
  const slug = post.category.slug?.toLowerCase() ?? ""
  const name = post.category.name?.toLowerCase() ?? ""
  return slug.includes("news") || slug.includes("siaxle") || name.includes("სიახლე") || name.includes("news")
}

interface Props {
  posts: BlogPost[]
}

export async function NewsWall({ posts }: Props) {
  const t = await getTranslations("nav")
  const newsPosts = posts.filter(isNewsPost)
  const items = newsPosts.length > 0 ? newsPosts.slice(0, 3) : DEFAULT_NEWS

  return (
    <section className="py-14 md:py-20 px-4 border-t border-border/40">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8 md:mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Newspaper className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                სიახლეების <span className="text-primary">კედელი</span>
              </h2>
            </div>
          </div>
          <Link
            href="/blog"
            className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            ყველა სიახლე
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {items.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}` as "/blog"}>
              <article className="group h-full bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 transition-all hover:shadow-md hover:shadow-primary/5">
                <div className="aspect-[16/9] bg-primary/5 overflow-hidden relative">
                  {post.featured_image_url ? (
                    <img
                      src={post.featured_image_url}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Newspaper className="w-10 h-10 text-primary/20" />
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary text-primary-foreground">
                      სიახლე
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.published_at).toLocaleDateString("ka-GE", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{post.excerpt}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="mt-6 sm:hidden text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:underline"
          >
            ყველა სიახლე <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
