import { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@utils/gsap-utils'
import SplitType from 'split-type'

const FILTERS = ['ALL', 'WEBSITE DEVELOPMENT', 'UI/UX STRATEGY', 'MARKETING', 'GRAPHIC DESIGN']

export default function WorksHero({ activeFilter, onFilterChange }) {
  const sectionRef = useRef(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const drawerRef = useRef(null)

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

  // Animate mobile drawer open/close
  useEffect(() => {
    if (!drawerRef.current) return
    if (mobileOpen) {
      gsap.to(drawerRef.current, { height: 'auto', duration: 0.35, ease: 'power3.out' })
    } else {
      gsap.to(drawerRef.current, { height: 0, duration: 0.25, ease: 'power2.in' })
    }
  }, [mobileOpen])

  const handleMobileFilter = (filter) => {
    onFilterChange(filter)
    setMobileOpen(false)
  }

  return (
    <>
      <section
        ref={sectionRef}
        style={{ backgroundColor: '#ffffff' }}
        className="w-full"
        data-scroll-section
      >
        <div className="px-5 pt-[100px] pb-4 md:px-[48px] md:pt-[140px] md:pb-[56px]">
          {/* Heading */}
          <h1
            className="works-hero-heading"
            style={{
              fontFamily: "'Sentient', serif",
              fontWeight: 300,
              fontSize: 'clamp(52px, 9vw, 98px)',
              lineHeight: 1.08,
              letterSpacing: '-1px',
              color: '#0e0d0d',
              margin: 0,
            }}
          >
            Work
          </h1>

          {/* Desktop filter tabs — hidden on mobile */}
          <div className="hidden md:flex items-center gap-x-10 whitespace-nowrap mt-8">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                className="works-filter-tab"
                onClick={() => onFilterChange(filter)}
                aria-pressed={activeFilter === filter}
                style={{
                  fontFamily: "'Hanken Grotesk', sans-serif",
                  fontWeight: 400,
                  fontSize: '20px',
                  lineHeight: 1,
                  color: activeFilter === filter ? '#0e0d0d' : '#a4a4a4',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '10px 0',
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

      {/* Mobile fixed bottom filter bar */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 z-50"
        style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
      >
        {/* Expandable drawer */}
        <div
          ref={drawerRef}
          style={{
            height: 0,
            overflow: 'hidden',
            backgroundColor: '#F8F8F8',
          }}
        >
          <div className="px-5 pt-4 pb-2">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => handleMobileFilter(filter)}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  fontFamily: "'Hanken Grotesk', sans-serif",
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: 1,
                  color: activeFilter === filter ? '#0e0d0d' : '#a4a4a4',
                  background: 'none',
                  border: 'none',
                  padding: '14px 0',
                  borderBottom: '1px solid #e0e0e0',
                  cursor: 'pointer',
                  transition: 'color 0.2s ease',
                }}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Trigger bar */}
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            padding: '16px 20px',
            backgroundColor: '#F8F8F8',
            border: 'none',
            borderTop: '1px solid #e0e0e0',
            cursor: 'pointer',
          }}
        >
          <span
            style={{
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontWeight: 400,
              fontSize: '18px',
              color: '#0e0d0d',
              letterSpacing: '0.02em',
              textTransform: 'uppercase',
            }}
          >
            {activeFilter === 'ALL' ? 'Project type' : activeFilter}
          </span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            style={{
              transform: mobileOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease',
            }}
          >
            <path d="M2 9L7 4L12 9" stroke="#0e0d0d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </>
  )
}
