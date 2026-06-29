import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '../ui/Button'

const slides = [
  {
    image:
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=1600&h=800&fit=crop',
    headline: 'Where Heritage Meets Elegance',
    subtext:
      'Exquisite jewellery and timeless clothing crafted to celebrate tradition and elevate everyday moments.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1600&h=800&fit=crop',
    headline: 'Celebrate Tradition with Style',
    subtext:
      'Discover handcrafted pieces that blend centuries of artistry with contemporary elegance.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=1600&h=800&fit=crop',
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
    <section className="relative h-[70vh] min-h-[480px] max-h-[700px] overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${i === current ? 'opacity-100' : 'opacity-0'}`}
        >
          <img
            src={slide.image}
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
        </div>
      ))}

      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
          <div className="max-w-lg">
            <h1 className="font-serif text-4xl leading-tight text-white md:text-5xl lg:text-6xl">
              {slides[current].headline.split(' ').map((word, i, arr) => {
                const isHighlight = word === 'Heritage' || word === 'Elegance'
                return (
                  <span key={i}>
                    {isHighlight ? (
                      <span className="relative">
                        {word}
                        <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-blue-400/60" />
                      </span>
                    ) : (
                      word
                    )}
                    {i < arr.length - 1 ? ' ' : ''}
                  </span>
                )
              })}
            </h1>

            <div className="my-5 flex items-center gap-2">
              <span className="h-px w-10 bg-gold" />
              <span className="h-2 w-2 rounded-full border border-gold" />
              <span className="h-px w-10 bg-gold" />
            </div>

            <p className="mb-8 text-sm leading-relaxed text-white/90 md:text-base">
              {slides[current].subtext}
            </p>

            <div className="flex flex-wrap gap-4">
              <Button>Our Story</Button>
              <Button variant="outline" className="!border-white !text-white hover:!bg-white hover:!text-maroon">
                Explore Collections
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel controls */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-4">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous slide"
          className="text-white/80 transition-colors hover:text-white"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${i === current ? 'w-8 bg-white' : 'w-1.5 bg-white/50'}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          className="text-white/80 transition-colors hover:text-white"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  )
}
