import { ShieldCheck, Lock, RotateCcw, Truck } from 'lucide-react'

export function RangethnicsPromise() {
  const promises = [
    {
      title: 'PREMIUM QUALITY',
      icon: ShieldCheck,
    },
    {
      title: 'SECURE PAYMENTS',
      icon: Lock,
    },
    {
      title: 'EASY RETURNS',
      icon: RotateCcw,
    },
    {
      title: 'PAN-INDIA SHIPPING',
      icon: Truck,
    },
  ]

  return (
    <section className="relative w-full bg-[#20160F] py-16 md:py-20 overflow-hidden text-white border-b border-[#3D281B]">
      {/* Background Panoramic Sunset Lake Palace Image */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <img
          src="/images/landing/assets/promise_sunset.png"
          alt="Sunset Lake Palace Silhouette"
          className="w-full h-full object-cover object-center"
        />
        {/* Elegant dark gradient overlay ensuring clear text contrast on left */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#20160F] via-[#20160F]/85 md:via-[#20160F]/60 to-black/25" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <span className="text-[11px] md:text-xs font-serif uppercase tracking-[0.25em] text-[#C5A059] font-semibold mb-3 block">
            OUR PROMISE
          </span>

          {/* Headline */}
          <h2 className="font-serif text-[#FFF8F0] text-3xl sm:text-4xl md:text-5xl font-normal tracking-[0.02em] leading-[1.1] mb-10">
            WEAR YOUR ROOTS.<br />
            DEFINE YOUR STYLE.
          </h2>

          {/* 4 Trust Badges Horizontal Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-[#C5A059]/30">
            {promises.map((p) => {
              const Icon = p.icon
              return (
                <div key={p.title} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full border border-[#C5A059]/50 bg-[#352215] flex items-center justify-center text-[#C5A059] shrink-0">
                    <Icon size={15} strokeWidth={1.5} />
                  </div>
                  <span className="font-serif text-[11px] md:text-xs uppercase tracking-[0.14em] text-[#E8DFC8] font-medium">
                    {p.title}
                  </span>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  )
}
