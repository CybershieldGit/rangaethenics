import { Link } from 'react-router-dom'

// Tints the white square_straight.svg to the gold brand color (#BD8A3C)
const GOLD_TINT =
  'brightness(0) saturate(100%) invert(63%) sepia(42%) saturate(523%) hue-rotate(358deg) brightness(89%) contrast(86%)'

interface Occasion {
  name: string
  image: string
  className: string
}

const occasions: Occasion[] = [
  {
    name: 'Evening Glamour',
    image: '/images/Evening_Glamour.png',
    className: 'md:col-span-2 md:row-start-1',
  },
  {
    name: 'Heritage Trousseau',
    image: '/images/Heritage_Trousseau.png',
    className: 'md:col-start-3 md:row-span-2',
  },
  {
    name: 'Celebration Looks',
    image: '/images/Celebration_Looks.png',
    className: 'md:col-start-1 md:row-start-2',
  },
  {
    name: 'Festive Edit',
    image: '/images/Festive_Edit.png',
    className: 'md:col-start-2 md:row-start-2',
  },
]

export function OccasionSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16 mb-[50px]">
      {/* Heading with trailing divider */}
      <div className="flex items-center gap-3 md:gap-4">
        <h2
          className="font-serif whitespace-nowrap text-maroon text-[28px] font-bold leading-none tracking-normal sm:text-4xl md:text-[48px]"
        >
          Shop by Occasion
        </h2>
        <img
          src="/square_straight.svg"
          alt=""
          className="h-px min-w-0 flex-1 object-fill"
          style={{ filter: GOLD_TINT }}
        />
        <span className="flex shrink-0 items-center gap-2">
          <img src="/flower.svg" alt="" className="h-5 w-auto" />
          <span
            className="block h-px w-12"
            style={{
              background:
                'linear-gradient(to right, transparent, #BD8A3C 50%, transparent)',
            }}
          />
        </span>
      </div>
      <p className="mt-3 max-w-xl text-sm text-text md:text-base mb-[50px]">
        Find the perfect ensemble for every wedding event, beautifully curated for
        timeless elegance.
      </p>

      {/* Bento grid */}
      <div className="mt-0 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:grid-rows-2 md:[height:600px]">
        {occasions.map((occasion) => (
          <Link
            key={occasion.name}
            to={`/products?category=all&occasion=${encodeURIComponent(occasion.name)}`}
            className={`group relative block overflow-hidden ${occasion.className} min-h-[200px]`}
          >
            <img
              src={occasion.image}
              alt={occasion.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <h3 className="absolute bottom-5 left-5 font-serif text-xl text-white md:text-2xl">
              {occasion.name}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  )
}
