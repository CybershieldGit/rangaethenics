interface FlourishDividerProps {
  className?: string
  iconClassName?: string
  lineClassName?: string
}

export function FlourishDivider({
  className = '',
  iconClassName = 'h-5 w-auto',
  lineClassName = 'w-7 sm:w-10',
}: FlourishDividerProps) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <span
        className={`h-px shrink-0 ${lineClassName}`}
        style={{ background: 'linear-gradient(to right, transparent, #BD8A3C 70%)' }}
      />
      <img src="/flower.svg" alt="" className={`shrink-0 ${iconClassName}`} />
      <span
        className={`h-px shrink-0 ${lineClassName}`}
        style={{ background: 'linear-gradient(to left, transparent, #BD8A3C 70%)' }}
      />
    </div>
  )
}
