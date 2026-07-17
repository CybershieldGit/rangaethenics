import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  CalendarDays,
  ChevronDown,
  Hand,
  Headphones,
  Heart,
  Lock,
  Minus,
  Play,
  Plus,
  RotateCcw,
  ShieldCheck,
  Store,
  Truck,
} from 'lucide-react'
import { Breadcrumb } from '../components/ui/Breadcrumb'
import { ProductCard } from '../components/home/ProductCard'
import { Spinner } from '../components/ui/Spinner'
import { getProductDetail, getProducts, type ProductDetail as ProductDetailType } from '../utils/api'
import { getActiveCoupons, type Coupon } from '../utils/checkoutApi'
import { formatPrice, type Product } from '../data/products'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useAuth } from '../context/AuthContext'

function parseColor(value: string): { name: string; hex: string } {
  const [name, hex] = value.includes('|') ? value.split('|') : [value, value]
  return { name: name.trim(), hex: hex.trim() }
}

function couponDiscountValue(c: Coupon): string {
  return c.discountType === 'percentage' ? `${c.discountValue}% OFF` : `${formatPrice(c.discountValue)} OFF`
}

function formatDeliveryWindow(): string {
  const opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' }
  const start = new Date()
  start.setDate(start.getDate() + 5)
  const end = new Date()
  end.setDate(end.getDate() + 9)
  return `${start.toLocaleDateString('en-US', opts)} - ${end.toLocaleDateString('en-US', opts)}`
}

interface AccordionProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

function Accordion({ title, children, defaultOpen = false }: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-[#BD8A3C]/30">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-4 text-left font-serif text-[12px] md:text-base font-semibold text-text-dark"
      >
        {title}
        <ChevronDown
          size={18}
          className={`shrink-0 text-maroon transition-transform ${open ? '-scale-y-100' : ''}`}
        />
      </button>
      {open && (
        <div className="pb-4 text-[12px] md:text-sm leading-relaxed text-text">{children}</div>
      )}
    </div>
  )
}

const trustBadges = [
  { icon: ShieldCheck, label: '100% Authentic' },
  { icon: Hand, label: 'Handcrafted' },
  { icon: Lock, label: 'Secure Payment' },
  { icon: RotateCcw, label: 'Easy Returns' },
]

const bottomBar = [
  { icon: Truck, title: 'FREE SHIPPING', subtitle: 'Across India' },
  { icon: RotateCcw, title: 'EASY RETURNS', subtitle: '7-Day Return Policy' },
  { icon: ShieldCheck, title: 'SECURE PAYMENT', subtitle: '100% Secure Checkout' },
  { icon: Headphones, title: 'CUSTOMER SUPPORT', subtitle: 'Mon - Sat (10AM - 7PM)' },
]

export function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const { addToCart } = useCart()
  const { isInWishlist, toggleWishlist } = useWishlist()

  const [product, setProduct] = useState<ProductDetailType | null>(null)
  const [loading, setLoading] = useState(true)
  const [related, setRelated] = useState<Product[]>([])
  const [offers, setOffers] = useState<Coupon[]>([])

  const [activeImage, setActiveImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [qty, setQty] = useState(1)

  const [addingToCart, setAddingToCart] = useState(false)
  const [buyingNow, setBuyingNow] = useState(false)
  const [togglingWishlist, setTogglingWishlist] = useState(false)

  useEffect(() => {
    if (!id) return
    let cancelled = false
    setLoading(true)
    window.scrollTo({ top: 0, behavior: 'auto' })

    getProductDetail(id)
      .then((data) => {
        if (cancelled) return
        setProduct(data)
        setActiveImage(0)
        setQty(1)
        setSelectedColor(data?.colors?.[0] ?? null)
        setSelectedSize(data?.sizes?.[0] ?? null)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [id])

  useEffect(() => {
    if (!product) return
    let cancelled = false
    getProducts({ category: product.mainCategory, pageSize: 12 }).then(({ products }) => {
      if (cancelled) return
      setRelated(products.filter((p) => p.id !== product.id).slice(0, 4))
    })
    return () => {
      cancelled = true
    }
  }, [product])

  useEffect(() => {
    let cancelled = false
    getActiveCoupons().then((list) => {
      if (!cancelled) setOffers(list)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const wishlisted = product ? isInWishlist(product.id) : false
  const inStock = (product?.countInStock ?? 0) > 0
  const deliveryWindow = useMemo(() => formatDeliveryWindow(), [])

  const requireAuth = () => {
    if (!isAuthenticated) {
      navigate('/login')
      return false
    }
    return true
  }

  const handleAddToBag = async () => {
    if (!product || !requireAuth() || addingToCart) return
    setAddingToCart(true)
    try {
      await addToCart(product.id, qty)
    } catch (error) {
    } finally {
      setAddingToCart(false)
    }
  }

  const handleBuyNow = async () => {
    if (!product || !requireAuth() || buyingNow) return
    setBuyingNow(true)
    try {
      await addToCart(product.id, qty)
      navigate('/cart')
    } catch (error) {
    } finally {
      setBuyingNow(false)
    }
  }

  const handleToggleWishlist = async () => {
    if (!product || !requireAuth() || togglingWishlist) return
    setTogglingWishlist(true)
    try {
      await toggleWishlist(product.id)
    } catch (error) {
    } finally {
      setTogglingWishlist(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#F8F0E5]">
        <Spinner size={36} className="text-maroon" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="bg-[#F8F0E5]">
        <Breadcrumb items={[{ label: 'Product' }]} />
        <div className="mx-auto max-w-7xl px-4 py-24 text-center md:px-8">
          <p className="font-serif text-2xl text-maroon">Product not found</p>
          <p className="mt-2 text-text">The product you're looking for is no longer available.</p>
          <Link
            to="/products"
            className="mt-6 inline-block border border-maroon px-6 py-3 font-serif text-maroon transition-colors hover:bg-maroon hover:text-white"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    )
  }

  const discount = product.discountPercentage ?? 0
  const gallery = product.images.length > 0 ? product.images : [product.image]
  const fabric = product.fabrics[0]
  const work = product.works[0]

  const shopLink =
    product.type === 'jewellery' ? '/jewellery' : '/clothing'

  return (
    <div className="bg-[#F8F0E5] pb-4">
      <Breadcrumb
        items={[
          { label: product.type === 'jewellery' ? 'Jewellery' : 'Clothing', to: shopLink },
          ...(product.subtitle ? [{ label: product.category, to: '/products' }] : []),
          { label: product.name },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-6">
          {/* Gallery */}
          <div className="lg:col-span-5">
            <div className="flex gap-3">
              {/* Thumbnails */}
              <div className="flex w-16 shrink-0 flex-col items-center gap-3">
                {gallery.map((img, i) => (
                  <button
                    key={`${img}-${i}`}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    className={`aspect-[3/4] w-full overflow-hidden border transition-colors ${activeImage === i ? 'border-maroon' : 'border-[#BD8A3C]/40 hover:border-maroon/60'
                      }`}
                    aria-label={`View image ${i + 1}`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover object-top" />
                  </button>
                ))}
              </div>

              {/* Main image */}
              <div className="relative flex-1 overflow-hidden border border-[#BD8A3C]/40 bg-white">
                {product.isBestSelling && (
                  <span className="absolute left-4 top-4 z-10 bg-maroon px-3 py-1 text-xs font-semibold tracking-wide text-white">
                    BESTSELLER
                  </span>
                )}
                <button
                  type="button"
                  onClick={handleToggleWishlist}
                  disabled={togglingWishlist}
                  aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                  className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-maroon shadow-sm transition-colors hover:bg-[#F8F0E5]"
                >
                  {togglingWishlist ? (
                    <Spinner size={16} />
                  ) : (
                    <Heart size={18} strokeWidth={1.5} fill={wishlisted ? 'currentColor' : 'none'} />
                  )}
                </button>

                <img
                  src={gallery[activeImage]}
                  alt={product.name}
                  className="aspect-[3/4] w-full object-cover object-top"
                />

                {product.video && (
                  <a
                    href={product.video}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute bottom-4 left-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-maroon bg-white/90 text-maroon transition-colors hover:bg-white"
                    aria-label="Play product video"
                  >
                    <Play size={18} fill="currentColor" />
                  </a>
                )}


              </div>
            </div>
          </div>

          {/* Info */}
          <div className="lg:col-span-4">
            <h1 className="font-serif text-[18px] md:text-3xl font-bold leading-tight text-maroon">
              {product.name}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <span className="font-sans text-2xl font-bold text-maroon">
                {formatPrice(product.price)}
              </span>
              {discount > 0 && (
                <>
                  <span className="text-base text-text line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="rounded-sm bg-[#E3C9A3] px-2.5 py-1 text-sm font-bold text-[#4a3f38]">
                    {discount}% OFF
                  </span>
                </>
              )}
            </div>

            {product.shortDescription && (
              <p className="mt-4 text-[12px] md:text-sm leading-relaxed text-text">{product.shortDescription}</p>
            )}

            {(fabric || work) && (
              <div className="mt-5 flex items-stretch">
                {fabric && (
                  <div className="pr-8">
                    <p className="text-xs uppercase tracking-wide text-text/70">Fabric</p>
                    <p className="mt-1 text-sm font-medium text-text-dark">{fabric}</p>
                  </div>
                )}
                {fabric && work && <div className="w-px self-stretch bg-[#BD8A3C]/40" />}
                {work && (
                  <div className="pl-8">
                    <p className="text-xs uppercase tracking-wide text-text/70">Zarii</p>
                    <p className="mt-1 text-sm font-medium text-text-dark">{work}</p>
                  </div>
                )}
              </div>
            )}

            {product.colors.length > 0 && (
              <div className="mt-6">
                <p className="text-[12px] md:text-sm font-semibold text-text-dark">
                  COLOR:{' '}
                  <span className="font-normal text-text">
                    {selectedColor ? parseColor(selectedColor).name : ''}
                  </span>
                </p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {product.colors.map((color) => {
                    const { name, hex } = parseColor(color)
                    const isSelected = selectedColor === color
                    return (
                      <button
                        key={color}
                        type="button"
                        title={name}
                        aria-label={`Select color ${name}`}
                        aria-pressed={isSelected}
                        onClick={() => setSelectedColor(color)}
                        className={`h-9 w-9 rounded-full transition-transform ${isSelected
                            ? 'ring-1 ring-offset-2 ring-offset-[#F8F0E5]'
                            : 'border border-[#BD8A3C]/40 hover:scale-105'
                          }`}
                        style={
                          {
                            backgroundColor: hex,
                            ...(isSelected ? { '--tw-ring-color': hex } : {}),
                          } as React.CSSProperties
                        }
                      />
                    )
                  })}
                </div>
              </div>
            )}

            {product.sizes.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <p className="text-[12px] md:text-sm font-semibold text-text-dark">
                    SIZE: <span className="font-normal text-text">{selectedSize ?? ''}</span>
                  </p>
                </div>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {product.sizes.map((size) => {
                    const isSelected = selectedSize === size
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        aria-pressed={isSelected}
                        className={`flex h-11 min-w-[44px] items-center justify-center border px-3 text-[12px] md:text-sm transition-colors ${isSelected
                            ? 'border-maroon bg-maroon text-white'
                            : 'border-[#BD8A3C]/50 text-text-dark hover:border-maroon'
                          }`}
                      >
                        {size}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Trust badges */}
            <div className="mt-8 grid grid-cols-4 gap-2 border-y border-[#BD8A3C]/30 py-5">
              {trustBadges.map((badge) => (
                <div key={badge.label} className="flex flex-col items-center gap-2 text-center">
                  <badge.icon size={24} strokeWidth={1.4} className="text-maroon" />
                  <span className="text-[11px] leading-tight text-text">{badge.label}</span>
                </div>
              ))}
            </div>

            {/* Accordions */}
            <div className="mt-4">
              <Accordion title="Product Details">
                <p className="whitespace-pre-line">
                  {product.longDescription || 'No additional details available.'}
                </p>
                <ul className="mt-2 space-y-1">
                  {fabric && <li>Fabric: {fabric}</li>}
                  {work && <li>Work: {work}</li>}
                  {product.sku && <li>SKU: {product.sku}</li>}
                </ul>
              </Accordion>
              <Accordion title="Shipping & Returns">
                <p>
                  Free shipping across India. Estimated delivery within 5-9 business days. Easy
                  7-day returns on eligible items.
                </p>
              </Accordion>
            </div>
          </div>

          {/* Purchase sidebar */}
          <div className="lg:col-span-3">
            <div className="border border-[#BD8A3C]/40 bg-[#F8F0E5] p-5">
              <div className="flex items-start gap-2">
                <CalendarDays size={18} className="mt-0.5 shrink-0 text-maroon" />
                <div>
                  <p className="text-xs text-text">Delivery by</p>
                  <p className="text-sm font-semibold text-text-dark">{deliveryWindow}</p>
                </div>
              </div>

              <div className="mt-4 flex items-start gap-2">
                <Store size={18} className="mt-0.5 shrink-0 text-maroon" />
                <div>
                  <p className="text-xs text-text">Sold by</p>
                  <p className="text-sm font-semibold text-text-dark">Rangethnics Gujrat</p>
                </div>
              </div>

              <div className="mt-5">
                <p className="mb-2 text-sm text-text">Quantity</p>
                <div className="flex w-full items-center justify-between border border-[#BD8A3C]/50">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    disabled={qty <= 1}
                    className="flex h-11 w-11 items-center justify-center text-maroon transition-colors hover:bg-maroon/5 disabled:opacity-40"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="text-base font-semibold text-text-dark">{qty}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setQty((q) => (product.countInStock ? Math.min(product.countInStock, q + 1) : q + 1))
                    }
                    disabled={!!product.countInStock && qty >= product.countInStock}
                    className="flex h-11 w-11 items-center justify-center text-maroon transition-colors hover:bg-maroon/5 disabled:opacity-40"
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                {!inStock && (
                  <p className="mt-2 text-sm font-medium text-maroon">Out of stock</p>
                )}
              </div>

              <button
                type="button"
                onClick={handleAddToBag}
                disabled={!inStock || addingToCart}
                className="mt-4 flex h-12 w-full items-center justify-center gap-2 bg-maroon font-serif text-sm font-semibold tracking-wide text-white transition-colors hover:bg-maroon-dark disabled:cursor-not-allowed disabled:opacity-60"
              >
                {addingToCart && <Spinner size={16} />}
                {addingToCart ? 'ADDING...' : 'ADD TO BAG'}
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                disabled={!inStock || buyingNow}
                className="mt-3 flex h-12 w-full items-center justify-center gap-2 border border-maroon font-serif text-sm font-semibold tracking-wide text-maroon transition-colors hover:bg-maroon hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {buyingNow && <Spinner size={16} />}
                {buyingNow ? 'PROCESSING...' : 'BUY NOW'}
              </button>

            </div>

            {offers.length > 0 && (
              <div className="mt-5 border border-[#BD8A3C]/40 bg-[#F8F0E5] p-5">
                <p className="mb-3 text-sm font-semibold text-text-dark">Offers for you</p>
                <ul className="space-y-3">
                  {offers.map((offer) => (
                    <li key={offer._id} className="flex items-start gap-2 text-sm text-text">
                      <span>
                        <span className="mr-1.5 rounded-sm bg-maroon/10 px-1.5 py-0.5 text-xs font-bold text-maroon">
                          {couponDiscountValue(offer)}
                        </span>
                        {offer.description?.trim() ? offer.description.trim() : `Get ${couponDiscountValue(offer)}`}
                        {offer.minPurchase > 0 && ` on orders above ${formatPrice(offer.minPurchase)}`}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* You may also like */}
        <div className="mt-14">
          <h2 className="mb-6 font-serif text-[22px] md:text-2xl font-bold text-text-dark">You may also like</h2>
          {related.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <p className="text-text">No related products found.</p>
          )}
        </div>
      </div>

      {/* Bottom trust bar */}
      <div className="mt-12 border-t border-[#BD8A3C]/30 bg-[#F8F0E5]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-6 md:grid-cols-4 md:px-8">
          {bottomBar.map((item) => (
            <div key={item.title} className="flex items-center gap-3">
              <item.icon size={26} strokeWidth={1.3} className="shrink-0 text-maroon" />
              <div>
                <p className="text-xs font-semibold text-text-dark">{item.title}</p>
                <p className="text-xs text-text">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
