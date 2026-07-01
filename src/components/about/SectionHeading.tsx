import { FlourishDivider } from './FlourishDivider'

const GOLD_TINT =
  'brightness(0) saturate(100%) invert(63%) sepia(42%) saturate(523%) hue-rotate(358deg) brightness(89%) contrast(86%)'

interface SectionHeadingProps {
  title: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({ title, align = 'left', className = '' }: SectionHeadingProps) {
  if (align === 'center') {
    return (
      <div className={`text-center ${className}`}>
        <h2 className="font-serif text-3xl font-bold text-maroon md:text-4xl">{title}</h2>
        <img src="/historical_seperator.svg" alt="" className="mx-auto mt-4 h-4 w-auto" />
      </div>
    )
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-between gap-3 md:hidden">
        <h2 className="font-serif shrink-0 text-2xl font-bold text-maroon sm:text-3xl">{title}</h2>
        <FlourishDivider lineClassName="w-10" />
      </div>

      <div className="hidden items-center gap-3 md:flex md:gap-4">
        <h2 className="font-serif whitespace-nowrap text-maroon text-[28px] font-bold leading-none sm:text-4xl md:text-[48px]">
          {title}
        </h2>
        <img
          src="/square_straight.svg"
          alt=""
          className="h-px min-w-0 flex-1 object-fill"
          style={{ filter: GOLD_TINT }}
        />
        <span className="flex shrink-0 items-center gap-2">
          <img src="/flower.svg" alt="" className="h-5 w-auto" />
          <span
            className="block h-px w-12"
            style={{
              background: 'linear-gradient(to right, transparent, #BD8A3C 50%, transparent)',
            }}
          />
        </span>
      </div>
    </div>
  )
}
