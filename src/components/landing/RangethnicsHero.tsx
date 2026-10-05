import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

export function RangethnicsHero() {
  const [activeSlide, setActiveSlide] = useState(0)

  const slides = [
    {
      eyebrowLine1: "ETHNIC WEAR FOR LIFE'S",
      eyebrowLine2: 'BEAUTIFUL MOMENTS',
      line1: 'TIMELESS',
      line2: 'ETHNIC.',
      line3: 'REFINED',
      line4: 'FOR TODAY.',
      subtextLine1: 'Traditional craftsmanship. Contemporary silhouettes.',
      subtextLine2: 'Made for your most special moments.',
    },
    {
      eyebrowLine1: 'ROYAL COUTURE &',
      eyebrowLine2: 'HEIRLOOM CRAFT',
      line1: 'REGAL',
      line2: 'SILHOUETTES.',
      line3: 'WOVEN',
      line4: 'WITH SOUL.',
      subtextLine1: 'Centuries of Indian artisanal mastery brought to life in',
      subtextLine2: 'contemporary celebratory attire.',
    },
    {
      eyebrowLine1: 'THE FESTIVE &',
      eyebrowLine2: 'BRIDAL ANTHOLOGY',
      line1: 'MODERN',
      line2: 'GRACE.',
      line3: 'ROOTED',
      line4: 'IN HERITAGE.',
      subtextLine1: 'Impeccable hand-embroidered ensembles crafted for',
      subtextLine2: 'weddings, festivities, and milestones.',
    },
  ]

  const current = slides[activeSlide]

  return (
    <section className="relative w-full overflow-hidden border-b border-[#E8DFC8]/50 min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] xl:min-h-[760px] flex items-center bg-[#FAF7F1]">
      {/* Full Panoramic Background Image */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="/images/landing/assets/hero_panoramic.png"
          alt="Timeless Ethnic Refined For Today"
          className="w-full h-full object-cover object-[72%_center] lg:object-center"
        />

        {/* Soft, warm editorial gradient on the left to ensure crisp text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F1] via-[#FAF7F1]/85 to-transparent w-full lg:w-[58%]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] w-full px-6 sm:px-10 lg:px-16 py-14 lg:py-24">
        <div className="max-w-xl lg:max-w-2xl">
          {/* Eyebrow in 2 lines */}
          <div className="text-[11px] md:text-[12px] font-sans uppercase tracking-[0.28em] text-[#9A7A57] font-semibold mb-5 leading-[1.45]">
            <span>{current.eyebrowLine1}</span>
            <br />
            <span>{current.eyebrowLine2}</span>
          </div>

          {/* Main Giant High-Contrast Serif Headline */}
          <h1 className="font-serif text-[#221815] text-5xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[80px] leading-[1.03] tracking-[0.01em] font-semibold mb-6">
            <span className="block">{current.line1}</span>
            <span className="block">{current.line2}</span>
            <span className="block">{current.line3}</span>
            <span className="block">{current.line4}</span>
          </h1>

          {/* Subtitle in 2 lines */}
          <p className="font-sans text-[#52443C] text-[14px] sm:text-[15px] md:text-[16px] leading-[1.65] max-w-lg mb-8 font-normal">
            <span>{current.subtextLine1}</span>
            <br className="hidden sm:inline" />
            <span> {current.subtextLine2}</span>
          </p>

          {/* CTA Outline Button */}
          <div className="flex items-center gap-4 mb-12">
            <a
              href="#categories"
              className="group inline-flex items-center gap-3 border border-[#2B1B17]/70 hover:border-[#2B1B17] bg-transparent hover:bg-[#2B1B17] text-[#2B1B17] hover:text-white px-6 py-2.5 text-[12px] md:text-[13px] font-sans uppercase tracking-[0.2em] font-medium transition-all duration-300 shadow-2xs"
            >
              <span>EXPLORE COLLECTION</span>
              <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* Slider Pagination Numbers */}
          <div className="flex items-center gap-6 pt-4 border-t border-[#2B1B17]/15 max-w-[200px]">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                className="group flex flex-col items-center gap-1 cursor-pointer transition-all"
                aria-label={`Slide ${idx + 1}`}
              >
                <span
                  className={`font-serif text-xs md:text-sm tracking-wider transition-colors ${
                    activeSlide === idx
                      ? 'text-[#2B1B17] font-semibold'
                      : 'text-[#9C8F84] group-hover:text-[#2B1B17]'
                  }`}
                >
                  0{idx + 1}
                </span>
                <div
                  className={`h-[2px] transition-all duration-300 ${
                    activeSlide === idx ? 'w-6 bg-[#2B1B17]' : 'w-2 bg-[#9C8F84]/40 group-hover:w-4'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Vertical Badge on Top Right Pillar */}
      <div className="absolute top-8 right-8 lg:top-14 lg:right-14 z-20 flex flex-col items-center pointer-events-none select-none">
        <div className="font-serif text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-[#8C6D48] font-medium text-center leading-tight">
          <span>HERITAGE</span>
          <br />
          <span>IN EVERY</span>
          <br />
          <span>THREAD</span>
        </div>
        
        {/* Delicate vertical line with diamond ornament */}
        <div className="flex flex-col items-center mt-3">
          <div className="w-[1px] h-6 bg-[#8C6D48]/50" />
          <div className="my-1 text-[#8C6D48] text-[9px]">✦</div>
          <div className="w-[1px] h-10 bg-[#8C6D48]/50" />
        </div>
      </div>
    </section>
  )
}
