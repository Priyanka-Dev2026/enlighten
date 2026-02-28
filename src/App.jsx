import { useState, useCallback, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true })
  }, [pathname])
  return null
}
import SmoothScroll from '@components/layout/SmoothScroll'
import CustomCursor from '@components/layout/CustomCursor'
import Navbar from '@components/layout/Navbar'
import Footer from '@components/layout/Footer'
import Hero from '@components/sections/Hero'
import About from '@components/sections/About'
import BoldInNumbers from '@components/sections/BoldInNumbers'
import Work from '@components/sections/Work'
import WhatWeDo from '@components/sections/WhatWeDo'
import OurClients from '@components/sections/OurClients'
import Testimonials from '@components/sections/Testimonials'
import AlwaysOn from '@components/sections/AlwaysOn'
import SpringToAction from '@components/sections/SpringToAction'
import AboutPage from '@/pages/AboutPage'
import ServicesPage from '@/pages/ServicesPage'
import WorksPage from '@/pages/WorksPage'

function HomePage() {
  const [entranceComplete, setEntranceComplete] = useState(false)
  const handleEntranceComplete = useCallback(() => setEntranceComplete(true), [])

  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar entranceComplete={entranceComplete} />
      <main id="main-content">
        <Hero onEntranceComplete={handleEntranceComplete} />
        <About entranceComplete={entranceComplete} />
        <BoldInNumbers entranceComplete={entranceComplete} />
        <Work />
        <WhatWeDo />
        <OurClients />
        <Testimonials />
        <AlwaysOn />
        <SpringToAction />
      </main>
      <Footer />
    </SmoothScroll>
  )
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/works" element={<WorksPage />} />
      </Routes>
    </>
  )
}

export default App
