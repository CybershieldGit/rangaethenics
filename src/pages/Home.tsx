import { DecorativeDivider } from '../components/ui/DecorativeDivider'
import { HeroCarousel } from '../components/home/HeroCarousel'
import { CategoryCards } from '../components/home/CategoryCards'
import { ValueProposition } from '../components/home/ValueProposition'
import { PromoBanner } from '../components/home/PromoBanner'
import { ProductSection } from '../components/home/ProductSection'
import { OccasionSection } from '../components/home/OccasionSection'
import { GallerySection } from '../components/home/GallerySection'
import { OurStory } from '../components/home/OurStory'
import {
  newArrivalJewelry,
  mostSellingClothing,
} from '../data/products'

export function Home() {
  return (
    <>
      <HeroCarousel />
      <DecorativeDivider className="py-6" />
      <CategoryCards />
      <DecorativeDivider className="py-6" />
      <ValueProposition />
      <PromoBanner />
      <ProductSection
        title="New Arrivals"
        subtitle="Fresh designs, inspired by the tradition and crafted for the modern muse."
        products={newArrivalJewelry}
        viewAllLabel="View All New Arrivals"
      />
      <OccasionSection />
      <ProductSection
        title="Most Selling"
        subtitle="Loved by our customers for their elegance, quality and timeless charm."
        products={mostSellingClothing}
        viewAllLabel="View All Most Selling"
      />
      <GallerySection />
      <OurStory />
    </>
  )
}
