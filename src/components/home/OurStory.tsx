import { Button } from '../ui/Button'
import { Link } from 'react-router-dom'

function Corner({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute h-14 w-14 md:h-[72px] md:w-[72px] ${className}`}
      style={{
        backgroundColor: '#420001',
        WebkitMaskImage: 'url(/corner_sqare.svg)',
        maskImage: 'url(/corner_sqare.svg)',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
      }}
    />
  )
}

export function OurStory({ background = '#fffaf3' }: { background?: string }) {
  return (
    <section id="about" className="relative pt-[58px]" style={{ backgroundColor: background }}>
      {/* Maroon base that blends seamlessly into the footer below */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-maroon md:h-36" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
        <div className="relative bg-[#F4EADB] px-10 py-14 md:px-20 md:py-16">
          {/* Ornate frame inset from the card edges */}
          <div className="pointer-events-none absolute inset-4 md:inset-5">
            <Corner className="left-0 top-0" />
            <Corner className="right-0 top-0 -scale-x-100" />
            <Corner className="left-0 bottom-0 -scale-y-100" />
            <Corner className="right-0 bottom-0 -scale-100" />

            {/* Top & bottom gold rules, aligned just past the corner flourish */}
            <span
              className="absolute top-0 left-16 right-16 h-[0.2px] bg-[#BD8A3C]/50 md:left-[75px] md:right-[75px] mt-[4.5px]"
              style={{
                background: `linear-gradient(
                  to right,
                  transparent 0%,
                  #BD8A3C 8%,
                  #BD8A3C 92%,
                  transparent 100%
                )`,
              }}
            />
            <span
              className="absolute bottom-0 left-16 right-16 h-px bg-[#BD8A3C]/50 md:left-[75px] md:right-[75px] mb-[4.5px]"
              style={{
                background: `linear-gradient(
                to right,
                transparent 0%,
                #BD8A3C 8%,
                #BD8A3C 92%,
                transparent 100%
              )`,
              }}
            />
            {/* Left */}
            <span
              className="absolute left-0 top-16 bottom-16 w-px ml-[4px] md:ml-[4.5px] md:top-[75px] md:bottom-[75px]"
              style={{
                background: `linear-gradient(
                              to bottom,
                              transparent 0%,
                              #BD8A3C 8%,
                              #BD8A3C 92%,
                              transparent 100%
                            )`,
              }}
            />

            {/* Right */}
            <span
              className="absolute right-0 top-16 bottom-16 w-px md:mr-[4.5px] mr-[4px]  md:top-[75px] md:bottom-[75px]"
              style={{
                background: `linear-gradient(
                              to bottom,
                              transparent 0%,
                              #BD8A3C 8%,
                              #BD8A3C 92%,
                              transparent 100%
                            )`,
              }}
            />
          </div>
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div className="flex flex-col justify-center">
              <h2 className="font-serif font-bold leading-tight text-maroon text-3xl md:text-[40px]">
                Rooted in Tradition. Crafted with Purpose.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-text md:text-[15px]">
                At Rang Ethnics, we believe in preserving our rich heritage through
                intricate craftsmanship and elegant designs. Every piece we create is a
                reflection of our passion for authenticity, quality, and timeless beauty.
              </p>
              <div className="mt-8 cursor-pointer">
                <Link to="/about">
                  <Button>Know More About Us</Button>
                </Link>
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden md:aspect-[5/4]">
              <img
                src="/images/about.png"
                alt="Artisan crafting jewellery"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
