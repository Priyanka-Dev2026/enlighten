import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@utils/gsap-utils'
import SplitType from 'split-type'

export default function ServicesHero() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    const heading = new SplitType('.services-hero-heading', { types: 'lines' })
    heading.lines?.forEach((line) => {
      const wrapper = document.createElement('div')
      wrapper.style.overflow = 'hidden'
      wrapper.style.display = 'block'
      line.parentNode.insertBefore(wrapper, line)
      wrapper.appendChild(line)
    })

    gsap.set(heading.lines, { yPercent: 110 })
    gsap.set('.services-hero-image', { scale: 1.08, opacity: 0 })
    gsap.set('.services-hero-label', { opacity: 0, x: -24 })
    gsap.set('.services-hero-body', { opacity: 0, y: 16 })

    const tl = gsap.timeline({ delay: 0.1 })

    tl.to(heading.lines, {
      yPercent: 0,
      duration: 1.2,
      ease: 'smooth',
      stagger: 0.1,
    })
      .to('.services-hero-image', {
        scale: 1,
        opacity: 1,
        duration: 1.4,
        ease: 'smoothOut',
      }, '-=0.6')
      .to('.services-hero-label', {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'smoothOut',
      }, '-=0.4')
      .to('.services-hero-body', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'smoothOut',
      }, '-=0.5')
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="w-full"
      style={{ backgroundColor: '#ffffff' }}
      data-scroll-section
    >
      {/* Top: heading on light background */}
      <div className="px-[48px] pt-[140px] pb-[72px] max-lg:px-5 max-lg:pt-[100px] max-lg:pb-10">
        <h1
          className="services-hero-heading not-italic text-[#0e0d0d]"
          style={{
            fontFamily: "'Sentient', serif",
            fontWeight: 300,
            fontSize: 'clamp(40px, 7.1vw, 98px)',
            lineHeight: 1.08,
            letterSpacing: '0px',
          }}
        >
          What we do
        </h1>
      </div>

      {/* Bottom: full-width image with overlay content */}
      <div
        className="relative w-full overflow-hidden h-[50vh] lg:h-[90vh]"
      >
        {/* Background image */}
        <img
          className="services-hero-image absolute inset-0 w-full h-full object-cover"
          src="/images/services-hero-bg.webp"
          alt="Enlighten services"
        />

        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(0,0,0,0.32)' }}
        />

        {/* Bottom content row */}
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-[48px] py-[80px] max-lg:flex-col max-lg:items-start max-lg:gap-5 max-lg:px-5 max-lg:py-10">

          {/* Left: label */}
          <div className="services-hero-label flex items-center gap-[22px] shrink-0">
            <div style={{ width: 17, height: 17, backgroundColor: '#c96b00', flexShrink: 0 }} />
            <p
              style={{
                fontFamily: "'Hanken Grotesk', sans-serif",
                fontWeight: 500,
                fontSize: 'clamp(20px, 2.5vw, 36px)',
                lineHeight: '1.2',
                letterSpacing: '-0.06em',
                color: '#fff',
                margin: 0,
              }}
            >
              Crafted with Intent
            </p>
          </div>

          {/* Right: body paragraph */}
          <p
            className="services-hero-body"
            style={{
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontWeight: 400,
              fontSize: '28px',
              lineHeight: '34px',
              letterSpacing: '0.01em',
              color: '#fff',
              maxWidth: '821px',
              margin: 0,
            }}
          >
            Every project starts with understanding your vision and goals. From strategy
            to execution, we bring thoughtful design and hands-on expertise to deliver
            digital experiences that connect with your audience and drive real results.
          </p>
        </div>
      </div>
    </section>
  )
}
