import { Heart } from 'lucide-react'
import type { Product } from '../../data/products'
import { formatPrice, getDiscount } from '../../data/products'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const discount = getDiscount(product.price, product.originalPrice)

  return (
    <article className="group">
      <div
        className={`overflow-hidden border border-gold/30 bg-white ${
          product.aspectRatio === 'square' ? 'aspect-square' : 'aspect-[3/4]'
        }`}
      >
        <img
          src={product.image}
          alt={`${product.category} ${product.name}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="mt-3">
        <h3 className="font-serif text-sm leading-snug text-text-dark">
          {product.category}
          <br />
          {product.subtitle ?? product.name}
        </h3>

        <div className="mt-2 flex flex-wrap items-baseline gap-2">
          <span className="font-bold text-maroon">{formatPrice(product.price)}</span>
          <span className="text-xs text-text line-through">
            {formatPrice(product.originalPrice)}
          </span>
          <span className="text-xs font-medium text-gold">{discount}% OFF</span>
        </div>

        <div className="mt-3 flex gap-2">
          <button
            type="button"
            className="flex-1 border border-maroon/40 bg-cream py-2.5 font-serif text-sm text-maroon transition-colors hover:border-maroon hover:bg-cream-dark"
          >
            Add To Cart
          </button>
          <button
            type="button"
            aria-label="Add to wishlist"
            className="flex h-10 w-10 shrink-0 items-center justify-center border border-maroon/40 bg-cream text-maroon transition-colors hover:border-maroon hover:bg-cream-dark"
          >
            <Heart size={16} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </article>
  )
}
