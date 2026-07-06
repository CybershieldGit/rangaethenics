import { Link } from 'react-router-dom'
import type { Product } from '../../data/products'
import { SectionHeader } from '../ui/SectionHeader'
import { Button } from '../ui/Button'
import { ProductCard } from './ProductCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ProductSectionProps {
  title?: string
  subtitle?: string
  products: Product[]
  viewAllLabel?: string
  viewAllTo?: string
  className?: string
}

export function ProductSection({
  title,
  subtitle,
  products,
  viewAllLabel,
  viewAllTo = '/products',
  className = '',
}: ProductSectionProps) {
  return (
    <section className={`pt-5 md:pt-6 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {title && <SectionHeader title={title} subtitle={subtitle} className="my-5" />}

        <div className="relative">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Slider controls on the right edge, matching the reference images */}
          {/* <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10 translate-x-[40%]">
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white shadow-md hover:bg-neutral-800 transition-colors cursor-pointer"
              aria-label="Next items"
            >
              <ChevronRight size={18} />
            </button>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white shadow-md hover:bg-neutral-800 transition-colors cursor-pointer"
              aria-label="Previous items"
            >
              <ChevronLeft size={18} />
            </button>
          </div> */}
        </div>

        {viewAllLabel && (
          <div className="mt-10 md:mt-15 text-center">
            <Link to={viewAllTo}>
              <Button>{viewAllLabel}</Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
