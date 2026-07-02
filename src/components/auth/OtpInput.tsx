import { useRef, type KeyboardEvent, type ClipboardEvent } from 'react'

interface OtpInputProps {
  length?: number
  value: string[]
  onChange: (value: string[]) => void
  disabled?: boolean
  hasError?: boolean
}

export function OtpInput({
  length = 6,
  value,
  onChange,
  disabled = false,
  hasError = false,
}: OtpInputProps) {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])

  const updateDigit = (index: number, digit: string) => {
    const next = [...value]
    next[index] = digit
    onChange(next)

    if (digit && index < length - 1) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  const handleChange = (index: number, raw: string) => {
    const digit = raw.replace(/\D/g, '').slice(-1)
    updateDigit(index, digit)
  }

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
  }

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault()
    const pasted = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
    if (!pasted) return

    const next = Array.from({ length }, (_, i) => pasted[i] || '')
    onChange(next)

    const focusIndex = Math.min(pasted.length, length - 1)
    inputsRef.current[focusIndex]?.focus()
  }

  return (
    <div className="flex justify-center gap-2 sm:gap-3">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputsRef.current[index] = el
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[index] || ''}
          disabled={disabled}
          onChange={(event) => handleChange(index, event.target.value)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={handlePaste}
          className={`h-11 w-10 rounded-none border bg-[#BD8A3C0A] text-center font-inter text-base text-[#4a3f38] focus:border-maroon focus:outline-none focus:ring-0 sm:h-12 sm:w-11 ${
            hasError ? 'border-red-400' : 'border-[#BD8A3C4D]'
          }`}
        />
      ))}
    </div>
  )
}
