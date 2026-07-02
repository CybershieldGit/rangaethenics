import type { InputHTMLAttributes, ReactNode } from 'react'

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode
  rightElement?: ReactNode
}

export function AuthInput({ icon, rightElement, className = '', ...props }: AuthInputProps) {
  return (
    <div className="relative w-full">
      {icon && (
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A89E96]">
          {icon}
        </span>
      )}
      <input
        className={`h-[46px] w-full rounded-none border border-[#BD8A3C4D] bg-[#BD8A3C0A] font-inter text-sm text-[#4a3f38] placeholder:text-[#A89E96] focus:border-maroon focus:outline-none focus:ring-0 ${icon ? 'pl-10' : 'px-3.5'} ${rightElement ? 'pr-10' : 'pr-3.5'} ${className}`}
        {...props}
      />
      {rightElement && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2">{rightElement}</span>
      )}
    </div>
  )
}
