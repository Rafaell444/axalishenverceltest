import type { Metadata } from "next"
import { Header } from "@/components/header"
import { buildMetadata } from "@/lib/seo"
import { Footer } from "@/components/footer"
import { ProductsCatalog } from "@/components/products-catalog"
import { fetchSettings, fetchProducts, fetchProductCategories, fetchPageSeo } from "@/lib/api"
import { getTranslations } from "next-intl/server"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const [seo, t] = await Promise.all([
    fetchPageSeo("products", locale).catch(() => null),
    getTranslations({ locale, namespace: "productsPage" }),
  ])
  return buildMetadata(seo, {
    title: `${t("heading")} ${t("headingHighlight")}`,
    description: t("description"),
  })
}

export default async function ProductsPage() {
  const [settings, categoriesData, productsData, t] = await Promise.all([
    fetchSettings().catch(() => null),
    fetchProductCategories().catch(() => null),
    fetchProducts().catch(() => null),
    getTranslations("productsPage"),
  ])

  const cat1 = { id: 1, name: t("dcat1"), slug: "cat-1", icon: "", product_count: 3 }
  const cat2 = { id: 2, name: t("dcat2"), slug: "cat-2", icon: "", product_count: 2 }
  const cat3 = { id: 3, name: t("dcat3"), slug: "cat-3", icon: "", product_count: 1 }
  const DEFAULT_CATEGORIES = [cat1, cat2, cat3]
  const DEFAULT_PRODUCTS = [
    { id: 1, name: t("dp1name"), image_url: null, category: cat1, rating: "4.8", price: "32.00", sale_price: null, effective_price: "32.00", in_stock: true, slug: "p1", description: "", is_featured: false },
    { id: 2, name: t("dp2name"), image_url: null, category: cat1, rating: "4.9", price: "45.00", sale_price: "38.00", effective_price: "38.00", in_stock: true, slug: "p2", description: "", is_featured: false },
    { id: 3, name: t("dp3name"), image_url: null, category: cat2, rating: "4.7", price: "55.00", sale_price: null, effective_price: "55.00", in_stock: true, slug: "p3", description: "", is_featured: false },
    { id: 4, name: t("dp4name"), image_url: null, category: cat1, rating: "4.6", price: "28.00", sale_price: null, effective_price: "28.00", in_stock: true, slug: "p4", description: "", is_featured: false },
    { id: 5, name: t("dp5name"), image_url: null, category: cat1, rating: "4.8", price: "22.00", sale_price: "18.00", effective_price: "18.00", in_stock: true, slug: "p5", description: "", is_featured: false },
    { id: 6, name: t("dp6name"), image_url: null, category: cat2, rating: "4.5", price: "25.00", sale_price: null, effective_price: "25.00", in_stock: false, slug: "p6", description: "", is_featured: false },
  ]

  const categories = (categoriesData && categoriesData.length > 0) ? categoriesData : DEFAULT_CATEGORIES
  const products = (productsData && productsData.length > 0) ? productsData : DEFAULT_PRODUCTS

  return (
    <main className="min-h-screen">
      <Header settings={settings} />

      <section className="pt-24 md:pt-32 pb-10 md:pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-gold font-medium mb-4 block">{t("eyebrow")}</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t("heading")} <span className="text-gold">{t("headingHighlight")}</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t("description")}</p>
        </div>
      </section>

      <ProductsCatalog
        categories={categories}
        products={products}
        labels={{
          all: t("all"),
          sale: t("sale"),
          outOfStock: t("outOfStock"),
          comingSoon: t("comingSoon"),
        }}
      />

      <Footer settings={settings} />
    </main>
  )
}
