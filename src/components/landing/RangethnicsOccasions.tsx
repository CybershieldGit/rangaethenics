import { ArrowRight } from 'lucide-react'

export function RangethnicsOccasions() {
  const occasions = [
    {
      title: 'WEDDING',
      image: '/images/landing/assets/occ_wedding.png',
      alt: 'Wedding Celebrations Collection',
    },
    {
      title: 'FESTIVE',
      image: '/images/landing/assets/occ_festive.png',
      alt: 'Festive Celebrations Collection',
    },
    {
      title: 'TRADITIONAL',
      image: '/images/landing/assets/occ_traditional.png',
      alt: 'Traditional Heritage Collection',
    },
    {
      title: 'CONTEMPORARY',
      image: '/images/landing/assets/occ_contemporary.png',
      alt: 'Contemporary Modern Ethnic Collection',
    },
  ]

  return (
    <section id="occasions" className="relative w-full bg-[#FAF6F0] py-16 md:py-24 border-b border-[#E8DFC8]/40">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] md:text-xs font-serif uppercase tracking-[0.25em] text-[#9E784F] font-semibold mb-2">
              <span>OCCASIONS</span>
              <ArrowRight size={12} />
            </div>
            <h2 className="font-serif text-[#2B1B17] text-3xl sm:text-4xl md:text-5xl font-normal tracking-[0.02em]">
              FOR EVERY CELEBRATION
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between md:justify-end gap-6">
            <p className="font-sans text-[#5C4F48] text-xs sm:text-sm">
              Different moments. The same timeless elegance.
            </p>
            <a
              href="#occasions"
              className="group inline-flex items-center gap-2 font-serif text-xs md:text-sm uppercase tracking-[0.2em] font-semibold text-[#2B1B17] hover:text-[#9E784F] transition-colors shrink-0"
            >
              <span>EXPLORE ALL</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* 4 Occasion Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {occasions.map((occ) => (
            <div
              key={occ.title}
              className="group relative overflow-hidden rounded-2xl border border-[#C5A059]/40 bg-[#2B1B17] aspect-[3/4.75] shadow-[0_12px_30px_rgba(43,27,23,0.1)] cursor-pointer transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl"
            >
              {/* Photo */}
              <img
                src={occ.image}
                alt={occ.alt}
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Gradient Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

              {/* Card Title & Arrow */}
              <div className="absolute bottom-5 left-5 right-5 z-20 flex items-center justify-between">
                <span className="font-serif text-sm md:text-base font-medium tracking-[0.14em] text-white drop-shadow">
                  {occ.title}
                </span>

                <div className="w-8 h-8 rounded-full bg-white/25 backdrop-blur-md border border-white/40 text-white flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-[#2B1B17] group-hover:scale-110 shadow-sm">
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
