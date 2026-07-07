import { useState, useRef, useEffect } from 'react'
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react'

interface DatePickerProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function DatePicker({ value, onChange, placeholder = 'DD/MM/YYYY', className = '' }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Parse current value or fallback to today
  const getInitialDate = () => {
    if (value) {
      const parts = value.split('/')
      if (parts.length === 3) {
        const d = parseInt(parts[0], 10)
        const m = parseInt(parts[1], 10) - 1 // 0-based month
        const y = parseInt(parts[2], 10)
        if (!isNaN(d) && !isNaN(m) && !isNaN(y)) {
          return new Date(y, m, d)
        }
      }
    }
    // Default to a reasonable age, e.g. 2000-01-01
    return new Date(2000, 0, 1)
  }

  const initialDate = getInitialDate()
  const [currentMonth, setCurrentMonth] = useState(initialDate.getMonth())
  const [currentYear, setCurrentYear] = useState(initialDate.getFullYear())

  // Keep internal calendar view synced if the external value changes
  useEffect(() => {
    const parsed = getInitialDate()
    setCurrentMonth(parsed.getMonth())
    setCurrentYear(parsed.getFullYear())
  }, [value])

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  // Generate years list (e.g. 100 years back from current year)
  const maxYear = new Date().getFullYear()
  const minYear = maxYear - 100
  const years = []
  for (let y = maxYear; y >= minYear; y--) {
    years.push(y)
  }

  // Get days in the current selected month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Get first day of the month (0 = Sunday, 1 = Monday...)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(prev => prev - 1)
    } else {
      setCurrentMonth(prev => prev - 1)
    }
  }

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(prev => prev + 1)
    } else {
      setCurrentMonth(prev => prev + 1)
    }
  }

  const handleDateSelect = (day: number) => {
    const selectedDate = new Date(currentYear, currentMonth, day)
    const formattedDay = String(selectedDate.getDate()).padStart(2, '0')
    const formattedMonth = String(selectedDate.getMonth() + 1).padStart(2, '0')
    const formattedYear = selectedDate.getFullYear()
    onChange(`${formattedDay}/${formattedMonth}/${formattedYear}`)
    setIsOpen(false)
  }

  const renderDays = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth)
    const firstDayIndex = getFirstDayOfMonth(currentYear, currentMonth)
    
    // Parse selected date for active styling
    let selectedDay: number | null = null
    let selectedMonth: number | null = null
    let selectedYear: number | null = null
    if (value) {
      const parts = value.split('/')
      if (parts.length === 3) {
        selectedDay = parseInt(parts[0], 10)
        selectedMonth = parseInt(parts[1], 10) - 1
        selectedYear = parseInt(parts[2], 10)
      }
    }

    const cells = []

    // Padding from previous month
    const prevMonthDays = getDaysInMonth(currentYear, currentMonth - 1)
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      cells.push(
        <div
          key={`prev-${i}`}
          className="text-center text-gray-400 p-2 text-sm select-none"
        >
          {prevMonthDays - i}
        </div>
      )
    }

    // Days in current month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = selectedDay === day && selectedMonth === currentMonth && selectedYear === currentYear
      const isToday = new Date().getDate() === day && new Date().getMonth() === currentMonth && new Date().getFullYear() === currentYear

      cells.push(
        <button
          key={`day-${day}`}
          type="button"
          onClick={() => handleDateSelect(day)}
          className={`text-center p-2 text-sm cursor-pointer rounded-none transition-colors w-full font-medium font-sans
            ${isSelected 
              ? 'bg-[#420001] text-white' 
              : isToday
                ? 'bg-[#BD8A3C]/20 text-[#420001] border border-[#BD8A3C]' 
                : 'text-text-dark hover:bg-[#FAF6F0] hover:text-[#420001]'
            }`}
        >
          {day}
        </button>
      )
    }

    return cells
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative flex items-center">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          onClick={() => setIsOpen(true)}
          className={`${className} pr-10`}
        />
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute right-3 text-[#717171] hover:text-maroon focus:outline-none cursor-pointer"
        >
          <CalendarIcon size={18} strokeWidth={1.5} />
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-[320px] left-0 border border-[#BD8A3C80] bg-[#F8F0E5] p-4 shadow-xl select-none">
          {/* Header */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1 text-[#420001] hover:bg-[#F5ECE3] transition-colors cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex gap-1.5">
              {/* Month Select */}
              <select
                value={currentMonth}
                onChange={(e) => setCurrentMonth(parseInt(e.target.value))}
                className="bg-transparent border-b border-[#BD8A3C80] text-sm text-[#420001] font-bold font-serif focus:outline-none cursor-pointer p-0.5"
              >
                {months.map((m, idx) => (
                  <option key={m} value={idx} className="bg-[#F8F0E5] text-[#420001]">
                    {m}
                  </option>
                ))}
              </select>

              {/* Year Select */}
              <select
                value={currentYear}
                onChange={(e) => setCurrentYear(parseInt(e.target.value))}
                className="bg-transparent border-b border-[#BD8A3C80] text-sm text-[#420001] font-bold font-serif focus:outline-none cursor-pointer p-0.5"
              >
                {years.map(y => (
                  <option key={y} value={y} className="bg-[#F8F0E5] text-[#420001]">
                    {y}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1 text-[#420001] hover:bg-[#F5ECE3] transition-colors cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-1 text-center font-sans font-semibold text-xs text-[#717171] mb-1">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
              <div key={d} className="p-1">{d}</div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1">
            {renderDays()}
          </div>
        </div>
      )}
    </div>
  )
}
