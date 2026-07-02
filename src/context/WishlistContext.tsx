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
  apiAddToWishlist,
  apiClearWishlist,
  apiRemoveFromWishlist,
  fetchWishlist,
} from '../utils/shopApi'

interface WishlistContextValue {
  items: string[]
  count: number
  loading: boolean
  isInWishlist: (id: string) => boolean
  addToWishlist: (id: string) => Promise<void>
  removeFromWishlist: (id: string) => Promise<void>
  toggleWishlist: (id: string) => Promise<void>
  clearWishlist: () => Promise<void>
}

const WishlistContext = createContext<WishlistContextValue | null>(null)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const token = user?.token
  const [items, setItems] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  // The wishlist is always backed by the server. Load it whenever auth changes.
  useEffect(() => {
    if (!token) {
      setItems([])
      return
    }

    let cancelled = false
    setLoading(true)
    fetchWishlist(token)
      .then((serverItems) => {
        if (!cancelled) setItems(serverItems)
      })
      .catch((error) => console.error('Failed to load wishlist:', error))
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [token])

  const addToWishlist = useCallback(
    async (id: string) => {
      if (!token) return
      setItems(await apiAddToWishlist(token, id))
    },
    [token],
  )

  const removeFromWishlist = useCallback(
    async (id: string) => {
      if (!token) return
      setItems(await apiRemoveFromWishlist(token, id))
    },
    [token],
  )

  const toggleWishlist = useCallback(
    async (id: string) => {
      if (!token) return
      const alreadyIn = items.includes(id)
      setItems(
        alreadyIn ? await apiRemoveFromWishlist(token, id) : await apiAddToWishlist(token, id),
      )
    },
    [token, items],
  )

  const clearWishlist = useCallback(async () => {
    if (!token) return
    setItems(await apiClearWishlist(token))
  }, [token])

  const value = useMemo(
    () => ({
      items,
      count: items.length,
      loading,
      isInWishlist: (id: string) => items.includes(id),
      addToWishlist,
      removeFromWishlist,
      toggleWishlist,
      clearWishlist,
    }),
    [items, loading, addToWishlist, removeFromWishlist, toggleWishlist, clearWishlist],
  )

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider')
  }
  return context
}
