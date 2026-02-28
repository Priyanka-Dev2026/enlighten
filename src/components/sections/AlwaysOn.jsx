import { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/utils/gsap-utils'

const SOCIALS = ['FACEBOOK', 'INSTAGRAM', 'WHATSAPP']

function formatTime(zone) {
  const d = new Date()
  return d.toLocaleTimeString('en-US', {
    timeZone: zone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}

function formatZoneLabel(zone) {
  const parts = zone.split('/')
  if (parts.length < 2) return zone
  const city = parts[parts.length - 1].replace(/_/g, ' ')
  const region = parts[0].replace(/_/g, ' ')
  return `${city}, ${region}`
}

function useClocks() {
  const userZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const timezones = [
    { zone: 'Asia/Kolkata', label: 'New Delhi, India' },
    { zone: userZone, label: formatZoneLabel(userZone) },
  ]

  const [times, setTimes] = useState(() =>
    timezones.map((tz) => formatTime(tz.zone))
  )

  useEffect(() => {
    const id = setInterval(() => {
      setTimes(timezones.map((tz) => formatTime(tz.zone)))
    }, 1000)
    return () => clearInterval(id)
  }, [])

  return { times, timezones }
}

export default function AlwaysOn() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const { times, timezones: TIMEZONES } = useClocks()

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
      className="relative min-h-screen w-full overflow-hidden"
      data-scroll-section
    >
      {/* Background */}
      <img
        src="/images/always-on-bg.webp"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(244deg, rgba(0,0,0,0) 1%, rgba(0,0,0,0.38) 99%), linear-gradient(90deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.35) 100%)',
        }}
      />

      {/* Content — 3-slot flex: spacer / center content / bottom pills */}
      <div
        ref={contentRef}
        className="relative z-10 flex min-h-screen flex-col justify-between p-[81px] max-lg:px-5 max-lg:py-16"
        style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
      >
        {/* Top spacer — pushes center content to vertical middle */}
        <div />

        {/* Center: Heading + Clocks — left-aligned */}
        <div className="flex flex-col gap-[13px] max-w-[874px] text-white">
          <h2 className="ao-heading text-[clamp(60px,10vw,157px)] font-extrabold uppercase leading-[1.07] tracking-[0.01em]">
            Always on
          </h2>

          <div className="flex gap-[94px] max-lg:flex-col max-lg:gap-8">
            {TIMEZONES.map((tz, i) => (
              <div key={tz.zone} className="ao-clock flex flex-col gap-[13px]">
                <p className="text-[clamp(36px,5vw,80px)] font-bold leading-[1.07] tracking-[0.01em] whitespace-nowrap">
                  {times[i]}
                </p>
                <p className="text-[20px] font-normal leading-[28px] tracking-[0.2px] max-lg:text-[16px]">
                  {tz.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: Social pills */}
        <div className="flex gap-[12px] flex-wrap">
          {SOCIALS.map((name) => (
            <span
              key={name}
              className="ao-pill rounded-[21px] bg-white px-[14px] py-[7px] text-[20px] font-normal leading-[24px] tracking-[0.2px] text-[#363636] max-lg:text-[16px]"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
