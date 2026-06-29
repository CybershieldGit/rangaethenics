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

const jewelryImages = [
  'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=600&h=600&fit=crop',
]

const clothingImages = [
  'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=500&h=700&fit=crop',
  'https://images.unsplash.com/photo-1610030459667-6b788b2a6d0e?w=500&h=700&fit=crop',
  'https://images.unsplash.com/photo-1595587637422-90cff7def97a?w=500&h=700&fit=crop',
  'https://images.unsplash.com/photo-1617627143750-d86bc21e3367?w=500&h=700&fit=crop',
]

export const newArrivalJewelry: Product[] = [
  {
    id: 'j1',
    category: 'Oxidised',
    name: 'Tribal Necklace',
    price: 5950,
    originalPrice: 9950,
    image: jewelryImages[0],
    aspectRatio: 'square',
  },
  {
    id: 'j2',
    category: 'Oxidised',
    name: 'Jhumka Earrings',
    price: 5950,
    originalPrice: 9950,
    image: jewelryImages[1],
    aspectRatio: 'square',
  },
  {
    id: 'j3',
    category: 'Oxidised',
    name: 'Cuff Bracelet',
    price: 5950,
    originalPrice: 9950,
    image: jewelryImages[2],
    aspectRatio: 'square',
  },
  {
    id: 'j4',
    category: 'Oxidised',
    name: 'Floral Earrings',
    price: 5950,
    originalPrice: 9950,
    image: jewelryImages[3],
    aspectRatio: 'square',
  },
]

export const newArrivalClothing: Product[] = [
  {
    id: 'c1',
    category: 'Rani Pink Silk Saree',
    name: 'Rajasthani',
    subtitle: 'Rani Pink Silk Saree',
    price: 5950,
    originalPrice: 9950,
    image: clothingImages[0],
    aspectRatio: 'portrait',
  },
  {
    id: 'c2',
    category: 'Maroon Lehenga',
    name: 'Bridal Collection',
    subtitle: 'Maroon Lehenga',
    price: 5950,
    originalPrice: 9950,
    image: clothingImages[1],
    aspectRatio: 'portrait',
  },
  {
    id: 'c3',
    category: 'Salwar Kameez',
    name: 'Festive Set',
    subtitle: 'Maroon Salwar Kameez',
    price: 5950,
    originalPrice: 9950,
    image: clothingImages[2],
    aspectRatio: 'portrait',
  },
  {
    id: 'c4',
    category: 'Rani Pink Silk Saree',
    name: 'Rajasthani',
    subtitle: 'Rani Pink Silk Saree',
    price: 5950,
    originalPrice: 9950,
    image: clothingImages[3],
    aspectRatio: 'portrait',
  },
]

export const mostSellingClothing: Product[] = newArrivalClothing.map((p, i) => ({
  ...p,
  id: `ms${i + 1}`,
}))

export const mostSellingJewelry: Product[] = newArrivalJewelry.map((p, i) => ({
  ...p,
  id: `msj${i + 1}`,
}))

export function formatPrice(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`
}

export function getDiscount(price: number, originalPrice: number): number {
  return Math.round(((originalPrice - price) / originalPrice) * 100)
}
