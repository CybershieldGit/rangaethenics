import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { Breadcrumb } from '../components/ui/Breadcrumb'
import { Spinner } from '../components/ui/Spinner'
import { ProductCard } from '../components/home/ProductCard'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import { getProducts } from '../utils/api'
import { allProducts, type Product } from '../data/products'

export function Wishlist() {
  const { items, count, clearWishlist, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()
  const [products, setProducts] = useState<Product[]>(allProducts)
  const [clearing, setClearing] = useState(false)
  const [movingAll, setMovingAll] = useState(false)

  const handleClearWishlist = async () => {
    if (clearing) return
    setClearing(true)
    try {
      await clearWishlist()
    } catch (error) {
      console.error('Failed to clear wishlist:', error)
    } finally {
      setClearing(false)
    }
  }

  const handleMoveAllToBag = async () => {
    if (movingAll || wishlistedProducts.length === 0) return
    setMovingAll(true)
    try {
      for (const product of wishlistedProducts) {
        await addToCart(product.id, 1)
        await removeFromWishlist(product.id)
      }
    } catch (error) {
      console.error('Failed to move all to bag:', error)
    } finally {
      setMovingAll(false)
    }
  }

  // Load the same live catalogue the Products page uses so wishlisted IDs resolve correctly
  useEffect(() => {
    async function loadProducts() {
      try {
        const { products: liveProducts } = await getProducts({ pageSize: 100 })
        if (liveProducts && liveProducts.length > 0) {
          setProducts(liveProducts)
        }
      } catch (error) {
        console.error('Failed to load wishlist products:', error)
      }
    }
    loadProducts()
  }, [])

  const wishlistedProducts = products.filter((product) => items.includes(product.id))

  return (
    <div className="bg-[#F8F0E5] pb-16">
      {/* Breadcrumb with the Clear Wishlist button on the same row */}
      <div className="relative">
        <Breadcrumb items={[{ label: 'Wishlist' }]} />
        {count > 0 && (
          <div className="pointer-events-none absolute inset-0 flex items-center">
            <div className="mx-auto flex w-full max-w-7xl justify-end px-4 md:px-8 gap-3">
              <button
                type="button"
                onClick={handleClearWishlist}
                disabled={clearing || movingAll}
                className="pointer-events-auto inline-flex shrink-0 items-center gap-2 whitespace-nowrap border border-maroon px-4 py-2 font-serif text-sm text-maroon transition-colors hover:bg-maroon hover:text-white disabled:cursor-not-allowed disabled:opacity-60 sm:px-5 sm:py-2.5 bg-transparent cursor-pointer"
              >
                {clearing && <Spinner size={15} />}
                {clearing ? 'Clearing...' : 'Clear Wishlist'}
              </button>
              <button
                type="button"
                onClick={handleMoveAllToBag}
                disabled={clearing || movingAll}
                className="pointer-events-auto inline-flex shrink-0 items-center gap-2 whitespace-nowrap border border-maroon bg-maroon px-4 py-2 font-serif text-sm text-white transition-colors hover:bg-transparent hover:text-maroon disabled:cursor-not-allowed disabled:opacity-60 sm:px-5 sm:py-2.5 cursor-pointer"
              >
                {movingAll && <Spinner size={15} />}
                {movingAll ? 'Moving...' : 'Move All to Bag'}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-8 md:px-8 md:pb-10">
        {wishlistedProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 xl:grid-cols-4">
            {wishlistedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddedToCart={(p) => removeFromWishlist(p.id)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#BD8A3C]/50 bg-[#F8F0E5] text-maroon">
              <Heart size={32} strokeWidth={1.5} />
            </div>
            <p className="mt-6 font-serif text-xl text-maroon">Your wishlist is empty</p>
            <p className="mt-2 max-w-md text-sm text-text">
              Tap the heart on any product to save it here and revisit your favourite pieces anytime.
            </p>
            <Link
              to="/products"
              className="mt-6 border border-maroon bg-maroon px-8 py-3 font-serif text-sm tracking-wide text-white transition-colors hover:bg-transparent hover:text-maroon"
            >
              Explore Collection
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
