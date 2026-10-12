const apparelCollections = [
  {
    id: 'sarees',
    title: 'Handblock Printed Sarees',
    subtitle: 'Chanderi, Mul Mul, Dola Silk, Maheshwari, Chiffon & Kota Doria',
    image: '/images/collections/handblock_sarees.jpg',
    alt: 'Handblock printed sarees in chanderi, mul mul, dola silk, maheshwari, chiffon and kota doria fabrics',
    tag: '6 Heritage Fabrics',
    featured: true,
  },
  {
    id: 'kurta-sets',
    title: 'Kurta & Pant Sets',
    subtitle: 'Handblock Printed Pure Cotton',
    image: '/images/collections/kurta_pant_sets.jpg',
    alt: 'Handblock printed cotton kurta and pant sets',
    tag: 'Pure Cotton',
  },
  {
    id: 'handblock-short-tops',
    title: 'Handblock Short Tops',
    subtitle: 'Artisanal Block Prints',
    image: '/images/collections/handblock_short_tops.jpg',
    alt: 'Handblock printed short tops',
    tag: 'Handblock',
  },
  {
    id: 'cotton-short-tops',
    title: 'Cotton Short Tops',
    subtitle: 'Everyday Breathable Silhouettes',
    image: '/images/collections/cotton_short_tops_unique.jpg',
    alt: 'Cotton short tops',
    tag: 'Pure Cotton',
  },
  {
    id: 'mul-cotton-stoles',
    title: 'Mul Cotton Stoles',
    subtitle: 'Mul Mul Lightweight Stoles',
    image: '/images/collections/mul_stoles_linen_dupatta.jpg',
    alt: 'Mul cotton Stoles',
    tag: 'Mul Cotton',
  },
  {
    id: 'linen-dupatta',
    title: 'Linen Dupatta',
    subtitle: 'Pure Linen Woven Dupattas',
    image: '/images/Dupattas.png',
    alt: 'Linen dupatta',
    tag: 'Pure Linen',
  },
  {
    id: 'chaniya-choli',
    title: 'Chaniya Choli',
    subtitle: 'Festive & Wedding Collection',
    image: '/images/collections/cat_chaniya_choli_palace.jpg',
    alt: 'Chaniya choli festive and wedding collection',
    tag: 'Festive & Wedding',
  },
]

const sareeFabrics = [
  'Chanderi',
  'Mul Mul',
  'Dola Silk',
  'Maheshwari',
  'Chiffon',
  'Kota Doria',
]

export function RangethnicsHandblockCollection() {
  const featuredItem = apparelCollections[0]
  const regularItems = apparelCollections.slice(1)

  return (
    <section
      id="handblock-apparel"
      className="relative w-full bg-[#FAF6F0] py-16 md:py-20 border-b border-[#E8DFC8]/40"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        
        {/* Header Block - Matches Jewellery Edit proportion & space */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <span className="text-[11px] md:text-xs font-serif uppercase tracking-[0.25em] text-[#9E784F] font-semibold mb-2 block">
              HERITAGE TEXTILES
            </span>
            <h2 className="font-serif text-[#2B1B17] text-3xl sm:text-4xl md:text-5xl font-normal tracking-[0.02em]">
              THE CLOTHING RANGE
            </h2>
          </div>

          <div className="max-w-md">
            <p className="font-sans text-[#5C4F48] text-xs sm:text-sm leading-relaxed md:text-right">
              Hand-carved wooden blocks stamped on India’s finest natural weaves, from everyday coordinates to bridal chaniya choli.
            </p>
          </div>
        </div>

        {/* 5-Column, 2-Row Balanced Architectural Grid (Matches Jewellery Grid Proportion) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 items-stretch">
          
          {/* Card 1: Featured Handblock Printed Sarees (Spans 2 columns & 2 rows on lg) */}
          <div className="sm:col-span-2 md:col-span-3 lg:col-span-2 lg:row-span-2 group flex flex-col cursor-pointer">
            <div className="relative w-full h-full min-h-[420px] sm:min-h-[460px] lg:min-h-0 overflow-hidden rounded-xl bg-[#F5ECE0] border border-[#E8DFC8]/70 shadow-[0_4px_18px_rgba(43,27,23,0.04)] transition-all duration-500 group-hover:shadow-[0_12px_32px_rgba(43,27,23,0.12)] group-hover:-translate-y-1">
              <img
                src={featuredItem.image}
                alt={featuredItem.alt}
                className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Rich Vignette Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

              {/* Top Badges */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                <span className="px-2.5 py-1 rounded-sm bg-white/95 backdrop-blur-xs font-serif text-[10px] uppercase tracking-wider text-[#2B1B17] font-medium shadow-xs">
                  {featuredItem.tag}
                </span>
                <span className="hidden sm:inline-block px-2.5 py-1 rounded-sm bg-[#2B1B17]/85 backdrop-blur-xs font-serif text-[10px] uppercase tracking-widest text-[#E8DFC8] font-light">
                  ✦ Signature Edit
                </span>
              </div>

              {/* Bottom Overlay Content */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-10">
                <h3 className="font-serif text-white text-xl sm:text-2xl lg:text-[26px] font-normal leading-tight drop-shadow-xs mb-1.5">
                  {featuredItem.title}
                </h3>
                <p className="font-sans text-xs sm:text-[13px] text-[#E8DFC8] leading-relaxed max-w-md mb-3">
                  {featuredItem.subtitle}
                </p>

                {/* Saree Fabrics Mini Badges */}
                <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/20">
                  {sareeFabrics.map((fabric) => (
                    <span
                      key={fabric}
                      className="px-2 py-0.5 rounded-xs bg-black/40 backdrop-blur-xs font-serif text-[10px] text-[#FAF5ED] border border-white/15"
                    >
                      {fabric}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Cards 2 to 7: 6 Standard Category Cards (Filling cols 3, 4, 5 in 2 rows on lg) */}
          {regularItems.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col cursor-pointer"
            >
              {/* Photo Frame - Exact same aspect ratio & border as Jewellery Cards */}
              <div className="relative aspect-[3/4.2] w-full overflow-hidden rounded-xl bg-[#F5ECE0] border border-[#E8DFC8]/70 shadow-[0_4px_18px_rgba(43,27,23,0.04)] transition-all duration-500 group-hover:shadow-[0_10px_28px_rgba(43,27,23,0.1)] group-hover:-translate-y-1">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Subtle Vignette Gradient at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />

                {/* Top Badge */}
                <div className="absolute top-2.5 left-2.5 z-10">
                  <span className="px-2 py-0.5 rounded-sm bg-white/90 backdrop-blur-xs font-serif text-[9px] uppercase tracking-wider text-[#2B1B17] font-medium">
                    {item.tag}
                  </span>
                </div>

                {/* Bottom Overlay Title on Hover/Static */}
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

        {/* Saree Weaves Subtle Ribbon at the Bottom - Symmetrically matching the Jewellery Category Ribbon */}
        <div className="mt-10 py-3.5 px-5 rounded-xl bg-[#F5ECE0]/70 border border-[#E8DFC8]/70 flex flex-wrap items-center justify-between gap-3">
          <span className="font-serif text-[11px] uppercase tracking-[0.2em] text-[#9E784F] font-semibold">
            Handblock Saree Fabrics:
          </span>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-serif text-xs sm:text-sm text-[#3D2D27]">
            {sareeFabrics.map((fabric, idx) => (
              <span key={fabric} className="inline-flex items-center gap-4">
                <span>{fabric}</span>
                {idx < sareeFabrics.length - 1 && (
                  <span className="text-[#C5A059]/60 text-[10px]">✦</span>
                )}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
