import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Spinner } from '../ui/Spinner'

interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  loading?: boolean
}

export function AuthButton({
  children,
  loading = false,
  disabled,
  className = '',
  ...props
}: AuthButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      className={`flex h-[46px] w-full items-center justify-center gap-2 rounded-none bg-maroon font-inter text-[16px] font-semibold tracking-wide text-white transition-colors hover:bg-maroon-dark disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...props}
    >
      {loading && <Spinner size={18} />}
      {children}
    </button>
  )
}
