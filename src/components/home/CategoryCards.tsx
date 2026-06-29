import { Link } from 'react-router-dom'
import { Button } from '../ui/Button'

const categories = [
  {
    id: 'jewellery',
    title: 'Jewellery',
    description: 'Timeless design that add touch of tradition to every moment.',
    cta: 'Shop Jewellery',
    image: '/images/jewellery.png',
    to: '/jewellery',
    align: 'left' as const,
  },
  {
    id: 'clothing',
    title: 'Clothing',
    description: 'Elegant weaves and contemporary style for everyone',
    cta: 'Shop Clothing',
    image: '/images/clothing.png',
    to: '/clothing',
    align: 'right' as const,
  },
]

export function CategoryCards() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 md:px-8">
      <div className="grid gap-4 md:grid-cols-2">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            id={cat.id}
            to={cat.to}
            className="group relative block h-72 overflow-hidden md:h-80"
          >
            <img
              src={cat.image}
              alt={cat.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div
              className={`absolute bottom-0 p-6 md:p-8 ${cat.align === 'right' ? 'right-0 text-right' : 'left-0 text-left'}`}
            >
              <h3 className="font-serif text-3xl text-white md:text-4xl">{cat.title}</h3>
              <p className="mt-2 max-w-xs text-sm text-white/85">{cat.description}</p>
              <div className={`mt-4 ${cat.align === 'right' ? 'flex justify-end' : ''}`}>
                <Button variant="ghost" className="!text-sm">
                  {cat.cta}
                </Button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
