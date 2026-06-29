interface SectionHeaderProps {
  title: string
  subtitle?: string
  className?: string
}

export function SectionHeader({ title, subtitle, className = '' }: SectionHeaderProps) {
  return (
    <div className={`text-center ${className}`}>
      <h2 className="font-serif text-3xl font-medium text-maroon md:text-4xl">{title}</h2>
      {subtitle && (
        <p className="mx-auto mt-3 max-w-xl text-sm text-text md:text-base">{subtitle}</p>
      )}
      <div className="mx-auto mt-4 flex items-center justify-center gap-2">
        <span className="h-px w-8 bg-gold" />
        <svg width="20" height="12" viewBox="0 0 20 12" fill="none" aria-hidden="true">
          <path
            d="M10 0L12 4H8L10 0ZM4 6L6 10H2L4 6ZM16 6L18 10H14L16 6Z"
            fill="#C5A059"
          />
        </svg>
        <span className="h-px w-8 bg-gold" />
      </div>
    </div>
  )
}
