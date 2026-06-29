interface DecorativeDividerProps {
  className?: string
}

export function DecorativeDivider({ className = '' }: DecorativeDividerProps) {
  return (
    <div className={`flex items-center justify-center px-6 md:px-12 ${className}`}>
      <div className="h-px flex-1 bg-maroon/30" />
      <div className="mx-4 flex items-center gap-1">
        <span className="inline-block h-1.5 w-1.5 rotate-45 bg-maroon" />
        <span className="inline-block h-2 w-2 rotate-45 bg-maroon" />
        <span className="inline-block h-1.5 w-1.5 rotate-45 bg-maroon" />
      </div>
      <div className="h-px flex-1 bg-maroon/30" />
    </div>
  )
}
