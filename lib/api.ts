const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"

// ── Types ────────────────────────────────────────────────────────────────────

export interface SiteSettings {
  site_name: string
  tagline: string
  logo_url: string | null
  favicon_url: string | null
  announcement_text: string
  primary_phone: string
  secondary_phone: string
  emergency_phone: string
  email: string
  support_email: string
  address_line1: string
  address_line2: string
  google_maps_embed: string
  working_hours_weekdays: string
  working_hours_saturday: string
  working_hours_sunday: string
  facebook_url: string
  instagram_url: string
  youtube_url: string
}

export interface HeroData {
  title: string
  title_highlight: string
  description: string
  cta_primary_text: string
  cta_primary_link: string
  cta_secondary_text: string
  cta_secondary_link: string
  image_url: string | null
}

export interface Feature {
  id: number
  icon: string
  color: string
  title: string
  description: string
  order: number
}

export interface Stat {
  id: number
  value: string
  label: string
  order: number
}

export interface ProcessStep {
  id: number
  step_number: number
  title: string
  description: string
  order: number
}

export interface Testimonial {
  id: number
  name: string
  role: string
  content: string
  avatar_url: string | null
  rating: number
  order: number
}

export interface Achievement {
  id: number
  year: string
  title: string
  description: string
  order: number
}

export interface Publication {
  id: number
  title: string
  journal: string
  date: string | null
  url: string
  description: string
  order: number
}

export interface FAQ {
  id: number
  question: string
  answer: string
  order: number
}

export interface Partner {
  id: number
  name: string
  logo_url: string | null
  url: string
  order: number
}

export interface ServiceFeature {
  id: number
  text: string
}

export interface Service {
  id: number
  title: string
  slug: string
  icon: string
  image_url: string | null
  short_description: string
  full_description?: string
  duration: string
  price: string
  is_featured: boolean
  features?: ServiceFeature[]
  order: number
}

export interface BlogCategory {
  id: number
  name: string
  slug: string
  post_count: number
}

export interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  featured_image_url: string | null
  category: BlogCategory | null
  author_name: string | null
  is_featured: boolean
  published_at: string
  body?: string
}

export interface ProductCategory {
  id: number
  name: string
  slug: string
  icon: string
  product_count: number
}

export interface Product {
  id: number
  name: string
  slug: string
  description: string
  price: string
  sale_price: string | null
  effective_price: string
  category: ProductCategory | null
  image_url: string | null
  rating: string
  stock_count: number
  in_stock: boolean
  is_featured: boolean
}

export interface CompanyValue {
  id: number
  icon: string
  title: string
  description: string
  order: number
}

export interface TeamMember {
  id: number
  name: string
  role: string
  bio: string
  photo_url: string | null
  order: number
}

export interface CompanyTimeline {
  id: number
  year: string
  title: string
  description: string
  order: number
}

export interface Certification {
  id: number
  title: string
  description: string
  image_url: string | null
  issued_by: string
  issued_year: string
  order: number
}

export interface AboutData {
  hero_title: string
  hero_subtitle: string
  mission: string
  vision: string
  values: CompanyValue[]
  team: TeamMember[]
  timeline: CompanyTimeline[]
  certifications: Certification[]
}

// ── Core fetch helper ─────────────────────────────────────────────────────────

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}/api/v1${path}`, {
    next: { revalidate: 60 },
    ...options,
  })
  if (!res.ok) {
    throw new Error(`API error ${res.status} for ${path}`)
  }
  return res.json() as Promise<T>
}

// ── Read endpoints ─────────────────────────────────────────────────────────────

export const fetchSettings = () => apiFetch<SiteSettings>("/settings/")
export const fetchHero = () => apiFetch<HeroData>("/hero/")
export const fetchFeatures = () => apiFetch<Feature[]>("/features/")
export const fetchStats = () => apiFetch<Stat[]>("/stats/")
export const fetchProcessSteps = () => apiFetch<ProcessStep[]>("/process-steps/")
export const fetchTestimonials = () => apiFetch<Testimonial[]>("/testimonials/")
export const fetchAchievements = () => apiFetch<Achievement[]>("/achievements/")
export const fetchPublications = () => apiFetch<Publication[]>("/publications/")
export const fetchFAQ = () => apiFetch<FAQ[]>("/faq/")
export const fetchPartners = () => apiFetch<Partner[]>("/partners/")
export const fetchServices = (featured?: boolean) =>
  apiFetch<Service[]>(`/services/${featured ? "?is_featured=true" : ""}`)
export const fetchService = (slug: string) => apiFetch<Service>(`/services/${slug}/`)
export const fetchBlogCategories = () => apiFetch<BlogCategory[]>("/blog/categories/")
export const fetchBlogPosts = (params?: string) => apiFetch<BlogPost[]>(`/blog/posts/${params ? `?${params}` : ""}`)
export const fetchBlogPost = (slug: string) => apiFetch<BlogPost>(`/blog/posts/${slug}/`)
export const fetchProductCategories = () => apiFetch<ProductCategory[]>("/products/categories/")
export const fetchProducts = (params?: string) => apiFetch<Product[]>(`/products/${params ? `?${params}` : ""}`)
export const fetchProduct = (slug: string) => apiFetch<Product>(`/products/${slug}/`)
export const fetchAbout = () => apiFetch<AboutData>("/about/")

// ── Write endpoints (called from client components) ───────────────────────────

export async function submitContact(data: {
  name: string
  email: string
  phone: string
  service: string
  message: string
}) {
  const res = await fetch(`${API_URL}/api/v1/contact/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  const json = await res.json()
  if (!res.ok) throw json
  return json
}

export async function submitConsultation(data: {
  patient_name: string
  phone: string
  email?: string
  service?: string
  preferred_date?: string
  notes?: string
}) {
  const res = await fetch(`${API_URL}/api/v1/consultations/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  const json = await res.json()
  if (!res.ok) throw json
  return json
}

export async function submitNewsletter(email: string) {
  const res = await fetch(`${API_URL}/api/v1/newsletter/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  })
  const json = await res.json()
  if (!res.ok) throw json
  return json
}
