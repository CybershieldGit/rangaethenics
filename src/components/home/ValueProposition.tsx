
const features = [
  {
    img: '/authentic_gold.png',
    title: 'Authentic',
    description: '100% Original',
  },
  {
    img: '/handcrafted_gold.png',
    title: 'Handcrafted',
    description: 'With Love',
  },
  {
    img: '/secure_packaging_gold.png',
    title: 'Secure Packaging',
    description: 'Delivered Safe',
  },
  {
    img: '/easy_returns_gold.png',
    title: 'Easy Returns',
    description: 'Hassle-Free',
  },
  {
    img: '/support_gold.png',
    title: 'Support',
    description: "We're Here For You",
  },
]

export function ValueProposition() {
  return (
    <section className="pb-10">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center py-8 border-y border-[#BD8A3C]/30">
          {features.map((feature, idx) => (
            <div
              key={feature.title}
              className="flex flex-1 items-center justify-center gap-4 px-4 relative"
            >
              <img
                src={feature.img}
                alt={feature.title}
                className="h-10 w-auto object-contain shrink-0"
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
