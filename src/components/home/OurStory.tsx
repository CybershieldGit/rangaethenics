import { Button } from '../ui/Button'

export function OurStory() {
  return (
    <section id="about" className="bg-cream-dark py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="overflow-hidden bg-cream-light">
          <div className="grid md:grid-cols-2">
            <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
              <p className="mb-3 text-xs font-bold tracking-[0.2em] text-maroon uppercase">
                Our Story
              </p>
              <h2 className="font-serif text-3xl leading-tight text-maroon md:text-4xl lg:text-5xl">
                Rooted in Tradition.
                <br />
                Crafted with Purpose.
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-text md:text-base">
                At Rangethnics, we believe that every piece of jewellery and every thread of
                fabric carries a story — of artisans who pour their hearts into their craft,
                of traditions passed down through generations, and of celebrations that deserve
                to be adorned with nothing less than elegance. Our collections are a tribute
                to India&apos;s rich heritage, reimagined for the modern muse.
              </p>
              <div className="mt-8">
                <Button>Know More About Us</Button>
              </div>
            </div>
            <div className="relative min-h-64 md:min-h-0">
              <img
                src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=600&fit=crop"
                alt="Artisan crafting embroidery"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
