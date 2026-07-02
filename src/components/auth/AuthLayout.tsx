import type { ReactNode } from 'react'

interface AuthLayoutProps {
  image?: string
  imageAlt?: string
  children: ReactNode
}

export function AuthLayout({
  image = '/images/login.png',
  imageAlt = 'Rangethnics ethnic wear',
  children,
}: AuthLayoutProps) {
  return (
    <section className="bg-[#FDF8F0]">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-10">
          <div className="relative hidden min-h-[480px] flex-1 overflow-hidden lg:block">
            <img
              src={image}
              alt={imageAlt}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          </div>

          <div className="flex w-full items-start justify-center lg:min-h-[480px] lg:w-[508px] lg:shrink-0 lg:justify-end">
            {children}
          </div>
        </div>
      </div>
    </section>
  )
}
