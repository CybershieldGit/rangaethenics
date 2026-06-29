import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '../ui/Button'

const slides = [
  {
    image: '/images/hero_section.png',
    headline: 'Where Heritage Meets Elegance',
    subtext:
      'Exquisite jewellery and timeless clothing crafted to celebrate tradition and elevate everyday moments.',
  },
  {
    image: '/images/hero_section.png',
    headline: 'Celebrate Tradition with Style',
    subtext:
      'Discover handcrafted pieces that blend centuries of artistry with contemporary elegance.',
  },
  {
    image: '/images/hero_section.png',
    headline: 'Timeless Ethnic Wear',
    subtext:
      'Elegant weaves and contemporary silhouettes for every celebration and everyday grace.',
  },
]

export function HeroCarousel() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const goTo = (index: number) => setCurrent(index)
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length)
  const next = () => setCurrent((c) => (c + 1) % slides.length)

  return (
    <section className="relative h-[85vh] min-h-[560px] max-h-[820px] overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${i === current ? 'opacity-100' : 'opacity-0'}`}
        >
          <img src={slide.image} alt="" className="h-full w-full object-cover" />
        </div>
      ))}

      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
          <div className="max-w-lg">
            <h1 className="font-serif text-5xl leading-[1.1] text-maroon md:text-6xl lg:text-7xl">
              {slides[current].headline}
            </h1>

            <img
              src="/hero_seperator.svg"
              alt=""
              className="mt-6 mb-8 h-4 w-auto"
            />

            <p className="mb-8 max-w-md text-base leading-relaxed text-text-dark">
              {slides[current].subtext}
            </p>

            <div className="flex flex-wrap gap-4">
              <Button className="!px-8 !py-3">Our Story</Button>
              <Button variant="outline" className="!px-8 !py-3">
                Explore Collections
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel controls */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-4">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous slide"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-maroon/80 text-white transition-colors hover:bg-maroon"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all ${i === current ? 'w-6 bg-maroon' : 'w-2 bg-maroon/30'}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-maroon/40 bg-white/40 text-maroon transition-colors hover:bg-maroon hover:text-white"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Decorative mahal scalloped frame at the bottom */}
      <svg
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 block"
        width="100%"
        height="30"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="mahalFrame"
            patternUnits="userSpaceOnUse"
            width="75"
            height="30"
          >
            {/* Fill below the scallop with the page background to hide the image (full tile width, no gaps) */}
            <path
              d="M73.9707 0.00179482C73.9707 2.52848 71.5245 4.57728 68.5063 4.57728H68.2385V9.85911H62.7929V11.3651C62.7929 13.5506 60.6771 15.3228 58.0669 15.3228H57.5932C57.5932 23.7637 40.6651 24.4472 37.4711 28.9336C34.277 24.4472 17.3489 23.7637 17.3489 15.3228H16.8752C14.265 15.3228 12.1492 13.5506 12.1492 11.3651V9.85911H6.70358V4.57728H6.43576C3.41757 4.57728 0.970703 2.52848 0.970703 0.00179482 L0 0 L0 30 L75 30 L75 0 Z"
              fill="#fbf3e7"
              stroke="none"
            />
            {/* Gold scallop line */}
            <path
              d="M73.9707 0.00179482C73.9707 2.52848 71.5245 4.57728 68.5063 4.57728H68.2385V9.85911H62.7929V11.3651C62.7929 13.5506 60.6771 15.3228 58.0669 15.3228H57.5932C57.5932 23.7637 40.6651 24.4472 37.4711 28.9336C34.277 24.4472 17.3489 23.7637 17.3489 15.3228H16.8752C14.265 15.3228 12.1492 13.5506 12.1492 11.3651V9.85911H6.70358V4.57728H6.43576C3.41757 4.57728 0.970703 2.52848 0.970703 0.00179482"
              fill="none"
              stroke="#BD8A3C"
              strokeWidth="1.9403"
            />
          </pattern>
        </defs>
        <rect width="100%" height="30" fill="url(#mahalFrame)" />
      </svg>
    </section>
  )
}
