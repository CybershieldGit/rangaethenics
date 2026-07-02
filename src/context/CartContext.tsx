import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { useAuth } from './AuthContext'
import {
  apiAddToCart,
  apiClearCart,
  apiRemoveFromCart,
  apiUpdateCartItem,
  fetchCart,
} from '../utils/shopApi'

export interface CartItem {
  id: string
  qty: number
}

interface CartContextValue {
  items: CartItem[]
  count: number
  loading: boolean
  getQty: (id: string) => number
  addToCart: (id: string, qty?: number) => Promise<void>
  removeFromCart: (id: string) => Promise<void>
  updateQty: (id: string, qty: number) => Promise<void>
  clearCart: () => Promise<void>
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const token = user?.token
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(false)

  // The cart is always backed by the server. Load it whenever auth changes.
  useEffect(() => {
    if (!token) {
      setItems([])
      return
    }

    let cancelled = false
    setLoading(true)
    fetchCart(token)
      .then((serverItems) => {
        if (!cancelled) setItems(serverItems)
      })
      .catch((error) => console.error('Failed to load cart:', error))
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [token])

  const addToCart = useCallback(
    async (id: string, qty = 1) => {
      if (!token) return
      setItems(await apiAddToCart(token, id, qty))
    },
    [token],
  )

  const removeFromCart = useCallback(
    async (id: string) => {
      if (!token) return
      setItems(await apiRemoveFromCart(token, id))
    },
    [token],
  )

  const updateQty = useCallback(
    async (id: string, qty: number) => {
      if (!token) return
      setItems(qty <= 0 ? await apiRemoveFromCart(token, id) : await apiUpdateCartItem(token, id, qty))
    },
    [token],
  )

  const clearCart = useCallback(async () => {
    if (!token) return
    setItems(await apiClearCart(token))
  }, [token])

  const value = useMemo(
    () => ({
      items,
      count: items.reduce((total, item) => total + item.qty, 0),
      loading,
      getQty: (id: string) => items.find((item) => item.id === id)?.qty ?? 0,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
    }),
    [items, loading, addToCart, removeFromCart, updateQty, clearCart],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
