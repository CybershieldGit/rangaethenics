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


                </div>

                {viewAllLabel && (
                    <div className="mt-[50px] mb-[70px] md:mt-15 text-center">
                        <Link to={viewAllTo}>
                            <Button>{viewAllLabel}</Button>
                        </Link>
                    </div>
                )}
            </div>
        </section>
    )
}
