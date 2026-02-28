import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, SplitText } from '@/utils/gsap-utils'
import CTAButton from '@components/ui/CTAButton'

const SERVICES = [
  {
    title: 'WEBSITE DEVELOPMENT',
    tags: ['Shopify', 'WordPress', 'Framer', 'Squarespace', 'React'],
  },
  {
    title: 'UI/UX STRATEGY',
    tags: ['User Research', 'Wireframing', 'Prototyping', 'Interaction Design', 'Figma'],
  },
  {
    title: 'BRAND COMMUNICATION',
    tags: ['Brand Voice', 'Messaging Strategy', 'Visual Identity', 'Copywriting', 'Brand Guidelines'],
  },
  {
    title: 'MARKETING',
    tags: ['SEO', 'Social Media', 'Email Campaigns', 'Content Strategy', 'Paid Ads', 'Analytics'],
  },
  {
    title: 'GRAPHIC DESIGNING',
    tags: ['Print Design', 'Packaging', 'Social Media Graphics', 'Illustrations', 'Pitch Decks'],
  },
  {
    title: 'BRANDING',
    tags: ['Logo Design', 'Brand Strategy', 'Colour & Typography', 'Brand Identity', 'Style Guides'],
  },
]

export default function WhatWeDo() {
  const sectionRef = useRef(null)
  const labelRef = useRef(null)
  const textRef = useRef(null)
  const gridRef = useRef(null)
  const ctaRef = useRef(null)

  useGSAP(() => {
    const split = new SplitText(textRef.current, { type: 'lines' })

    split.lines.forEach((line) => {
      const wrapper = document.createElement('div')
      wrapper.style.overflow = 'hidden'
      line.parentNode.insertBefore(wrapper, line)
      wrapper.appendChild(line)
    })

    gsap.set(labelRef.current, { opacity: 0, y: 30 })
    gsap.set(split.lines, { opacity: 0, y: '100%' })
    gsap.set(ctaRef.current, { opacity: 0, y: 20 })

    const items = Array.from(gridRef.current.querySelectorAll('.service-item'))
    gsap.set(items, { opacity: 0, y: 30 })

    const lenis = window.__lenis
    const isMobile = window.innerWidth < 1024

    // Label + text animate together when section enters — same on both breakpoints
    let headerTriggered = false
    const onHeaderScroll = () => {
      if (headerTriggered) return
      const rect = sectionRef.current.getBoundingClientRect()
      if (rect.top < window.innerHeight * 0.8) {
        headerTriggered = true
        const tl = gsap.timeline()
        tl.to(labelRef.current, { opacity: 1, y: 0, duration: 1.1, ease: 'smoothOut' }, 0)
        tl.to(split.lines, { opacity: 1, y: '0%', duration: 1.3, stagger: 0.12, ease: 'smoothOut' }, 0.1)
        if (!isMobile) {
          // Desktop: all items + CTA stagger in with the header
          tl.to(items, { opacity: 1, y: 0, duration: 1.0, stagger: 0.12, ease: 'smoothOut' }, 0.35)
          tl.to(ctaRef.current, { opacity: 1, y: 0, duration: 1.1, ease: 'smoothOut' }, 0.7)
        }
      }
    }
    if (lenis) lenis.on('scroll', onHeaderScroll)
    window.addEventListener('scroll', onHeaderScroll, { passive: true })
    onHeaderScroll()

    let itemCleanups = []
    let ctaCleanup = null

    if (isMobile) {
      // Each accordion item fires independently as it scrolls into view
      itemCleanups = items.map((item) => {
        let triggered = false
        const handler = () => {
          if (triggered) return
          const rect = item.getBoundingClientRect()
          if (rect.top < window.innerHeight * 0.88) {
            triggered = true
            gsap.to(item, { opacity: 1, y: 0, duration: 1.0, ease: 'smoothOut' })
          }
        }
        if (lenis) lenis.on('scroll', handler)
        window.addEventListener('scroll', handler, { passive: true })
        handler()
        return () => {
          if (lenis) lenis.off('scroll', handler)
          window.removeEventListener('scroll', handler)
        }
      })

      // CTA also animates when it enters view
      let ctaTriggered = false
      const onCtaScroll = () => {
        if (ctaTriggered) return
        const rect = ctaRef.current.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.92) {
          ctaTriggered = true
          gsap.to(ctaRef.current, { opacity: 1, y: 0, duration: 1.1, ease: 'smoothOut' })
        }
      }
      if (lenis) lenis.on('scroll', onCtaScroll)
      window.addEventListener('scroll', onCtaScroll, { passive: true })
      onCtaScroll()
      ctaCleanup = () => {
        if (lenis) lenis.off('scroll', onCtaScroll)
        window.removeEventListener('scroll', onCtaScroll)
      }
    }

    return () => {
      if (lenis) lenis.off('scroll', onHeaderScroll)
      window.removeEventListener('scroll', onHeaderScroll)
      itemCleanups.forEach((c) => c())
      if (ctaCleanup) ctaCleanup()
      split.revert()
    }
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="what-we-do"
      className="bg-[#202020] px-[48px] py-[103px] max-lg:px-5 max-lg:py-16"
      data-scroll-section
    >
      <div
        className="flex items-start justify-between gap-16 max-lg:flex-col max-lg:gap-10"
        style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
      >
        {/* Left: Label */}
        <div ref={labelRef} className="flex items-center gap-[22px] shrink-0">
          <div className="size-[17px] bg-[#c96b00]" />
          <p className="text-[36px] font-medium leading-[38px] tracking-[-2.16px] text-white max-lg:text-[28px]">
            What we can do
          </p>
        </div>

        {/* Right: Content */}
        <div className="flex flex-col gap-[65px] items-start w-full max-w-[858px] max-lg:max-w-none">
          {/* Description */}
          <p
            ref={textRef}
            className="text-[32px] font-normal leading-[34px] tracking-[0.32px] text-white max-lg:text-[22px] max-lg:leading-[30px]"
          >
            From brand identity to digital presence, we create thoughtful solutions that help businesses connect authentically, communicate clearly, and show up with confidence.
          </p>

          {/* Accordion grid */}
          <div
            ref={gridRef}
            className="grid grid-cols-2 gap-x-[26px] w-full max-lg:grid-cols-1"
          >
            {SERVICES.map((service, i) => (
              <AccordionItem key={i} service={service} />
            ))}
          </div>

          {/* CTA */}
          <div ref={ctaRef}>
            <CTAButton label="VIEW SERVICES" variant="light" href="#services" />
          </div>
        </div>
      </div>
    </section>
  )
}

function AccordionItem({ service }) {
  const [open, setOpen] = useState(false)
  const contentRef = useRef(null)

  const toggle = () => {
    const next = !open
    setOpen(next)

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

  return (
    <div className="service-item border-b border-[#626262]">
      <button
        onClick={toggle}
        className="flex w-full items-center justify-between py-[28px] text-left"
      >
        <p className="text-[26px] font-normal leading-[34px] tracking-[0.26px] text-white max-lg:text-[20px]">
          {service.title}
        </p>
        <div
          className="size-[54px] shrink-0 flex items-center justify-center transition-transform duration-300"
          style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}
        >
          <img src="/images/plus-icon.svg" alt="" className="size-full" />
        </div>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <div className="flex flex-wrap gap-3 pb-[28px]">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#626262] px-5 py-2 text-[15px] tracking-[0.3px] text-white/80"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
