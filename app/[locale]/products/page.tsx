import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Star, ShoppingCart, Heart, Package } from "lucide-react"
import { fetchSettings, fetchProducts, fetchProductCategories } from "@/lib/api"
import { getTranslations } from "next-intl/server"

export default async function ProductsPage() {
  const [settings, categoriesData, productsData, t] = await Promise.all([
    fetchSettings().catch(() => null),
    fetchProductCategories().catch(() => null),
    fetchProducts().catch(() => null),
    getTranslations("productsPage"),
  ])

  const cat1 = { id: 1, name: t("dcat1"), product_count: 3 }
  const cat2 = { id: 2, name: t("dcat2"), product_count: 2 }
  const cat3 = { id: 3, name: t("dcat3"), product_count: 1 }
  const DEFAULT_CATEGORIES = [cat1, cat2, cat3]
  const DEFAULT_PRODUCTS = [
    { id: 1, name: t("dp1name"), image_url: null, category: cat1, rating: "4.8", price: "32.00", sale_price: null, effective_price: "32.00", in_stock: true },
    { id: 2, name: t("dp2name"), image_url: null, category: cat1, rating: "4.9", price: "45.00", sale_price: "38.00", effective_price: "38.00", in_stock: true },
    { id: 3, name: t("dp3name"), image_url: null, category: cat2, rating: "4.7", price: "55.00", sale_price: null, effective_price: "55.00", in_stock: true },
    { id: 4, name: t("dp4name"), image_url: null, category: cat1, rating: "4.6", price: "28.00", sale_price: null, effective_price: "28.00", in_stock: true },
    { id: 5, name: t("dp5name"), image_url: null, category: cat1, rating: "4.8", price: "22.00", sale_price: "18.00", effective_price: "18.00", in_stock: true },
    { id: 6, name: t("dp6name"), image_url: null, category: cat2, rating: "4.5", price: "25.00", sale_price: null, effective_price: "25.00", in_stock: false },
  ]

  const categories = (categoriesData && categoriesData.length > 0) ? categoriesData : DEFAULT_CATEGORIES
  const products = (productsData && productsData.length > 0) ? productsData : DEFAULT_PRODUCTS

  return (
    <main className="min-h-screen relative">
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

      {categories.length > 0 && (
        <section className="pb-8 px-4">
          <div className="max-w-6xl mx-auto flex flex-wrap gap-3 justify-center">
            <span className="px-4 py-2 rounded-full text-sm font-medium bg-gold text-primary-foreground">
              {t("all")} ({products.length})
            </span>
            {categories.map((cat) => (
              <span
                key={cat.id}
                className="px-4 py-2 rounded-full text-sm font-medium glass-card text-muted-foreground hover:border-gold hover:text-foreground cursor-pointer transition-colors"
              >
                {cat.name} ({cat.product_count})
              </span>
            ))}
          </div>
        </section>
      )}

      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {products.length === 0 ? (
            <div className="text-center py-20">
              <Package className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">{t("comingSoon")}</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group glass-card rounded-2xl overflow-hidden hover:border-gold/30 transition-all hover:shadow-lg hover:shadow-gold/5"
                >
                  <div className="aspect-square bg-gold/5 overflow-hidden relative">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-16 h-16 text-gold/20" />
                      </div>
                    )}
                    {product.sale_price && (
                      <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                        {t("sale")}
                      </span>
                    )}
                    <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-background/80 flex items-center justify-center hover:bg-gold hover:text-primary-foreground transition-colors">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-4">
                    {product.category && (
                      <span className="text-xs text-gold font-medium">{product.category.name}</span>
                    )}
                    <h3 className="font-semibold text-foreground mt-1 mb-2 line-clamp-2 group-hover:text-gold transition-colors">
                      {product.name}
                    </h3>

                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i < Math.round(parseFloat(product.rating)) ? "text-amber-400 fill-amber-400" : "text-muted-foreground/30"}`}
                        />
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">{product.rating}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-gold">₾{product.effective_price}</span>
                        {product.sale_price && (
                          <span className="text-sm text-muted-foreground line-through ml-2">₾{product.price}</span>
                        )}
                      </div>
                      <Button
                        size="sm"
                        className="bg-gold hover:bg-gold/90 rounded-full h-8 w-8 p-0"
                        disabled={!product.in_stock}
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </Button>
                    </div>

                    {!product.in_stock && (
                      <p className="text-xs text-red-400 mt-2">{t("outOfStock")}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer settings={settings} />
    </main>
  )
}
