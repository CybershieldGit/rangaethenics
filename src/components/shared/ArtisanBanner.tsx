import { Button } from '../ui/Button'
import { Link } from 'react-router-dom'
import React from 'react'

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

interface ArtisanBannerProps {
  image?: string
  title?: React.ReactNode
  description?: React.ReactNode
}

export function ArtisanBanner({
  image = '/images/ourstory.png',
  title = (
    <>
      Crafted by Artisans.
      <br />
      Cherished for Generations
    </>
  ),
  description = "Crafted by master artisans with techniques passed through generations."
}: ArtisanBannerProps) {
  return (
    <section className="mx-auto max-w-[1300px] px-4 py-12 md:px-8 md:py-16">
      <div className="relative overflow-hidden h-auto md:h-[363px] w-full bg-[#F4EADB] flex flex-col md:flex-row items-center shadow-sm">

        {/* Ornate frame inset from the card edges */}
        <div className="pointer-events-none absolute inset-4 md:inset-5">
          <Corner className="left-0 top-0" />
          <Corner className="right-0 top-0 -scale-x-100 md:hidden" />
          <Corner className="left-0 bottom-0 -scale-y-100" />
          <Corner className="right-0 bottom-0 -scale-100 md:hidden" />

          {/* Top & bottom gold rules, aligned just past the corner flourish */}
          <span
            className="absolute top-0 left-16 right-16 h-[1px] bg-[#BD8A3C]/50 md:left-[75px] md:right-[305px] mt-[2.5px]"
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
            className="absolute bottom-0 left-16 right-16 h-px bg-[#BD8A3C]/50 md:left-[75px] md:right-[438px] mb-[3.5px]"
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

          {/* Right - Mobile Only */}
          <span
            className="absolute right-0 top-16 bottom-16 w-px mr-[4px] md:hidden"
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

        {/* Left Side Content Container */}
        <div className="relative w-full md:flex-1 md:h-full flex flex-col justify-center pl-8 pr-8 py-10 md:py-0 md:pl-16 md:pr-6 z-10">
          {/* Text content */}
          <div className="relative z-10 py-4 pl-4 md:pl-8 pr-2">
            <h2 className="font-serif text-lg sm:text-2xl md:text-3xl lg:text-[34px] leading-tight text-maroon font-bold">
              {title}
            </h2>
            <p className="mt-3 md:mt-4 max-w-md text-xs sm:text-sm md:text-base leading-relaxed text-text-dark font-medium opacity-90">
              {description}
            </p>
            <div className="mt-5 md:mt-7">
              <Link to="/about">
                <Button className="rounded-lg !px-6 !py-2.5 md:!px-8 md:!py-3 bg-maroon text-white border-maroon hover:bg-maroon-dark transition-all duration-300 cursor-pointer text-xs md:text-sm font-semibold shadow-sm">
                  Discover Our Story
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side Image Container */}
        <div className="hidden md:flex w-full md:w-[40%] h-64 md:h-full relative overflow-hidden items-center justify-end z-10">
          <img
            src={image}
            alt="Artisan Showcase"
            className="h-full w-full object-cover object-left"
          />
        </div>

      </div>
    </section>
  )
}

