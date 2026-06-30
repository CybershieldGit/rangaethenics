export type ProductType = 'clothing' | 'jewellery'

export interface Product {
  id: string
  type: ProductType
  category: string
  name: string
  subtitle?: string
  price: number
  originalPrice: number
  image: string
  aspectRatio: 'square' | 'portrait'
  isNewArrival?: boolean
  isBestSelling?: boolean
}

export const newArrivalJewelry: Product[] = [
  {
    id: 'j1',
    type: 'jewellery',
    category: 'Oxidised',
    name: 'Tribal Necklace',
    price: 5950,
    originalPrice: 9950,
    image: '/images/Necklaces.png',
    aspectRatio: 'square',
    isNewArrival: true,
  },
  {
    id: 'j2',
    type: 'jewellery',
    category: 'Oxidised',
    name: 'Jhumka Earrings',
    price: 5950,
    originalPrice: 9950,
    image: '/images/Earrings.png',
    aspectRatio: 'square',
    isNewArrival: true,
  },
  {
    id: 'j3',
    type: 'jewellery',
    category: 'Oxidised',
    name: 'Cuff Bracelet',
    price: 5950,
    originalPrice: 9950,
    image: '/images/Bracelets.png',
    aspectRatio: 'square',
    isNewArrival: true,
  },
  {
    id: 'j4',
    type: 'jewellery',
    category: 'Oxidised',
    name: 'Floral Pendant',
    price: 5950,
    originalPrice: 9950,
    image: '/images/Pendants.png',
    aspectRatio: 'square',
    isNewArrival: true,
  },
]

export const newArrivalClothing: Product[] = [
  {
    id: 'c1',
    type: 'clothing',
    category: 'Rani Pink Silk Saree',
    name: 'Rajasthani',
    subtitle: 'Rani Pink Silk Saree',
    price: 5950,
    originalPrice: 9950,
    image: '/images/sarees.png',
    aspectRatio: 'portrait',
    isNewArrival: true,
  },
  {
    id: 'c2',
    type: 'clothing',
    category: 'Maroon Lehenga',
    name: 'Bridal Collection',
    subtitle: 'Rani Pink Silk Saree',
    price: 5950,
    originalPrice: 9950,
    image: '/images/Lehengas.png',
    aspectRatio: 'portrait',
    isNewArrival: true,
  },
  {
    id: 'c3',
    type: 'clothing',
    category: 'Salwar Kameez',
    name: 'Festive Set',
    subtitle: 'Rani Pink Silk Saree',
    price: 5950,
    originalPrice: 9950,
    image: '/images/Kurta_Sets.png',
    aspectRatio: 'portrait',
    isNewArrival: true,
  },
  {
    id: 'c4',
    type: 'clothing',
    category: 'Green Silk Suit',
    name: 'Festive Edit',
    subtitle: 'Rani Pink Silk Saree',
    price: 5950,
    originalPrice: 9950,
    image: '/images/sarees.png',
    aspectRatio: 'portrait',
    isNewArrival: true,
  },
]

export const mostSellingClothing: Product[] = newArrivalClothing.map((p, i) => ({
  ...p,
  id: `ms${i + 1}`,
  isNewArrival: false,
  isBestSelling: true,
}))

export const mostSellingJewelry: Product[] = [
  {
    id: 'msj1',
    type: 'jewellery',
    category: 'Oxidised',
    name: 'Statement Necklace',
    price: 5950,
    originalPrice: 9950,
    image: '/images/Pendants.png',
    aspectRatio: 'square',
    isBestSelling: true,
  },
  {
    id: 'msj2',
    type: 'jewellery',
    category: 'Oxidised',
    name: 'Jhumka Earrings',
    price: 5950,
    originalPrice: 9950,
    image: '/images/Earrings.png',
    aspectRatio: 'square',
    isBestSelling: true,
  },
  {
    id: 'msj3',
    type: 'jewellery',
    category: 'Oxidised',
    name: 'Temple Necklace',
    price: 5950,
    originalPrice: 9950,
    image: '/images/Necklaces.png',
    aspectRatio: 'square',
    isBestSelling: true,
  },
  {
    id: 'msj4',
    type: 'jewellery',
    category: 'Oxidised',
    name: 'Floral Bangles',
    price: 5950,
    originalPrice: 9950,
    image: '/images/Bangles.png',
    aspectRatio: 'square',
    isBestSelling: true,
  },
]

const extraProducts: Product[] = [
  {
    id: 'j5',
    type: 'jewellery',
    category: 'Oxidised',
    name: 'Heritage Ring',
    price: 3200,
    originalPrice: 4800,
    image: '/images/Rings.png',
    aspectRatio: 'square',
  },
  {
    id: 'j6',
    type: 'jewellery',
    category: 'Oxidised',
    name: 'Temple Anklet',
    price: 2800,
    originalPrice: 4200,
    image: '/images/Anklets.png',
    aspectRatio: 'square',
  },
  {
    id: 'j7',
    type: 'jewellery',
    category: 'Oxidised',
    name: 'Kundan Necklace',
    price: 12500,
    originalPrice: 18000,
    image: '/images/Necklaces.png',
    aspectRatio: 'square',
    isBestSelling: true,
  },
  {
    id: 'j8',
    type: 'jewellery',
    category: 'Oxidised',
    name: 'Pearl Drop Earrings',
    price: 4500,
    originalPrice: 7200,
    image: '/images/Earrings.png',
    aspectRatio: 'square',
    isNewArrival: true,
  },
  {
    id: 'c5',
    type: 'clothing',
    category: 'Banarasi Saree',
    name: 'Heritage Weave',
    subtitle: 'Gold Banarasi Saree',
    price: 8900,
    originalPrice: 14000,
    image: '/images/sarees.png',
    aspectRatio: 'portrait',
    isBestSelling: true,
  },
  {
    id: 'c6',
    type: 'clothing',
    category: 'Bridal Lehenga',
    name: 'Royal Collection',
    subtitle: 'Embroidered Lehenga',
    price: 18500,
    originalPrice: 25000,
    image: '/images/Lehengas.png',
    aspectRatio: 'portrait',
  },
  {
    id: 'c7',
    type: 'clothing',
    category: 'Festive Dupatta',
    name: 'Celebration Edit',
    subtitle: 'Embroidered Dupatta',
    price: 2400,
    originalPrice: 3600,
    image: '/images/Dupattas.png',
    aspectRatio: 'portrait',
    isNewArrival: true,
  },
  {
    id: 'c8',
    type: 'clothing',
    category: 'Anarkali Set',
    name: 'Evening Glamour',
    subtitle: 'Maroon Anarkali',
    price: 7200,
    originalPrice: 11000,
    image: '/images/Kurta_Sets.png',
    aspectRatio: 'portrait',
  },
]

export const allProducts: Product[] = [
  ...newArrivalClothing,
  ...newArrivalJewelry,
  ...mostSellingJewelry.filter((p) => !newArrivalJewelry.some((n) => n.image === p.image)),
  ...extraProducts,
]

export const PRICE_MIN = 900
export const PRICE_MAX = 25000

export function formatPrice(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`
}

export function getDiscount(price: number, originalPrice: number): number {
  return Math.round(((originalPrice - price) / originalPrice) * 100)
}
