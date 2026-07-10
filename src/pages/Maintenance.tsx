import { Mail, Phone, Clock } from 'lucide-react'

export function Maintenance() {
  return (
    <div className="min-h-screen bg-[#fffaf3] flex items-center justify-center p-4 sm:p-6 md:p-8 font-inter relative overflow-hidden">
      {/* Background visual flourishes */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#F4E8D7]/40 blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#F4E8D7]/40 blur-3xl" />

      {/* Main Ornate Card Container */}
      <div className="relative w-full max-w-[680px] bg-[#fffaf3] border border-[#BD8A3C]/40 p-[10px] shadow-2xl z-10 animate-fade-in">
        <div className="relative border border-[#BD8A3C]/40 px-6 py-12 sm:px-12 sm:py-16 text-center bg-[#fffaf3] flex flex-col items-center">
          {/* Rotated gold diamond corner accents */}
          <div className="absolute top-[-5px] left-[-5px] w-[10px] h-[10px] bg-[#BD8A3C] rotate-45 border border-[#420001]/25" />
          <div className="absolute top-[-5px] right-[-5px] w-[10px] h-[10px] bg-[#BD8A3C] rotate-45 border border-[#420001]/25" />
          <div className="absolute bottom-[-5px] left-[-5px] w-[10px] h-[10px] bg-[#BD8A3C] rotate-45 border border-[#420001]/25" />
          <div className="absolute bottom-[-5px] right-[-5px] w-[10px] h-[10px] bg-[#BD8A3C] rotate-45 border border-[#420001]/25" />

          {/* Logo / Brand Header */}
          <div className="flex flex-col items-center mb-6">
            <span className="font-serif text-[36px] sm:text-[44px] font-semibold text-[#420001] tracking-wide leading-none">
              Rang<span className="text-[#BD8A3C] font-light">ethnics</span>
            </span>
            <span className="text-[11px] tracking-[0.25em] text-[#BD8A3C] uppercase mt-2 font-medium">
              Handcrafted Traditions
            </span>
          </div>

          {/* Decorative Separator */}
          <img src="/historical_seperator.svg" alt="" className="h-[14px] w-auto mb-8" />

          {/* Clock Icon Animating */}
          <div className="mb-6 flex h-[80px] w-[80px] items-center justify-center rounded-full bg-[#F4E8D7] text-[#420001] shadow-inner animate-pulse">
            <Clock size={36} strokeWidth={1.25} className="text-[#420001]" />
          </div>

          {/* Maintenance Message */}
          <h1 className="font-serif text-[24px] sm:text-[28px] font-bold text-[#420001] tracking-wide mb-4">
            Under Scheduled Maintenance
          </h1>
          <p className="text-[14px] sm:text-[15px] leading-relaxed text-[#7a6e67] max-w-md mb-10">
            We are currently polishing our online boutique and updating our latest handcrafted clothing and jewellery collections. We will be back shortly to serve you with timeless elegance.
          </p>

          {/* Divider */}
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#BD8A3C]/30 to-transparent mb-8" />

          {/* Urgent Contact Details */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-[14px] text-[#7a6e67]">
            <a href="mailto:hello@rangethnics.com" className="flex items-center gap-2 hover:text-[#420001] transition-colors duration-300">
              <Mail size={16} className="text-[#BD8A3C]" />
              <span>hello@rangethnics.com</span>
            </a>
            <div className="hidden sm:block w-[1px] h-4 bg-[#BD8A3C]/30" />
            <a href="tel:+919845265423" className="flex items-center gap-2 hover:text-[#420001] transition-colors duration-300">
              <Phone size={16} className="text-[#BD8A3C]" />
              <span>+91 9845265423</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
