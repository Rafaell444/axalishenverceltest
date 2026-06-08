import type { Metadata } from "next"

export interface SeoData {
  meta_title?: string
  meta_description?: string
}

export function buildMetadata(
  seo: SeoData | null | undefined,
  fallback: { title: string; description: string },
): Metadata {
  const title = seo?.meta_title?.trim() || fallback.title
  const description = seo?.meta_description?.trim() || fallback.description
  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { card: "summary_large_image", title, description },
  }
}
