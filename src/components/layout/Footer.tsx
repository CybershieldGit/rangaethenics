const companyLinks = ['Portfolio', 'Services', 'Career', 'Contact']
const quickLinks = ['Video Gallery', 'Creative Gallery', 'Case Studies', 'Testimonials']

const socialLinks = [
  { label: 'Facebook', path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
  { label: 'Instagram', path: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01 M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z' },
  { label: 'Twitter', path: 'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z' },
]

export function Footer() {
  return (
    <footer id="contact" className="bg-maroon text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-14">
        {/* Top row: logo + social */}
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <a href="/" className="flex items-baseline">
            <span className="font-serif text-4xl text-cream">R</span>
            <span className="font-serif text-2xl text-cream">ang</span>
            <span className="font-serif text-2xl text-gold">ethnics</span>
          </a>
          <div className="flex gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/50 transition-colors hover:border-white hover:bg-white/10"
                aria-label={social.label}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px w-full bg-[#BD8A3C]/50" />

        {/* Main content */}
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          {/* Contact blocks */}
          <div className="flex flex-col gap-10 sm:flex-row sm:gap-16">
            <div>
              <p className="text-sm text-white/60">Send message</p>
              <p className="mt-1.5 text-base font-semibold text-white">hello@rangethnic.com</p>
            </div>
            <div>
              <p className="text-sm text-white/60">Say Hello!!</p>
              <p className="mt-1.5 text-base font-semibold text-white">+91 9555 233 111</p>
            </div>
          </div>

          {/* Link columns */}
          <div className="flex gap-16">
            <div>
              <h4 className="mb-3 text-sm font-semibold text-gold">Company</h4>
              <ul className="space-y-2.5">
                {companyLinks.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-white/70 transition-colors hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold text-gold">Quicklinks</h4>
              <ul className="space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-white/70 transition-colors hover:text-white">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px w-full bg-[#BD8A3C]/50" />

        {/* Bottom row */}
        <div className="flex flex-col items-start justify-between gap-3 text-xs text-white/55 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} All rights reserved to Adlyngo. A unit of
            Cybershield Tecnologies Private Limited.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="transition-colors hover:text-white">Privacy Policy</a>
            <span className="h-3 w-px bg-white/30" />
            <a href="#" className="transition-colors hover:text-white">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
