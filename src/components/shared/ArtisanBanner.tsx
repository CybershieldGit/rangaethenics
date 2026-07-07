import { Button } from '../ui/Button'
import { Link } from 'react-router-dom'

interface ArtisanBannerProps {
  image?: string
}

export function ArtisanBanner({ image = '/images/ourstory.png' }: ArtisanBannerProps) {
  return (
    <section className="mx-auto max-w-[1300px] px-4 py-12 md:px-8 md:py-16">
      <div className="relative overflow-hidden rounded-lg h-[363px] w-full">
        <img
          src={image}
          alt="Master artisan at work"
          className="absolute inset-0 h-full w-full object-center opacity-100"
          style={{ opacity: 1, boxSizing: 'content-box' }}
        />

        <div className="absolute inset-y-0 left-[15%] sm:left-[16%] flex max-w-[80%] sm:max-w-[38%] flex-col justify-center p-4 sm:p-0">
          <h2 className="font-serif text-2xl leading-tight text-maroon md:text-3xl lg:text-4xl">
            Crafted by Artisans.
            <br />
            Cherished for
            <br className="hidden sm:block" />
            Generations
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-text md:text-base">
            Crafted by master artisans with
            <br className="hidden sm:block" />
            techniques passed through generations.
          </p>
          <div className="mt-7">
            <Link to="/about">
              <Button className="rounded-lg !px-8 !py-3 cursor-pointer">Discover Our Story</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
