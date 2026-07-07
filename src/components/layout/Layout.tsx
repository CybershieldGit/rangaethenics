import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnnouncementBar } from './AnnouncementBar'
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
    <>
      <ScrollToTop />
      <AnnouncementBar />
      <Header />
      <main className="w-full overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
