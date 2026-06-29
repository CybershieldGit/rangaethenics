import { Button } from '../ui/Button'

export function PromoBanner() {
  return (
    <section className="relative h-64 overflow-hidden md:h-80">
      <img
        src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=1600&h=500&fit=crop"
        alt=""
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
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
    </section>
  )
}
