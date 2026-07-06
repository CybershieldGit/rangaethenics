import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { Breadcrumb } from '../components/ui/Breadcrumb'
import { Spinner } from '../components/ui/Spinner'
import { useCart } from '../context/CartContext'
import { getProducts } from '../utils/api'
import { allProducts, formatPrice, getDiscount, type Product } from '../data/products'

export function Cart() {
  const { items, count, updateQty, removeFromCart, clearCart } = useCart()
  const [products, setProducts] = useState<Product[]>(allProducts)
  const [clearing, setClearing] = useState(false)
  const [busyId, setBusyId] = useState<string | null>(null)

  const handleClearCart = async () => {
    if (clearing) return
    setClearing(true)
    try {
      await clearCart()
    } catch (error) {
      console.error('Failed to clear cart:', error)
    } finally {
      setClearing(false)
    }
  }

  const handleUpdateQty = async (id: string, qty: number) => {
    if (busyId) return
    setBusyId(id)
    try {
      await updateQty(id, qty)
    } catch (error) {
      console.error('Failed to update quantity:', error)
    } finally {
      setBusyId(null)
    }
  }

  const handleRemove = async (id: string) => {
    if (busyId) return
    setBusyId(id)
    try {
      await removeFromCart(id)
    } catch (error) {
      console.error('Failed to remove item:', error)
    } finally {
      setBusyId(null)
    }
  }

  useEffect(() => {
    async function loadProducts() {
      try {
        const { products: liveProducts } = await getProducts({ pageSize: 100 })
        if (liveProducts && liveProducts.length > 0) {
          setProducts(liveProducts)
        }
      } catch (error) {
        console.error('Failed to load cart products:', error)
      }
    }
    loadProducts()
  }, [])

  const cartLines = items
    .map((item) => {
      const product = products.find((p) => p.id === item.id)
      return product ? { product, qty: item.qty } : null
    })
    .filter((line): line is { product: Product; qty: number } => line !== null)

  const subtotal = cartLines.reduce((sum, { product, qty }) => sum + product.price * qty, 0)
  const originalTotal = cartLines.reduce(
    (sum, { product, qty }) => sum + product.originalPrice * qty,
    0,
  )
  const savings = originalTotal - subtotal

  return (
    <div className="bg-[#F8F0E5] pb-16">
      {/* Breadcrumb with the Clear Cart button on the same row */}
      <div className="relative">
        <Breadcrumb items={[{ label: 'Cart' }]} />
        {count > 0 && (
          <div className="pointer-events-none absolute inset-0 flex items-center">
            <div className="mx-auto flex w-full max-w-7xl justify-end px-4 md:px-8">
              <button
                type="button"
                onClick={handleClearCart}
                disabled={clearing}
                className="pointer-events-auto inline-flex shrink-0 items-center gap-2 whitespace-nowrap border border-maroon px-4 py-2 font-serif text-sm text-maroon transition-colors hover:bg-maroon hover:text-white disabled:cursor-not-allowed disabled:opacity-60 sm:px-5 sm:py-2.5"
              >
                {clearing && <Spinner size={15} />}
                {clearing ? 'Clearing...' : 'Clear Cart'}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-8 md:px-8 md:pb-10">
        {cartLines.length > 0 ? (
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
            {/* Cart items */}
            <div className="min-w-0 flex-1">
              <ul className="flex flex-col divide-y divide-[#BD8A3C]/25 border border-[#BD8A3C]/30 bg-[#FFFDF9]">
                {cartLines.map(({ product, qty }) => {
                  const discount =
                    product.discountPercentage ?? getDiscount(product.price, product.originalPrice)
                  const busy = busyId === product.id
                  return (
                    <li key={product.id} className="flex gap-4 p-4 sm:gap-5 sm:p-5">
                      {/* Image */}
                      <Link
                        to="/products"
                        className="shrink-0 border border-[#BD8A3C] p-1.5"
                      >
                        <img
                          src={product.image}
                          alt={`${product.category} ${product.name}`}
                          className="h-24 w-20 object-cover sm:h-28 sm:w-24"
                        />
                      </Link>

                      {/* Details */}
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="font-serif text-base leading-snug">
                            <span className="block text-text">{product.category}</span>
                            <span className="block text-text-dark">
                              {product.subtitle ?? product.name}
                            </span>
                          </h3>
                          <button
                            type="button"
                            aria-label={`Remove ${product.name}`}
                            onClick={() => handleRemove(product.id)}
                            disabled={busy}
                            className="shrink-0 text-text transition-colors hover:text-maroon disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {busy ? <Spinner size={18} /> : <Trash2 size={18} strokeWidth={1.5} />}
                          </button>
                        </div>

                        <div className="mt-1 flex flex-wrap items-baseline gap-2">
                          <span className="text-lg font-semibold text-maroon">
                            {formatPrice(product.price * qty)}
                          </span>
                          {discount > 0 && (
                            <>
                              <span className="text-sm text-text line-through">
                                {formatPrice(product.originalPrice * qty)}
                              </span>
                              <span className="text-sm font-medium text-[#BD8A3C]">
                                {discount}% OFF
                              </span>
                            </>
                          )}
                        </div>

                        {/* Quantity stepper + line total */}
                        <div className="mt-auto flex items-center justify-between pt-3">
                          <div className="inline-flex items-center border border-[#BD8A3C]/50">
                            <button
                              type="button"
                              aria-label="Decrease quantity"
                              onClick={() => handleUpdateQty(product.id, qty - 1)}
                              disabled={busy}
                              className="flex h-9 w-9 items-center justify-center text-maroon transition-colors hover:bg-maroon hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <Minus size={15} strokeWidth={2} />
                            </button>
                            <span className="flex h-9 w-10 items-center justify-center font-serif text-base text-text-dark">
                              {busy ? <Spinner size={15} /> : qty}
                            </span>
                            <button
                              type="button"
                              aria-label="Increase quantity"
                              onClick={() => handleUpdateQty(product.id, qty + 1)}
                              disabled={busy}
                              className="flex h-9 w-9 items-center justify-center text-maroon transition-colors hover:bg-maroon hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <Plus size={15} strokeWidth={2} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>

              <div className="mt-4">
                <Link
                  to="/products"
                  className="font-serif text-sm text-maroon transition-colors hover:underline"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order summary */}
            <aside className="w-full shrink-0 lg:w-[360px]">
              <div className="border border-[#BD8A3C]/40 bg-[#F8F0E5]">
                <div className="border-b border-[#BD8A3C]/30 px-6 py-4">
                  <h2 className="font-serif text-xl text-text-dark">Order Summary</h2>
                </div>
                <div className="space-y-4 px-6 py-5">
                  <div className="flex items-center justify-between text-[16px] text-text-dark">
                    <span>Subtotal ({count} items)</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  {savings > 0 && (
                    <div className="flex items-center justify-between text-[16px] text-[#BD8A3C]">
                      <span>You Save</span>
                      <span>-{formatPrice(savings)}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-[16px] text-text-dark">
                    <span>Shipping</span>
                    <span className="text-text">Calculated at checkout</span>
                  </div>

                  <div className="h-px w-full bg-[#BD8A3C]/30" />

                  <div className="flex items-center justify-between font-serif text-lg text-text-dark">
                    <span>Total</span>
                    <span className="font-sans text-xl font-semibold text-maroon">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <Link
                    to="/checkout"
                    className="mt-2 block w-full border border-maroon bg-maroon px-6 py-3.5 text-center font-serif text-base tracking-wide text-white transition-colors hover:bg-transparent hover:text-maroon"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#BD8A3C]/50 bg-[#F8F0E5] text-maroon">
              <ShoppingBag size={30} strokeWidth={1.5} />
            </div>
            <p className="mt-6 font-serif text-xl text-maroon">Your cart is empty</p>
            <p className="mt-2 max-w-md text-sm text-text">
              Looks like you haven't added anything yet. Explore our collection and find something you love.
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
