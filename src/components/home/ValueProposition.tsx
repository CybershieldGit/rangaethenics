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
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-2 gap-6 rounded-lg bg-[#F7EEE0] px-6 py-8 md:grid-cols-5 md:gap-4 md:px-8">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col items-center text-center md:flex-row md:items-start md:gap-3 md:text-left">
              <feature.icon
                size={32}
                strokeWidth={1.2}
                className="mb-2 shrink-0 text-[#BD8A3C] md:mb-0"
              />
              <div>
                <p className="text-sm font-semibold text-text-dark">{feature.title}</p>
                <p className="mt-1 text-xs text-text">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
