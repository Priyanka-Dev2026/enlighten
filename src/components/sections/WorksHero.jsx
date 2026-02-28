import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@utils/gsap-utils'
import SplitType from 'split-type'

const FILTERS = ['ALL', 'WEBSITES', 'BRANDING', 'UI/UX', 'SOCIAL']

export default function WorksHero({ activeFilter, onFilterChange }) {
  const sectionRef = useRef(null)

  useGSAP(() => {
    const heading = new SplitType('.works-hero-heading', { types: 'lines' })

    heading.lines?.forEach((line) => {
      const wrapper = document.createElement('div')
      wrapper.style.overflow = 'hidden'
      wrapper.style.display = 'block'
      line.parentNode.insertBefore(wrapper, line)
      wrapper.appendChild(line)
    })

    gsap.set(heading.lines, { yPercent: 110 })
    gsap.set('.works-filter-tab', { opacity: 0, y: 10 })

    const tl = gsap.timeline({ delay: 0.1 })

    tl.to(heading.lines, {
      yPercent: 0,
      duration: 1.0,
      ease: 'smooth',
      stagger: 0.08,
    }).to('.works-filter-tab', {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'smoothOut',
      stagger: 0.06,
    }, '-=0.4')
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      style={{ backgroundColor: '#ffffff' }}
      className="w-full"
      data-scroll-section
    >
      <div className="px-5 pt-[100px] pb-10 md:px-[48px] md:pt-[140px] md:pb-[56px]">
        {/* Heading */}
        <h1
          className="works-hero-heading"
          style={{
            fontFamily: "'Sentient', serif",
            fontWeight: 300,
            fontSize: 'clamp(52px, 9vw, 140px)',
            lineHeight: 1.08,
            letterSpacing: '-1px',
            color: '#0e0d0d',
            margin: '0 0 32px 0',
          }}
        >
          Work
        </h1>

        {/* Filter tabs */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 md:gap-x-10">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              className="works-filter-tab"
              onClick={() => onFilterChange(filter)}
              aria-pressed={activeFilter === filter}
              style={{
                fontFamily: "'Hanken Grotesk', sans-serif",
                fontWeight: 400,
                fontSize: 'clamp(13px, 1.3vw, 22px)',
                lineHeight: 1,
                color: activeFilter === filter ? '#0e0d0d' : '#a4a4a4',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'color 0.3s ease',
                letterSpacing: '0.01em',
              }}
              data-cursor-hover
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
