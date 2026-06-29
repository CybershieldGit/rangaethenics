import { Button } from '../ui/Button'

interface ArtisanBannerProps {
  imageSide?: 'left' | 'right'
  image?: string
}

const defaultImage =
  'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=900&h=700&fit=crop'

export function ArtisanBanner({
  imageSide = 'right',
  image = defaultImage,
}: ArtisanBannerProps) {
  const imageEl = (
    <div className="relative min-h-64 overflow-hidden md:min-h-0">
      <img
        src={image}
        alt="Master artisan at work"
        className="h-full w-full object-cover"
      />
    </div>
  )

  const textEl = (
    <div className="relative flex flex-col justify-center p-8 md:p-12 lg:p-14">
      {/* Floral corner decoration */}
      <svg
        className={`pointer-events-none absolute bottom-4 h-28 w-28 text-[#BD8A3C]/30 ${
          imageSide === 'right' ? 'left-4' : 'right-4'
        }`}
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        aria-hidden="true"
      >
        <path d="M50 95 C50 70 35 60 20 58 C38 54 48 44 50 20 C52 44 62 54 80 58 C65 60 50 70 50 95 Z" />
        <circle cx="50" cy="50" r="4" />
        <path d="M30 80 C40 78 46 72 48 64 M70 80 C60 78 54 72 52 64" />
      </svg>

      <h2 className="font-serif text-2xl leading-tight text-maroon md:text-3xl lg:text-4xl">
        Crafted by Artisans.
        <br />
        Cherished for Generations.
      </h2>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-text">
        Crafted by master artisans with techniques passed through generations, each
        piece carries the soul of tradition and the warmth of handmade craftsmanship.
      </p>
      <div className="mt-7">
        <Button>Discover Our Story</Button>
      </div>
    </div>
  )

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
      <div className="overflow-hidden rounded-lg border border-[#BD8A3C]/40 bg-cream-light">
        <div className="grid md:grid-cols-2">
          {imageSide === 'left' ? (
            <>
              {imageEl}
              {textEl}
            </>
          ) : (
            <>
              {textEl}
              {imageEl}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
