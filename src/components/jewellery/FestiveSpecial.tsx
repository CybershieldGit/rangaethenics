import { Button } from '../ui/Button'

interface FestiveSpecialProps {
  eyebrow?: string
  note?: string
  image?: string
}

export function FestiveSpecial({
  eyebrow = 'Flat 15% Off',
  note = 'On all jewellery',
  image = '/images/festive_jewellery.png',
}: FestiveSpecialProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-8">
      <div className="relative overflow-hidden bg-black">
        <img
          src={image}
          alt=""
          className="absolute inset-y-0 right-0 h-full w-[62%] object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

        <div className="relative flex min-h-[300px] items-center md:min-h-[380px]">
          <div className="w-full px-8 py-12 md:px-14 md:py-0">
            <h2 className="font-serif text-4xl leading-tight text-white md:text-6xl">
              Festive Special
            </h2>
            <p className="mt-5 text-lg font-bold uppercase tracking-wide text-white md:text-2xl">
              {eyebrow}
            </p>
            <p className="mt-1 text-sm text-white/80 md:text-base">{note}</p>

            <div className="mt-8">
              <Button className="!px-8 !py-3">Shop Now</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
