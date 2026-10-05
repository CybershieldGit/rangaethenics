import { useEffect, useState } from 'react'
import { RangethnicsHero } from '../components/landing/RangethnicsHero'
import { RangethnicsStory } from '../components/landing/RangethnicsStory'
import { RangethnicsCategories } from '../components/landing/RangethnicsCategories'
import { RangethnicsCraft } from '../components/landing/RangethnicsCraft'
import { RangethnicsSignature } from '../components/landing/RangethnicsSignature'
import { RangethnicsOccasions } from '../components/landing/RangethnicsOccasions'
import { RangethnicsPromise } from '../components/landing/RangethnicsPromise'

// Preserved original imports to ensure no legacy code is lost
import { DecorativeDivider as _DecorativeDivider } from '../components/ui/DecorativeDivider'
import { HeroCarousel as _HeroCarousel } from '../components/home/HeroCarousel'
import { CategoryCards as _CategoryCards } from '../components/home/CategoryCards'
import { ValueProposition as _ValueProposition } from '../components/home/ValueProposition'
import { PromoBanner as _PromoBanner } from '../components/home/PromoBanner'
import { ProductSection as _ProductSection } from '../components/home/ProductSection'
import { OccasionSection as _OccasionSection } from '../components/home/OccasionSection'
import { GallerySection as _GallerySection } from '../components/home/GallerySection'
import { OurStory as _OurStory } from '../components/home/OurStory'
import { getProducts } from '../utils/api'
import {
  Product,
  newArrivalJewelry as fallbackNewArrival,
  mostSellingClothing as fallbackMostSelling,
} from '../data/products'

export function Home() {
  // Preserved state for products in case needed in background
  const [, setNewArrivals] = useState<Product[]>(fallbackNewArrival)
  const [, setMostSelling] = useState<Product[]>(fallbackMostSelling)

  useEffect(() => {
    async function loadHomeProducts() {
      try {
        const { products } = await getProducts({ pageSize: 100 })
        if (products && products.length > 0) {
          const liveNewArrival = products.filter(p => p.isNewArrival)
          const liveMostSelling = products.filter(p => p.isBestSelling)

          if (liveNewArrival.length > 0) setNewArrivals(liveNewArrival.slice(0, 4))
          if (liveMostSelling.length > 0) setMostSelling(liveMostSelling.slice(0, 4))
        }
      } catch {
        // Fallback gracefully
      }
    }
    loadHomeProducts()
  }, [])

  return (
    <div className="w-full bg-[#FAF6F0] text-[#2B1B17] font-sans selection:bg-[#9E784F]/20 selection:text-[#2B1B17]">
      {/* 1. Hero Section: Timeless Ethnic. Refined For Today. */}
      <RangethnicsHero />

      {/* 2. Our Story Section: Rooted In Heritage. Made For The Modern You. */}
      <RangethnicsStory />

      {/* 3. Shop by Category: Explore Our World (4 Jharokha Arched Portals) */}
      <RangethnicsCategories />

      {/* 4. Craftsmanship Section: The Art of Craftsmanship */}
      <RangethnicsCraft />

      {/* 5. The Signature Edit Section: Featured Spotlight */}
      <RangethnicsSignature />

      {/* 6. Occasions Section: For Every Celebration */}
      <RangethnicsOccasions />

      {/* 7. Our Promise Section: Wear Your Roots. Define Your Style. */}
      <RangethnicsPromise />
    </div>
  )
}
