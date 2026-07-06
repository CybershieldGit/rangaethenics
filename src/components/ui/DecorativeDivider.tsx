interface DecorativeDividerProps {
  className?: string
  type?: string
}

export function DecorativeDivider({ className = '', type = '' }: DecorativeDividerProps) {
  const image = type === 'flower' ? '/flower.svg' : '/seperator_square1.svg';
  return (
    <div className={`mx-auto flex items-center ${className}`}>
      <span
        className={type === 'flower' ? 'h-px min-w-0 flex-1 object-fill' : 'h-px min-w-0 flex-1'}
        style={
          type === 'flower'
            ? { background: "linear-gradient(to right, transparent, #BD8A3C 50%, transparent)" }
            : { background: '#BD8A3C' }
        }
      />
      <img
        src={image}
        alt=""
        className="mx-2 h-7 w-auto max-w-[min(55%,335px)] shrink-0"
      />
      <span
        className={type === 'flower' ? 'h-px min-w-0 flex-1 object-fill' : 'h-px min-w-0 flex-1'}
        style={
          type === 'flower'
            ? { background: "linear-gradient(to right, transparent, #BD8A3C 50%, transparent)" }
            : { background: '#BD8A3C' }
        }
      />
    </div>
  )
}
