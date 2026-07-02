import type { ReactNode } from 'react'

interface AuthCardProps {
  title: string
  subtitle?: string
  children: ReactNode
}

function Corner({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute h-10 w-10 ${className}`}
      style={{
        backgroundColor: '#420001',
        WebkitMaskImage: 'url(/corner_sqare.svg)',
        maskImage: 'url(/corner_sqare.svg)',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
      }}
    />
  )
}

export function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <div className="relative mx-auto w-full max-w-[508px]">
      <div className="relative flex min-h-[480px] w-full flex-col border border-[#BD8A3C]/50 bg-[#FFF9F3] px-9 py-10">
        {/* Ornate frame inset from the card edges */}
        <div className="pointer-events-none absolute inset-3">
          <Corner className="left-0 top-0" />
          <Corner className="right-0 top-0 -scale-x-100" />
          <Corner className="left-0 bottom-0 -scale-y-100" />
          <Corner className="right-0 bottom-0 -scale-100" />

          {/* Connecting gold rules on all four sides, aligned past the corners */}
          <span className="absolute left-11 right-11 top-0 h-px bg-[#BD8A3C]/50" />
          <span className="absolute left-11 right-11 bottom-0 h-px bg-[#BD8A3C]/50" />
          <span className="absolute top-11 bottom-11 left-0 w-px bg-[#BD8A3C]/50" />
          <span className="absolute top-11 bottom-11 right-0 w-px bg-[#BD8A3C]/50" />
        </div>

        <div className="relative text-center">
          <h1 className="font-serif text-[36px] font-bold leading-tight text-maroon">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 font-inter text-[18px] leading-relaxed text-[#8E8E8E]">
              {subtitle}
            </p>
          )}
          <img
            src="/historical_seperator.svg"
            alt=""
            className="mx-auto mt-5 h-4 w-auto"
          />
        </div>

        <div className="relative mt-6 flex flex-1 flex-col">{children}</div>
      </div>
    </div>
  )
}
