const companyLinks = ['About Us', 'Careers', 'Press', 'Blog']
const quickLinks = ['Shop Jewellery', 'Shop Clothing', 'New Arrivals', 'Contact']

const socialLinks = [
  { label: 'Facebook', path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
  { label: 'Instagram', path: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01 M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z' },
  { label: 'Twitter', path: 'M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5 5.5 10.5 9 8.5c-.9-1.1-2-2.4-2-4.2 0-1.4.7-2.7 1.8-3.5C3.5 2.5 1.5 4 1 6.5 1.5 5.5 2.5 4.5 4 4c-1.1 1.5-1.7 3.3-1.5 5.2C1.5 12 5 15.5 9.5 16.5c-.9 2.4-3.3 4-6 3.8 2 1.3 4.3 2 6.7 2 8 0 12.6-6.6 12.6-12.3 0-.2 0-.4-.1-.6.9-.6 1.6-1.4 2.2-2.3z' },
]

export function Footer() {
  return (
    <footer id="contact" className="bg-maroon text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        {/* Top row */}
        <div className="flex flex-col items-start justify-between gap-6 border-b border-white/20 pb-8 sm:flex-row sm:items-center">
          <a href="/" className="flex items-baseline gap-0.5">
            <span className="font-serif text-3xl font-bold text-gold-light italic">R</span>
            <span className="font-serif text-2xl text-gold-light">angethnics</span>
          </a>
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 transition-colors hover:border-white hover:bg-white/10"
                aria-label={social.label}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col gap-10 py-10 lg:flex-row lg:justify-between">
          <div className="max-w-md">
            <h3 className="font-serif text-3xl leading-tight md:text-4xl">
              Let&apos;s make something great
            </h3>
            <p className="mt-4 text-sm text-white/70">
              Exquisite jewellery and timeless clothing crafted to celebrate tradition
              and elevate everyday moments.
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <h4 className="mb-4 text-xs font-bold tracking-widest uppercase">Company</h4>
              <ul className="space-y-2">
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
              <h4 className="mb-4 text-xs font-bold tracking-widest uppercase">Quicklinks</h4>
              <ul className="space-y-2">
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

        {/* Bottom */}
        <div className="border-t border-white/20 pt-6 text-center text-xs text-white/50">
          © {new Date().getFullYear()} Rangethnics. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
