import { Button } from '../ui/Button'

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
        <div className="absolute inset-0 flex items-center">
          <div className="w-full px-6 md:px-12">
            <p className="mb-2 text-xs font-medium tracking-widest text-white/80 uppercase">
              Limited Time
            </p>
            <h2 className="max-w-md font-serif text-3xl leading-tight text-white md:text-4xl">
              Celebrate Tradition with Exclusive Styles
            </h2>
            <p className="mt-3 max-w-sm text-sm text-white/85">
              Discover handcrafted pieces in limited quantities.
            </p>
            <div className="mt-6">
              <Button variant="white">Shop New Arrivals</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
