export interface Product {
  id: string
  category: string
  name: string
  subtitle?: string
  price: number
  originalPrice: number
  image: string
  aspectRatio: 'square' | 'portrait'
}

export const newArrivalJewelry: Product[] = [
  {
    id: 'j1',
    category: 'Oxidised',
    name: 'Tribal Necklace',
    price: 5950,
    originalPrice: 9950,
    image: '/images/Necklaces.png',
    aspectRatio: 'square',
  },
  {
    id: 'j2',
    category: 'Oxidised',
    name: 'Jhumka Earrings',
    price: 5950,
    originalPrice: 9950,
    image: '/images/Earrings.png',
    aspectRatio: 'square',
  },
  {
    id: 'j3',
    category: 'Oxidised',
    name: 'Cuff Bracelet',
    price: 5950,
    originalPrice: 9950,
    image: '/images/Bracelets.png',
    aspectRatio: 'square',
  },
  {
    id: 'j4',
    category: 'Oxidised',
    name: 'Floral Pendant',
    price: 5950,
    originalPrice: 9950,
    image: '/images/Pendants.png',
    aspectRatio: 'square',
  },
]

export const newArrivalClothing: Product[] = [
  {
    id: 'c1',
    category: 'Rani Pink Silk Saree- Rajasthani',
    name: 'Rajasthani',
    subtitle: 'Rani Pink Silk Saree',
    price: 5950,
    originalPrice: 9950,
    image: '/images/sarees.png',
    aspectRatio: 'portrait',
  },
  {
    id: 'c2',
    category: 'Rani Pink Silk Saree- Rajasthani',
    name: 'Bridal Collection',
    subtitle: 'Rani Pink Silk Saree',
    price: 5950,
    originalPrice: 9950,
    image: '/images/Lehengas.png',
    aspectRatio: 'portrait',
  },
  {
    id: 'c3',
    category: 'Rani Pink Silk Saree- Rajasthani',
    name: 'Festive Set',
    subtitle: 'Rani Pink Silk Saree',
    price: 5950,
    originalPrice: 9950,
    image: '/images/Kurta_Sets.png',
    aspectRatio: 'portrait',
  },
  {
    id: 'c4',
    category: 'Rani Pink Silk Saree- Rajasthani',
    name: 'Festive Edit',
    subtitle: 'Rani Pink Silk Saree',
    price: 5950,
    originalPrice: 9950,
    image: '/images/sarees.png',
    aspectRatio: 'portrait',
  },
]

export const mostSellingClothing: Product[] = newArrivalClothing.map((p, i) => ({
  ...p,
  id: `ms${i + 1}`,
}))

export const mostSellingJewelry: Product[] = [
  {
    id: 'msj1',
    category: 'Oxidised',
    name: 'Statement Necklace',
    price: 5950,
    originalPrice: 9950,
    image: '/images/Pendants.png',
    aspectRatio: 'square',
  },
  {
    id: 'msj2',
    category: 'Oxidised',
    name: 'Jhumka Earrings',
    price: 5950,
    originalPrice: 9950,
    image: '/images/Earrings.png',
    aspectRatio: 'square',
  },
  {
    id: 'msj3',
    category: 'Oxidised',
    name: 'Temple Necklace',
    price: 5950,
    originalPrice: 9950,
    image: '/images/Necklaces.png',
    aspectRatio: 'square',
  },
  {
    id: 'msj4',
    category: 'Oxidised',
    name: 'Floral Bangles',
    price: 5950,
    originalPrice: 9950,
    image: '/images/Bangles.png',
    aspectRatio: 'square',
  },
]

export function formatPrice(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`
}

export function getDiscount(price: number, originalPrice: number): number {
  return Math.round(((originalPrice - price) / originalPrice) * 100)
}
