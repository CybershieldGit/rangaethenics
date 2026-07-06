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
      <img
        src="/historical_seperator.svg"
        alt=""
        className="mx-auto mt-4 h-4 w-auto mb-15 md:mb-0"
      />
    </div>
  )
}
