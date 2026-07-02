import { AlertCircle } from 'lucide-react'

interface AlertMessageProps {
  title: string
  message?: string
}

export function AlertMessage({ title, message }: AlertMessageProps) {
  return (
    <div className="mb-5 flex items-center gap-3 bg-[#FF00001A] px-4 py-3">
      <AlertCircle size={28} className="mt-0.5 shrink-0 text-[#420001]" />
      <div>
        <p className="font-inter text-sm font-semibold text-[#420001]">{title}</p>
        {message && <p className="mt-0.5 font-inter text-[10px] text-[#420001]">{message}</p>}
      </div>
    </div>
  )
}
