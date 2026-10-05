import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
export { AnnouncementBar as _AnnouncementBar } from './AnnouncementBar'
import { Header } from './Header'
import { Footer } from './Footer'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAF6F0]">
      <ScrollToTop />
      <Header />
      <main className="w-full flex-1 overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
