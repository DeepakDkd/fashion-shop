export interface IProduct {
  _id: string
  name_hi: string
  name_en: string
  desc_hi?: string
  desc_en?: string
  price: number
  price_label?: string
  images: string[]
  category: 'saree' | 'suit' | 'blouse' | 'footwear' | 'other'
  slug: string
  featured: boolean
  isNewArrival: boolean
  inStock: boolean
  createdAt: string
  updatedAt: string
}

export interface ICategory {
  _id: string
  name_hi: string
  name_en: string
  slug: string
  icon: string
  order: number
}

export interface IShopInfo {
  _id: string
  name_hi: string
  name_en: string
  address: string
  phone: string
  whatsapp: string
  hours: string
  mapLink?: string
}

export type Locale = 'hi' | 'en'

export type ProductCategory = 'all' | 'saree' | 'suit' | 'blouse' | 'footwear' | 'other'
