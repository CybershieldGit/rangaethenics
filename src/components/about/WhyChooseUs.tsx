const features: { icon: string; title: string; description: string }[] = [
  {
    icon: '/Handcrafted.svg',
    title: 'Handcrafted With Love',
    description: 'Each piece is made with passion and precision.',
  },
  {
    icon: '/Authentic.svg',
    title: 'Authentic & Heritage Inspired',
    description: 'Rooted in tradition, designed for today.',
  },
  {
    icon: '/Quality.svg',
    title: 'Quality Assured',
    description: 'We use the finest materials and ensure flawless craftsmanship.',
  },
  {
    icon: '/Exclusive.svg',
    title: 'Exclusive Design',
    description: 'Unique creations that blend heritage with modern aesthetics.',
  },
  {
    icon: '/Beautifully.svg',
    title: 'Beautifully Packed',
    description: 'Perfectly packaged for you or your loved ones.',
  },
  {
    icon: '/Customer.svg',
    title: 'Customer First',
    description: 'We are here to make your experience exceptional.',
  },
]

export function WhyChooseUs() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16 mb-[-40px]">
      <div className="text-center">
        <h2 className="font-serif text-3xl font-bold text-maroon md:text-4xl">
          Why Choose Rang Ethnics
        </h2>
        <img src="/historical_seperator.svg" alt="" className="mx-auto mt-4 h-4 w-auto" />
      </div>

      <div className="relative mt-14 border border-[#BD8A3C]/40">
        <div className="absolute inset-x-0 top-0 hidden h-px -translate-y-1/2 bg-[#BD8A3C]/40 md:block hidden" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6">
          {features.map((feature, idx) => (
            <div
              key={feature.title}
              className={`relative px-4 pb-10 pt-16 text-center ${
                idx < features.length - 1 ? 'lg:border-r lg:border-[#BD8A3C]/40' : ''
              } ${idx % 2 === 0 && idx < features.length - 1 ? 'sm:border-r sm:border-[#BD8A3C]/40 lg:border-r' : ''}`}
            >
              {/* Circle is centered on the cell's top edge (the connecting line) */}
              <div className="absolute left-1/2 top-0 flex h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#BD8A3C]/50 bg-[#fffaf3]">
                <img src={feature.icon} alt="" className="h-10 w-10" />
              </div>

              {/* Diamond marker where the section divider meets the top line */}
              {idx < features.length - 1 && (
                <span className="absolute right-0 top-0 hidden h-2 w-2 -translate-y-1/2 translate-x-1/2 rotate-45 border border-[#BD8A3C]/50 bg-[#fffaf3] lg:block" />
              )}
              <h3 className="font-serif text-base font-bold text-maroon md:text-lg">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
