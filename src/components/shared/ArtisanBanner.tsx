import { Button } from '../ui/Button'
import { Link } from 'react-router-dom'
import React from 'react'

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
      <div className="relative overflow-hidden rounded-lg h-[363px] w-full bg-white flex flex-row items-center shadow-sm">
        
        {/* Left Side Content Container */}
        <div className="relative flex-1 h-full flex flex-col justify-center pl-6 sm:pl-10 md:pl-16 pr-6 z-10 max-w-[60%] sm:max-w-[62%]">
          
          {/* Decorative Ornate Frame */}
          <div className="absolute top-6 bottom-6 left-6 right-0 border-t border-b border-l border-maroon/80 pointer-events-none">
            {/* Top-Left Corner Flourish */}
            <img 
              src="/corner_maroon.svg" 
              alt="" 
              className="absolute -top-[1.5px] -left-[1.5px] w-8 h-8 md:w-11 md:h-11 object-contain select-none"
            />
            {/* Bottom-Left Corner Flourish */}
            <img 
              src="/corner_maroon.svg" 
              alt="" 
              className="absolute -bottom-[1.5px] -left-[1.5px] w-8 h-8 md:w-11 md:h-11 object-contain select-none scale-y-[-1]"
            />
          </div>

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
        <div className="w-[40%] sm:w-[38%] h-full relative overflow-hidden flex items-center justify-end">
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

