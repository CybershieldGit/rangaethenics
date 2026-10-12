const jewelleryEdits = [
  {
    id: 'ad-diamond',
    title: 'AD Diamond Jewellery',
    subtitle: 'American Diamond Solitaires',
    image: '/images/collections/ad_cz_jewellery.jpg',
    alt: 'Ad diamond jewellery',
    tag: 'AD Diamond',
  },
  {
    id: 'cz-diamond',
    title: 'CZ Diamond Jewellery',
    subtitle: 'Cubic Zirconia Party Wear',
    image: '/images/collections/cz_diamond_jewellery.jpg',
    alt: 'CZ diamond jewellery',
    tag: 'CZ Diamond',
  },
  {
    id: 'silver-replica',
    title: 'Silver Replica Jewellery',
    subtitle: '92.5 Finish Tribal & Filigree',
    image: '/images/collections/silver_replica_jewellery.jpg',
    alt: 'Silver replica jewellery',
    tag: 'Silver Replica',
  },
  {
    id: 'brass-jewellery',
    title: 'Brass Jewellery',
    subtitle: 'Hand-Cast Warm Gold Finish',
    image: '/images/collections/brass_jewellery.jpg',
    alt: 'Brass jewellery',
    tag: 'Brass',
  },
  {
    id: 'antique-jewellery',
    title: 'Antique Jewellery',
    subtitle: 'Vintage Temple Heritage',
    image: '/images/collections/antique_jewellery.jpg',
    alt: 'Antique jewellery',
    tag: 'Antique',
  },
  {
    id: 'pachi-kundan',
    title: 'Pachi Kundan Jewellery',
    subtitle: 'Uncut Polki & Meenakari',
    image: '/images/collections/pachi_kundan_jewellery.jpg',
    alt: 'Pachi kundan jewellery',
    tag: 'Pachi Kundan',
  },
  {
    id: 'bracelets',
    title: 'Bracelets',
    subtitle: 'Kadas, Cuffs & Charms',
    image: '/images/Bracelets.png',
    alt: 'Bracelets',
    tag: 'Bracelets',
  },
  {
    id: 'necklace',
    title: 'Necklace',
    subtitle: 'Chokers, Hasli & Long Sets',
    image: '/images/Necklaces.png',
    alt: 'Necklace',
    tag: 'Necklace',
  },
  {
    id: 'earrings',
    title: 'Earrings',
    subtitle: 'Jhumkas, Chandbalis & Studs',
    image: '/images/Earrings.png',
    alt: 'Earrings',
    tag: 'Earrings',
  },
  {
    id: 'rings',
    title: 'Rings',
    subtitle: 'Statement & Cocktail Bands',
    image: '/images/Rings.png',
    alt: 'Rings',
    tag: 'Rings',
  },
]

const jewelleryItemsList = [
  'Ad Diamond Jewellery',
  'CZ Diamond Jewellery',
  'Silver Replica Jewellery',
  'Brass Jewellery',
  'Antique Jewellery',
  'Pachi Kundan Jewellery',
  'Bracelets',
  'Necklace',
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
              From the sparkle of AD &amp; CZ diamonds to royal Pachi Kundan, antique brass, and 92.5 silver replicas.
            </p>
          </div>
        </div>

        {/* 10-Card Luxury Grid (5 columns x 2 rows on large screens) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
          {jewelleryEdits.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col cursor-pointer"
            >
              {/* Image Frame */}
              <div className="relative aspect-[3/4.2] w-full overflow-hidden rounded-xl bg-[#1A1412] border border-[#E8DFC8]/70 shadow-[0_4px_18px_rgba(43,27,23,0.04)] transition-all duration-500 group-hover:shadow-[0_10px_28px_rgba(43,27,23,0.15)] group-hover:-translate-y-1">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Subtle Vignette Gradient at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                {/* Top Badge */}
                <div className="absolute top-2.5 left-2.5 z-10">
                  <span className="px-2 py-0.5 rounded-sm bg-white/90 backdrop-blur-xs font-serif text-[9px] uppercase tracking-wider text-[#2B1B17] font-medium">
                    {item.tag}
                  </span>
                </div>

                {/* Bottom Overlay Title */}
                <div className="absolute bottom-3 left-2.5 right-2.5 z-10">
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
            All Jewellery Categories:
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
