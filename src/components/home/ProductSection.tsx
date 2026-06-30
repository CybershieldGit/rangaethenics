import { Link } from 'react-router-dom'
import type { Product } from '../../data/products'
import { SectionHeader } from '../ui/SectionHeader'
import { Button } from '../ui/Button'
import { ProductCard } from './ProductCard'

interface ProductSectionProps {
  title?: string
  subtitle?: string
  products: Product[]
  viewAllLabel?: string
  viewAllTo?: string
  className?: string
  slider?: boolean
}

export function ProductSection({
  title,
  subtitle,
  products,
  viewAllLabel,
  viewAllTo = '/products',
  className = '',
  slider = false,
}: ProductSectionProps) {
  return (
    <section className={`py-5 md:py-6 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {title && (
          <SectionHeader
            title={title}
            subtitle={subtitle}
            className={slider ? 'mb-6' : 'mb-10'}
          />
        )}

        {slider && (
          <div className="mx-auto mb-10 h-1 w-full max-w-3xl overflow-hidden rounded-full bg-[#d9d2c6]">
            <div className="h-full w-1/4 rounded-full bg-[#2f6fed]" />
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {viewAllLabel && (
          <div className="mt-10 text-center">
            <Link to={viewAllTo}>
              <Button>{viewAllLabel}</Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
