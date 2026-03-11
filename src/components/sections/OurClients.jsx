import { useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, SplitText } from '@/utils/gsap-utils'


const CLIENT_LOGOS = [
  { src: '/images/client-xy-percent.svg', colorSrc: '/images/client-xy-percent-color.svg', alt: 'XY Percent' },
  { src: '/images/client-alam.svg', colorSrc: '/images/client-alam-color.svg', alt: 'Alam by Tulsi Patel' },
  { src: '/images/client-nandita-sikchi.svg', colorSrc: '/images/client-nandita-sikchi-color.svg', alt: 'Nandita Sikchi', itemClass: 'h-[39px] max-lg:h-[24px]' },
  { src: '/images/client-sapna-jain.svg', colorSrc: '/images/client-sapna-jain-color.svg', alt: 'Sapana Jain Studio', itemClass: 'h-[45px] max-lg:h-[28px]' },
  { src: '/images/client-flow.svg', colorSrc: '/images/client-flow-color.svg', alt: 'Flow Furniture' },
  { src: '/images/client-hill-staytion.svg', colorSrc: '/images/client-hill-staytion-color.svg', alt: 'Hill Staytion', itemClass: 'h-[72px] max-lg:h-[44px]' },
  { src: '/images/client-consult-for-impact.webp', colorSrc: '/images/client-consult-for-impact-color.webp', alt: 'Consult for Impact' },
  { src: '/images/client-aura.svg', colorSrc: '/images/client-aura-color.svg', alt: 'Aura Fem Health' },
  { src: '/images/client-skg.svg', colorSrc: '/images/client-skg-color.svg', alt: 'Smt. Krishna Goel', itemClass: 'h-[59px] max-lg:h-[36px]' },
  { src: '/images/client-love-native.webp', colorSrc: '/images/client-love-native-color.webp', alt: 'Love Native' },
  { src: '/images/client-keo.svg', colorSrc: '/images/client-keo-color.svg', alt: 'Keo', itemClass: 'h-[52px] max-lg:h-[32px]' },
  { src: '/images/client-raw-wood-shed.svg', colorSrc: '/images/client-raw-wood-shed-color.svg', alt: 'Raw Wood Shed' },
  { src: '/images/client-kanta.svg', colorSrc: '/images/client-kanta-color.svg', alt: 'Kanta' },
  { src: '/images/client-3d-concepts.svg', colorSrc: '/images/client-3d-concepts-color.svg', alt: '3D Concepts' },
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

          // Interpolate text: white (255) → dark #393939 (57)
          const textV = Math.round(255 - 198 * progress)
          const textColor = `rgb(${textV}, ${textV}, ${textV})`

          // Target p tags and service-item spans only (excludes button spans)
          whatWeDo.querySelectorAll('p').forEach(el => {
            el.style.color = textColor
          })
          whatWeDo.querySelectorAll('.service-item span').forEach(el => {
            el.style.color = textColor
          })

          // Invert plus icons as background lightens
          whatWeDo.querySelectorAll('.service-item img').forEach(img => {
            img.style.filter = `invert(${progress})`
          })

          // CTA button: interpolate pill/circle bg from light → dark variant
          // light: rgba(242,242,242,0.15) → dark: rgba(0,0,0,0.58)
          const ctaEl = document.querySelector('#whatwedo-cta')
          if (ctaEl) {
            const r = Math.round(242 * (1 - progress))
            const alpha = (0.15 + 0.43 * progress).toFixed(3)
            const btnBg = `rgba(${r},${r},${r},${alpha})`
            ctaEl.querySelectorAll('a > span').forEach(span => {
              span.style.backgroundColor = btnBg
            })
          }
        } else {
          whatWeDo.style.backgroundColor = ''
          whatWeDo.querySelectorAll('p').forEach(el => {
            el.style.color = ''
          })
          whatWeDo.querySelectorAll('.service-item span').forEach(el => {
            el.style.color = ''
          })
          whatWeDo.querySelectorAll('.service-item img').forEach(img => {
            img.style.filter = ''
          })
          const ctaEl = document.querySelector('#whatwedo-cta')
          if (ctaEl) {
            ctaEl.querySelectorAll('a > span').forEach(span => {
              span.style.backgroundColor = ''
            })
          }
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

    // Mobile: color logos when visible in the horizontal viewport
    const checkColors = () => {
      if (window.innerWidth >= 1024) return
      const items = marquee.querySelectorAll('.logo-item')
      items.forEach(item => {
        const rect = item.getBoundingClientRect()
        const inView = rect.left < window.innerWidth && rect.right > 0
        const bwImg = item.querySelector('.logo-bw')
        const colorImg = item.querySelector('.logo-color')
        if (!bwImg || !colorImg) return
        bwImg.style.opacity = inView ? '0' : '1'
        colorImg.style.opacity = inView ? '1' : '0'
      })
    }
    gsap.ticker.add(checkColors)

    return () => {
      tween.kill()
      gsap.ticker.remove(checkColors)
    }
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
          <p className="text-[36px] font-medium leading-[38px] tracking-[-2.2px] text-[#393939] max-lg:text-[28px]">
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
              className={`logo-item group relative flex items-center justify-center ${logo.itemClass ?? 'h-[65px] max-lg:h-[40px]'}`}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="logo-bw h-full w-auto object-contain lg:transition-opacity lg:duration-300 lg:group-hover:opacity-0"
              />
              <img
                src={logo.colorSrc}
                alt={logo.alt}
                className="logo-color absolute h-full w-auto object-contain opacity-0 lg:transition-opacity lg:duration-300 lg:group-hover:opacity-100"
              />
            </div>
          ))}
          {/* Spacer to maintain gap between end and cloned start */}
          <div className="w-0" />
        </div>
      </div>
    </section>
  )
}
