// Authentic Royal Mandala & Emblem Icons for the 4 Pillars
function CraftIcon({ type }: { type: 'fabrics' | 'detailing' | 'techniques' | 'silhouettes' }) {
  if (type === 'fabrics') {
    return (
      <svg viewBox="0 0 32 32" className="w-8 h-8 text-[#9E784F]" fill="none" stroke="currentColor">
        <circle cx="16" cy="16" r="13" strokeWidth="1" strokeOpacity="0.85" />
        <path d="M16 3 C16 10 10 16 3 16 M16 3 C16 10 22 16 29 16 M16 29 C16 22 10 16 3 16 M16 29 C16 22 22 16 29 16" strokeWidth="0.8" strokeOpacity="0.65" />
        <circle cx="16" cy="16" r="3.5" strokeWidth="0.8" strokeOpacity="0.8" />
        <circle cx="16" cy="16" r="1.2" fill="currentColor" />
      </svg>
    )
  }
  if (type === 'detailing') {
    return (
      <svg viewBox="0 0 32 32" className="w-8 h-8 text-[#9E784F]" fill="none" stroke="currentColor">
        {/* Scalloped floral rosette */}
        <path
          d="M16 3.5 C18 3.5 20.5 5.5 22 7.5 C24 7 26.5 8.5 27 11 C28 13.5 28.5 16 27.5 18 C28.5 20.5 27.5 23.5 25 24.5 C24 26.5 22 28 19 28.5 C17 29 15 29 13 28.5 C10 28 8 26.5 7 24.5 C4.5 23.5 3.5 20.5 4.5 18 C3.5 16 4 13.5 5 11 C5.5 8.5 8 7 10 7.5 C11.5 5.5 14 3.5 16 3.5 Z"
          strokeWidth="0.9"
          strokeOpacity="0.85"
        />
        <circle cx="16" cy="16" r="4.5" strokeWidth="0.75" strokeOpacity="0.7" />
        <polygon points="16,13 18.5,16 16,19 13.5,16" fill="currentColor" opacity="0.8" />
      </svg>
    )
  }
  if (type === 'techniques') {
    return (
      <svg viewBox="0 0 32 32" className="w-8 h-8 text-[#9E784F]" fill="none" stroke="currentColor">
        {/* 8-point geometric star jali medallion */}
        <rect x="7" y="7" width="18" height="18" strokeWidth="0.9" strokeOpacity="0.8" />
        <rect x="7" y="7" width="18" height="18" strokeWidth="0.9" strokeOpacity="0.8" transform="rotate(45 16 16)" />
        <circle cx="16" cy="16" r="4.5" strokeWidth="0.75" strokeOpacity="0.7" />
        <circle cx="16" cy="16" r="1.5" fill="currentColor" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 32 32" className="w-8 h-8 text-[#9E784F]" fill="none" stroke="currentColor">
      {/* Modern Silhouette royal attire icon */}
      <path d="M12.5 5 L16 8 L19.5 5 L21.5 8.5 L19 13.5 L24.5 27 L7.5 27 L13 13.5 L10.5 8.5 Z" strokeWidth="1" strokeOpacity="0.85" strokeLinejoin="round" />
      <line x1="16" y1="8" x2="16" y2="27" strokeWidth="0.75" strokeOpacity="0.6" />
      <circle cx="16" cy="4" r="1.2" fill="currentColor" />
    </svg>
  )
}

export function RangethnicsCraft() {
  const pillars = [
    {
      line1: 'PREMIUM',
      line2: 'FABRICS',
      type: 'fabrics' as const,
    },
    {
      line1: 'INTRICATE',
      line2: 'DETAILING',
      type: 'detailing' as const,
    },
    {
      line1: 'TRADITIONAL',
      line2: 'TECHNIQUES',
      type: 'techniques' as const,
    },
    {
      line1: 'MODERN',
      line2: 'SILHOUETTES',
      type: 'silhouettes' as const,
    },
  ]

  return (
    <section
      id="craftsmanship"
      className="relative w-full bg-[#FAF5ED] py-10 sm:py-14 md:py-16 border-b border-[#E8DFC8]/40 overflow-hidden"
    >
      {/* Background Subtle Radiating Sunburst Texture Emanating from Behind the Palace Corridor */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-35">
        <svg
          viewBox="0 0 1440 600"
          className="w-full h-full object-cover"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle sunburst lines radiating outward across the cream background */}
          <path d="M 1080 260 L -100 -50" stroke="#C5A059" strokeWidth="0.45" strokeOpacity="0.25" />
          <path d="M 1080 260 L -100 120" stroke="#C5A059" strokeWidth="0.45" strokeOpacity="0.25" />
          <path d="M 1080 260 L -100 320" stroke="#C5A059" strokeWidth="0.45" strokeOpacity="0.25" />
          <path d="M 1080 260 L -50 550" stroke="#C5A059" strokeWidth="0.45" strokeOpacity="0.25" />
          <path d="M 1080 260 L 250 650" stroke="#C5A059" strokeWidth="0.45" strokeOpacity="0.25" />
          <path d="M 1080 260 L 600 650" stroke="#C5A059" strokeWidth="0.45" strokeOpacity="0.25" />
          <path d="M 1080 260 L 950 650" stroke="#C5A059" strokeWidth="0.45" strokeOpacity="0.25" />
          <path d="M 1080 260 L 1400 650" stroke="#C5A059" strokeWidth="0.45" strokeOpacity="0.25" />
          <path d="M 1080 260 L 1550 400" stroke="#C5A059" strokeWidth="0.45" strokeOpacity="0.25" />
          <path d="M 1080 260 L 1550 100" stroke="#C5A059" strokeWidth="0.45" strokeOpacity="0.25" />
          <path d="M 1080 260 L 1350 -50" stroke="#C5A059" strokeWidth="0.45" strokeOpacity="0.25" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10 xl:px-12">
        {/* Desktop 3-Column Panoramic Composition (matches reference mockup exactly) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-8 items-center min-h-[500px] lg:min-h-[540px]">
          
          {/* Left Column: Full-Height Rectangular Artisan Hands Photo */}
          <div className="lg:col-span-3 flex justify-center lg:justify-start h-full">
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[360px] xl:max-w-[385px] h-[440px] sm:h-[480px] lg:h-[520px] xl:h-[545px] overflow-hidden shadow-[0_10px_28px_rgba(43,27,23,0.07)] bg-[#F5ECE0]">
              <img
                src="/images/landing/assets_v2/craft_hands.png"
                alt="Master artisan embroidering royal zardozi"
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>

          {/* Middle Column: The Craft Narrative, 4 Pillars & CTA */}
          <div className="lg:col-span-5 flex flex-col justify-center px-2 sm:px-4 lg:px-3 xl:px-6">
            {/* Eyebrow */}
            <span className="text-[11px] font-serif uppercase tracking-[0.25em] text-[#9E784F] font-semibold mb-3 block">
              THE CRAFT
            </span>

            {/* Headline */}
            <h2 className="font-serif text-[#2B1B17] text-3xl sm:text-4xl md:text-[44px] xl:text-[48px] font-normal tracking-[0.02em] leading-[1.08] mb-5">
              THE ART<br />
              OF CRAFTSMANSHIP
            </h2>

            {/* Paragraph */}
            <p className="font-sans text-[#5C4F48] text-xs sm:text-sm md:text-[14.5px] leading-[1.7] mb-8 max-w-lg">
              Every weave, every motif, every detail is a testament to the skill of our artisans. We blend age-old techniques with contemporary design to create pieces that are truly timeless.
            </p>

            {/* 4 Pillars in a Single Horizontal Row of 4 Icons */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-9 max-w-lg select-none">
              {pillars.map((pillar) => (
                <div key={pillar.line1} className="flex flex-col items-center text-center gap-2.5">
                  <div className="flex items-center justify-center h-9">
                    <CraftIcon type={pillar.type} />
                  </div>
                  <div className="font-serif text-[9px] sm:text-[10px] xl:text-[10.5px] uppercase tracking-[0.14em] text-[#3D2D27] font-medium leading-[1.35]">
                    <span>{pillar.line1}</span>
                    <br />
                    <span>{pillar.line2}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Layered Overlapping Photos + Vertical Motto */}
          <div className="lg:col-span-4 relative flex items-center justify-between h-[440px] sm:h-[480px] lg:h-[520px] xl:h-[545px]">
            
            {/* Overlapping Photo Composition Container */}
            <div className="relative flex-1 h-full">
              
              {/* Back Photo: Royal Embroidered Drape (Top-Right) */}
              <div className="absolute top-0 right-2 sm:right-4 lg:right-6 xl:right-8 w-[205px] sm:w-[235px] lg:w-[245px] xl:w-[275px] h-[255px] sm:h-[285px] lg:h-[305px] xl:h-[325px] overflow-hidden shadow-md bg-[#F5ECE0]">
                <img
                  src="/images/landing/assets_v2/craft_fabric.png"
                  alt="Intricate zardozi embroidered fabric drape"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>

              {/* Front Photo: Palace Corridor with Scattered Rose Petals (Bottom-Left Overlap) */}
              <div className="absolute bottom-0 left-0 sm:left-2 lg:left-0 xl:left-2 w-[190px] sm:w-[215px] lg:w-[220px] xl:w-[245px] h-[280px] sm:h-[320px] lg:h-[345px] xl:h-[370px] overflow-hidden border-[4px] border-white shadow-[0_18px_40px_rgba(0,0,0,0.17)] bg-[#F5ECE0] z-10">
                <img
                  src="/images/landing/assets_v2/craft_palace.png"
                  alt="Sandstone palace corridor with scattered rose petals"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>

            </div>

            {/* Vertical Stacked Motto with Delicate Line & Ornamental Chhatri Finial (Far Right) */}
            <div className="flex flex-col justify-start items-center h-full select-none pl-3 sm:pl-4 lg:pl-5 pt-12 sm:pt-16 lg:pt-20">
              
              {/* Stacked Vertical Words */}
              <div className="flex flex-col items-center text-center font-serif text-[9px] sm:text-[10px] xl:text-[10.5px] uppercase tracking-[0.24em] text-[#7A6E67] font-medium leading-[1.8] mb-5">
                <span>MORE</span>
                <span>THAN</span>
                <span>FASHION</span>
                <span className="h-4 block" />
                <span>A LIVING</span>
                <span>TRADITION</span>
              </div>

              {/* Vertical Guide Line with Jali Star Finial */}
              <div className="flex flex-col items-center">
                <div className="w-[1px] h-20 sm:h-24 bg-gradient-to-b from-[#9E784F]/10 via-[#9E784F]/40 to-[#9E784F]" />
                
                {/* 4-point Jali Star & Finial */}
                <svg viewBox="0 0 20 40" className="w-4 h-9 text-[#9E784F]" fill="none">
                  <g transform="translate(10, 16)">
                    <path
                      d="M0 -8 C2.2 -5 5 -2.2 8 0 C5 2.2 2.2 5 0 8 C-2.2 5 -5 2.2 -8 0 C-5 -2.2 -2.2 -5 0 -8 Z"
                      stroke="#9E784F"
                      strokeWidth="0.8"
                    />
                    <circle cx="0" cy="0" r="1.3" fill="#9E784F" />
                  </g>
                  <line x1="10" y1="25" x2="10" y2="35" stroke="#9E784F" strokeWidth="0.75" />
                  <circle cx="10" cy="36.5" r="1" fill="#9E784F" />
                </svg>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
