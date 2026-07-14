import { Fragment } from 'react'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { OurStory } from '../components/home/OurStory'



export function Contact() {
  const contactCards = [
    {
      icon: MapPin,
      title: 'Our Address',
      details: ['123, Craft Heritage Street,', 'Artisan Colony, Inddia, 302001'],
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+91 9845265423', 'Mon-Sat: 10:00 AM - 07:00 PM'],
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['hello@rangethnics.com', 'We reply within 24 hours'],
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Monday-Saturday', '10:00 AM - 07:00 PM'],
    },
  ]

  return (
    <div className="bg-[#fffaf3] min-h-screen text-[#4a3f38]">
      {/* 1. HERO SECTION */}
      <section
        aria-label="Contact Us"
        className="relative min-h-[581px] bg-[#fffaf3] bg-[url('/images/contact_hero_new.png')] bg-cover bg-[75%_center] bg-no-repeat md:bg-right border-b border-[#BD8A3C]/10"
      >
        <div className="relative mx-auto flex min-h-[581px] max-w-7xl items-start px-4 pt-10 pb-12 md:px-8 md:pt-[100px] md:pb-16">
          <div className="flex min-h-[373px] w-full max-w-[558px] flex-col">
            <h1 className="font-serif text-[48px] font-normal leading-none tracking-normal text-[#420001] sm:text-[60px] md:text-[72px]">
              Contact Us
            </h1>
            <img
              src="/historical_seperator.svg"
              alt=""
              className="mt-4 h-[14px] w-auto self-start"
            />
            <div className="mt-8 space-y-4 font-inter text-[15px] leading-relaxed text-[#4a3f38] md:text-base">
              <p>
                We’re here to help! Whether you have a question about our products, need assistance with your order, or want to collaborate with us, we’d love to hear from you.
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* 3. GET IN TOUCH CARDS */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:px-8">
        <div className="text-center mb-12 flex flex-col items-center">
          <h2 className="font-serif text-[32px] font-bold text-[#420001] sm:text-[38px] tracking-wide">
            Get In Touch
          </h2>
          <img src="/historical_seperator.svg" alt="" className="mt-4 h-[14px] w-auto" />
        </div>

        {/* 4 Cards Contiguous Row */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-[#fffaf3] border-t border-b md:border border-[#BD8A3C]/40 max-w-[1302px] w-full md:h-[330px] mx-auto shadow-sm overflow-x-auto md:overflow-visible py-4 md:py-0">
          {contactCards.map((card, idx) => {
            const Icon = card.icon
            const isLast = idx === contactCards.length - 1
            return (
              <Fragment key={idx}>
                {/* Card Block (310px width, 310px height, exact paddings) */}
                <div className="w-full md:w-[285px] md:h-[310px] bg-[#fffaf3] pt-[30px] px-[43px] pb-[52px] flex flex-col items-center text-center justify-start shrink-0">
                  {/* Circle Icon Wrapper */}
                  <div className="mb-6 flex h-[100px] w-[100px] items-center justify-center rounded-full bg-[#F4E8D7] text-[#420001] shadow-inner">
                    <Icon size={32} strokeWidth={1} className="text-[#420001]" />
                  </div>

                  <h3 className="font-serif text-[17px] font-bold text-[#420001] tracking-wide mb-3">{card.title}</h3>
                  <div className="space-y-1 font-inter text-[13px] leading-relaxed text-[#7a6e67]">
                    {card.details.map((line, lIdx) => (
                      <p key={lIdx}>{line}</p>
                    ))}
                  </div>
                </div>

                {/* Separator between cards */}
                {!isLast && (
                  <>
                    {/* Desktop Separator (20px width, 330px height) */}
                    <div className="hidden md:flex w-[20px] h-[330px] relative shrink-0">
                      {/* Maroon Bar (20px width, 310px height, top: 10px) */}
                      <div className="absolute top-[10px] left-0 w-[20px] h-[310px] bg-[#420001]" />
                      {/* Top Diamond (20x20 bounding box = 14.14x14.14 rotated 45deg, top 0) */}
                      <div className="absolute top-[10px] left-[10px] -translate-x-1/2 -translate-y-1/2 w-[14.14px] h-[14.14px] bg-[#fffaf3] rotate-45 border border-[#BD8A3C] z-10" />
                      {/* Bottom Diamond */}
                      <div className="absolute bottom-[10px] left-[10px] -translate-x-1/2 translate-y-1/2 w-[14.14px] h-[14.14px] bg-[#fffaf3] rotate-45 border border-[#BD8A3C] z-10" />
                    </div>

                    {/* Mobile Separator (full width, 20px height) */}
                    <div className="md:hidden w-full h-[20px] relative flex items-center shrink-0">
                      {/* Maroon Bar */}
                      <div className="absolute left-[10px] top-0 h-[20px] w-[calc(100%-20px)] bg-[#420001]" />
                      {/* Left Diamond */}
                      <div className="absolute left-[10px] top-[10px] -translate-x-1/2 -translate-y-1/2 w-[14.14px] h-[14.14px] bg-[#fffaf3] rotate-45 border border-[#BD8A3C] z-10" />
                      {/* Right Diamond */}
                      <div className="absolute right-[10px] top-[10px] translate-x-1/2 -translate-y-1/2 w-[14.14px] h-[14.14px] bg-[#fffaf3] rotate-45 border border-[#BD8A3C] z-10" />
                    </div>
                  </>
                )}
              </Fragment>
            )
          })}
        </div>
      </section>

      {/* 4. BRAND ETHOS BANNER */}
      <OurStory />
    </div>
  )
}
