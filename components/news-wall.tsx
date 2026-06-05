import { Link } from "@/i18n/navigation"
import { Calendar, ArrowRight, Newspaper } from "lucide-react"
import { getTranslations } from "next-intl/server"
import type { BlogPost } from "@/lib/api"

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
  const t = await getTranslations("newsWall")
  const newsCat = { id: 10, name: t("newsCat"), slug: "news", post_count: 3 }
  const DEFAULT_NEWS: BlogPost[] = [
    { id: 101, slug: "new-product-launch-2026", title: t("dn1title"), excerpt: t("dn1excerpt"), featured_image_url: null, category: newsCat, author_name: "Akhali Shen", is_featured: false, published_at: "2026-05-20T10:00:00Z" },
    { id: 102, slug: "iso-certification-renewal", title: t("dn2title"), excerpt: t("dn2excerpt"), featured_image_url: null, category: newsCat, author_name: "Akhali Shen", is_featured: false, published_at: "2026-05-10T09:00:00Z" },
    { id: 103, slug: "partnership-announcement", title: t("dn3title"), excerpt: t("dn3excerpt"), featured_image_url: null, category: newsCat, author_name: "Akhali Shen", is_featured: false, published_at: "2026-04-28T14:00:00Z" },
  ]
  const newsPosts = posts.filter(isNewsPost)
  const items = newsPosts.length > 0 ? newsPosts.slice(0, 3) : DEFAULT_NEWS

  return (
    <section className="py-16 lg:py-24 px-6 border-t border-[rgba(201,166,100,.18)]">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10 md:mb-14">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center">
              <Newspaper className="w-5 h-5 text-gold" />
            </div>
            <h2>
              {t("heading")} <span className="text-gold">{t("headingHighlight")}</span>
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden sm:flex items-center gap-1.5 text-sm text-[#7A7A7A] hover:text-gold transition-colors"
          >
            {t("viewAll")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}` as "/blog"}>
              <article className="group h-full glass-card overflow-hidden transition-all duration-300 hover:border-[rgba(201,166,100,.45)]">
                <div className="aspect-[16/9] bg-[#1B3B34]/40 overflow-hidden relative">
                  {post.featured_image_url ? (
                    <img
                      src={post.featured_image_url}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Newspaper className="w-10 h-10 text-gold/15" />
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gold text-[#08120F]">
                      {t("eyebrow")}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-xs text-[#7A7A7A] mb-3">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.published_at).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <h3 className="font-semibold text-[#F4EFE4] group-hover:text-gold transition-colors mb-2 line-clamp-2 leading-snug text-xl">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[#B8B8B8] line-clamp-2 leading-relaxed">{post.excerpt}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="mt-6 sm:hidden text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-gold font-medium hover:underline"
          >
            {t("viewAll")} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
