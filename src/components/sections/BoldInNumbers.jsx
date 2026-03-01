import { useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/utils/gsap-utils'

const STATS = [
  {
    value: '7Y+',
    label: 'Experience',
    description: 'Building brands through thoughtful design, strategy, and consistent digital execution.',
  },
  {
    value: '60+',
    label: 'Clients',
    description: 'Trusted by growing businesses across industries for reliable creative and digital support.',
  },
  {
    value: '150+',
    label: 'Projects Delivered',
    description: 'From websites to branding, every project completed with clarity, care, and purpose.',
  },
  {
    value: '15+',
    label: 'Industries Served',
    description: 'Experience working with diverse sectors, understanding unique needs and business goals.',
  },
]

const SCRAMBLE_CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ+%#'

function scrambleText(element, finalText, duration = 0.8, delay = 0) {
  if (!element) return null
  const totalFrames = Math.ceil(duration * 60)
  const delayFrames = Math.ceil(delay * 60)
  let frame = 0
  let rafId = null

  // Don't clear text — keep original value visible until scramble starts
  const update = () => {
    frame++
    if (frame <= delayFrames) {
      rafId = requestAnimationFrame(update)
      return
    }

    const activeFrame = frame - delayFrames
    const progress = activeFrame / totalFrames
    const resolved = Math.floor(finalText.length * progress)

    let result = ''
    for (let i = 0; i < finalText.length; i++) {
      if (i < resolved) {
        result += finalText[i]
      } else if (finalText[i] === ' ') {
        result += ' '
      } else {
        result += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
      }
    }

    element.textContent = result

    if (activeFrame < totalFrames) {
      rafId = requestAnimationFrame(update)
    } else {
      element.textContent = finalText
    }
  }

  rafId = requestAnimationFrame(update)
  return () => {
    if (rafId) cancelAnimationFrame(rafId)
    // Ensure final text is always set on cleanup
    element.textContent = finalText
  }
}

export default function BoldInNumbers({ entranceComplete }) {
  const sectionRef = useRef(null)
  const labelRef = useRef(null)
  const cardsRef = useRef([])
  const valueRefs = useRef([])
  const hasScrambledRef = useRef(false)

  useGSAP(() => {
    if (!entranceComplete) return

    const cards = cardsRef.current.filter(Boolean)
    const isMobile = window.innerWidth < 1024

    // Initial states
    gsap.set(labelRef.current, { opacity: 0, y: 30 })
    gsap.set(cards, { opacity: 0, y: 40 })

    const lenis = window.__lenis

    if (isMobile) {
      // Label triggers when section enters
      let labelTriggered = false
      const onLabelScroll = () => {
        if (labelTriggered) return
        const rect = sectionRef.current.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.85) {
          labelTriggered = true
          gsap.to(labelRef.current, { opacity: 1, y: 0, duration: 1.1, ease: 'smoothOut' })
        }
      }
      if (lenis) lenis.on('scroll', onLabelScroll)
      window.addEventListener('scroll', onLabelScroll, { passive: true })
      onLabelScroll()

      // Each card triggers independently as it scrolls into view
      const cardCleanups = cards.map((card) => {
        let triggered = false
        const handler = () => {
          if (triggered) return
          const rect = card.getBoundingClientRect()
          if (rect.top < window.innerHeight * 0.88) {
            triggered = true
            gsap.to(card, { opacity: 1, y: 0, duration: 1.3, ease: 'smoothOut' })
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

      return () => {
        if (lenis) lenis.off('scroll', onLabelScroll)
        window.removeEventListener('scroll', onLabelScroll)
        cardCleanups.forEach((c) => c())
      }
    } else {
      // Desktop: all cards animate together with stagger
      let triggered = false
      const onScroll = () => {
        if (triggered) return
        const rect = sectionRef.current.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.8) {
          triggered = true
          const tl = gsap.timeline()
          tl.to(labelRef.current, { opacity: 1, y: 0, duration: 1.1, ease: 'smoothOut' }, 0)
          tl.to(cards, { opacity: 1, y: 0, duration: 1.3, stagger: 0.15, ease: 'smoothOut' }, 0.2)
        }
      }
      if (lenis) lenis.on('scroll', onScroll)
      window.addEventListener('scroll', onScroll, { passive: true })
      onScroll()

      return () => {
        if (lenis) lenis.off('scroll', onScroll)
        window.removeEventListener('scroll', onScroll)
      }
    }
  }, { scope: sectionRef, dependencies: [entranceComplete] })

  // Scramble numbers when each card enters viewport — per-card on mobile, batch on desktop
  useEffect(() => {
    if (!entranceComplete) return
    const isMobile = window.innerWidth < 1024
    const cancels = []

    if (isMobile) {
      // Each number scrambles independently when its card enters view
      const cardCleanups = valueRefs.current.map((el, i) => {
        if (!el) return () => {}
        let triggered = false
        const handler = () => {
          if (triggered) return
          const card = cardsRef.current[i]
          if (!card) return
          const rect = card.getBoundingClientRect()
          if (rect.top < window.innerHeight * 0.88) {
            triggered = true
            setTimeout(() => {
              const cancel = scrambleText(el, STATS[i].value, 1, 0)
              if (cancel) cancels.push(cancel)
            }, 150)
          }
        }
        const lenis = window.__lenis
        if (lenis) lenis.on('scroll', handler)
        window.addEventListener('scroll', handler, { passive: true })
        handler()
        return () => {
          if (lenis) lenis.off('scroll', handler)
          window.removeEventListener('scroll', handler)
        }
      })

      return () => {
        cardCleanups.forEach((c) => c())
        cancels.forEach((c) => c())
      }
    } else {
      // Desktop: all scramble together when section enters
      const section = sectionRef.current
      if (!section) return
      let triggered = false
      const onScroll = () => {
        if (triggered) return
        const rect = section.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.8) {
          triggered = true
          setTimeout(() => {
            valueRefs.current.forEach((el, i) => {
              const cancel = scrambleText(el, STATS[i].value, 1, i * 0.15)
              if (cancel) cancels.push(cancel)
            })
          }, 200)
        }
      }
      const lenis = window.__lenis
      if (lenis) lenis.on('scroll', onScroll)
      window.addEventListener('scroll', onScroll, { passive: true })
      onScroll()

      return () => {
        if (lenis) lenis.off('scroll', onScroll)
        window.removeEventListener('scroll', onScroll)
        cancels.forEach((c) => c())
      }
    }
  }, [entranceComplete])

  const setCardRef = (i) => (el) => { cardsRef.current[i] = el }
  const setValueRef = (i) => (el) => { valueRefs.current[i] = el }

  return (
    <section
      ref={sectionRef}
      id="bold-in-numbers"
      className="bg-[#ffffff] border-t border-[#898989] px-[48px] py-[98px] max-lg:px-5 max-lg:py-16"
      style={{ color: 'rgb(57, 57, 57)' }}
      data-theme="light"
      data-scroll-section
    >
      {/* Label */}
      <div ref={labelRef} className="flex items-center gap-[22px] mb-[56px]">
        <div className="size-[17px] bg-[#c96b00]" />
        <p
          className="text-[36px] font-medium leading-[38px] tracking-[-2.16px] max-lg:text-[28px]"
          style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
        >
          Bold in numbers
        </p>
      </div>

      {/* Stats grid */}
      <div className="flex gap-[22px] max-lg:flex-col">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            ref={setCardRef(i)}
            className="flex-1 border-l max-lg:border-l-0 max-lg:border-b border-[#bbb] p-[28px] flex flex-col gap-[12px] max-lg:px-0 max-lg:py-8"
          >
            <p
              ref={setValueRef(i)}
              className="text-[98px] font-medium leading-[106px] tracking-[1px] max-lg:text-[60px] max-lg:leading-[68px]"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
            >
              {stat.value}
            </p>
            <p
              className="text-[22px] font-normal leading-[34px] tracking-[0.22px] uppercase max-lg:text-[18px]"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
            >
              {stat.label}
            </p>
            <p
              className="text-[18px] font-normal leading-[24px] tracking-[0.18px] max-lg:text-[16px] max-lg:leading-[22px]"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
            >
              {stat.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
