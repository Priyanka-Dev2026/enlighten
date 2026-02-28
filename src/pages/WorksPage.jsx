import { useState } from 'react'
import useSEO from '@/hooks/useSEO'
import SmoothScroll from '@components/layout/SmoothScroll'
import CustomCursor from '@components/layout/CustomCursor'
import Navbar from '@components/layout/Navbar'
import Footer from '@components/layout/Footer'
import WorksHero from '@components/sections/WorksHero'
import WorksList from '@components/sections/WorksList'

export default function WorksPage() {
  useSEO({
    title: 'Our Work',
    description: 'Browse Enlighten\'s portfolio of websites, brand identities, and digital experiences crafted for clients across e-commerce, wellness, fintech, and more.',
  })

  const [activeFilter, setActiveFilter] = useState('ALL')

  return (
    <SmoothScroll autoStart>
      <CustomCursor />
      <Navbar variant="dark" />
      <main id="main-content" style={{ backgroundColor: '#ffffff' }}>
        <WorksHero activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        <WorksList filter={activeFilter} />
      </main>
      <Footer />
    </SmoothScroll>
  )
}
