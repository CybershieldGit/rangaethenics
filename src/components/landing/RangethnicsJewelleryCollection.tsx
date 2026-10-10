const jewelleryEdits = [
  {
    id: 'ad-cz',
    title: 'AD & CZ Diamond Jewellery',
    subtitle: 'Brilliant Cut Solitaires & Neckpieces',
    image: '/images/collections/ad_cz_jewellery.jpg',
    alt: 'Sparkling AD and CZ American diamond jewellery necklace and earrings',
    tag: 'Diamond Brilliance',
  },
  {
    id: 'kundan',
    title: 'Pachi Kundan Jewellery',
    subtitle: 'Uncut Polki & Meenakari Heirloom Sets',
    image: '/images/collections/pachi_kundan_antique.jpg',
    alt: 'Royal Rajasthani Pachi Kundan polki necklace and meenakari jewellery',
    tag: 'Heirloom Kundan',
  },
  {
    id: 'silver-replica',
    title: 'Silver Replica Jewellery',
    subtitle: '92.5 Finish Tribal & Filigree Ornaments',
    image: '/images/collections/silver_replica_jewellery.jpg',
    alt: 'Oxidized 92.5 silver replica tribal and filigree jewellery',
    tag: 'Oxidized Silver',
  },
  {
    id: 'antique-brass',
    title: 'Brass & Antique Jewellery',
    subtitle: 'Temple Motifs & Hand-Cast Vintage Finish',
    image: '/images/Pendants.png',
    alt: 'Brass and antique jewellery medallion pendant',
    tag: 'Temple Heritage',
  },
  {
    id: 'earrings',
    title: 'Earrings & Jhumkas',
    subtitle: 'Chandbalis, Drops & Solitaire Studs',
    image: '/images/Earrings.png',
    alt: 'Earrings and Jhumkas',
    tag: 'Ear Adornments',
  },
  {
    id: 'bracelets-rings',
    title: 'Bracelets & Rings',
    subtitle: 'Kadas, Cuffs & Statement Cocktail Rings',
    image: '/images/Bracelets.png',
    alt: 'Bracelets and Rings',
    tag: 'Wrist & Hand Accents',
  },
]

const jewelleryItemsList = [
  'AD Diamond',
  'CZ Diamond',
  'Silver Replica',
  'Brass Jewellery',
  'Antique Jewellery',
  'Pachi Kundan',
  'Bracelets',
  'Necklaces',
  'Earrings',
  'Rings',
]

export function RangethnicsJewelleryCollection() {
  return (
    <section
      id="jewellery-collection"
      className="relative w-full bg-[#FAF5ED] py-16 md:py-20 border-b border-[#E8DFC8]/40"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <span className="text-[11px] md:text-xs font-serif uppercase tracking-[0.25em] text-[#9E784F] font-semibold mb-2 block">
              FINE ADORNMENTS
            </span>
            <h2 className="font-serif text-[#2B1B17] text-3xl sm:text-4xl md:text-5xl font-normal tracking-[0.02em]">
              THE JEWELLERY EDIT
            </h2>
          </div>

          <div className="max-w-md">
            <p className="font-sans text-[#5C4F48] text-xs sm:text-sm leading-relaxed md:text-right">
              From the sparkle of AD &amp; CZ diamonds to timeless Pachi Kundan and antique silver replicas.
            </p>
          </div>
        </div>

        {/* 6-Card Quiet Luxury Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {jewelleryEdits.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col cursor-pointer"
            >
              {/* Image Frame */}
              <div className="relative aspect-[3/4.2] w-full overflow-hidden rounded-xl bg-[#F0E4D5] border border-[#E8DFC8]/70 shadow-[0_4px_18px_rgba(43,27,23,0.04)] transition-all duration-500 group-hover:shadow-[0_10px_28px_rgba(43,27,23,0.1)] group-hover:-translate-y-1">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Subtle Vignette Gradient at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2 py-0.5 rounded-sm bg-white/90 backdrop-blur-xs font-serif text-[9px] uppercase tracking-wider text-[#2B1B17] font-medium">
                    {item.tag}
                  </span>
                </div>

                {/* Bottom Overlay Title */}
                <div className="absolute bottom-3 left-3 right-3 z-10">
                  <h3 className="font-serif text-white text-sm sm:text-base font-normal leading-tight drop-shadow-xs">
                    {item.title}
                  </h3>
                  <p className="font-sans text-[10px] text-[#E8DFC8] mt-1 line-clamp-1 leading-snug">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quiet Editorial Category Strip */}
        <div className="mt-10 py-3.5 px-5 rounded-xl bg-[#F5ECE0]/70 border border-[#E8DFC8]/70 flex flex-wrap items-center justify-between gap-3">
          <span className="font-serif text-[11px] uppercase tracking-[0.2em] text-[#9E784F] font-semibold">
            All Jewellery:
          </span>
          <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1 font-serif text-xs text-[#3D2D27]">
            {jewelleryItemsList.map((item, idx) => (
              <span key={item} className="inline-flex items-center gap-3.5">
                <span>{item}</span>
                {idx < jewelleryItemsList.length - 1 && (
                  <span className="text-[#C5A059]/60 text-[9px]">✦</span>
                )}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
