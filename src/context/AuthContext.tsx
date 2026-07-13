import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { AuthUser } from '../utils/authApi'
import { logoutUserApi, refreshAccessTokenApi } from '../utils/authApi'

const STORAGE_KEY = 'rangethnics_auth'

interface AuthContextValue {
  user: AuthUser | null
  isAuthenticated: boolean
  login: (user: AuthUser) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function readStoredUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as AuthUser) : null
  } catch {
    return null
  }
}

let isRefreshing = false
let refreshSubscribers: { resolve: (token: string) => void; reject: (err: any) => void }[] = []

const subscribeTokenRefresh = (resolve: (token: string) => void, reject: (err: any) => void) => {
  refreshSubscribers.push({ resolve, reject })
}

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((sub) => sub.resolve(token))
  refreshSubscribers = []
}

const onRefreshFailed = (err: any) => {
  refreshSubscribers.forEach((sub) => sub.reject(err))
  refreshSubscribers = []
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => readStoredUser())

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [user])

  const login = useCallback((nextUser: AuthUser) => {
    setUser(nextUser)
  }, [])

  const logout = useCallback(async () => {
    try {
      await logoutUserApi()
    } catch (err) {
      console.warn('Logout API failed or cookie already cleared:', err)
    } finally {
      setUser(null)
      localStorage.removeItem(STORAGE_KEY)
      window.location.href = '/login'
    }
  }, [])

  // Set up global fetch interceptor to handle token refresh automatically
  useEffect(() => {
    const { fetch: originalFetch } = window

    window.fetch = async (...args) => {
      const [resource, config] = args
      const url = typeof resource === 'string' ? resource : (resource as any).url || ''
      const isRefreshRequest = url.includes('/api/auth/refresh')
      const isLogoutRequest = url.includes('/api/auth/logout')

      let res = await originalFetch(resource, config)

      // If unauthorized, try to refresh token
      if (res.status === 401 && !isRefreshRequest && !isLogoutRequest && readStoredUser()) {
        const stored = readStoredUser()
        if (!stored) return res

        if (!isRefreshing) {
          isRefreshing = true
          try {
            const refreshRes = await refreshAccessTokenApi()
            const newToken = refreshRes.token
            const updatedUser = { ...stored, token: newToken }
            setUser(updatedUser)
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser))
            isRefreshing = false
            onRefreshed(newToken)
          } catch (refreshErr) {
            isRefreshing = false
            onRefreshFailed(refreshErr)
            setUser(null)
            localStorage.removeItem(STORAGE_KEY)
            window.location.href = '/login'
            return res
          }
        }

        // Wait for token refresh to complete and retry request
        return new Promise((resolve, reject) => {
          subscribeTokenRefresh(
            (newToken) => {
              // Clone headers and replace Authorization token
              const headers = new Headers(config?.headers || {})
              headers.set('Authorization', `Bearer ${newToken}`)
              resolve(
                originalFetch(resource, {
                  ...config,
                  headers,
                })
              )
            },
            (err) => {
              reject(err)
            }
          )
        })
      }

      return res
    }

    return () => {
      window.fetch = originalFetch
    }
  }, [])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user?.token),
      login,
      logout,
    }),
    [user, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
