import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CTASection } from "@/components/cta-section"
import { Calendar, ArrowLeft, User, Tag } from "lucide-react"
import { Link } from "@/i18n/navigation"
import { fetchSettings, fetchBlogPost, fetchBlogPosts } from "@/lib/api"
import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug } = await params
  const [settings, t, tn] = await Promise.all([
    fetchSettings().catch(() => null),
    getTranslations("blog"),
    getTranslations("newsWall"),
  ])

  const newsCat = { id: 10, name: tn("newsCat"), slug: "news", post_count: 3 }
  const researchCat = { id: 3, name: t("dc3name"), slug: "research", post_count: 3 }
  const wellnessCat = { id: 2, name: t("dc2name"), slug: "wellness", post_count: 2 }

  const DEFAULT_POSTS_MAP: Record<string, {
    title: string; excerpt: string; body: string; published_at: string;
    author_name: string | null; category: { id: number; name: string; slug: string; post_count: number } | null
  }> = {
    "lions-mane-brain":       { title: t("dp1title"), excerpt: t("dp1excerpt"), body: t("dp1body"), published_at: "2026-05-01T10:00:00Z", author_name: t("dAuthor"), category: researchCat },
    "reishi-stress":          { title: t("dp2title"), excerpt: t("dp2excerpt"), body: t("dp2body"), published_at: "2026-04-20T09:00:00Z", author_name: t("dAuthor"), category: researchCat },
    "chaga-antioxidants":     { title: t("dp3title"), excerpt: t("dp3excerpt"), body: t("dp3body"), published_at: "2026-04-28T08:00:00Z", author_name: t("dAuthor"), category: researchCat },
    "cordyceps-energy":       { title: t("dp4title"), excerpt: t("dp4excerpt"), body: t("dp4body"), published_at: "2026-04-15T11:00:00Z", author_name: t("dAuthor"), category: wellnessCat },
    "turkey-tail-immune":     { title: t("dp5title"), excerpt: t("dp5excerpt"), body: t("dp5body"), published_at: "2026-04-01T09:30:00Z", author_name: t("dAuthor"), category: researchCat },
    "shiitake-cardiovascular":{ title: t("dp6title"), excerpt: t("dp6excerpt"), body: t("dp6body"), published_at: "2026-03-20T14:00:00Z", author_name: t("dAuthor"), category: wellnessCat },
    "new-product-launch-2026":{ title: tn("dn1title"), excerpt: tn("dn1excerpt"), body: tn("dn1body"), published_at: "2026-05-20T10:00:00Z", author_name: t("dAuthor"), category: newsCat },
    "iso-certification-renewal":{ title: tn("dn2title"), excerpt: tn("dn2excerpt"), body: tn("dn2body"), published_at: "2026-05-10T09:00:00Z", author_name: t("dAuthor"), category: newsCat },
    "partnership-announcement": { title: tn("dn3title"), excerpt: tn("dn3excerpt"), body: tn("dn3body"), published_at: "2026-04-28T14:00:00Z", author_name: t("dAuthor"), category: newsCat },
  }

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
