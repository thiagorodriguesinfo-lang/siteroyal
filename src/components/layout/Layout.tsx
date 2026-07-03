import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'

export default function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-[88px] md:pt-[108px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
