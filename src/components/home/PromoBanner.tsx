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
          <span
            className="absolute top-0 left-16 right-16 md:h-[1px] h-[1px] bg-[#BD8A3C]/50 md:left-[40px] md:right-[40px] mt-[2.5px]"
            style={{
              background: `linear-gradient(
                  to right,
                  transparent 0%,
                  #ffffff 8%,
                  #ffffff 92%,
                  transparent 100%
                )`,
            }}
          />
          <span
            className="absolute bottom-0 left-16 right-16 h-px bg-[#BD8A3C]/50 md:left-[40px] md:right-[40px] mb-[2.5px]"
            style={{
              background: `linear-gradient(
                to right,
                transparent 0%,
                #ffffff 8%,
                #ffffff 92%,
                transparent 100%
              )`,
            }}
          />
          <div className="absolute top-7 bottom-7 left-[2.5px] w-px bg-white/80 md:top-10 md:bottom-10"
            style={{
              background: `linear-gradient(
              to bottom,
              transparent 0%,
              #ffffff 8%,
              #ffffff 92%,
              transparent 100%
            )`,
            }} />
          <div className="absolute top-7 bottom-7 right-[2px] w-px bg-white/80 md:top-10 md:bottom-10"
            style={{
              background: `linear-gradient(
              to bottom,
              transparent 0%,
              #ffffff 8%,
              #ffffff 92%,
              transparent 100%
            )`,
            }} />

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
          <div className="w-full px-10 md:px-5 py-6 md:py-0">
            <p className="mb-1 md:mb-2 text-[9px] md:text-[10px] font-medium tracking-widest text-white/80 uppercase">
              Limited Time
            </p>
            <h2 className="max-w-[200px] md:max-w-md font-serif text-[18px] md:text-2xl md:text-4xl leading-tight text-white">
              Celebrate Tradition with Exclusive Styles
            </h2>
            <p className="mt-2 md:mt-3 max-w-[180px] md:max-w-sm text-[11px] md:text-xs md:text-sm text-white/85">
              Discover handcrafted pieces in limited quantities.
            </p>
            <div className="mt-4 md:mt-6">
              <Link to="/products?category=all&newArrival=true">
                <Button variant="white" className="!px-4 !py-2 text-xs md:!px-6 md:!py-2.5 md:text-sm">Shop New Arrivals</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
