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
    <section className="pb-10">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-row items-center justify-between md:pt-8 pt-0 gap-0">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="flex flex-1 items-center justify-center gap-2 md:gap-4 px-1 relative"
              >
                <Icon
                  className="h-6 w-6 md:h-9 md:w-9 text-[#BD8A3C] shrink-0"
                  strokeWidth={1.5}
                />
                <div className="hidden md:block text-left">
                  <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-text-dark">
                    {feature.title}
                  </p>
                  <p className="text-[11px] sm:text-xs text-text">{feature.description}</p>
                </div>
                {idx < features.length - 1 && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 h-6 md:h-8 w-px bg-[#BD8A3C]/30" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

