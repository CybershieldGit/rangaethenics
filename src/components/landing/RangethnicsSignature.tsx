export function RangethnicsSignature() {
  return (
    <section id="signature-edit" className="relative w-full bg-[#FAF6F0] py-16 md:py-24 border-b border-[#E8DFC8]/40">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Command Showcase Model in Maroon Bridal Lehenga */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full aspect-[4/3.2] overflow-hidden rounded-2xl border border-[#C5A059]/40 shadow-[0_15px_40px_rgba(43,27,23,0.1)] bg-[#F5ECE0]">
              <img
                src="/images/landing/assets/signature_main.png"
                alt="Signature Edit: Maroon Hand-Embroidered Bridal Lehenga"
                className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>

          {/* Right Column: Title, Subtext, Link & Dual Spotlight Product Tiles */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Eyebrow */}
            <span className="text-[11px] md:text-xs font-serif uppercase tracking-[0.25em] text-[#9E784F] font-semibold mb-2 block">
              FEATURED
            </span>

            {/* Headline */}
            <h2 className="font-serif text-[#2B1B17] text-3xl sm:text-4xl md:text-5xl font-normal tracking-[0.02em] mb-3">
              THE SIGNATURE EDIT
            </h2>

            {/* Subtitle */}
            <p className="font-sans text-[#5C4F48] text-sm sm:text-base leading-relaxed mb-8 max-w-md">
              Contemporary silhouettes inspired by India's timeless traditions.
            </p>

            {/* Dual Product Thumbnail Tiles */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {/* Tile 1: Women Handblock Kurta Set */}
              <div className="group relative overflow-hidden rounded-xl border border-[#C5A059]/40 bg-[#F5ECE0] shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="aspect-[4/3.4] overflow-hidden">
                  <img
                    src="/images/Kurta_Sets.png"
                    alt="Handblock Printed Pure Cotton Kurta Set"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Tile 2: Women Festive Blouse/Attire */}
              <div className="group relative overflow-hidden rounded-xl border border-[#C5A059]/40 bg-[#F5ECE0] shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="aspect-[4/3.4] overflow-hidden">
                  <img
                    src="/images/landing/assets/sig_women.png"
                    alt="Mustard Gold Festive Embellished Saree"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
