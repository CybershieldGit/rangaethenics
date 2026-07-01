import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Search, ShoppingBag, Heart, Menu, X } from 'lucide-react'
import { Button } from '../ui/Button'

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

  return (
    <header className="sticky top-0 z-50 bg-[#F7E7DA]">
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
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) =>
                `${navLinkBase} ${
                  isActive
                    ? 'text-maroon underline decoration-maroon decoration-1 underline-offset-[6px]'
                    : 'text-[#717171] hover:text-maroon'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3 md:gap-4">
          <button type="button" aria-label="Search" className="text-[#1a1a1a] hover:text-maroon">
            <Search size={20} strokeWidth={1.5} />
          </button>
          <button type="button" aria-label="Cart" className="hidden text-[#1a1a1a] hover:text-maroon sm:block">
            <ShoppingBag size={20} strokeWidth={1.5} />
          </button>
          <button type="button" aria-label="Wishlist" className="hidden text-[#1a1a1a] hover:text-maroon sm:block">
            <Heart size={20} strokeWidth={1.5} />
          </button>
          <a href="#login" className="hidden font-inter text-[16px] leading-[24px] font-normal tracking-[0.015em] text-maroon hover:underline md:block">
            Log In
          </a>
          <span className="hidden h-5 w-px bg-[#1a1a1a]/40 md:block" />
          <Button className="hidden rounded-md !px-5 !py-2 md:inline-flex">Sign Up</Button>

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
        <nav className="border-t border-maroon/10 bg-[#F7E7DA] px-4 py-4 lg:hidden">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) =>
                `block py-2 ${navLinkBase} ${
                  isActive ? 'text-maroon' : 'text-[#717171] hover:text-maroon'
                }`
              }
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <div className="mt-3 flex gap-3">
            <Button variant="outline" className="flex-1">Log In</Button>
            <Button className="flex-1">Sign Up</Button>
          </div>
        </nav>
      )}
    </header>
  )
}
