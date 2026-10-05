import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Search, ShoppingBag, Menu, X, CircleUserRound, Package } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import { getProducts } from '../../utils/api'
import { formatPrice, type Product } from '../../data/products'

const navLinks = [
  { label: 'Our World', to: '#categories' },
  { label: 'Collections', to: '#signature-edit' },
  { label: 'Celebration', to: '#occasions' },
  { label: 'About', to: '#our-story' },
]

const navLinkBase =
  'font-sans text-[14px] lg:text-[15px] font-normal tracking-[0.01em] text-[#3D332D] hover:text-[#2B1B17] transition-colors'

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { count: cartCount } = useCart()

  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [searchLoading, setSearchLoading] = useState(false)

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      setSearchLoading(false)
      return
    }

    setSearchLoading(true)
    const delayDebounceFn = setTimeout(async () => {
      try {
        const { products } = await getProducts({ keyword: searchQuery, pageSize: 10 })
        setSearchResults(products)
      } catch (err) {
      } finally {
        setSearchLoading(false)
      }
    }, 400)

    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileOpen && profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false)
      }
      if (searchOpen && searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false)
        setSearchQuery('')
        setSearchResults([])
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [profileOpen, searchOpen])

  const isLinkActive = (to: string) => {
    if (to.includes('#')) {
      const [path, hash] = to.split('#')
      return location.pathname === path && location.hash === `#${hash}`
    }
    return location.pathname === to
  }

  return (
    <header className="sticky top-0 z-50 bg-[#FAF7F1] border-b border-[#E8DFC8]/60 shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 sm:px-10 lg:px-16 py-3.5 md:py-4">
        {/* Left container holding hamburger and logo together */}
        <div className="flex items-center gap-2">
          {/* Leftmost Hamburger Menu Button on Mobile View */}
          <button
            type="button"
            aria-label="Toggle menu"
            className={`text-maroon lg:hidden mr-2 cursor-pointer shrink-0 transition-all duration-300 ${
              searchOpen ? 'hidden' : 'block'
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link
            to="/"
            className={`flex items-center shrink-0 transition-all duration-300 ${
              searchOpen ? 'hidden sm:flex' : 'flex'
            }`}
          >
            <img
              src="/ranga_logo_header.svg"
              alt="Rangethnics"
              className="h-8 md:h-10 w-auto"
            />
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className={`hidden items-center gap-7 lg:gap-9 lg:flex ${searchOpen ? 'lg:!hidden' : ''}`}>
          {navLinks.map((link) => {
            const active = isLinkActive(link.to)
            return (
              <a
                key={link.label}
                href={link.to}
                className={`${navLinkBase} ${
                  active
                    ? 'text-[#2B1B17] font-medium'
                    : 'text-[#4A3F38]'
                }`}
              >
                {link.label}
              </a>
            )
          })}
        </nav>

        {/* Actions */}
        <div className={`flex items-center gap-5 md:gap-6 ${searchOpen ? 'flex-1 justify-end' : ''}`}>
          <div
            ref={searchRef}
            className={`relative items-center ${mobileOpen ? 'hidden lg:flex' : 'flex'} ${
              searchOpen ? 'flex-1 max-w-[450px]' : ''
            }`}
          >
            {searchOpen ? (
              <div className="flex items-center gap-2 border-b border-[#BD8A3C]/40 pb-1 w-full transition-all duration-300">
                <Search size={16} className="text-[#1a1a1a] shrink-0" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-transparent font-serif text-sm text-text-dark placeholder-[#717171]/50 outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    setSearchOpen(false)
                    setSearchQuery('')
                    setSearchResults([])
                  }}
                  className="text-[#1a1a1a] hover:text-maroon cursor-pointer"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                aria-label="Search"
                onClick={() => setSearchOpen(true)}
                className="text-[#1a1a1a] hover:text-maroon cursor-pointer"
              >
                <Search size={20} strokeWidth={1.5} />
              </button>
            )}

            {searchOpen && searchQuery.trim() !== '' && (
              <div className="absolute right-0 top-full mt-2 w-full min-w-[280px] max-w-[450px] bg-[#FFFDF9] border border-[#BD8A3C]/30 shadow-2xl rounded-xl overflow-hidden z-50 divide-y divide-[#BD8A3C]/20 max-h-[300px] overflow-y-auto">
                {searchLoading && (
                  <div className="p-4 text-center text-[#BD8A3C] text-sm italic font-serif">
                    Searching...
                  </div>
                )}
                {!searchLoading && searchResults.length === 0 && (
                  <div className="p-4 text-center text-text text-sm font-serif">
                    No products found
                  </div>
                )}
                {!searchLoading && searchResults.length > 0 && searchResults.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    onClick={() => {
                      setSearchOpen(false)
                      setSearchQuery('')
                      setSearchResults([])
                    }}
                    className="flex items-center gap-3 p-3 transition-colors hover:bg-maroon/[0.02]"
                  >
                    <div className="h-10 w-8 shrink-0 overflow-hidden border border-[#BD8A3C]/40 bg-[#F8F0E5] rounded">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover object-top"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="block text-[9px] text-[#BD8A3C] font-serif uppercase tracking-wider">{product.category}</span>
                      <span className="block text-xs text-text-dark font-serif font-medium truncate">{product.subtitle ?? product.name}</span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="block text-xs font-serif font-semibold text-maroon">{formatPrice(product.price)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Profile / Account Icon */}
          <div ref={profileRef} className={`relative ${mobileOpen ? 'hidden lg:block' : 'block'}`}>
            <button
              type="button"
              aria-label="Account"
              onClick={() => setProfileOpen((prev) => !prev)}
              className="flex items-center text-[#2B1B17] hover:text-[#A67C52] transition-colors cursor-pointer"
            >
              <CircleUserRound size={21} strokeWidth={1.5} />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 border border-[#BD8A3C]/40 bg-white py-1 shadow-lg z-50">
                <div className="border-b border-[#BD8A3C]/20 px-4 py-3">
                  <p className="font-serif text-sm font-semibold text-maroon">
                    {user?.name || 'My Account'}
                  </p>
                  <p className="truncate font-sans text-xs text-[#717171]">{user?.email || 'Welcome to Rangethnics'}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    navigate('/profile', { state: { view: 'profile' } })
                    setProfileOpen(false)
                  }}
                  className="flex w-full items-center gap-2 px-4 py-2.5 font-sans text-sm text-[#1a1a1a] hover:bg-maroon hover:text-white cursor-pointer"
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
                  className="flex w-full items-center gap-2 px-4 py-2.5 font-sans text-sm text-[#1a1a1a] hover:bg-maroon hover:text-white border-t border-[#BD8A3C]/10 cursor-pointer"
                >
                  <Package size={16} strokeWidth={1.5} />
                  My Orders
                </button>
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <Link
            to="/cart"
            aria-label="Cart"
            className={`relative text-[#2B1B17] hover:text-[#A67C52] transition-colors ${mobileOpen ? 'hidden' : 'block'}`}
          >
            <ShoppingBag size={21} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-maroon px-1 font-sans text-[10px] font-semibold leading-none text-white">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="border-t border-maroon/10 bg-[#F8F0E5] px-4 py-4 lg:hidden">
          {navLinks.map((link) => {
            const active = isLinkActive(link.to)
            return (
              <a
                key={link.label}
                href={link.to}
                className={`block py-2 ${navLinkBase} ${
                  active ? 'text-maroon' : 'text-[#717171] hover:text-maroon'
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
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
            to="/profile"
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-2 py-2 ${navLinkBase} text-[#717171] hover:text-[#2B1B17]`}
          >
            <CircleUserRound size={18} strokeWidth={1.5} />
            Account
          </Link>
        </nav>
      )}
    </header>
  )
}
