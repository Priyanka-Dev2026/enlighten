import { useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, SplitText } from '@/utils/gsap-utils'

const CLIENT_LOGOS = [
  { src: '/images/client-xy-percent.webp', alt: 'XY Percent' },
  { src: '/images/client-alam.webp', alt: 'Alam by Tulsi Patel' },
  { src: '/images/client-nandita-sikchi.webp', alt: 'Nandita Sikchi' },
  { src: '/images/client-sapana-jain.webp', alt: 'Sapana Jain' },
  { src: '/images/client-flow.webp', alt: 'Flow Furniture' },
  { src: '/images/client-hill-staytion.webp', alt: 'Hill Staytion' },
  { src: '/images/client-consult-for-impact.webp', alt: 'Consult for Impact' },
  { src: '/images/client-aura.webp', alt: 'Aura Fem Health' },
]

export default function OurClients() {
  const sectionRef = useRef(null)
  const labelRef = useRef(null)
  const textRef = useRef(null)
  const marqueeRef = useRef(null)

  // Dark-to-light bg transition as section enters viewport
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const updateBg = () => {
      const rect = section.getBoundingClientRect()
      const vh = window.innerHeight

      // progress: 0 when section top is at viewport bottom, 1 when top reaches 20% from top
      const start = vh
      const end = vh * 0.2
      const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)))

      // Interpolate from #202020 (32) to #ffffff (255)
      const v = Math.round(32 + (255 - 32) * progress)
      section.style.backgroundColor = `rgb(${v}, ${v}, ${v})`

      // Also transition WhatWeDo section above for seamless blend
      const whatWeDo = document.querySelector('#what-we-do')
      if (whatWeDo) {
        if (progress > 0) {
          whatWeDo.style.backgroundColor = `rgb(${v}, ${v}, ${v})`
        } else {
          whatWeDo.style.backgroundColor = ''
        }
      }

    }

    const lenis = window.__lenis
    if (lenis) lenis.on('scroll', updateBg)
    window.addEventListener('scroll', updateBg, { passive: true })
    updateBg()

    return () => {
      if (lenis) lenis.off('scroll', updateBg)
      window.removeEventListener('scroll', updateBg)
    }
  }, [])

  // Reveal animation
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

    let triggered = false
    const onScroll = () => {
      if (triggered) return
      const rect = sectionRef.current.getBoundingClientRect()
      const vh = window.innerHeight
      if (rect.top < vh * 0.8) {
        triggered = true
        const tl = gsap.timeline()
        tl.to(labelRef.current, {
          opacity: 1, y: 0, duration: 1.1, ease: 'smoothOut',
        }, 0)
        tl.to(split.lines, {
          opacity: 1, y: '0%', duration: 1.3, stagger: 0.12, ease: 'smoothOut',
        }, 0.1)
      }
    }

    const lenis = window.__lenis
    if (lenis) lenis.on('scroll', onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      if (lenis) lenis.off('scroll', onScroll)
      window.removeEventListener('scroll', onScroll)
      split.revert()
    }
  }, { scope: sectionRef })

  // Marquee animation — continuous horizontal scroll
  useEffect(() => {
    const marquee = marqueeRef.current
    if (!marquee) return

    const track = marquee.querySelector('.marquee-track')
    if (!track) return

    // Duplicate content for seamless loop
    const clone = track.innerHTML
    track.innerHTML += clone

    const tween = gsap.to(track, {
      xPercent: -50,
      duration: 50,
      ease: 'none',
      repeat: -1,
    })

    return () => tween.kill()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="our-clients"
      className="bg-[#202020] px-[48px] pt-[103px] pb-[80px] max-lg:px-5 max-lg:pt-16 max-lg:pb-12"
      data-scroll-section
    >
      {/* Header */}
      <div
        className="flex items-start justify-between gap-16 mb-[154px] max-lg:flex-col max-lg:gap-10 max-lg:mb-20"
        style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
      >
        {/* Left: Label */}
        <div ref={labelRef} className="flex items-center gap-[22px] shrink-0">
          <div className="size-[17px] bg-[#c96b00]" />
          <p className="text-[36px] font-medium leading-[38px] tracking-[0px] text-[#393939] max-lg:text-[28px]">
            Our Clients
          </p>
        </div>

        {/* Right: Description */}
        <p
          ref={textRef}
          className="text-[28px] font-normal leading-[34px] tracking-[0.32px] text-[#111] w-full max-w-[858px] max-lg:max-w-none max-lg:text-[22px] max-lg:leading-[30px]"
          style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
        >
          Honoured to collaborate with businesses shaping their digital presence.
        </p>
      </div>

      {/* Marquee logos */}
      <div ref={marqueeRef} className="overflow-hidden">
        <div className="marquee-track flex items-center gap-[92px] w-max">
          {CLIENT_LOGOS.map((logo, i) => (
            <div
              key={i}
              className="group relative flex items-center justify-center h-[65px] max-lg:h-[40px]"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-full w-auto object-contain transition-opacity duration-300 group-hover:opacity-0"
              />
              <span
                className="absolute inset-0 flex items-center justify-center whitespace-nowrap text-sm font-medium uppercase tracking-widest text-[#393939] opacity-0 transition-opacity duration-300 group-hover:opacity-100 max-lg:text-xs"
                style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
              >
                {logo.alt}
              </span>
            </div>
          ))}
          {/* Spacer to maintain gap between end and cloned start */}
          <div className="w-0" />
        </div>
      </div>
    </section>
  )
}
