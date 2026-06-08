"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Star, ShoppingCart, Heart, Package } from "lucide-react"
import type { Product, ProductCategory } from "@/lib/api"

interface Props {
  categories: ProductCategory[]
  products: Product[]
  labels: {
    all: string
    sale: string
    outOfStock: string
    comingSoon: string
  }
}

export function ProductsCatalog({ categories, products, labels }: Props) {
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null)

  const filtered =
    activeCategoryId === null
      ? products
      : products.filter((p) => p.category?.id === activeCategoryId)

  return (
    <>
      {categories.length > 0 && (
        <section className="pb-8 px-4">
          <div className="max-w-6xl mx-auto flex flex-wrap gap-3 justify-center">
            <button
              type="button"
              onClick={() => setActiveCategoryId(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategoryId === null
                  ? "bg-gold text-primary-foreground"
                  : "glass-card text-muted-foreground hover:border-gold hover:text-foreground"
              }`}
            >
              {labels.all} ({products.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategoryId(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategoryId === cat.id
                    ? "bg-gold text-primary-foreground"
                    : "glass-card text-muted-foreground hover:border-gold hover:text-foreground"
                }`}
              >
                {cat.name} ({cat.product_count})
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <Package className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">{labels.comingSoon}</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((product) => (
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
                        {labels.sale}
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
                      <p className="text-xs text-red-400 mt-2">{labels.outOfStock}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
