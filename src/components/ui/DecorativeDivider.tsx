interface DecorativeDividerProps {
  className?: string
}

export function DecorativeDivider({ className = '' }: DecorativeDividerProps) {
  return (
    <div className={`mx-auto flex max-w-7xl items-center ${className}`}>
      <span
        className="h-px min-w-0 flex-1"
        style={{ background: '#BD8A3C' }}
      />
      <img
        src="/seperator_square1.svg"
        alt=""
        className="mx-2 h-7 w-auto max-w-[min(55%,335px)] shrink-0"
      />
      <span
        className="h-px min-w-0 flex-1"
        style={{ background: '#BD8A3C' }}
      />
    </div>
  )
}
