interface SectionHeaderProps {
  title: string
  subtitle?: string
  className?: string
}

export function SectionHeader({ title, subtitle, className = '' }: SectionHeaderProps) {
  return (
    <div className={`text-center ${className}`}>
      <h2 className="font-serif text-[22px] md:text-3xl md:text-4xl font-medium text-maroon">{title}</h2>
      {subtitle && (
        <p className="mx-auto mt-2 md:mt-3 max-w-xl text-[12px] md:text-sm md:text-base text-text">{subtitle}</p>
      )}
      <img
        src="/historical_seperator.svg"
        alt=""
        className="mx-auto mt-3 md:mt-4 h-2 md:h-4 w-auto mb-[30px] md:mb-[50px]"
      />
    </div>
  )
}
