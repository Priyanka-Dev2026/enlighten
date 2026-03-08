import { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@utils/gsap-utils'

const VALUES = [
  {
    number: '01',
    label: 'Human Connection',
    description:
      'Brands grow through real relationships. We focus on creating authentic touchpoints that resonate with people, build trust, and help your business communicate with warmth and clarity across every platform.',
  },
  {
    number: '02',
    label: 'Thoughtful Design',
    description:
      'Every decision begins with understanding your brand and audience. We design with intention, creating meaningful visuals and experiences that feel natural, purposeful, and aligned with your long-term business goals.',
  },
  {
    number: '03',
    label: 'Focused Execution',
    description:
      'We believe in clear direction, realistic planning, and open communication. No shortcuts or hype - just practical strategies built on insight, consistency, and what truly works for your business.',
  },
  {
    number: '04',
    label: 'Purposeful Growth',
    description:
      'We support sustainable progress through structured creativity and smart execution - helping your brand evolve thoughtfully while staying true to its identity and values.',
  },
]

export default function AboutValues() {
  const sectionRef = useRef(null)
  const [openIndex, setOpenIndex] = useState(null)

  useGSAP(() => {
    // ── Entrance animations ──────────────────────────────────────────────
    gsap.set('.values-label', { opacity: 0, y: 16 })
    gsap.set('.values-divider', { scaleX: 0, transformOrigin: 'left center' })
    gsap.set('.value-desc-0', { opacity: 0, y: 16 })
    gsap.set('.value-row-item', { opacity: 0, y: 20 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none none',
      },
    })

    tl.to('.values-label', { opacity: 1, y: 0, duration: 0.7, ease: 'smoothOut' })
      .to('.values-divider', { scaleX: 1, duration: 0.9, ease: 'smoothOut' }, '-=0.3')
      .to('.value-desc-0', { opacity: 1, y: 0, duration: 0.9, ease: 'smoothOut' }, '-=0.4')
      .to('.value-row-item', { opacity: 1, y: 0, duration: 0.7, ease: 'smoothOut', stagger: 0.1 }, '-=0.5')

    // ── Hover functionality — desktop only ───────────────────────────────
    if (window.innerWidth < 768) return
    const rows = sectionRef.current.querySelectorAll('.value-row-outer')
    let activeIndex = 0
    const handlers = []

    const switchTo = (i) => {
      if (i === activeIndex) return
      const prev = activeIndex
      activeIndex = i

      const prevNumEl = sectionRef.current.querySelector(`.value-number-${prev}`)
      const nextNumEl = sectionRef.current.querySelector(`.value-number-${i}`)
      const prevDescEl = sectionRef.current.querySelector(`.value-desc-${prev}`)
      const nextDescEl = sectionRef.current.querySelector(`.value-desc-${i}`)

      gsap.killTweensOf([prevNumEl, nextNumEl, prevDescEl, nextDescEl])

      gsap.to(prevNumEl, { opacity: 0, x: -10, duration: 0.25, ease: 'power2.in' })
      gsap.to(nextNumEl, { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' })

      gsap.to(prevDescEl, { opacity: 0, y: -8, duration: 0.2, ease: 'power2.in' })
      gsap.to(nextDescEl, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out', delay: 0.1 })
    }

    rows.forEach((row, i) => {
      const enter = () => switchTo(i)
      row.addEventListener('mouseenter', enter)
      handlers.push({ row, enter })
    })

    const container = sectionRef.current.querySelector('.values-list')
    const leaveContainer = () => switchTo(0)
    container?.addEventListener('mouseleave', leaveContainer)

    return () => {
      handlers.forEach(({ row, enter }) => row.removeEventListener('mouseenter', enter))
      container?.removeEventListener('mouseleave', leaveContainer)
    }
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      style={{ backgroundColor: '#ffffff' }}
      className="w-full py-[47px]"
      data-scroll-section
    >
      {/* Label — aligned with values-list column on desktop */}
      <div className="values-label px-5 mb-[52px] md:px-[48px]">
        <div className="md:flex md:flex-row md:items-center" style={{ gap: '8.96%' }}>
          <div className="hidden md:block shrink-0" style={{ width: '31%' }} />
          <div className="flex items-center gap-[22px]">
            <div style={{ width: 17, height: 17, backgroundColor: '#c96b00', flexShrink: 0 }} />
            <p
              className="text-[28px] font-medium leading-[38px] tracking-[-2.2px] text-[#393939] md:text-[36px]"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif", margin: 0 }}
            >
              Our Values
            </p>
          </div>
        </div>
      </div>

      {/* Full-width top divider */}
      <div
        className="values-divider w-full mb-[45px]"
        style={{ height: 1, backgroundColor: '#626262' }}
      />

      {/* Layout: single column on mobile, two-column on desktop */}
      <div className="px-5 flex flex-col md:px-[48px] md:flex-row md:items-start" style={{ gap: '8.96%' }}>

        {/* Left: description — swaps on hover, desktop only */}
        <div className="hidden md:block shrink-0" style={{ width: '31%', position: 'relative', minHeight: 220 }}>
          {VALUES.map((value, i) => (
            <p
              key={i}
              className={`value-desc-${i}`}
              style={{
                fontFamily: "'Hanken Grotesk', sans-serif",
                fontWeight: 400,
                fontSize: '24px',
                lineHeight: '30px',
                letterSpacing: '0.01em',
                color: '#393939',
                margin: 0,
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                opacity: i === 0 ? 1 : 0,
              }}
            >
              {value.description}
            </p>
          ))}
        </div>

        {/* Values list */}
        <div className="values-list flex-1 flex flex-col">
          {VALUES.map((value, i) => (
            <ValueRow key={i} value={value} index={i} openIndex={openIndex} onToggle={setOpenIndex} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ValueRow({ value, index, openIndex, onToggle }) {
  const [desktopOpen, setDesktopOpen] = useState(false)
  const contentRef = useRef(null)
  const hasMountedRef = useRef(false)

  const isMobile = () => window.innerWidth < 768
  const open = isMobile() ? openIndex === index : desktopOpen

  const animateContent = (next) => {
    if (next) {
      gsap.set(contentRef.current, { height: 'auto' })
      const h = contentRef.current.offsetHeight
      gsap.fromTo(contentRef.current,
        { height: 0, opacity: 0 },
        { height: h, opacity: 1, duration: 0.5, ease: 'smoothOut' }
      )
    } else {
      gsap.to(contentRef.current, {
        height: 0, opacity: 0, duration: 0.4, ease: 'smooth',
      })
    }
  }

  useEffect(() => {
    if (!hasMountedRef.current) { hasMountedRef.current = true; return }
    if (!isMobile()) return
    animateContent(openIndex === index)
  }, [openIndex])

  const toggle = () => {
    if (isMobile()) {
      onToggle(openIndex === index ? null : index)
    } else {
      const next = !desktopOpen
      setDesktopOpen(next)
      animateContent(next)
    }
  }

  return (
    <div className="value-row-outer flex items-start gap-4 md:gap-[22px]">

      {/* Number — desktop only, opacity toggled by hover GSAP */}
      <span
        className={`value-number-${index} hidden md:block`}
        style={{
          fontFamily: "'Hanken Grotesk', sans-serif",
          fontWeight: 500,
          fontSize: 'clamp(22px, 2.7vw, 52px)',
          lineHeight: '1.2',
          letterSpacing: '0.01em',
          color: '#393939',
          flexShrink: 0,
          paddingTop: index > 0 ? 24 : 0,
          opacity: index === 0 ? 1 : 0,
        }}
      >
        {value.number}
      </span>

      {/* Row body */}
      <div
        className="value-row-item flex-1"
        style={{
          borderTop: index > 0 ? '1px solid #626262' : 'none',
          paddingTop: index > 0 ? 24 : 0,
          paddingBottom: 24,
        }}
      >
        {/* Label row — number + label always visible, plus toggle on mobile */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Number — always visible on mobile, beside the label */}
            <span
              className="md:hidden shrink-0"
              style={{
                fontFamily: "'Hanken Grotesk', sans-serif",
                fontWeight: 500,
                fontSize: '22px',
                lineHeight: '1.2',
                color: '#393939',
              }}
            >
              {value.number}
            </span>
            <p
              className="text-[24px] md:text-[clamp(20px,2.2vw,32px)]"
              style={{
                fontFamily: "'Hanken Grotesk', sans-serif",
                fontWeight: 400,
                lineHeight: '1.4',
                letterSpacing: '0.3px',
                color: '#393939',
                margin: 0,
              }}
            >
              {value.label}
            </p>
          </div>

          {/* Plus/close toggle — mobile only */}
          <button
            className="md:hidden shrink-0 size-8 flex items-center justify-center text-[#393939] bg-transparent border-none cursor-pointer text-2xl leading-none"
            onClick={toggle}
            aria-expanded={open}
            aria-label={open ? 'Collapse' : 'Expand'}
            style={{ transition: 'transform 0.35s ease', transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}
          >
            +
          </button>
        </div>

        {/* Accordion content — mobile only: description */}
        <div
          ref={contentRef}
          className="md:hidden overflow-hidden"
          style={{ height: 0, opacity: 0 }}
        >
          <p
            style={{
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontWeight: 400,
              fontSize: '20px',
              lineHeight: '30px',
              letterSpacing: '0.3px',
              color: '#666',
              margin: 0,
              paddingTop: 12,
              paddingBottom: 4,
            }}
          >
            {value.description}
          </p>
        </div>
      </div>
    </div>
  )
}
