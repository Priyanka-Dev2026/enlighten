import useSEO from '@/hooks/useSEO'
import SmoothScroll from '@components/layout/SmoothScroll'
import CustomCursor from '@components/layout/CustomCursor'
import Navbar from '@components/layout/Navbar'
import Footer from '@components/layout/Footer'
import AboutHero from '@components/sections/AboutHero'
import AboutValues from '@components/sections/AboutValues'
import AboutTeam from '@components/sections/AboutTeam'

export default function AboutPage() {
  useSEO({
    title: 'About Us',
    description: 'Meet the people behind Enlighten — a small but mighty, female-led digital studio committed to crafting experiences with passion, heart, and design excellence.',
  })

  return (
    <SmoothScroll autoStart>
      <CustomCursor />
      <Navbar variant="dark" />
      <main id="main-content" style={{ backgroundColor: '#ffffff' }}>
        <AboutHero />
        <AboutValues />
        <AboutTeam />
      </main>
      <Footer />
    </SmoothScroll>
  )
}
