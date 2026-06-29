import { Heart, Award, Leaf, Gift, Headphones } from 'lucide-react'

const features = [
  {
    icon: Heart,
    title: 'Handcrafted with love',
    description: 'Made by skilled artisans.',
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Finest materials, flawless finish.',
  },
  {
    icon: Leaf,
    title: 'Timeless Design',
    description: 'Blending tradition with modern style.',
  },
  {
    icon: Gift,
    title: 'Secure Packaging',
    description: 'Packed with care, delivered safely.',
  },
  {
    icon: Headphones,
    title: 'Customer First',
    description: "We're here for you always.",
  },
]

export function ValueProposition() {
  return (
    <section className="bg-cream-dark py-10">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 md:grid-cols-5 md:gap-4 md:px-8">
        {features.map((feature) => (
          <div key={feature.title} className="flex flex-col items-center text-center md:flex-row md:items-start md:gap-3 md:text-left">
            <feature.icon
              size={28}
              strokeWidth={1.2}
              className="mb-2 shrink-0 text-maroon md:mb-0"
            />
            <div>
              <p className="text-sm font-bold text-maroon">{feature.title}</p>
              <p className="mt-0.5 text-xs text-text">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
