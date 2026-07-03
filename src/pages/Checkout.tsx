import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Banknote,
  CheckCircle2,
  ChevronDown,
  CreditCard,
  Headphones,
  Lock,
  RotateCcw,
  ShieldCheck,
  Tag,
  Truck,
  X,
} from 'lucide-react'
import { Breadcrumb } from '../components/ui/Breadcrumb'
import { Spinner } from '../components/ui/Spinner'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { getProducts } from '../utils/api'
import { formatPrice, type Product } from '../data/products'
import {
  createOrder,
  getShippingConfig,
  getShippingRates,
  validateCoupon,
  verifyPayment,
  type AppliedCoupon,
  type ShippingAddress,
  type ShippingRate,
} from '../utils/checkoutApi'

type PaymentOption = 'online' | 'cod'

const emptyAddress: ShippingAddress = {
  fullName: '',
  phone: '',
  houseFlatNo: '',
  streetArea: '',
  landmark: '',
  city: '',
  state: '',
  postalCode: '',
  country: 'India',
}

interface SavedAddress extends ShippingAddress {
  id: string
  label: string
  isDefault: boolean
}

function blankForm(): SavedAddress {
  return { ...emptyAddress, id: '', label: '', isDefault: false }
}

function genId(): string {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `addr_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

function addressKey(email?: string): string {
  return `rangethnics_addresses_${email ?? 'guest'}`
}

function loadAddresses(email?: string): SavedAddress[] {
  try {
    const raw = localStorage.getItem(addressKey(email))
    const parsed = raw ? (JSON.parse(raw) as SavedAddress[]) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveAddresses(email: string | undefined, list: SavedAddress[]) {
  try {
    localStorage.setItem(addressKey(email), JSON.stringify(list))
  } catch {
    /* ignore quota / serialization errors */
  }
}

function validateAddressForm(a: SavedAddress): string {
  if (!a.label.trim()) return 'Please add a label (e.g. Home, Work).'
  if (!a.fullName.trim()) return 'Full name is required.'
  if (!/^\d{10}$/.test(a.phone.replace(/\D/g, '').slice(-10))) return 'Enter a valid 10-digit phone number.'
  if (!a.houseFlatNo.trim()) return 'House / Flat number is required.'
  if (!a.streetArea.trim()) return 'Street / Area is required.'
  if (!a.city.trim()) return 'City is required.'
  if (!a.state.trim()) return 'State is required.'
  if (!/^\d{6}$/.test(a.postalCode.trim())) return 'Enter a valid 6-digit pincode.'
  if (!a.country.trim()) return 'Country is required.'
  return ''
}

const paymentOptions: {
  value: PaymentOption
  title: string
  desc: string
  icon: typeof CreditCard
  badges?: string[]
}[] = [
  {
    value: 'online',
    title: 'Pay Online',
    desc: 'Secure payment via UPI, cards & netbanking (Razorpay)',
    icon: CreditCard,
    badges: ['UPI', 'Cards', 'NetBanking'],
  },
  {
    value: 'cod',
    title: 'Cash on Delivery (COD)',
    desc: 'Pay when you receive your order',
    icon: Banknote,
  },
]

const trustBadges = [
  { icon: ShieldCheck, title: '100% SECURE', subtitle: 'PAYMENT' },
  { icon: RotateCcw, title: 'EASY RETURNS', subtitle: '7-DAY POLICY' },
  { icon: Headphones, title: 'LIVE CUSTOMER', subtitle: 'SUPPORT' },
]

function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).Razorpay) return resolve(true)
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

function StepBadge({ n }: { n: number }) {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-maroon text-sm font-semibold text-white">
      {n}
    </span>
  )
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  required = true,
  type = 'text',
  className = '',
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  required?: boolean
  type?: string
  className?: string
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm text-text-dark">
        {label}
        {required && <span className="text-maroon"> *</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-11 w-full border border-[#BD8A3C]/50 bg-white px-3 text-sm text-text-dark outline-none transition-colors focus:border-maroon"
      />
    </label>
  )
}

export function Checkout() {
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()
  const token = user?.token
  const { items, count, clearCart } = useCart()

  const [products, setProducts] = useState<Product[]>([])
  const [addresses, setAddresses] = useState<SavedAddress[]>(() => loadAddresses(user?.email))
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null) // 'new' | address id | null
  const [form, setForm] = useState<SavedAddress>(blankForm())
  const [formError, setFormError] = useState('')
  const [paymentOption, setPaymentOption] = useState<PaymentOption>('online')
  const [summaryOpen, setSummaryOpen] = useState(true)

  // Shiprocket shipping
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(0)
  const [shipping, setShipping] = useState<ShippingRate | null>(null)
  const [shippingLoading, setShippingLoading] = useState(false)
  const [shippingError, setShippingError] = useState('')

  const [couponInput, setCouponInput] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null)
  const [couponError, setCouponError] = useState('')
  const [applyingCoupon, setApplyingCoupon] = useState(false)

  const [placing, setPlacing] = useState(false)
  const [orderError, setOrderError] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [placedOrder, setPlacedOrder] = useState<any | null>(null)

  const backendPaymentMethod: 'COD' | 'Online' = paymentOption === 'cod' ? 'COD' : 'Online'

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId) ?? null
  const address: ShippingAddress = selectedAddress ?? emptyAddress

  useEffect(() => {
    if (!isAuthenticated) navigate('/login')
  }, [isAuthenticated, navigate])

  // Persist the address book per user.
  useEffect(() => {
    saveAddresses(user?.email, addresses)
  }, [addresses, user?.email])

  // Default the selection to the default (or first) saved address.
  useEffect(() => {
    if (!selectedAddressId && addresses.length > 0) {
      const preferred = addresses.find((a) => a.isDefault) ?? addresses[0]
      setSelectedAddressId(preferred.id)
    }
  }, [addresses, selectedAddressId])

  const openAddAddress = () => {
    setForm(blankForm())
    setFormError('')
    setEditingId('new')
  }

  const openEditAddress = (addr: SavedAddress) => {
    setForm(addr)
    setFormError('')
    setEditingId(addr.id)
  }

  const handleSaveAddress = () => {
    const err = validateAddressForm(form)
    if (err) {
      setFormError(err)
      return
    }
    const id = editingId && editingId !== 'new' ? editingId : genId()

    setAddresses((prev) => {
      const exists = prev.some((a) => a.id === id)
      let next = exists
        ? prev.map((a) => (a.id === id ? { ...form, id } : a))
        : [...prev, { ...form, id }]

      if (form.isDefault) {
        next = next.map((a) => ({ ...a, isDefault: a.id === id }))
      } else if (!next.some((a) => a.isDefault) && next.length > 0) {
        next = next.map((a, i) => ({ ...a, isDefault: i === 0 }))
      }
      return next
    })

    setSelectedAddressId(id)
    setEditingId(null)
    setFormError('')
  }

  useEffect(() => {
    getProducts({ pageSize: 100 }).then(({ products: live }) => {
      if (live.length > 0) setProducts(live)
    })
    getShippingConfig().then((cfg) => setFreeShippingThreshold(cfg.freeShippingThreshold))
  }, [])

  const pincodeValid = /^\d{6}$/.test(address.postalCode.trim())

  // Fetch live Shiprocket rates whenever the pincode, payment mode, or cart changes.
  useEffect(() => {
    if (!token || !pincodeValid || count === 0) {
      setShipping(null)
      setShippingError('')
      return
    }

    let cancelled = false
    setShippingLoading(true)
    setShippingError('')

    const timer = setTimeout(() => {
      getShippingRates(token, address.postalCode.trim(), backendPaymentMethod)
        .then((rate) => {
          if (!cancelled) setShipping(rate)
        })
        .catch((error) => {
          if (!cancelled) {
            setShipping(null)
            setShippingError(
              error instanceof Error ? error.message : 'Unable to fetch delivery options',
            )
          }
        })
        .finally(() => {
          if (!cancelled) setShippingLoading(false)
        })
    }, 500)

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, address.postalCode, backendPaymentMethod, count, pincodeValid])

  const cartLines = useMemo(
    () =>
      items
        .map((item) => {
          const product = products.find((p) => p.id === item.id)
          return product ? { product, qty: item.qty } : null
        })
        .filter((line): line is { product: Product; qty: number } => line !== null),
    [items, products],
  )

  const subtotal = cartLines.reduce((sum, { product, qty }) => sum + product.price * qty, 0)
  const originalTotal = cartLines.reduce(
    (sum, { product, qty }) => sum + product.originalPrice * qty,
    0,
  )
  const productSavings = originalTotal - subtotal
  const couponDiscount = appliedCoupon?.discount ?? 0
  const shippingCost = shipping?.isShippingFree ? 0 : shipping?.shippingPrice ?? 0
  const total = Math.max(0, subtotal - couponDiscount + shippingCost)
  const totalSavings = productSavings + couponDiscount

  const handleApplyCoupon = async () => {
    if (!token || applyingCoupon) return
    const code = couponInput.trim()
    if (!code) {
      setCouponError('Enter a coupon code')
      return
    }
    setApplyingCoupon(true)
    setCouponError('')
    try {
      const applied = await validateCoupon(token, code, subtotal)
      setAppliedCoupon(applied)
      setCouponInput(applied.code)
    } catch (error) {
      setAppliedCoupon(null)
      setCouponError(error instanceof Error ? error.message : 'Invalid coupon')
    } finally {
      setApplyingCoupon(false)
    }
  }

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null)
    setCouponInput('')
    setCouponError('')
  }

  const requiredFilled =
    address.fullName &&
    address.phone &&
    address.houseFlatNo &&
    address.streetArea &&
    address.city &&
    address.state &&
    address.postalCode &&
    address.country

  const handlePlaceOrder = async () => {
    if (!token || placing) return
    setOrderError('')

    if (!requiredFilled) {
      setOrderError('Please fill in all required delivery address fields.')
      return
    }

    setPlacing(true)
    try {
      const res = await createOrder(token, {
        paymentMethod: backendPaymentMethod,
        couponCode: appliedCoupon?.code,
        shippingAddress: address,
      })

      if (backendPaymentMethod === 'COD') {
        await clearCart()
        setPlacedOrder(res.order)
        return
      }

      const loaded = await loadRazorpay()
      if (!loaded || !res.razorpayOrder || !res.razorpayKey) {
        setOrderError('Unable to start online payment. Please try Cash on Delivery.')
        return
      }

      const options = {
        key: res.razorpayKey,
        amount: res.razorpayOrder.amount,
        currency: res.razorpayOrder.currency,
        name: 'Rangethnics',
        description: 'Order Payment',
        order_id: res.razorpayOrder.id,
        prefill: {
          name: address.fullName,
          contact: address.phone,
          email: user?.email ?? '',
        },
        theme: { color: '#420001' },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        handler: async (response: any) => {
          try {
            await verifyPayment(token, res.order._id, {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            })
            await clearCart()
            setPlacedOrder(res.order)
          } catch (verifyErr) {
            setOrderError(
              verifyErr instanceof Error ? verifyErr.message : 'Payment verification failed.',
            )
          }
        },
        modal: { ondismiss: () => setPlacing(false) },
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rzp = new (window as any).Razorpay(options)
      rzp.open()
      return
    } catch (error) {
      setOrderError(error instanceof Error ? error.message : 'Failed to place order.')
    } finally {
      if (backendPaymentMethod === 'COD') setPlacing(false)
    }
  }

  if (placedOrder) {
    return (
      <div className="bg-[#F8F0E5]">
        <Breadcrumb items={[{ label: 'Cart', to: '/cart' }, { label: 'Checkout' }]} />
        <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-20 text-center md:px-8">
          <CheckCircle2 size={64} strokeWidth={1.4} className="text-maroon" />
          <h1 className="mt-6 font-serif text-2xl font-bold text-maroon">Order Placed!</h1>
          <p className="mt-2 text-text">
            Thank you for shopping with us. Your order has been placed successfully
            {backendPaymentMethod === 'COD' ? ' with Cash on Delivery' : ' and payment confirmed'}.
          </p>
          {placedOrder?._id && (
            <p className="mt-1 text-sm text-text">
              Order ID: <span className="font-medium text-text-dark">{placedOrder._id}</span>
            </p>
          )}
          <div className="mt-8 flex gap-3">
            <Link
              to="/products"
              className="border border-maroon bg-maroon px-6 py-3 font-serif text-sm tracking-wide text-white transition-colors hover:bg-transparent hover:text-maroon"
            >
              Continue Shopping
            </Link>
            <Link
              to="/"
              className="border border-maroon px-6 py-3 font-serif text-sm tracking-wide text-maroon transition-colors hover:bg-maroon hover:text-white"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (isAuthenticated && count === 0) {
    return (
      <div className="bg-[#F8F0E5]">
        <Breadcrumb items={[{ label: 'Cart', to: '/cart' }, { label: 'Checkout' }]} />
        <div className="mx-auto max-w-xl px-4 py-24 text-center md:px-8">
          <p className="font-serif text-xl text-maroon">Your cart is empty</p>
          <p className="mt-2 text-text">Add some items before proceeding to checkout.</p>
          <Link
            to="/products"
            className="mt-6 inline-block border border-maroon bg-maroon px-8 py-3 font-serif text-sm tracking-wide text-white transition-colors hover:bg-transparent hover:text-maroon"
          >
            Explore Collection
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#F8F0E5] pb-16">
      <Breadcrumb items={[{ label: 'Cart', to: '/cart' }, { label: 'Checkout' }]} />

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-8">
          {/* Left column */}
          <div className="min-w-0 flex-1 space-y-6">
            {/* 1. Delivery Information */}
            <section className="border border-[#BD8A3C]/40 bg-[#FFFDF9] p-5 md:p-6">
              <div className="mb-5 flex items-center gap-3">
                <StepBadge n={1} />
                <h2 className="font-serif text-lg text-text-dark">Delivery Information</h2>
              </div>

              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-semibold text-text-dark">Delivery Address</span>
                {editingId === null && (
                  <button
                    type="button"
                    onClick={openAddAddress}
                    className="text-sm font-medium text-maroon underline hover:no-underline"
                  >
                    + Add New Address
                  </button>
                )}
              </div>

              {editingId !== null || addresses.length === 0 ? (
                <div className="border border-[#BD8A3C]/40 bg-white p-4 md:p-5">
                  <p className="mb-4 font-serif text-base text-text-dark">
                    {editingId && editingId !== 'new' ? 'Edit Address' : 'Add New Address'}
                  </p>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field label="Address Label" value={form.label} onChange={(v) => setForm((f) => ({ ...f, label: v }))} placeholder="e.g. Home, Work" className="sm:col-span-2" />
                    <Field label="Full Name" value={form.fullName} onChange={(v) => setForm((f) => ({ ...f, fullName: v }))} placeholder="Recipient name" />
                    <Field label="Phone Number" value={form.phone} onChange={(v) => setForm((f) => ({ ...f, phone: v }))} placeholder="10-digit mobile number" type="tel" />
                    <Field label="House / Flat No." value={form.houseFlatNo} onChange={(v) => setForm((f) => ({ ...f, houseFlatNo: v }))} placeholder="e.g. A-101" />
                    <Field label="Street / Area" value={form.streetArea} onChange={(v) => setForm((f) => ({ ...f, streetArea: v }))} placeholder="Street, locality" />
                    <Field label="Landmark" value={form.landmark ?? ''} onChange={(v) => setForm((f) => ({ ...f, landmark: v }))} placeholder="Nearby landmark (optional)" required={false} className="sm:col-span-2" />
                    <Field label="City" value={form.city} onChange={(v) => setForm((f) => ({ ...f, city: v }))} placeholder="City" />
                    <Field label="State" value={form.state} onChange={(v) => setForm((f) => ({ ...f, state: v }))} placeholder="State" />
                    <Field label="Pincode" value={form.postalCode} onChange={(v) => setForm((f) => ({ ...f, postalCode: v }))} placeholder="6-digit pincode" />
                    <Field label="Country" value={form.country} onChange={(v) => setForm((f) => ({ ...f, country: v }))} placeholder="Country" />
                  </div>

                  <label className="mt-4 flex cursor-pointer items-center gap-2 text-sm text-text-dark">
                    <input
                      type="checkbox"
                      checked={form.isDefault}
                      onChange={(e) => setForm((f) => ({ ...f, isDefault: e.target.checked }))}
                      className="accent-[#420001]"
                    />
                    Set as default address
                  </label>

                  {formError && <p className="mt-3 text-sm text-red-600">{formError}</p>}

                  <div className="mt-5 flex gap-3">
                    <button
                      type="button"
                      onClick={handleSaveAddress}
                      className="border border-maroon bg-maroon px-6 py-2.5 font-serif text-sm tracking-wide text-white transition-colors hover:bg-transparent hover:text-maroon"
                    >
                      Save Address
                    </button>
                    {addresses.length > 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingId(null)
                          setFormError('')
                        }}
                        className="border border-[#BD8A3C]/50 px-6 py-2.5 font-serif text-sm text-text-dark transition-colors hover:border-maroon hover:text-maroon"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {addresses.map((addr) => {
                    const selected = selectedAddressId === addr.id
                    return (
                      <div
                        key={addr.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => setSelectedAddressId(addr.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') setSelectedAddressId(addr.id)
                        }}
                        className={`relative cursor-pointer border p-4 transition-colors ${
                          selected ? 'border-maroon bg-maroon/5' : 'border-[#BD8A3C]/40 hover:border-maroon/60'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                              selected ? 'border-maroon' : 'border-[#BD8A3C]/50'
                            }`}
                          >
                            {selected && <span className="h-2 w-2 rounded-full bg-maroon" />}
                          </span>
                          <span className="text-sm font-semibold text-text-dark">{addr.label || 'Address'}</span>
                          {addr.isDefault && (
                            <span className="rounded-sm bg-maroon/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-maroon">
                              Default
                            </span>
                          )}
                        </div>

                        <div className="mt-2 space-y-0.5 pl-6 text-sm text-text">
                          <p className="text-text-dark">{addr.fullName}</p>
                          <p>{[addr.houseFlatNo, addr.streetArea].filter(Boolean).join(', ')}</p>
                          {(addr.landmark || addr.city) && (
                            <p>{[addr.landmark, addr.city].filter(Boolean).join(', ')}</p>
                          )}
                          <p>
                            {addr.state}
                            {addr.postalCode ? ` - ${addr.postalCode}` : ''}
                          </p>
                          <p>{addr.phone}</p>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            openEditAddress(addr)
                          }}
                          className="absolute bottom-3 right-4 text-xs font-semibold uppercase tracking-wide text-maroon hover:underline"
                        >
                          Edit
                        </button>
                      </div>
                    )
                  })}
                </div>
              )}
            </section>

            {/* 2. Shipping Method (Shiprocket) */}
            <section className="border border-[#BD8A3C]/40 bg-[#FFFDF9] p-5 md:p-6">
              <div className="mb-5 flex items-center gap-3">
                <StepBadge n={2} />
                <h2 className="font-serif text-lg text-text-dark">Shipping Method</h2>
              </div>

              {!pincodeValid ? (
                <div className="border border-dashed border-[#BD8A3C]/50 bg-white px-4 py-5 text-center text-sm text-text">
                  Enter a valid 6-digit delivery pincode above to see delivery options.
                  {freeShippingThreshold > 0 && (
                    <span className="mt-1 block text-xs text-[#BD8A3C]">
                      Free shipping on orders over {formatPrice(freeShippingThreshold)}.
                    </span>
                  )}
                </div>
              ) : shippingLoading ? (
                <div className="flex items-center gap-3 border border-[#BD8A3C]/40 bg-white px-4 py-4 text-sm text-text">
                  <Spinner size={18} className="text-maroon" />
                  Checking delivery options for {address.postalCode}...
                </div>
              ) : shippingError ? (
                <div className="border border-red-300 bg-red-50 px-4 py-4 text-sm text-red-600">
                  {shippingError}
                </div>
              ) : shipping ? (
                <div className="flex items-center gap-3 border border-maroon bg-maroon/5 px-4 py-4">
                  <Truck size={22} className="shrink-0 text-maroon" />
                  <div className="flex-1">
                    {shipping.isShippingFree ? (
                      <>
                        <p className="text-sm font-semibold text-text-dark">Free Delivery</p>
                        <p className="text-xs text-text">
                          {shipping.freeShippingThreshold > 0
                            ? `Complimentary shipping on orders over ${formatPrice(shipping.freeShippingThreshold)}`
                            : 'Shipped via Shiprocket'}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-sm font-semibold text-text-dark">
                          {shipping.courier?.name || 'Shiprocket Delivery'}
                        </p>
                        <p className="text-xs text-text">
                          {shipping.courier?.etd
                            ? `Estimated delivery by ${shipping.courier.etd}`
                            : 'Delivered by our courier partner'}
                        </p>
                      </>
                    )}
                  </div>
                  <span className={`text-sm font-semibold ${shipping.isShippingFree ? 'text-green-700' : 'text-text-dark'}`}>
                    {shipping.isShippingFree ? 'FREE' : formatPrice(shipping.shippingPrice)}
                  </span>
                </div>
              ) : null}
            </section>

            {/* 3. Payment Method */}
            <section className="border border-[#BD8A3C]/40 bg-[#FFFDF9] p-5 md:p-6">
              <div className="mb-5 flex items-center gap-3">
                <StepBadge n={3} />
                <h2 className="font-serif text-lg text-text-dark">Payment Method</h2>
              </div>
              <div className="space-y-3">
                {paymentOptions.map((option) => {
                  const selected = paymentOption === option.value
                  const Icon = option.icon
                  return (
                    <label
                      key={option.value}
                      className={`flex cursor-pointer items-center gap-3 border p-4 transition-colors ${
                        selected ? 'border-maroon bg-maroon/5' : 'border-[#BD8A3C]/40 hover:border-maroon/60'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={selected}
                        onChange={() => setPaymentOption(option.value)}
                        className="accent-[#420001]"
                      />
                      <Icon size={20} className="shrink-0 text-maroon" />
                      <span className="flex-1">
                        <span className="block text-sm font-semibold text-text-dark">{option.title}</span>
                        <span className="block text-xs text-text">{option.desc}</span>
                      </span>
                      {option.badges && (
                        <span className="hidden items-center gap-1.5 sm:flex">
                          {option.badges.map((b) => (
                            <span key={b} className="rounded border border-[#BD8A3C]/40 bg-white px-1.5 py-0.5 text-[10px] font-medium text-text">
                              {b}
                            </span>
                          ))}
                        </span>
                      )}
                    </label>
                  )
                })}
              </div>

              {orderError && <p className="mt-4 text-sm text-red-600">{orderError}</p>}

              <div className="mt-5 flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
                <Link
                  to="/cart"
                  className="inline-flex items-center gap-2 font-serif text-sm text-maroon transition-colors hover:underline"
                >
                  ← Return to Cart
                </Link>
                <div className="w-full sm:w-auto sm:text-right">
                  <button
                    type="button"
                    onClick={handlePlaceOrder}
                    disabled={placing || count === 0}
                    className="flex w-full items-center justify-center gap-2 border border-maroon bg-maroon px-10 py-3.5 font-serif text-base tracking-wide text-white transition-colors hover:bg-transparent hover:text-maroon disabled:cursor-not-allowed disabled:opacity-60 sm:ml-auto sm:w-auto"
                  >
                    {placing ? <Spinner size={18} /> : <Lock size={16} />}
                    {placing ? 'Placing Order...' : 'Place Order'}
                  </button>
                </div>
              </div>
            </section>
          </div>

          {/* Right column: Order Summary */}
          <aside className="w-full shrink-0 lg:w-[380px]">
            <div className="border border-[#BD8A3C]/40 bg-[#FFFDF9]">
              <button
                type="button"
                onClick={() => setSummaryOpen((v) => !v)}
                className="flex w-full items-center justify-between border-b border-[#BD8A3C]/30 px-6 py-4"
              >
                <h2 className="font-serif text-xl text-text-dark">Order Summary</h2>
                <span className="flex items-center gap-2 text-sm text-text">
                  {count} items
                  <ChevronDown size={16} className={`transition-transform ${summaryOpen ? '' : '-rotate-90'}`} />
                </span>
              </button>

              {summaryOpen && (
                <ul className="divide-y divide-[#BD8A3C]/20 px-6">
                  {cartLines.map(({ product, qty }) => (
                    <li key={product.id} className="flex items-center gap-3 py-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-16 w-14 shrink-0 border border-[#BD8A3C]/40 object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-text-dark">
                          {product.subtitle ?? product.name}
                        </p>
                        <p className="text-xs text-text">{product.category}</p>
                        <p className="text-xs text-text">Qty: {qty}</p>
                      </div>
                      <span className="font-sans text-sm font-semibold text-text-dark">
                        {formatPrice(product.price * qty)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Totals */}
              <div className="space-y-3 border-t border-[#BD8A3C]/30 px-6 py-5">
                <div className="flex items-center justify-between text-[15px] text-text-dark">
                  <span>Subtotal</span>
                  <span className="font-sans">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-[15px] text-text-dark">
                  <span>Shipping</span>
                  {!pincodeValid ? (
                    <span className="text-text">Enter pincode</span>
                  ) : shippingLoading ? (
                    <Spinner size={14} className="text-maroon" />
                  ) : shipping && !shipping.isShippingFree ? (
                    <span className="font-sans">{formatPrice(shipping.shippingPrice)}</span>
                  ) : (
                    <span className="font-semibold text-green-700">FREE</span>
                  )}
                </div>
                {couponDiscount > 0 && (
                  <div className="flex items-center justify-between text-[15px] text-[#BD8A3C]">
                    <span>Discount ({appliedCoupon?.code})</span>
                    <span className="font-sans">-{formatPrice(couponDiscount)}</span>
                  </div>
                )}

                <div className="h-px w-full bg-[#BD8A3C]/30" />

                <div className="flex items-baseline justify-between">
                  <span className="font-serif text-lg text-text-dark">
                    Total <span className="text-xs font-normal text-text">(incl. of all taxes)</span>
                  </span>
                  <span className="font-sans text-xl font-bold text-maroon">{formatPrice(total)}</span>
                </div>

                {totalSavings > 0 && (
                  <div className="rounded-sm bg-green-50 px-3 py-2.5 text-center text-sm font-medium text-green-700">
                    You saved {formatPrice(totalSavings)} on this order
                  </div>
                )}
              </div>

              {/* Secure checkout + trust */}
              <div className="border-t border-[#BD8A3C]/30 px-6 py-5">
                <div className="flex items-start gap-2">
                  <Lock size={18} className="mt-0.5 shrink-0 text-maroon" />
                  <div>
                    <p className="text-sm font-semibold text-text-dark">Secure Checkout</p>
                    <p className="text-xs text-text">Your payment information is safe with us.</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 border-t border-[#BD8A3C]/20 pt-4">
                  {trustBadges.map((b) => (
                    <div key={b.title} className="flex flex-col items-center gap-1 text-center">
                      <b.icon size={20} strokeWidth={1.4} className="text-maroon" />
                      <span className="text-[9px] font-semibold leading-tight text-text">
                        {b.title}
                        <br />
                        {b.subtitle}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Promo code */}
              <div className="border-t border-[#BD8A3C]/30 px-6 py-5">
                <div className="mb-2 flex items-center gap-2">
                  <Tag size={16} className="text-maroon" />
                  <span className="text-sm font-semibold text-text-dark">Have a promo code?</span>
                </div>

                {appliedCoupon ? (
                  <div className="flex items-center justify-between border border-dashed border-maroon/50 bg-maroon/5 px-3 py-2.5">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-maroon">{appliedCoupon.code}</p>
                      <p className="truncate text-xs text-text">{appliedCoupon.description}</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveCoupon}
                      className="ml-2 flex shrink-0 items-center gap-1 text-xs text-maroon hover:underline"
                    >
                      <X size={14} /> Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      placeholder="Enter code"
                      className="h-11 min-w-0 flex-1 border border-[#BD8A3C]/50 bg-white px-3 text-sm uppercase tracking-wide text-text-dark outline-none focus:border-maroon"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      disabled={applyingCoupon}
                      className="flex shrink-0 items-center justify-center gap-2 border border-maroon px-5 font-serif text-sm text-maroon transition-colors hover:bg-maroon hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {applyingCoupon && <Spinner size={15} />}
                      APPLY
                    </button>
                  </div>
                )}

                {couponError && <p className="mt-2 text-xs text-red-600">{couponError}</p>}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
