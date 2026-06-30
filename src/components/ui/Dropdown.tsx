import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Check } from 'lucide-react'

export interface DropdownOption<T extends string> {
  label: string
  value: T
}

interface DropdownProps<T extends string> {
  value: T
  options: DropdownOption<T>[]
  onChange: (value: T) => void
  className?: string
}

export function Dropdown<T extends string>({
  value,
  options,
  onChange,
  className = '',
}: DropdownProps<T>) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const selected = options.find((option) => option.value === value)

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 border border-[#BD8A3C]/50 bg-[#F8F0E5] py-2 pr-3 pl-4 text-[16px] text-maroon transition-colors hover:border-maroon focus:outline-none"
      >
        <span>{selected?.label}</span>
        <ChevronDown
          size={16}
          className={`text-maroon transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-30 mt-2 w-full overflow-hidden border border-[#BD8A3C]/40 bg-[#FBF4EA] shadow-lg shadow-maroon/5"
        >
          {options.map((option) => {
            const isSelected = option.value === value
            return (
              <li key={option.value} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(option.value)
                    setOpen(false)
                  }}
                  className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-[16px] transition-colors ${
                    isSelected
                      ? 'bg-maroon text-white'
                      : 'text-text-dark hover:bg-maroon/10'
                  }`}
                >
                  {option.label}
                  {isSelected && <Check size={15} strokeWidth={2.5} />}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
