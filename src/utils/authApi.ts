const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5005'

export interface Address {
  fullName: string
  phone: string
  houseFlatNo: string
  streetArea: string
  landmark: string
  addressLine: string
  city: string
  state: string
  postalCode: string
  country: string
}

export interface AuthUser {
  _id: string
  name: string
  email: string
  isAdmin: boolean
  token: string
  phone?: string
  dateOfBirth?: string
  gender?: string
  address?: Address
}

interface ApiError {
  message: string
  cooldown?: number
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  })

  const data = await res.json()

  if (!res.ok) {
    const error = new Error(data.message || 'Something went wrong') as Error & ApiError
    error.cooldown = data.cooldown
    throw error
  }

  return data as T
}

export function registerUser(payload: { name: string; email: string; password: string }) {
  return request<{ message: string; email: string; resendTime: number }>('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function verifySignupOtp(payload: { email: string; otp: string }) {
  return request<AuthUser>('/api/auth/verify-signup-otp', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function resendOtp(payload: { email: string; purpose: 'signup' | 'reset' }) {
  return request<{ message: string; resendTime: number }>('/api/auth/resend-otp', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function loginUser(payload: { email: string; password: string }) {
  return request<AuthUser>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function forgotPassword(payload: { email: string }) {
  return request<{ message: string; email: string; resendTime: number }>('/api/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function verifyResetOtp(payload: { email: string; otp: string }) {
  return request<{ message: string; resetToken: string; email: string }>('/api/auth/verify-reset-otp', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function resetPassword(payload: { resetToken: string; password: string }) {
  return request<AuthUser & { message: string }>('/api/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function getUserProfileApi(token: string) {
  return request<AuthUser>('/api/users/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export function updateUserProfileApi(
  payload: { name?: string; email?: string; phone?: string; dateOfBirth?: string; gender?: string; address?: Partial<Address> },
  token: string
) {
  return request<AuthUser>('/api/users/profile', {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  })
}

export interface OrderItem {
  product: {
    _id: string
    name: string
    image: string
    price: number
    category: string
  } | null
  name: string
  quantity: number
  price: number
}

export interface Order {
  _id: string
  orderItems: OrderItem[]
  totalPrice: number
  isPaid: boolean
  paidAt?: string
  paymentMethod: string
  paymentStatus: string
  createdAt: string
  shippingAddress: Address
  shippingStatus?: string
}

export function getUserOrdersApi(token: string) {
  return request<Order[]>('/api/orders/myorders', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export function cancelOrderApi(orderId: string, token: string) {
  return request<{ message: string }>(`/api/orders/${orderId}/cancel`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export function getUserWishlistApi(token: string) {
  return request<any[]>('/api/users/wishlist', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export function addToWishlistApi(productId: string, token: string) {
  return request<any[]>('/api/users/wishlist', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productId }),
  })
}

export function removeFromWishlistApi(productId: string, token: string) {
  return request<any[]>(`/api/users/wishlist/${productId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const OTP_RESEND_TIME = 60
