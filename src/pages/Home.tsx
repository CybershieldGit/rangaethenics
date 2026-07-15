import { useEffect, useState } from 'react'
import { DecorativeDivider } from '../components/ui/DecorativeDivider'
import { HeroCarousel } from '../components/home/HeroCarousel'
import { CategoryCards } from '../components/home/CategoryCards'
import { ValueProposition } from '../components/home/ValueProposition'
import { PromoBanner } from '../components/home/PromoBanner'
import { ProductSection } from '../components/home/ProductSection'
import { OccasionSection } from '../components/home/OccasionSection'
import { GallerySection } from '../components/home/GallerySection'
import { OurStory } from '../components/home/OurStory'
import { getProducts } from '../utils/api'
import {
  Product,
  newArrivalJewelry as fallbackNewArrival,
  mostSellingClothing as fallbackMostSelling,
} from '../data/products'

export function Home() {
  const [newArrivals, setNewArrivals] = useState<Product[]>(fallbackNewArrival)
  const [mostSelling, setMostSelling] = useState<Product[]>(fallbackMostSelling)

  useEffect(() => {
    async function loadHomeProducts() {
      const { products } = await getProducts({ pageSize: 100 })
      if (products && products.length > 0) {
        const liveNewArrival = products.filter(p => p.isNewArrival)
        const liveMostSelling = products.filter(p => p.isBestSelling)

        if (liveNewArrival.length > 0) setNewArrivals(liveNewArrival.slice(0, 4))
        if (liveMostSelling.length > 0) setMostSelling(liveMostSelling.slice(0, 4))
      }
    }
    loadHomeProducts()
  }, [])

  return (
    <>
      <HeroCarousel />
      <DecorativeDivider className="md:my-[70px] my-[30px] mx-auto px-4 md:px-8" type="flower" />
      <CategoryCards />
      <DecorativeDivider className="md:pt-[50px] pt-[30px] pb-6" type="flower" />
      <ValueProposition />
      <PromoBanner />
      <ProductSection
        title="New Arrivals"
        subtitle="Fresh designs, inspired by the tradition and crafted for the modern muse."
        products={newArrivals}
        viewAllTo="/products?category=all&newArrival=true"
        viewAllLabel="View All New Arrivals"
      />
      <OccasionSection />
      <ProductSection
        title="Most Selling"
        subtitle="Loved by our customers for their elegance, quality and timeless charm."
        products={mostSelling}
        viewAllTo="/products?category=all&bestSelling=true"
        viewAllLabel="View All Most Selling"
      />
      <GallerySection />
      <OurStory background="" buttonText="Know More About Us" to="/about" />
    </>
  )
}

