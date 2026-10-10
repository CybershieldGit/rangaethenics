const apparelCollections = [
  {
    id: 'sarees',
    title: 'Handblock Printed Sarees',
    subtitle: 'Chanderi, Mul Mul, Dola Silk, Maheshwari, Chiffon & Kota Doria',
    image: '/images/sarees.png',
    alt: 'Handblock Printed Sarees in Chanderi, Mul Mul, Dola Silk, Maheshwari, Chiffon and Kota Doria',
    tag: '6 Heritage Fabrics',
  },
  {
    id: 'kurta-sets',
    title: 'Kurta & Pant Sets',
    subtitle: 'Handblock Printed Pure Cotton',
    image: '/images/Kurta_Sets.png',
    alt: 'Handblock printed cotton kurta and pant sets',
    tag: 'Pure Cotton',
  },
  {
    id: 'short-tops',
    title: 'Short Tops',
    subtitle: 'Handblock Printed & Pure Cotton Short Tops',
    image: '/images/collections/short_tops_card.jpg',
    alt: 'Handblock printed cotton short top with modern neckline and trousers',
    tag: 'Short Tops',
  },
  {
    id: 'stoles-dupattas',
    title: 'Stoles & Dupattas',
    subtitle: 'Mul Cotton Stoles & Linen Dupattas',
    image: '/images/collections/mul_stoles_linen_dupatta.jpg',
    alt: 'Handcrafted mul cotton stole and pure linen dupatta with tassels',
    tag: 'Mul & Pure Linen',
  },
  {
    id: 'chaniya-choli',
    title: 'Chaniya Choli',
    subtitle: 'Festive & Wedding Collection',
    image: '/images/collections/chaniya_choli_portrait.png',
    alt: 'Chaniya choli festive bridal and wedding collection with ornate hand embroidery',
    tag: 'Festive & Bridal',
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
  return (
    <section
      id="handblock-apparel"
      className="relative w-full bg-[#FAF6F0] py-16 md:py-20 border-b border-[#E8DFC8]/40"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <span className="text-[11px] md:text-xs font-serif uppercase tracking-[0.25em] text-[#9E784F] font-semibold mb-2 block">
              HERITAGE TEXTILES
            </span>
            <h2 className="font-serif text-[#2B1B17] text-3xl sm:text-4xl md:text-5xl font-normal tracking-[0.02em]">
              THE HANDBLOCK EDIT
            </h2>
          </div>

          <div className="max-w-md">
            <p className="font-sans text-[#5C4F48] text-xs sm:text-sm leading-relaxed md:text-right">
              Hand-carved wooden blocks stamped on India’s finest natural weaves.
            </p>
          </div>
        </div>

        {/* Saree Weaves Subtle Ribbon */}
        <div className="mb-10 py-3.5 px-5 rounded-xl bg-[#F5ECE0]/70 border border-[#E8DFC8]/70 flex flex-wrap items-center justify-between gap-3">
          <span className="font-serif text-[11px] uppercase tracking-[0.2em] text-[#9E784F] font-semibold">
            Saree Fabrics:
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

        {/* 5-Card Editorial Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {apparelCollections.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col cursor-pointer"
            >
              {/* Photo Frame */}
              <div className="relative aspect-[3/4.2] w-full overflow-hidden rounded-xl bg-[#F5ECE0] border border-[#E8DFC8]/70 shadow-[0_4px_18px_rgba(43,27,23,0.04)] transition-all duration-500 group-hover:shadow-[0_10px_28px_rgba(43,27,23,0.1)] group-hover:-translate-y-1">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Subtle Vignette Gradient at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2 py-0.5 rounded-sm bg-white/90 backdrop-blur-xs font-serif text-[9px] uppercase tracking-wider text-[#2B1B17] font-medium">
                    {item.tag}
                  </span>
                </div>

                {/* Bottom Overlay Title on Hover/Static */}
                <div className="absolute bottom-3 left-3 right-3 z-10">
                  <h3 className="font-serif text-white text-base sm:text-lg font-normal leading-tight drop-shadow-xs">
                    {item.title}
                  </h3>
                  <p className="font-sans text-[10.5px] text-[#E8DFC8] mt-1 line-clamp-1 leading-snug">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
