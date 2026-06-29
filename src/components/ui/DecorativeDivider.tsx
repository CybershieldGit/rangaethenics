interface DecorativeDividerProps {
  className?: string
}

export function DecorativeDivider({ className = '' }: DecorativeDividerProps) {
  return (
    <div className={`mx-auto max-w-7xl px-4 md:px-8 ${className}`}>
      <img src="/seperator.svg" alt="" className="h-5 w-full" />
    </div>
  )
}
