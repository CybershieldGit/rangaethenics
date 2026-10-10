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

export function RangethnicsInstagram() {
  const images = [
    { src: '/images/landing/assets/insta_1.png', alt: 'Rangethnics Women Festive Drape' },
    { src: '/images/landing/assets/insta_2.png', alt: 'Zari Embroidery Detail' },
    { src: '/images/landing/assets/insta_3.png', alt: 'Royal Bridal Portrait' },
    { src: '/images/landing/assets/insta_4.png', alt: 'Bridal Crimson Lehenga' },
    { src: '/images/landing/assets/insta_5.png', alt: 'Contemporary Lilac Lehenga' },
    { src: '/images/landing/assets/insta_6.png', alt: 'Heritage Handloom Textile' },
  ]

  return (
    <section className="relative w-full bg-[#FAF6F0] py-12 md:py-16 border-b border-[#E8DFC8]/40">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left Title */}
          <div className="shrink-0 text-center lg:text-left">
            <span className="text-[11px] md:text-xs font-serif uppercase tracking-[0.25em] text-[#9E784F] font-semibold mb-1 block">
              FOLLOW US
            </span>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-serif text-2xl sm:text-3xl text-[#2B1B17] hover:text-[#9E784F] tracking-[0.04em] transition-colors"
            >
              <span>@RANGETHNICS</span>
              <InstagramIcon className="w-5 h-5 text-[#9E784F] opacity-70 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>

          {/* 6 Square Images Grid + Right Arrow */}
          <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto pb-2 max-w-full">
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4 shrink-0">
              {images.map((item, idx) => (
                <div
                  key={idx}
                  className="group relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 overflow-hidden rounded-xl border border-[#C5A059]/40 bg-[#F5ECE0] shadow-2xs cursor-pointer"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <InstagramIcon className="w-4 h-4 text-white" />
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination / Browse Next Arrow */}
            <button
              type="button"
              aria-label="Next posts"
              className="w-9 h-9 rounded-full border border-[#C5A059]/50 bg-white/80 hover:bg-[#2B1B17] hover:text-white text-[#2B1B17] flex items-center justify-center shrink-0 transition-colors shadow-xs ml-2 cursor-pointer"
            >
              <ArrowRight size={14} />
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}
