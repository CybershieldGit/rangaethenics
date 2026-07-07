import { Button } from '../ui/Button'
import { Link } from 'react-router-dom'

export function PromoBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-8">
      <div className="relative h-64 overflow-hidden md:h-80">
        <img
          src="/images/new_arival.png"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

        {/* Decorative frame: corners + connecting lines */}
        <div className="pointer-events-none absolute inset-3 md:inset-6">
          {/* Edge lines */}
          <img
            src="/square_straight.svg"
            alt=""
            className="absolute left-7 right-7 top-0 h-px w-[calc(100%-3.5rem)] object-fill md:left-10 md:right-10 md:w-[calc(100%-5rem)]"
          />
          <img
            src="/square_straight.svg"
            alt=""
            className="absolute bottom-0 left-7 right-7 h-px w-[calc(100%-3.5rem)] object-fill md:left-10 md:right-10 md:w-[calc(100%-5rem)]"
          />
          <div className="absolute top-7 bottom-7 left-0 w-px bg-white/80 md:top-10 md:bottom-10" />
          <div className="absolute top-7 bottom-7 right-0 w-px bg-white/80 md:top-10 md:bottom-10" />

          {/* Corners */}
          <img
            src="/corner_sqare.svg"
            alt=""
            className="absolute left-0 top-0 h-7 w-7 md:h-10 md:w-10"
          />
          <img
            src="/corner_sqare.svg"
            alt=""
            className="absolute right-0 top-0 h-7 w-7 -scale-x-100 md:h-10 md:w-10"
          />
          <img
            src="/corner_sqare.svg"
            alt=""
            className="absolute bottom-0 left-0 h-7 w-7 -scale-y-100 md:h-10 md:w-10"
          />
          <img
            src="/corner_sqare.svg"
            alt=""
            className="absolute bottom-0 right-0 h-7 w-7 -scale-100 md:h-10 md:w-10"
          />
        </div>

        <div className="absolute inset-0 flex items-center">
          <div className="w-full px-6 py-8 md:px-12 md:py-0">
            <p className="mb-2 text-[10px] font-medium tracking-widest text-white/80 uppercase md:text-xs">
              Limited Time
            </p>
            <h2 className="max-w-md font-serif text-2xl leading-tight text-white md:text-4xl">
              Celebrate Tradition with Exclusive Styles
            </h2>
            <p className="mt-3 max-w-sm text-xs text-white/85 md:text-sm">
              Discover handcrafted pieces in limited quantities.
            </p>
            <div className="mt-6">
              <Link to="/products?category=all&newArrival=true">
                <Button variant="white">Shop New Arrivals</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
