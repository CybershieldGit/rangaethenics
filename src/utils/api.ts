import { Product, type ProductType } from '../data/products'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5005'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapProduct(p: any): Product {
  const mainCategory = (p.category ?? '').toString().trim()
  const type: ProductType = /jewel/i.test(mainCategory) ? 'jewellery' : 'clothing'
  const image =
    p.image || (Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : '')

  // `price` is the MRP; `discountPercentage` is the percent off it.
  const mrp = Number(p.price) || 0
  const discountPercentage = Number(p.discountPercentage) || 0
  const sellingPrice =
    discountPercentage > 0
      ? Math.round(mrp * (1 - discountPercentage / 100))
      : mrp

  return {
    id: p._id,
    type,
    // Prefer the subcategory as the display label, falling back to the main category
    category: p.subCategory || mainCategory,
    name: p.name,
    subtitle: p.subCategory ? p.name : undefined,
    price: sellingPrice,
    originalPrice: mrp,
    discountPercentage,
    image,
    aspectRatio: type === 'jewellery' ? 'square' : 'portrait',
    // "New Arrivals" are driven by the backend `isFeatured` flag.
    isNewArrival: Boolean(p.isFeatured),
    isBestSelling: Boolean(p.isBestSeller),
  }
}

export async function getProducts(params?: {
  category?: string
  keyword?: string
  pageNumber?: number
  pageSize?: number
}): Promise<{ products: Product[]; page: number; pages: number }> {
  const query = new URLSearchParams()
  if (params?.category) query.append('category', params.category)
  if (params?.keyword) query.append('keyword', params.keyword)
  if (params?.pageNumber) query.append('pageNumber', String(params.pageNumber))
  if (params?.pageSize) query.append('pageSize', String(params.pageSize))

  const url = `${API_BASE_URL}/api/products?${query.toString()}`

  try {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(`API error: ${res.statusText}`)
    }
    const data = await res.json()
    return {
      products: (data.products || []).map(mapProduct),
      page: data.page || 1,
      pages: data.pages || 1,
    }
  } catch (error) {
    console.error('Failed to fetch products from backend:', error)
    return { products: [], page: 1, pages: 1 }
  }
}

export type AttributeType = 'size' | 'color' | 'fabric' | 'work'

export interface AttributesByType {
  size: string[]
  color: string[]
  fabric: string[]
  work: string[]
}

export async function getAttributes(): Promise<AttributesByType> {
  const empty: AttributesByType = { size: [], color: [], fabric: [], work: [] }
  const url = `${API_BASE_URL}/api/attributes`

  try {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(`API error: ${res.statusText}`)
    }
    const data = (await res.json()) as { type: AttributeType; value: string }[]
    const grouped: AttributesByType = { size: [], color: [], fabric: [], work: [] }
    for (const attr of data) {
      if (attr && grouped[attr.type]) {
        grouped[attr.type].push(attr.value)
      }
    }
    return grouped
  } catch (error) {
    console.error('Failed to fetch attributes:', error)
    return empty
  }
}

export async function getBestSellers(): Promise<Product[]> {
  const url = `${API_BASE_URL}/api/products/best`
  try {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(`API error: ${res.statusText}`)
    }
    const data = await res.json()
    return (data || []).map(mapProduct)
  } catch (error) {
    console.error('Failed to fetch best sellers:', error)
    return []
  }
}
