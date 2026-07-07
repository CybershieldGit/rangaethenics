import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Search, ShoppingBag, Heart, Menu, X, CircleUserRound, LogOut, Package, MapPin } from 'lucide-react'
import { Button } from '../ui/Button'
import { useAuth } from '../../context/AuthContext'
import { useWishlist } from '../../context/WishlistContext'
import { useCart } from '../../context/CartContext'

const navLinks = [
  { label: 'Clothing', to: '/clothing' },
  { label: 'Jewellery', to: '/jewellery' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact Us', to: '/#contact' },
]

const navLinkBase =
  'font-inter text-[16px] leading-[24px] font-normal tracking-[0.015em] align-middle transition-colors'

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuth()
  const { count: wishlistCount } = useWishlist()
  const { count: cartCount } = useCart()

  useEffect(() => {
    if (!profileOpen) return
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [profileOpen])

  const isLinkActive = (to: string) => {
    if (to.includes('#')) {
      const [path, hash] = to.split('#')
      return location.pathname === path && location.hash === `#${hash}`
    }
    return location.pathname === to
  }

  return (
    <header className="sticky top-0 z-50 bg-[#F8F0E5]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/ranga_logo_header.svg"
            alt="Rangethnics"
            className="h-10 w-auto md:h-12"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const active = isLinkActive(link.to)
            return (
              <Link
                key={link.label}
                to={link.to}
                className={`${navLinkBase} ${
                  active
                    ? 'text-maroon underline decoration-maroon decoration-1 underline-offset-[6px]'
                    : 'text-[#717171] hover:text-maroon'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3 md:gap-4">
          <button type="button" aria-label="Search" className="text-[#1a1a1a] hover:text-maroon">
            <Search size={20} strokeWidth={1.5} />
          </button>
          <Link
            to="/cart"
            aria-label="Cart"
            className="relative hidden text-[#1a1a1a] hover:text-maroon sm:block"
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-maroon px-1 font-inter text-[10px] font-semibold leading-none text-white">
                {cartCount}
              </span>
            )}
          </Link>
          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="relative hidden text-[#1a1a1a] hover:text-maroon sm:block"
          >
            <Heart size={20} strokeWidth={1.5} />
            {wishlistCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-maroon px-1 font-inter text-[10px] font-semibold leading-none text-white">
                {wishlistCount}
              </span>
            )}
          </Link>
          {isAuthenticated ? (
            <div ref={profileRef} className="relative hidden md:block">
              <button
                type="button"
                aria-label="Account"
                onClick={() => setProfileOpen((prev) => !prev)}
                className="flex items-center text-[#1a1a1a] hover:text-maroon"
              >
                <CircleUserRound size={24} strokeWidth={1.5} />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 border border-[#BD8A3C]/40 bg-white py-1 shadow-lg">
                  <div className="border-b border-[#BD8A3C]/20 px-4 py-3">
                    <p className="font-inter text-sm font-semibold text-maroon">
                      {user?.name}
                    </p>
                    <p className="truncate font-inter text-xs text-[#717171]">{user?.email}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      navigate('/profile', { state: { view: 'profile' } })
                      setProfileOpen(false)
                    }}
                    className="flex w-full items-center gap-2 px-4 py-2.5 font-inter text-sm text-[#1a1a1a] hover:bg-maroon hover:text-white cursor-pointer"
                  >
                    <CircleUserRound size={16} strokeWidth={1.5} />
                    Profile Details
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      navigate('/profile', { state: { view: 'orders' } })
                      setProfileOpen(false)
                    }}
                    className="flex w-full items-center gap-2 px-4 py-2.5 font-inter text-sm text-[#1a1a1a] hover:bg-maroon hover:text-white border-t border-[#BD8A3C]/10 cursor-pointer"
                  >
                    <Package size={16} strokeWidth={1.5} />
                    My Order
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      navigate('/profile', { state: { view: 'addresses' } })
                      setProfileOpen(false)
                    }}
                    className="flex w-full items-center gap-2 px-4 py-2.5 font-inter text-sm text-[#1a1a1a] hover:bg-maroon hover:text-white border-t border-[#BD8A3C]/10 cursor-pointer"
                  >
                    <MapPin size={16} strokeWidth={1.5} />
                    Manage Addresses
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      navigate('/profile', { state: { view: 'wishlist' } })
                      setProfileOpen(false)
                    }}
                    className="flex w-full items-center gap-2 px-4 py-2.5 font-inter text-sm text-[#1a1a1a] hover:bg-maroon hover:text-white border-t border-[#BD8A3C]/10 cursor-pointer"
                  >
                    <Heart size={16} strokeWidth={1.5} />
                    Wishlist
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      navigate('/profile', { state: { view: 'logout' } })
                      setProfileOpen(false)
                    }}
                    className="flex w-full items-center gap-2 px-4 py-2.5 font-inter text-sm text-[#1a1a1a] hover:bg-maroon hover:text-white border-t border-[#BD8A3C]/20 cursor-pointer"
                  >
                    <LogOut size={16} strokeWidth={1.5} />
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden font-inter text-[16px] leading-[24px] font-normal tracking-[0.015em] text-maroon hover:underline md:block"
              >
                Log In
              </Link>
              <span className="hidden h-5 w-px bg-[#1a1a1a]/40 md:block" />
              <Link to="/signup" className="hidden md:inline-flex">
                <Button className="rounded-md !px-5 !py-2">Sign Up</Button>
              </Link>
            </>
          )}

          <button
            type="button"
            aria-label="Toggle menu"
            className="text-maroon lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="border-t border-maroon/10 bg-[#F8F0E5] px-4 py-4 lg:hidden">
          {navLinks.map((link) => {
            const active = isLinkActive(link.to)
            return (
              <Link
                key={link.label}
                to={link.to}
                className={`block py-2 ${navLinkBase} ${
                  active ? 'text-maroon' : 'text-[#717171] hover:text-maroon'
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            )
          })}
          <Link
            to="/cart"
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-2 py-2 ${navLinkBase} ${
              location.pathname === '/cart' ? 'text-maroon' : 'text-[#717171] hover:text-maroon'
            }`}
          >
            <ShoppingBag size={18} strokeWidth={1.5} />
            Cart
            {cartCount > 0 && (
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-maroon px-1 font-inter text-[10px] font-semibold leading-none text-white">
                {cartCount}
              </span>
            )}
          </Link>
          <Link
            to="/wishlist"
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-2 py-2 ${navLinkBase} ${
              location.pathname === '/wishlist' ? 'text-maroon' : 'text-[#717171] hover:text-maroon'
            }`}
          >
            <Heart size={18} strokeWidth={1.5} />
            Wishlist
            {wishlistCount > 0 && (
              <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-maroon px-1 font-inter text-[10px] font-semibold leading-none text-white">
                {wishlistCount}
              </span>
            )}
          </Link>
          <div className="mt-3 flex gap-3">
            {isAuthenticated ? (
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  navigate('/profile', { state: { view: 'logout' } })
                  setMobileOpen(false)
                }}
              >
                Log Out
              </Button>
            ) : (
              <>
                <Link to="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Log In
                  </Button>
                </Link>
                <Link to="/signup" className="flex-1" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  )
}
