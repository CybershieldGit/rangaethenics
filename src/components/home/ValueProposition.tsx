import { ShieldCheck, Sparkles, Package, RotateCcw, Headphones } from 'lucide-react'

const features = [
  {
    icon: ShieldCheck,
    title: 'Authentic',
    description: '100% Original',
  },
  {
    icon: Sparkles,
    title: 'Handcrafted',
    description: 'With Love',
  },
  {
    icon: Package,
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
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center py-8 border-y border-[#BD8A3C]/30">
          {features.map((feature, idx) => (
            <div
              key={feature.title}
              className="flex flex-1 items-center justify-center gap-4 px-4 relative"
            >
              <feature.icon
                size={32}
                strokeWidth={1.2}
                className="text-[#BD8A3C]"
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
          ))}
        </div>
      </div>
    </section>
  )
}
