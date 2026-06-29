import type { Product } from '../../data/products'
import { SectionHeader } from '../ui/SectionHeader'
import { Button } from '../ui/Button'
import { ProductCard } from './ProductCard'

interface ProductSectionProps {
  title?: string
  subtitle?: string
  products: Product[]
  viewAllLabel?: string
  className?: string
}

export function ProductSection({
  title,
  subtitle,
  products,
  viewAllLabel,
  className = '',
}: ProductSectionProps) {
  return (
    <section className={`py-5 md:py-6 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {title && <SectionHeader title={title} subtitle={subtitle} className="mb-10" />}

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {viewAllLabel && (
          <div className="mt-10 text-center">
            <Button>{viewAllLabel}</Button>
          </div>
        )}
      </div>
    </section>
  )
}
