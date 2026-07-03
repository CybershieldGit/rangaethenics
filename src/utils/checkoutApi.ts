const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5005'

export interface Coupon {
  _id: string
  code: string
  description: string
  discountType: 'percentage' | 'fixed'
  discountValue: number
  minPurchase: number
  expiryDate?: string | null
}

export interface AppliedCoupon {
  code: string
  description: string
  discount: number
  itemsPrice: number
  totalAfterDiscount: number
}

export interface ShippingAddress {
  fullName: string
  phone: string
  houseFlatNo: string
  streetArea: string
  landmark?: string
  city: string
  state: string
  postalCode: string
  country: string
}

export interface CreateOrderPayload {
  paymentMethod: 'COD' | 'Online'
  couponCode?: string
  shippingAddress: ShippingAddress
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface CreateOrderResponse {
  message: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  order: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  razorpayOrder?: any
  razorpayKey?: string
}

async function request<T>(path: string, token?: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new Error((data as { message?: string }).message || 'Request failed')
  }

  return data as T
}

export interface ShippingRate {
  shippingPrice: number
  isShippingFree: boolean
  freeShippingThreshold: number
  shiprocketEnabled: boolean
  courier: { name: string; etd?: string; rate: number } | null
  message?: string
}

/** Fetch free-shipping threshold + whether Shiprocket is enabled (public). */
export async function getShippingConfig(): Promise<{
  freeShippingThreshold: number
  shiprocketEnabled: boolean
}> {
  try {
    const data = await request<{ freeShippingThreshold?: number; shiprocketEnabled?: boolean }>(
      '/api/shipping/config',
    )
    return {
      freeShippingThreshold: Number(data.freeShippingThreshold) || 0,
      shiprocketEnabled: Boolean(data.shiprocketEnabled),
    }
  } catch {
    return { freeShippingThreshold: 0, shiprocketEnabled: false }
  }
}

/** Get the live Shiprocket shipping rate for the user's cart + delivery pincode. */
export async function getShippingRates(
  token: string,
  postalCode: string,
  paymentMethod: 'COD' | 'Online',
): Promise<ShippingRate> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = await request<any>('/api/shipping/rates', token, {
    method: 'POST',
    body: JSON.stringify({ postalCode, paymentMethod }),
  })
  return {
    shippingPrice: Number(data.shippingPrice) || 0,
    isShippingFree: Boolean(data.isShippingFree),
    freeShippingThreshold: Number(data.freeShippingThreshold) || 0,
    shiprocketEnabled: Boolean(data.shiprocketEnabled),
    courier: data.courier
      ? { name: data.courier.name, etd: data.courier.etd, rate: Number(data.courier.rate) || 0 }
      : null,
    message: data.message,
  }
}

/** Fetch active, unexpired coupons (public). */
export async function getActiveCoupons(): Promise<Coupon[]> {
  try {
    return await request<Coupon[]>('/api/coupons')
  } catch (error) {
    console.error('Failed to fetch coupons:', error)
    return []
  }
}

/** Validate a coupon against the current cart subtotal for the logged-in user. */
export async function validateCoupon(
  token: string,
  code: string,
  itemsPrice: number,
): Promise<AppliedCoupon> {
  const data = await request<{
    code: string
    description: string
    discount: number
    itemsPrice: number
    totalAfterDiscount: number
  }>('/api/coupons/validate', token, {
    method: 'POST',
    body: JSON.stringify({ code, itemsPrice }),
  })

  return {
    code: data.code,
    description: data.description,
    discount: data.discount,
    itemsPrice: data.itemsPrice,
    totalAfterDiscount: data.totalAfterDiscount,
  }
}

/** Create an order (Cash on Delivery or Online via Razorpay). */
export async function createOrder(
  token: string,
  payload: CreateOrderPayload,
): Promise<CreateOrderResponse> {
  return request<CreateOrderResponse>('/api/orders', token, {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

/** Verify a Razorpay payment for an order. */
export async function verifyPayment(
  token: string,
  orderId: string,
  payment: {
    razorpay_payment_id: string
    razorpay_order_id: string
    razorpay_signature: string
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> {
  return request(`/api/orders/${orderId}/pay`, token, {
    method: 'POST',
    body: JSON.stringify(payment),
  })
}

export interface SavedAddress extends ShippingAddress {
  id: string
  label: string
  isDefault: boolean
}

export type AddressInput = Omit<SavedAddress, 'id'>

/** Fetch the logged-in user's saved delivery addresses. */
export async function getAddresses(token: string): Promise<SavedAddress[]> {
  return request<SavedAddress[]>('/api/users/addresses', token)
}

/** Add a new saved address. Returns the full updated list. */
export async function addAddress(token: string, address: AddressInput): Promise<SavedAddress[]> {
  return request<SavedAddress[]>('/api/users/addresses', token, {
    method: 'POST',
    body: JSON.stringify(address),
  })
}

/** Update an existing saved address. Returns the full updated list. */
export async function updateAddress(
  token: string,
  id: string,
  address: AddressInput,
): Promise<SavedAddress[]> {
  return request<SavedAddress[]>(`/api/users/addresses/${id}`, token, {
    method: 'PUT',
    body: JSON.stringify(address),
  })
}

/** Delete a saved address. Returns the full updated list. */
export async function deleteAddress(token: string, id: string): Promise<SavedAddress[]> {
  return request<SavedAddress[]>(`/api/users/addresses/${id}`, token, {
    method: 'DELETE',
  })
}
