export function RangethnicsOccasions() {
  const occasions = [
    {
      title: 'WEDDING',
      subtitle: 'Chaniya Choli & Pachi Kundan',
      image: '/images/landing/assets/occ_wedding.png',
      alt: 'Wedding Celebrations Collection',
      link: '#handblock-apparel',
    },
    {
      title: 'FESTIVE',
      subtitle: 'Handblock Sarees & AD Diamonds',
      image: '/images/landing/assets/occ_festive.png',
      alt: 'Festive Celebrations Collection',
      link: '#handblock-apparel',
    },
    {
      title: 'TRADITIONAL',
      subtitle: 'Cotton Kurta Sets & Antique Brass',
      image: '/images/landing/assets/occ_traditional.png',
      alt: 'Traditional Heritage Collection',
      link: '#handblock-apparel',
    },
    {
      title: 'CONTEMPORARY',
      subtitle: 'Short Tops & Silver Replicas',
      image: '/images/landing/assets/occ_contemporary.png',
      alt: 'Contemporary Modern Ethnic Collection',
      link: '#handblock-apparel',
    },
  ]

  return (
    <section id="occasions" className="relative w-full bg-[#FAF6F0] py-16 md:py-24 border-b border-[#E8DFC8]/40">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-[11px] md:text-xs font-serif uppercase tracking-[0.25em] text-[#9E784F] font-semibold mb-2 block">
              OCCASIONS
            </span>
            <h2 className="font-serif text-[#2B1B17] text-3xl sm:text-4xl md:text-5xl font-normal tracking-[0.02em]">
              FOR EVERY CELEBRATION
            </h2>
          </div>

          <div>
            <p className="font-sans text-[#5C4F48] text-xs sm:text-sm md:text-right">
              Different moments. The same timeless handcrafted elegance.
            </p>
          </div>
        </div>

        {/* 4 Occasion Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {occasions.map((occ) => (
            <a
              key={occ.title}
              href={occ.link}
              className="group relative overflow-hidden rounded-2xl border border-[#C5A059]/40 bg-[#2B1B17] aspect-[3/4.75] shadow-[0_12px_30px_rgba(43,27,23,0.1)] cursor-pointer transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl block"
            >
              {/* Photo */}
              <img
                src={occ.image}
                alt={occ.alt}
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Gradient Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

              {/* Card Title & Category Pairing Subtitle */}
              <div className="absolute bottom-5 left-5 right-5 z-20">
                <span className="font-serif text-base sm:text-lg font-medium tracking-[0.14em] text-white drop-shadow block leading-tight">
                  {occ.title}
                </span>
                <span className="font-sans text-[11px] text-[#E8DFC8] mt-1 block">
                  {occ.subtitle}
                </span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}
