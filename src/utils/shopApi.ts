const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5005'

/** A cart/wishlist line reduced to the id + quantity the frontend state needs. */
export interface CartLine {
  id: string
  qty: number
}

async function request<T>(path: string, token: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options?.headers,
    },
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new Error((data as { message?: string }).message || 'Request failed')
  }

  return data as T
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeCartItems(cart: any): CartLine[] {
  const items = Array.isArray(cart?.items) ? cart.items : []
  return items
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((item: any) => {
      const product = item?.product
      const id = product && typeof product === 'object' ? product._id : product
      return id ? { id: String(id), qty: Number(item?.quantity) || 1 } : null
    })
    .filter((line: CartLine | null): line is CartLine => line !== null)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeWishlist(list: any): string[] {
  const items = Array.isArray(list) ? list : []
  return items
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((entry: any) => (entry && typeof entry === 'object' ? entry._id : entry))
    .filter(Boolean)
    .map((id: unknown) => String(id))
}

/* ----------------------------- Cart ----------------------------- */

export async function fetchCart(token: string): Promise<CartLine[]> {
  const cart = await request<unknown>('/api/cart', token)
  return normalizeCartItems(cart)
}

export async function apiAddToCart(
  token: string,
  productId: string,
  quantity = 1,
): Promise<CartLine[]> {
  const cart = await request<unknown>('/api/cart', token, {
    method: 'POST',
    body: JSON.stringify({ productId, quantity }),
  })
  return normalizeCartItems(cart)
}

export async function apiUpdateCartItem(
  token: string,
  productId: string,
  quantity: number,
): Promise<CartLine[]> {
  const cart = await request<unknown>(`/api/cart/${productId}`, token, {
    method: 'PUT',
    body: JSON.stringify({ quantity }),
  })
  return normalizeCartItems(cart)
}

export async function apiRemoveFromCart(
  token: string,
  productId: string,
): Promise<CartLine[]> {
  const cart = await request<unknown>(`/api/cart/${productId}`, token, {
    method: 'DELETE',
  })
  return normalizeCartItems(cart)
}

export async function apiClearCart(token: string): Promise<CartLine[]> {
  const cart = await request<unknown>('/api/cart', token, { method: 'DELETE' })
  return normalizeCartItems(cart)
}

/* --------------------------- Wishlist --------------------------- */

export async function fetchWishlist(token: string): Promise<string[]> {
  const list = await request<unknown>('/api/users/wishlist', token)
  return normalizeWishlist(list)
}

export async function apiAddToWishlist(token: string, productId: string): Promise<string[]> {
  const list = await request<unknown>('/api/users/wishlist', token, {
    method: 'POST',
    body: JSON.stringify({ productId }),
  })
  return normalizeWishlist(list)
}

export async function apiRemoveFromWishlist(
  token: string,
  productId: string,
): Promise<string[]> {
  const list = await request<unknown>(`/api/users/wishlist/${productId}`, token, {
    method: 'DELETE',
  })
  return normalizeWishlist(list)
}

export async function apiClearWishlist(token: string): Promise<string[]> {
  const list = await request<unknown>('/api/users/wishlist', token, { method: 'DELETE' })
  return normalizeWishlist(list)
}
