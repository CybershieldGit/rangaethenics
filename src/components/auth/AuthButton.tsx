import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export function AuthButton({ children, className = '', ...props }: AuthButtonProps) {
  return (
    <button
      type="button"
      className={`h-[46px] w-full rounded-none bg-maroon font-inter text-[16px] font-semibold tracking-wide text-white transition-colors hover:bg-maroon-dark disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
