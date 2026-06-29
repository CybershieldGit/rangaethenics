import { Heart } from 'lucide-react'
import type { Product } from '../../data/products'
import { formatPrice, getDiscount } from '../../data/products'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const discount = getDiscount(product.price, product.originalPrice)

  return (
    <article className="group mx-auto flex w-full max-w-[310px] flex-col gap-3">
      <div className="aspect-[310/420] border border-[#BD8A3C] bg-transparent p-2.5">
        <div className="h-full w-full overflow-hidden">
          <img
            src={product.image}
            alt={`${product.category} ${product.name}`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>

      <div>
        <h3 className="font-serif text-base leading-snug">
          <span className="block text-text">{product.category}</span>
          <span className="block text-text-dark">{product.subtitle ?? product.name}</span>
        </h3>

        <div className="mt-2.5 flex flex-wrap items-baseline gap-2">
          <span className="text-lg font-semibold text-maroon">
            {formatPrice(product.price)}
          </span>
          <span className="text-sm text-text line-through">
            {formatPrice(product.originalPrice)}
          </span>
          <span className="text-sm font-medium text-[#BD8A3C]">{discount}% OFF</span>
        </div>

        <div className="mt-3 flex gap-2 md:gap-3">
          <button
            type="button"
            className="flex-1 whitespace-nowrap border border-maroon bg-transparent px-2 py-3 font-serif text-sm tracking-normal text-maroon transition-colors hover:bg-maroon hover:text-white md:py-3.5 md:text-base md:tracking-wide"
          >
            Add To Cart
          </button>
          <button
            type="button"
            aria-label="Add to wishlist"
            className="flex aspect-square w-11 shrink-0 items-center justify-center border border-maroon bg-transparent text-maroon transition-colors hover:bg-maroon hover:text-white md:w-14"
          >
            <Heart size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </article>
  )
}
