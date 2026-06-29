import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'white'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  children: ReactNode
  fullWidth?: boolean
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-maroon text-white border border-maroon hover:bg-maroon-dark',
  outline:
    'bg-transparent text-maroon border border-maroon hover:bg-maroon hover:text-white',
  ghost:
    'bg-transparent text-white border border-white hover:bg-white hover:text-maroon',
  white:
    'bg-white text-maroon border border-white hover:bg-cream',
}

export function Button({
  variant = 'primary',
  children,
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`px-6 py-2.5 font-sans text-sm tracking-wide transition-colors duration-200 ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
