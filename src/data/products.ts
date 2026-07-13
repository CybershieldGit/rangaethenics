export type ProductType = 'clothing' | 'jewellery'

export interface Product {
  id: string
  type: ProductType
  category: string
  name: string
  subtitle?: string
  price: number
  originalPrice: number
  discountPercentage?: number
  image: string
  aspectRatio: 'square' | 'portrait'
  isNewArrival?: boolean
  isBestSelling?: boolean
  occasion?: string
}

// Product data is served exclusively from the backend API. These arrays remain as
// empty fallbacks so pages render an empty state (instead of dummy products) until
// the live catalogue loads.
export const newArrivalJewelry: Product[] = []
export const newArrivalClothing: Product[] = []
export const mostSellingClothing: Product[] = []
export const mostSellingJewelry: Product[] = []
export const allProducts: Product[] = []

export const PRICE_MIN = 900
export const PRICE_MAX = 25000

export function formatPrice(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`
}

export function getDiscount(price: number, originalPrice: number): number {
  return Math.round(((originalPrice - price) / originalPrice) * 100)
}
