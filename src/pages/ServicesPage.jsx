import useSEO from '@/hooks/useSEO'
import SmoothScroll from '@components/layout/SmoothScroll'
import CustomCursor from '@components/layout/CustomCursor'
import Navbar from '@components/layout/Navbar'
import Footer from '@components/layout/Footer'
import ServicesHero from '@components/sections/ServicesHero'
import ServicesStatement from '@components/sections/ServicesStatement'
import ServicesList from '@components/sections/ServicesList'

export default function ServicesPage() {
  useSEO({
    title: 'Services',
    description: 'From website development and brand strategy to UI/UX design, content strategy, and digital marketing — Enlighten delivers end-to-end digital excellence.',
  })

  return (
    <SmoothScroll autoStart>
      <CustomCursor />
      <Navbar variant="dark" />
      <main id="main-content" style={{ backgroundColor: '#ffffff' }}>
        <ServicesHero />
        <ServicesStatement />
        <ServicesList />
      </main>
      <Footer />
    </SmoothScroll>
  )
}
