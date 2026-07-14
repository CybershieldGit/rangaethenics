import { ShieldCheck, Heart, Box, RotateCcw, Headphones } from 'lucide-react'

const features = [
  {
    icon: ShieldCheck,
    title: 'Authentic',
    description: '100% Original',
  },
  {
    icon: Heart,
    title: 'Handcrafted',
    description: 'With Love',
  },
  {
    icon: Box,
    title: 'Secure Packaging',
    description: 'Delivered Safe',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: 'Hassle-Free',
  },
  {
    icon: Headphones,
    title: 'Support',
    description: "We're Here For You",
  },
]

export function ValueProposition() {
  return (
    <section className="pb-0 md:pb-10">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-center pt-8 gap-6 md:gap-0">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="flex flex-1 items-center justify-center gap-4 px-1 relative"
              >
                <Icon
                  className="h-10 w-10 text-[#BD8A3C] shrink-0"
                  strokeWidth={1.5}
                />
                <div className="text-left">
                  <p className="text-sm font-semibold uppercase tracking-wider text-text-dark">
                    {feature.title}
                  </p>
                  <p className="text-xs text-text">{feature.description}</p>
                </div>
                {idx < features.length - 1 && (
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-8 w-px bg-[#BD8A3C]/30" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

