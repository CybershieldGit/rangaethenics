import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

function InstagramIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function FacebookIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function YoutubeIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  )
}

// Custom Pinterest SVG icon
function PinterestIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.33 1.365-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.538.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
    </svg>
  )
}

export function RangethnicsFooter() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer className="w-full bg-[#F6EEE3] pt-16 pb-12 border-t border-[#E8DFC8]">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        
        {/* Main 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-[#E8DFC8]/60">
          
          {/* Column 1: Brand & Socials (Col span 4) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <a href="#" className="inline-block mb-4">
                <img
                  src="/ranga_logo_header.svg"
                  alt="Rangethnics"
                  className="h-9 w-auto"
                />
              </a>
              <p className="font-sans text-xs md:text-sm text-[#6A5E57] leading-relaxed max-w-sm mb-6">
                Celebrating India's heritage through ethnic wear that is timeless, elegant and made for your most special moments.
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-[#C5A059]/40 bg-white/60 hover:bg-[#2B1B17] hover:text-white text-[#2B1B17] flex items-center justify-center transition-colors shadow-xs"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-[#C5A059]/40 bg-white/60 hover:bg-[#2B1B17] hover:text-white text-[#2B1B17] flex items-center justify-center transition-colors shadow-xs"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-[#C5A059]/40 bg-white/60 hover:bg-[#2B1B17] hover:text-white text-[#2B1B17] flex items-center justify-center transition-colors shadow-xs"
                aria-label="Pinterest"
              >
                <PinterestIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-[#C5A059]/40 bg-white/60 hover:bg-[#2B1B17] hover:text-white text-[#2B1B17] flex items-center justify-center transition-colors shadow-xs"
                aria-label="YouTube"
              >
                <YoutubeIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Column 2: SHOP (Col span 2) */}
          <div className="lg:col-span-2">
            <h4 className="font-serif text-xs uppercase tracking-[0.2em] font-semibold text-[#2B1B17] mb-5">
              SHOP
            </h4>
            <ul className="space-y-3 font-sans text-xs sm:text-sm text-[#6A5E57]">
              <li><a href="#categories" className="hover:text-[#2B1B17] transition-colors">Men</a></li>
              <li><a href="#categories" className="hover:text-[#2B1B17] transition-colors">Women</a></li>
              <li><a href="#occasions" className="hover:text-[#2B1B17] transition-colors">Festive</a></li>
              <li><a href="#occasions" className="hover:text-[#2B1B17] transition-colors">Wedding</a></li>
              <li><a href="#categories" className="hover:text-[#2B1B17] transition-colors">All Collections</a></li>
            </ul>
          </div>

          {/* Column 3: HELP (Col span 2) */}
          <div className="lg:col-span-2">
            <h4 className="font-serif text-xs uppercase tracking-[0.2em] font-semibold text-[#2B1B17] mb-5">
              HELP
            </h4>
            <ul className="space-y-3 font-sans text-xs sm:text-sm text-[#6A5E57]">
              <li><a href="#our-story" className="hover:text-[#2B1B17] transition-colors">Shipping Policy</a></li>
              <li><a href="#our-story" className="hover:text-[#2B1B17] transition-colors">Returns & Exchanges</a></li>
              <li><a href="#our-story" className="hover:text-[#2B1B17] transition-colors">Size Guide</a></li>
              <li><a href="#our-story" className="hover:text-[#2B1B17] transition-colors">FAQs</a></li>
              <li><a href="#our-story" className="hover:text-[#2B1B17] transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Column 4: COMPANY (Col span 2) */}
          <div className="lg:col-span-2">
            <h4 className="font-serif text-xs uppercase tracking-[0.2em] font-semibold text-[#2B1B17] mb-5">
              COMPANY
            </h4>
            <ul className="space-y-3 font-sans text-xs sm:text-sm text-[#6A5E57]">
              <li><a href="#our-story" className="hover:text-[#2B1B17] transition-colors">About Us</a></li>
              <li><a href="#craftsmanship" className="hover:text-[#2B1B17] transition-colors">Our Craft</a></li>
              <li><a href="#our-story" className="hover:text-[#2B1B17] transition-colors">Careers</a></li>
              <li><a href="#our-story" className="hover:text-[#2B1B17] transition-colors">Blog</a></li>
              <li><a href="#our-story" className="hover:text-[#2B1B17] transition-colors">Press</a></li>
            </ul>
          </div>

          {/* Column 5: BE A PART OF OUR JOURNEY (Col span 2) */}
          <div className="lg:col-span-2">
            <h4 className="font-serif text-xs uppercase tracking-[0.16em] font-semibold text-[#2B1B17] mb-4">
              BE A PART OF OUR JOURNEY
            </h4>
            <p className="font-sans text-xs text-[#6A5E57] mb-4 leading-relaxed">
              Get updates on new launches, exclusive offers and more.
            </p>
            <form onSubmit={handleSubscribe} className="relative flex items-center">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/70 border border-[#C5A059]/40 rounded-lg px-3 py-2 pr-9 font-sans text-xs text-[#2B1B17] placeholder-[#AFA59C] outline-none focus:border-[#2B1B17] transition-colors"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="absolute right-2 text-[#2B1B17] hover:text-[#9E784F] transition-colors cursor-pointer"
              >
                <ArrowRight size={14} />
              </button>
            </form>
            {subscribed && (
              <p className="text-[11px] text-[#9E784F] font-serif mt-2">
                Thank you for joining our journey.
              </p>
            )}
          </div>

        </div>

        {/* Ornamental Divider */}
        <div className="flex items-center justify-center py-6">
          <div className="h-px bg-[#E8DFC8]/70 flex-1 max-w-[200px]" />
          <div className="px-3 text-[#C5A059] text-xs">✦</div>
          <div className="h-px bg-[#E8DFC8]/70 flex-1 max-w-[200px]" />
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs text-[#7A6E67]">
          <p>© 2024 Rangethnics. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#2B1B17] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#2B1B17] transition-colors">Terms & Conditions</a>
          </div>
        </div>

      </div>
    </footer>
  )
}
