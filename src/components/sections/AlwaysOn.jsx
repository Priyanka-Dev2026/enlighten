import { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/utils/gsap-utils'

const SOCIALS = [
  { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/priyanka-aggarwal-digital-expert/' },
  { label: 'INSTAGRAM', href: 'https://www.instagram.com/enlightendesign_studio' },
  { label: 'WHATSAPP', href: 'https://wa.me/919717069750' },
]

function formatTime(zone) {
  const d = new Date()
  return d.toLocaleTimeString('en-US', {
    timeZone: zone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}

function useClocks() {
  const userZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const [indiaTime, setIndiaTime] = useState(() => formatTime('Asia/Kolkata'))
  const [visitorTime, setVisitorTime] = useState(() => formatTime(userZone))
  const [visitorLocation, setVisitorLocation] = useState({ region: '—', country: '—' })

  useEffect(() => {
    const id = setInterval(() => {
      setIndiaTime(formatTime('Asia/Kolkata'))
      setVisitorTime(formatTime(userZone))
    }, 1000)
    return () => clearInterval(id)
  }, [userZone])

  useEffect(() => {
    const tryFetch = async () => {
      const apis = [
        {
          url: 'https://ipwho.is/',
          parse: (d) => d.success && d.region && d.country ? { region: d.region, country: d.country } : null,
        },
        {
          url: 'https://ipapi.co/json/',
          parse: (d) => d.region && d.country_name ? { region: d.region, country: d.country_name } : null,
        },
        {
          url: 'https://get.geojs.io/v1/ip/geo.json',
          parse: (d) => d.region && d.country ? { region: d.region, country: d.country } : null,
        },
      ]
      for (const api of apis) {
        try {
          const r = await fetch(api.url)
          const d = await r.json()
          const result = api.parse(d)
          if (result) { setVisitorLocation(result); return }
        } catch (_) {}
      }
    }
    tryFetch()
  }, [])

  return { indiaTime, visitorTime, visitorLocation }
}

export default function AlwaysOn() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const { indiaTime, visitorTime, visitorLocation } = useClocks()

  // Reveal animation
  useGSAP(() => {
    const heading = sectionRef.current.querySelector('.ao-heading')
    const clocks = sectionRef.current.querySelectorAll('.ao-clock')
    const pills = sectionRef.current.querySelectorAll('.ao-pill')

    gsap.set(heading, { opacity: 0, y: 30 })
    gsap.set(clocks, { opacity: 0, y: 40 })
    gsap.set(pills, { opacity: 0, y: 20 })

    let triggered = false
    const onScroll = () => {
      if (triggered) return
      const rect = sectionRef.current.getBoundingClientRect()
      const vh = window.innerHeight
      if (rect.top < vh * 0.6) {
        triggered = true

        const tl = gsap.timeline()

        tl.to(heading, {
          opacity: 1, y: 0, duration: 0.9, ease: 'smoothOut',
        }, 0)

        tl.to(clocks, {
          opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'smoothOut',
        }, 0.3)

        tl.to(pills, {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'smoothOut',
        }, 0.5)
      }
    }

    const lenis = window.__lenis
    if (lenis) lenis.on('scroll', onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      if (lenis) lenis.off('scroll', onScroll)
      window.removeEventListener('scroll', onScroll)
    }
  }, { scope: sectionRef })


  return (
    <section
      ref={sectionRef}
      id="always-on"
      className="relative w-full overflow-hidden h-[60vh] lg:h-[90vh]"
      data-scroll-section
    >
      {/* Background — MP4 video on desktop, MP4 video on mobile */}
      <video
        className="absolute inset-0 h-full w-full object-cover hidden lg:block"
        src="/images/always-on-bg-desktop.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <video
        className="absolute inset-0 h-full w-full object-cover lg:hidden"
        src="/images/always-on-bg.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(244deg, rgba(0,0,0,0) 1%, rgba(0,0,0,0.38) 99%), linear-gradient(90deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.35) 100%)',
        }}
      />

      {/* Content — vertically centered, left-aligned */}
      <div
        ref={contentRef}
        className="relative z-10 flex h-full flex-col justify-center gap-10 p-[81px] max-lg:px-5 max-lg:py-0"
        style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
      >
        {/* Heading + Clocks — left-aligned */}
        <div className="flex flex-col gap-[13px] max-w-[874px] text-white">
          <h2 className="ao-heading text-[38px] lg:text-[66px] font-extrabold uppercase leading-[1.07] tracking-[0.01em]">
            Looks like we're both in the right place at the right time.{' '}
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-contact-popup'))}
              className="underline lg:no-underline lg:hover:underline underline-offset-4 cursor-pointer uppercase"
            >
              Let's talk
            </button>
          </h2>

          <div className="flex gap-[94px] max-lg:flex-col max-lg:gap-8">
            {/* India time */}
            <div className="ao-clock flex flex-col gap-[13px]">
              <p className="text-[clamp(36px,5vw,80px)] font-bold leading-[1.07] tracking-[0.01em] whitespace-nowrap">
                {indiaTime}
              </p>
              <p className="text-[20px] font-normal leading-[28px] tracking-[0.2px] max-lg:text-[16px]">
                New Delhi, India
              </p>
            </div>

            {/* Visitor time + location */}
            <div className="ao-clock flex flex-col gap-[13px]">
              <p className="text-[clamp(36px,5vw,80px)] font-bold leading-[1.07] tracking-[0.01em] whitespace-nowrap">
                {visitorTime}
              </p>
              <p className="text-[20px] font-normal leading-[28px] tracking-[0.2px] max-lg:text-[16px]">
                {visitorLocation.region}, {visitorLocation.country}
              </p>
            </div>
          </div>
        </div>

        {/* Social pills */}
        <div className="flex gap-[12px] flex-wrap">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="ao-pill rounded-[21px] bg-white px-[14px] py-[7px] text-[20px] font-normal leading-[24px] tracking-[0.2px] text-[#363636] hover:bg-[#f0f0f0] transition-colors max-lg:text-[16px]"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
