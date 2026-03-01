import { useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@utils/gsap-utils'
import SplitType from 'split-type'

export default function AboutHero() {
  const sectionRef = useRef(null)
  const gifRef = useRef(null)

  // Switch nav to white over the dark GIF section, back to black on leave
  useEffect(() => {
    const nav = document.querySelector('nav.fixed')
    if (!nav) return

    let isActive = false
    const onScroll = () => {
      const gif = gifRef.current
      if (!gif) return
      const rect = gif.getBoundingClientRect()
      const active = rect.top <= 60 && rect.bottom > 60
      if (active && !isActive) {
        isActive = true
        nav.classList.remove('nav-dark')
        nav.classList.add('nav-light')
      } else if (!active && isActive) {
        isActive = false
        nav.classList.remove('nav-light')
        nav.classList.add('nav-dark')
      }
    }

    const lenis = window.__lenis
    if (lenis) lenis.on('scroll', onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      if (lenis) lenis.off('scroll', onScroll)
      window.removeEventListener('scroll', onScroll)
      nav.classList.remove('nav-light')
      nav.classList.add('nav-dark')
    }
  }, [])

  useGSAP(() => {
    // Split heading into lines
    const heading = new SplitType('.about-hero-heading', { types: 'lines' })

    // Wrap each line in overflow-hidden container
    heading.lines?.forEach((line) => {
      const wrapper = document.createElement('div')
      wrapper.style.overflow = 'hidden'
      wrapper.style.display = 'block'
      line.parentNode.insertBefore(wrapper, line)
      wrapper.appendChild(line)
    })

    // Split body text into lines
    const body = new SplitType('.about-hero-body', { types: 'lines' })
    body.lines?.forEach((line) => {
      const wrapper = document.createElement('div')
      wrapper.style.overflow = 'hidden'
      wrapper.style.display = 'block'
      line.parentNode.insertBefore(wrapper, line)
      wrapper.appendChild(line)
    })

    // Set initial states
    gsap.set(heading.lines, { yPercent: 110 })
    gsap.set('.about-hero-image', { scale: 1.08, opacity: 0 })
    gsap.set('.about-hero-label', { opacity: 0, x: -24 })
    gsap.set(body.lines, { yPercent: 110 })

    // Master timeline — runs on page load (no scroll trigger needed, this is the hero)
    const tl = gsap.timeline({ delay: 0.1 })

    // 1. Heading lines reveal
    tl.to(heading.lines, {
      yPercent: 0,
      duration: 1.2,
      ease: 'smooth',
      stagger: 0.1,
    })

    // 2. Image reveals while heading is finishing
    tl.to('.about-hero-image', {
      scale: 1,
      opacity: 1,
      duration: 1.4,
      ease: 'smoothOut',
    }, '-=0.6')

    // 3. Label slides in
    tl.to('.about-hero-label', {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: 'smoothOut',
    }, '-=0.4')

    // 4. Body text lines reveal — revert split on complete so text flows naturally
    tl.to(body.lines, {
      yPercent: 0,
      duration: 1.0,
      ease: 'smooth',
      stagger: 0.04,
      onComplete: () => body.revert(),
    }, '-=0.6')
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="w-full"
      style={{ backgroundColor: '#ffffff' }}
      data-scroll-section
    >
      {/* Top: Large heading on light background — triggers dark nav */}
      <div className="px-5 pt-[100px] pb-8 md:px-[48px] md:pt-[140px] md:pb-[72px]" data-theme="light">
        <h1
          className="about-hero-heading not-italic text-[#0e0d0d]"
          style={{
            fontFamily: "'Sentient', serif",
            fontWeight: 300,
            fontSize: 'clamp(36px, 7.1vw, 98px)',
            lineHeight: 1.08,
            letterSpacing: '-1px',
          }}
        >
          A people-first<br />
          digital studio who build with heart.
        </h1>
      </div>

      {/* Bottom: Full-width dark image with overlay content */}
      <div
        ref={gifRef}
        className="relative w-full overflow-hidden h-[50vh] lg:h-[90vh]"
      >
        {/* Background gif */}
        <img
          className="about-hero-image absolute inset-0 w-full h-full object-cover"
          src="/images/about-hero-bg.png"
          alt="Enlighten studio"
        />

        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(0,0,0,0.32)' }}
        />

        {/* Bottom content row — stacked on mobile, side-by-side on desktop */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-4 items-start px-5 py-6 md:flex-row md:items-end md:justify-between md:px-[48px] md:py-[44px]">
          {/* Left: label */}
          <div className="about-hero-label flex items-center gap-[22px] shrink-0">
            <div
              className="shrink-0"
              style={{ width: 17, height: 17, backgroundColor: '#c96b00' }}
            />
            <p
              style={{
                fontFamily: "'Hanken Grotesk', sans-serif",
                fontWeight: 500,
                fontSize: 'clamp(22px, 2.5vw, 36px)',
                lineHeight: '38px',
                letterSpacing: '-0.06em',
                color: '#fff',
                margin: 0,
              }}
            >
              Small but Mighty
            </p>
          </div>

          {/* Right: body paragraph */}
          <p
            className="about-hero-body"
            style={{
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontWeight: 400,
              fontSize: 'clamp(13px, 1.5vw, 22px)',
              lineHeight: '1.65',
              letterSpacing: '0.01em',
              color: '#fff',
              maxWidth: '600px',
              margin: 0,
            }}
          >
            At Enlighten, we're a small team by design. Female-led, close-knit, and committed to
            showing up with passion and dedication. We pride ourselves on creating one-on-one
            partnerships that feel personal, not transactional. Balance matters to us, because
            thriving as people helps us thrive as designers. So we celebrate the wins, learn from
            the challenges, and keep pushing ourselves to grow. At the heart of it all is that
            spark you can't quite put your finger on, but you feel it in everything we do.
          </p>
        </div>
      </div>
    </section>
  )
}
