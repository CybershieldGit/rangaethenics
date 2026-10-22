import { useState } from 'react'

// Authentic Royal Jali Diamond Medallion with vertical lance lines & finials
function JaliMedallion({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 84"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Top guide line and lance finial */}
      <line x1="14" y1="0" x2="14" y2="20" stroke="#9E784F" strokeWidth="0.75" strokeOpacity="0.5" />
      <path d="M14 20 C15.2 22.5 15.8 25.5 14 28 C12.2 25.5 12.8 22.5 14 20 Z" fill="#9E784F" opacity="0.7" />

      {/* Main Floral Diamond Medallion */}
      <g transform="translate(14, 48)">
        {/* Diamond Outer Frame */}
        <path
          d="M0 -14 C4 -10 8 -6 12 0 C8 6 4 10 0 14 C-4 10 -8 6 -12 0 C-8 -6 -4 -10 0 -14 Z"
          stroke="#9E784F"
          strokeWidth="0.9"
          strokeOpacity="0.65"
          fill="none"
        />
        {/* Inner Floral Petals */}
        <circle cx="0" cy="-5" r="3.2" stroke="#9E784F" strokeWidth="0.6" strokeOpacity="0.6" fill="none" />
        <circle cx="0" cy="5" r="3.2" stroke="#9E784F" strokeWidth="0.6" strokeOpacity="0.6" fill="none" />
        <circle cx="-5" cy="0" r="3.2" stroke="#9E784F" strokeWidth="0.6" strokeOpacity="0.6" fill="none" />
        <circle cx="5" cy="0" r="3.2" stroke="#9E784F" strokeWidth="0.6" strokeOpacity="0.6" fill="none" />
        {/* Center Diamond Core */}
        <polygon points="0,-2.5 2.5,0 0,2.5 -2.5,0" fill="#9E784F" opacity="0.85" />
      </g>

      {/* Bottom guide line and finial */}
      <path d="M14 62 C15.2 64.5 15.8 67.5 14 70 C12.2 67.5 12.8 64.5 14 62 Z" fill="#9E784F" opacity="0.7" />
      <line x1="14" y1="70" x2="14" y2="84" stroke="#9E784F" strokeWidth="0.75" strokeOpacity="0.5" />
    </svg>
  )
}

export function RangethnicsCategories() {
  const [activeTab, setActiveTab] = useState<'clothing' | 'jewellery'>('clothing')

  const clothingPortals = [
    {
      num: '01',
      title: 'SAREES',
      subtitle: '6 HERITAGE WEAVES',
      image: '/images/collections/handblock_sarees.jpg',
      alt: 'Handblock printed sarees in chanderi, mul mul, dola silk, maheshwari, chiffon and kota doria',
      anchor: '#handblock-apparel',
    },
    {
      num: '02',
      title: 'KURTA SETS',
      subtitle: 'PURE COTTON HANDBLOCK',
      image: '/images/collections/kurta_pant_sets.jpg',
      alt: 'Handblock printed cotton kurta and pant sets',
      anchor: '#handblock-apparel',
    },
    {
      num: '03',
      title: 'TOPS & STOLES',
      subtitle: 'COTTON & LINEN DUPATTAS',
      image: '/images/collections/handblock_short_tops.jpg',
      alt: 'Handblock short tops, cotton tops, mul stoles and linen dupatta',
      anchor: '#handblock-apparel',
    },
    {
      num: '04',
      title: 'CHANIYA CHOLI',
      subtitle: 'FESTIVE & WEDDING',
      image: '/images/collections/cat_chaniya_choli_palace.jpg',
      alt: 'Chaniya choli festive and wedding collection',
      anchor: '#handblock-apparel',
    },
  ]

  const jewelleryPortals = [
    {
      num: '01',
      title: 'AD & CZ DIAMONDS',
      subtitle: 'BRILLIANT SOLITAIRES',
      image: '/images/collections/ad_cz_jewellery.jpg',
      alt: 'American Diamond and CZ diamond jewellery',
      anchor: '#jewellery-collection',
    },
    {
      num: '02',
      title: 'PACHI KUNDAN',
      subtitle: 'UNCUT POLKI & ANTIQUE',
      image: '/images/collections/pachi_kundan_jewellery.jpg',
      alt: 'Pachi kundan and antique jewellery',
      anchor: '#jewellery-collection',
    },
    {
      num: '03',
      title: 'SILVER & BRASS',
      subtitle: '92.5 FINISH & ARTISAN BRASS',
      image: '/images/collections/silver_replica_jewellery.jpg',
      alt: 'Silver replica jewellery and brass jewellery',
      anchor: '#jewellery-collection',
    },
    {
      num: '04',
      title: 'FINE ACCENTS',
      subtitle: 'NECKLACES, RINGS, EARRINGS',
      image: '/images/Necklaces.png',
      alt: 'Bracelets, necklaces, earrings and rings',
      anchor: '#jewellery-collection',
    },
  ]

  const activePortals = activeTab === 'clothing' ? clothingPortals : jewelleryPortals

  const clothingCategoriesList = [
    'Handblock Printed Sarees (Chanderi, Mul Mul, Dola Silk, Maheshwari, Chiffon & Kota Doria)',
    'Handblock Printed Cotton Kurta & Pant Sets',
    'Handblock Printed Short Tops',
    'Cotton Short Tops',
    'Mul Cotton Stoles',
    'Linen Dupatta',
    'Chaniya Choli Festive & Wedding Collection',
  ]

  const jewelleryCategoriesList = [
    'AD Diamond Jewellery',
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

  return (
    <section id="categories" className="relative w-full bg-[#FAF6F0] py-10 sm:py-16 md:py-24 border-b border-[#E8DFC8]/40 overflow-hidden">
      
      {/* SVG ClipPath Definition for Jharokha Arch Top & Concave Bottom */}
      <svg className="absolute w-0 h-0" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id="jharokhaCardClip" clipPathUnits="objectBoundingBox">
            <path d="M 0 0.22 C 0 0.05, 0.2 0, 0.5 0 C 0.8 0, 1 0.05, 1 0.22 L 1 1 Q 0.5 0.965 0 1 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Background Architectural Palace Curves & Drapes */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-60">
        <svg
          viewBox="0 0 1440 600"
          className="w-full h-full object-cover"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Sweeping top header arch */}
          <path
            d="M -100 0 C 200 140, 600 120, 800 0 Z"
            fill="#F2E6D8"
            opacity="0.35"
          />
          <path
            d="M 500 0 C 750 160, 1150 140, 1540 0 Z"
            fill="#F4E9DC"
            opacity="0.25"
          />
          <path
            d="M -50 40 C 350 200, 750 150, 1500 30"
            stroke="#C5A059"
            strokeWidth="0.75"
            strokeOpacity="0.25"
            fill="none"
          />

          {/* Bottom inverted scalloped alcove base */}
          <path
            d="M 0 580 C 180 540, 360 540, 540 580 C 720 540, 900 540, 1080 580 C 1260 540, 1440 540, 1620 580"
            stroke="#C5A059"
            strokeWidth="0.8"
            strokeOpacity="0.25"
            fill="none"
          />
        </svg>
      </div>

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-10 lg:px-16">
        
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-10 md:mb-12">
          <div>
            <span className="text-[11px] md:text-xs font-serif uppercase tracking-[0.25em] text-[#9E784F] font-semibold mb-1.5 sm:mb-2 block">
              SHOP BY CATEGORY
            </span>
            <h2 className="font-serif text-[#2B1B17] text-2xl sm:text-4xl md:text-5xl font-normal tracking-[0.02em]">
              EXPLORE OUR WORLD
            </h2>
          </div>

          {/* Simple, Classic & Elegant Editorial Tabs */}
          <div className="flex items-center gap-4 sm:gap-8 self-start md:self-end border-b border-[#C5A059]/30 pb-1.5 select-none">
            <button
              type="button"
              onClick={() => setActiveTab('clothing')}
              className={`group relative pb-2 font-serif text-xs sm:text-[13px] uppercase tracking-[0.22em] transition-all duration-300 cursor-pointer ${
                activeTab === 'clothing'
                  ? 'text-[#2B1B17] font-semibold'
                  : 'text-[#8C7A70] hover:text-[#2B1B17]'
              }`}
            >
              <span>Clothing Range</span>
              <span
                className={`absolute -bottom-1.5 left-0 right-0 h-[1.5px] transition-all duration-300 ${
                  activeTab === 'clothing'
                    ? 'bg-[#9E784F] opacity-100'
                    : 'bg-transparent opacity-0 group-hover:bg-[#9E784F]/40 group-hover:opacity-100'
                }`}
              />
            </button>

            <span className="text-[#C5A059]/60 text-[10px] pb-2">✦</span>

            <button
              type="button"
              onClick={() => setActiveTab('jewellery')}
              className={`group relative pb-2 font-serif text-xs sm:text-[13px] uppercase tracking-[0.22em] transition-all duration-300 cursor-pointer ${
                activeTab === 'jewellery'
                  ? 'text-[#2B1B17] font-semibold'
                  : 'text-[#8C7A70] hover:text-[#2B1B17]'
              }`}
            >
              <span>Jewellery Collection</span>
              <span
                className={`absolute -bottom-1.5 left-0 right-0 h-[1.5px] transition-all duration-300 ${
                  activeTab === 'jewellery'
                    ? 'bg-[#9E784F] opacity-100'
                    : 'bg-transparent opacity-0 group-hover:bg-[#9E784F]/40 group-hover:opacity-100'
                }`}
              />
            </button>
          </div>
        </div>

        {/* 4 Jharokha Cards Section with Connecting Arches & Ornamental Medallions */}
        <div className="relative w-full">
          
          {/* 5 Vertical Medallions on lg screens */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none z-20">
            {/* Medallion 1: Far Left */}
            <div className="absolute -left-6 top-[48%] -translate-y-1/2">
              <JaliMedallion className="w-6 h-20" />
            </div>

            {/* Medallion 2: Between Card 1 & 2 */}
            <div className="absolute left-[calc(25%-6px)] -translate-x-1/2 top-[48%] -translate-y-1/2">
              <JaliMedallion className="w-6 h-20" />
            </div>

            {/* Medallion 3: Between Card 2 & 3 */}
            <div className="absolute left-1/2 -translate-x-1/2 top-[48%] -translate-y-1/2">
              <JaliMedallion className="w-6 h-20" />
            </div>

            {/* Medallion 4: Between Card 3 & 4 */}
            <div className="absolute left-[calc(75%+6px)] -translate-x-1/2 top-[48%] -translate-y-1/2">
              <JaliMedallion className="w-6 h-20" />
            </div>

            {/* Medallion 5: Far Right */}
            <div className="absolute -right-6 top-[48%] -translate-y-1/2">
              <JaliMedallion className="w-6 h-20" />
            </div>
          </div>

          {/* Cards Grid: 2 columns on mobile, 4 columns on large screens */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-6 items-start">
            {activePortals.map((cat) => (
              <a
                key={cat.num + activeTab}
                href={cat.anchor}
                className="group relative flex flex-col cursor-pointer transition-all duration-300"
              >
                {/* External Number Badge above each arch with accent dash */}
                <div className="flex items-center gap-1.5 mb-1.5 sm:mb-2 pl-1.5 sm:pl-3 select-none">
                  <span className="font-serif text-[11px] sm:text-xs md:text-sm font-semibold tracking-[0.16em] sm:tracking-[0.2em] text-[#9E784F]">
                    {cat.num}
                  </span>
                  <span className="w-2.5 sm:w-3.5 h-[1px] bg-[#9E784F]/40" />
                </div>

                {/* Outer Architectural Framing Arch & Card Container */}
                <div className="relative w-full">
                  
                  {/* Outer Arch Framing Line */}
                  <svg
                    viewBox="0 0 100 120"
                    className="absolute -top-2 sm:-top-3.5 -inset-x-1 sm:-inset-x-2 w-[calc(100%+8px)] sm:w-[calc(100%+16px)] h-16 sm:h-24 lg:h-28 pointer-events-none z-10 overflow-visible"
                    fill="none"
                  >
                    <path
                      d="M 2 80 C 2 30, 20 2, 50 2 C 80 2, 98 30, 98 80"
                      stroke="#C5A059"
                      strokeWidth="0.8"
                      strokeOpacity="0.4"
                    />
                  </svg>

                  {/* Card Body with Jharokha Arch Top & Concave Wave Bottom */}
                  <div
                    className="relative w-full aspect-[3/4.2] sm:aspect-[3/4.8] overflow-hidden bg-[#F5ECE0] shadow-[0_8px_25px_rgba(43,27,23,0.06)] sm:shadow-[0_14px_35px_rgba(43,27,23,0.08)] transition-all duration-500 group-hover:shadow-[0_22px_45px_rgba(43,27,23,0.16)] group-hover:-translate-y-1"
                    style={{
                      clipPath: 'url(#jharokhaCardClip)',
                    }}
                  >
                    {/* Perimeter Thin Gold Border matching the Jharokha silhouette */}
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none z-30"
                      viewBox="0 0 100 160"
                      preserveAspectRatio="none"
                      fill="none"
                    >
                      <path
                        d="M 0.5 35.2 C 0.5 8, 20 0.5, 50 0.5 C 80 0.5, 99.5 8, 99.5 35.2 L 99.5 159.5 Q 50 154.4 0.5 159.5 Z"
                        stroke="#C5A059"
                        strokeWidth="0.8"
                        strokeOpacity="0.4"
                      />
                    </svg>

                    {/* Main Card Photo */}
                    <img
                      src={cat.image}
                      alt={cat.alt}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Dark Dramatic Vignette Gradient at bottom for high text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none z-10" />

                    {/* Bottom Card Labels */}
                    <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-5 right-3 sm:right-5 z-20">
                      <h3 className="font-serif text-sm sm:text-2xl lg:text-3xl font-light tracking-[0.04em] sm:tracking-[0.06em] text-white leading-tight">
                        {cat.title}
                      </h3>
                      <p className="font-sans text-[8.5px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.16em] sm:tracking-[0.25em] text-[#E8DFC8] font-medium mt-0.5 sm:mt-1 line-clamp-1">
                        {cat.subtitle}
                      </p>
                    </div>

                  </div>
                </div>

              </a>
            ))}
          </div>

        </div>

        {/* Quiet Editorial Category Ribbon */}
        <div className="mt-6 sm:mt-12 py-3 sm:py-3.5 px-3.5 sm:px-5 rounded-xl bg-[#F5ECE0]/70 border border-[#E8DFC8]/70 flex flex-col md:flex-row items-start md:items-center justify-between gap-2.5 sm:gap-4">
          <div className="shrink-0 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9E784F]" />
            <span className="font-serif text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#9E784F] font-semibold">
              {activeTab === 'clothing' ? 'Clothing Categories:' : 'Jewellery Categories:'}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-2.5 sm:gap-x-3.5 gap-y-1 sm:gap-y-1.5 font-serif text-[11px] sm:text-xs text-[#3D2D27]">
            {(activeTab === 'clothing' ? clothingCategoriesList : jewelleryCategoriesList).map((item, idx, arr) => (
              <a
                key={item}
                href={activeTab === 'clothing' ? '#handblock-apparel' : '#jewellery-collection'}
                className="inline-flex items-center gap-2 sm:gap-3.5 hover:text-[#9E784F] transition-colors"
              >
                <span>{item}</span>
                {idx < arr.length - 1 && (
                  <span className="text-[#C5A059]/60 text-[8px] sm:text-[9px]">✦</span>
                )}
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
