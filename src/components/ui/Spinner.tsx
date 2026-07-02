import { Loader2 } from 'lucide-react'

interface SpinnerProps {
  /** Pixel size of the spinner icon. */
  size?: number
  className?: string
}

/** A small inline loading spinner used inside buttons and loading states. */
export function Spinner({ size = 18, className = '' }: SpinnerProps) {
  return (
    <Loader2
      size={size}
      strokeWidth={2}
      className={`animate-spin ${className}`}
      aria-hidden="true"
    />
  )
}
