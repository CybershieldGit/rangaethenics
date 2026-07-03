import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Heart } from 'lucide-react'
import type { Product } from '../../data/products'
import { formatPrice, getDiscount } from '../../data/products'
import { useWishlist } from '../../context/WishlistContext'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import { Spinner } from '../ui/Spinner'

interface ProductCardProps {
  product: Product
  /** Optional callback fired after the product is added to the cart (e.g. to move it out of the wishlist). */
  onAddedToCart?: (product: Product) => void
}

export function ProductCard({ product, onAddedToCart }: ProductCardProps) {
  const discount = product.discountPercentage ?? getDiscount(product.price, product.originalPrice)
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const wishlisted = isInWishlist(product.id)
  const { addToCart } = useCart()
  const [justAdded, setJustAdded] = useState(false)
  const [adding, setAdding] = useState(false)
  const [togglingWishlist, setTogglingWishlist] = useState(false)

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    if (adding) return
    setAdding(true)
    try {
      await addToCart(product.id)
      setJustAdded(true)
      setTimeout(() => setJustAdded(false), 1500)
      onAddedToCart?.(product)
    } catch (error) {
      console.error('Failed to add to cart:', error)
    } finally {
      setAdding(false)
    }
  }

  const handleToggleWishlist = async () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    if (togglingWishlist) return
    setTogglingWishlist(true)
    try {
      await toggleWishlist(product.id)
    } catch (error) {
      console.error('Failed to update wishlist:', error)
    } finally {
      setTogglingWishlist(false)
    }
  }

  return (
    <article className="group mx-auto flex w-full max-w-[310px] flex-col gap-3">
      <Link
        to={`/product/${product.id}`}
        className="block aspect-[310/420] border border-[#BD8A3C] bg-transparent p-2.5"
      >
        <div className="h-full w-full overflow-hidden">
          <img
            src={product.image}
            alt={`${product.category} ${product.name}`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      <div>
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-serif text-base leading-snug transition-colors hover:text-maroon">
            <span className="block text-text">{product.category}</span>
            <span className="block text-text-dark">{product.subtitle ?? product.name}</span>
          </h3>
        </Link>

        <div className="mt-2.5 flex flex-wrap items-baseline gap-2">
          <span className="text-lg font-semibold text-maroon">
            {formatPrice(product.price)}
          </span>
          {discount > 0 && (
            <>
              <span className="text-sm text-text line-through">
                {formatPrice(product.originalPrice)}
              </span>
              <span className="text-sm font-medium text-[#BD8A3C]">{discount}% OFF</span>
            </>
          )}
        </div>

        <div className="mt-3 flex gap-2 md:gap-3">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={adding}
            className={`flex flex-1 items-center justify-center gap-2 whitespace-nowrap border border-maroon px-2 py-3 font-serif text-sm tracking-normal transition-colors disabled:cursor-not-allowed md:py-3.5 md:text-base md:tracking-wide ${
              justAdded || adding
                ? 'bg-maroon text-white'
                : 'bg-transparent text-maroon hover:bg-maroon hover:text-white'
            }`}
          >
            {adding && <Spinner size={16} />}
            {adding ? 'Adding...' : justAdded ? 'Added ✓' : 'Add To Cart'}
          </button>
          <button
            type="button"
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            aria-pressed={wishlisted}
            onClick={handleToggleWishlist}
            disabled={togglingWishlist}
            className={`flex aspect-square w-11 shrink-0 items-center justify-center border border-maroon transition-colors disabled:cursor-not-allowed md:w-14 ${
              wishlisted
                ? 'bg-maroon text-white'
                : 'bg-transparent text-maroon hover:bg-maroon hover:text-white'
            }`}
          >
            {togglingWishlist ? (
              <Spinner size={18} />
            ) : (
              <Heart size={18} strokeWidth={1.5} fill={wishlisted ? 'currentColor' : 'none'} />
            )}
          </button>
        </div>
      </div>
    </article>
  )
}
