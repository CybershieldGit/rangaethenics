import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Our World', to: '#categories' },
  { label: 'Handblock & Apparel', to: '#handblock-apparel' },
  { label: 'Royal Jewellery', to: '#jewellery-collection' },
  { label: 'Craftsmanship', to: '#craftsmanship' },
  { label: 'Celebration', to: '#occasions' },
  { label: 'About', to: '#our-story' },
]

const navLinkBase =
  'font-sans text-[14px] lg:text-[15px] font-normal tracking-[0.01em] text-[#3D332D] hover:text-[#2B1B17] transition-colors'

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

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
            className="text-maroon lg:hidden mr-2 cursor-pointer shrink-0 transition-all duration-300"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link
            to="/"
            className="flex items-center shrink-0 transition-all duration-300"
          >
            <img
              src="/ranga_logo_header.svg"
              alt="Rangethnics"
              className="h-8 md:h-10 w-auto"
            />
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-7 lg:gap-9 lg:flex">
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

        {/* Right placeholder to keep desktop nav in its exact original position */}
        <div
          className="hidden lg:flex items-center gap-5 md:gap-6 invisible pointer-events-none select-none"
          aria-hidden="true"
        >
          <span className="w-5 h-5 block" />
          <span className="w-[21px] h-[21px] block" />
          <span className="w-[21px] h-[21px] block" />
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
        </nav>
      )}
    </header>
  )
}
