import { ArrowRight } from 'lucide-react'

export function RangethnicsStory() {
  return (
    <section id="our-story" className="relative w-full bg-[#FAF6F0] py-16 md:py-24 border-b border-[#E8DFC8]/40 overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Narrative, CTA & Monogram Seal */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Eyebrow */}
            <span className="text-[11px] md:text-xs font-serif uppercase tracking-[0.25em] text-[#9E784F] font-semibold mb-3 block">
              OUR STORY
            </span>

            {/* Headline */}
            <h2 className="font-serif text-[#2B1B17] text-3xl sm:text-4xl md:text-5xl leading-[1.08] tracking-[0.02em] font-normal mb-5">
              ROOTED IN<br />
              HERITAGE.<br />
              MADE FOR THE<br />
              MODERN YOU.
            </h2>

            {/* Paragraph */}
            <p className="font-sans text-[#5C4F48] text-sm sm:text-base leading-relaxed max-w-lg mb-7">
              At Rangethnics, we celebrate India's rich heritage through timeless designs, intricate craftsmanship and modern silhouettes — creating ethnic wear that feels as special as your moments.
            </p>

            {/* CTA & Monogram Seal Row */}
            <div className="flex items-center gap-8">
              <a
                href="#signature-edit"
                className="group inline-flex items-center gap-2 font-serif text-xs md:text-sm uppercase tracking-[0.2em] font-semibold text-[#2B1B17] hover:text-[#9E784F] transition-colors border-b border-[#2B1B17]/40 pb-1"
              >
                <span>DISCOVER OUR STORY</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </a>

              {/* Vector Heritage Monogram Seal - Completely transparent with no box */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 select-none">
                <svg
                  viewBox="0 0 160 160"
                  className="w-full h-full"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <path id="sealTopArc" d="M 22,80 A 58,58 0 1,1 138,80" fill="none" />
                    <path id="sealBottomArc" d="M 138,80 A 58,58 0 0,1 22,80" fill="none" />
                  </defs>

                  {/* Outer Fine Ring */}
                  <circle cx="80" cy="80" r="74" stroke="#9E784F" strokeWidth="0.9" strokeOpacity="0.65" />
                  <circle cx="80" cy="80" r="70" stroke="#9E784F" strokeWidth="0.5" strokeDasharray="1.5 2.5" strokeOpacity="0.45" />

                  {/* Four Cardinal Diamond Flourishes */}
                  <line x1="80" y1="2" x2="80" y2="8" stroke="#9E784F" strokeWidth="0.85" />
                  <polygon points="80,1 82.5,5 80,9 77.5,5" fill="#9E784F" opacity="0.85" />
                  <line x1="80" y1="152" x2="80" y2="158" stroke="#9E784F" strokeWidth="0.85" />
                  <polygon points="80,159 82.5,155 80,151 77.5,155" fill="#9E784F" opacity="0.85" />
                  <line x1="152" y1="80" x2="158" y2="80" stroke="#9E784F" strokeWidth="0.85" />
                  <polygon points="159,80 155,82.5 151,80 155,77.5" fill="#9E784F" opacity="0.85" />
                  <line x1="2" y1="80" x2="8" y2="80" stroke="#9E784F" strokeWidth="0.85" />
                  <polygon points="1,80 5,82.5 9,80 5,77.5" fill="#9E784F" opacity="0.85" />

                  {/* Circular Typography: Top Arc */}
                  <text
                    fontFamily="'Playfair Display', Georgia, serif"
                    fontSize="7.8"
                    fontWeight="600"
                    letterSpacing="0.22em"
                    fill="#6A4E2F"
                    opacity="0.92"
                  >
                    <textPath href="#sealTopArc" startOffset="50%" textAnchor="middle">
                      THE ROYAL RANGETHNICS
                    </textPath>
                  </text>

                  {/* Circular Typography: Bottom Arc */}
                  <text
                    fontFamily="'Playfair Display', Georgia, serif"
                    fontSize="7.2"
                    fontWeight="600"
                    letterSpacing="0.2em"
                    fill="#6A4E2F"
                    opacity="0.9"
                  >
                    <textPath href="#sealBottomArc" startOffset="50%" textAnchor="middle">
                      ROOTED IN HERITAGE
                    </textPath>
                  </text>

                  {/* Side Star separators */}
                  <circle cx="20" cy="80" r="1.3" fill="#9E784F" opacity="0.8" />
                  <circle cx="140" cy="80" r="1.3" fill="#9E784F" opacity="0.8" />

                  {/* Inner Concentric Ring */}
                  <circle cx="80" cy="80" r="41" stroke="#9E784F" strokeWidth="0.7" strokeOpacity="0.55" />

                  {/* Central Vertical Spire / Needle */}
                  <line x1="80" y1="44" x2="80" y2="116" stroke="#9E784F" strokeWidth="0.8" strokeOpacity="0.65" />
                  <polygon points="80,41 81.8,45 80,49 78.2,45" fill="#9E784F" opacity="0.8" />
                  <polygon points="80,119 81.8,115 80,111 78.2,115" fill="#9E784F" opacity="0.8" />

                  {/* Central Ornate Monogram R */}
                  <g transform="translate(65, 55)">
                    <path d="M8 8 L8 42 M2 8 L14 8 M2 42 L15 42" stroke="#4A3119" strokeWidth="2" strokeLinecap="square" />
                    <path d="M8 9 C20 9, 26 12, 26 20 C26 28, 19 30, 8 30" fill="none" stroke="#4A3119" strokeWidth="2" />
                    <path d="M17 29 C20 34, 24 39, 29 42" fill="none" stroke="#4A3119" strokeWidth="2" strokeLinecap="round" />
                    <path d="M-2 30 C-3 22, 5 16, 14 16 C20 16, 23 19, 23 23 C23 27, 12 30, 4 32 C4 37, 10 40, 18 40 C22 40, 25 38, 27 36" fill="none" stroke="#BA8845" strokeWidth="1" opacity="0.85" />
                  </g>
                </svg>
              </div>
            </div>
          </div>

          {/* Right Column: Arched Couple Photo + Botanical Branch + Lifestyle Tags */}
          <div className="lg:col-span-6 flex items-center justify-center lg:justify-end">
            <div className="relative flex items-center gap-5 sm:gap-7 lg:gap-8">
              
              {/* Arched Couple Container */}
              <div className="relative w-[240px] sm:w-[300px] md:w-[340px] aspect-[3/3.8] overflow-hidden rounded-t-[140px] rounded-b-xl border border-[#C5A059]/40 shadow-[0_15px_35px_rgba(43,27,23,0.08)] bg-[#F5ECE0]">
                <img
                  src="/images/landing/assets/our_story_couple.png"
                  alt="Royal Couple in Ethnic Wear"
                  className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                />
              </div>

              {/* Botanical Line Art - Pristine Transparent Branch */}
              <div className="hidden sm:block w-14 sm:w-16 md:w-20 shrink-0 opacity-85 select-none transition-transform duration-500 hover:scale-105">
                <img
                  src="/images/landing/assets/botanical_branch.png"
                  alt="Hand-drawn Botanical Branch"
                  className="w-full h-auto object-contain"
                />
              </div>

              {/* Vertical Lifestyle Story Tags with Star Divider */}
              <div className="relative flex flex-col justify-center items-center gap-5 sm:gap-6 border-l border-[#C5A059]/30 pl-4 sm:pl-5 py-4">
                {/* Central Star Flourish on the border */}
                <div className="absolute -left-[4px] top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 bg-[#9E784F] opacity-80 shadow-sm" />
                
                {['PEOPLE', 'FABRICS', 'CULTURE', 'MOMENTS'].map((tag) => (
                  <span
                    key={tag}
                    style={{ writingMode: 'vertical-rl' }}
                    className="font-serif text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-[#7A6E67] font-medium select-none"
                  >
                    {tag}
                  </span>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
