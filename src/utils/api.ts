import { Product } from '../data/products'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5005'

export function mapProduct(p: any): Product {
  return {
    id: p._id,
    type: p.type || 'clothing',
    category: p.category || '',
    name: p.name,
    subtitle: p.subtitle,
    price: p.price,
    originalPrice: p.originalPrice || p.price,
    image: p.image,
    aspectRatio: p.type === 'jewellery' ? 'square' : 'portrait',
    isNewArrival: p.isNewArrival,
    isBestSelling: p.isBestSeller,
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
