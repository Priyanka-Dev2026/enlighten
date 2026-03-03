import { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, SplitText } from '@/utils/gsap-utils'
import CTAButton from '@components/ui/CTAButton'

const HEADING_TEXT = 'Where clarity, strategy and precise execution nurture growth.'

export default function SpringToAction() {
  const sectionRef = useRef(null)
  const textWrapperRef = useRef(null)
  const textRef = useRef(null)
  const mobileTextRef = useRef(null)
  const mobileCtaRef = useRef(null)
  const ctaRef = useRef(null)
  const stickyRef = useRef(null)
  const maxShiftRef = useRef(0)
  const [sectionHeight, setSectionHeight] = useState('200vh')

  // Calculate section height based on text width so sticky holds
  // until the entire text has scrolled through, then releases
  useEffect(() => {
    const textEl = textRef.current
    if (!textEl) return

    const calcHeight = () => {
      // On mobile: disable horizontal scroll, let section be natural height
      if (window.innerWidth < 1024) {
        setSectionHeight('auto')
        return
      }

      // Use offsetWidth on the inline-block <p> directly — more reliable than
      // scrollWidth on the container, especially in Safari where scrollWidth on
      // a child of overflow:hidden can return the clipped/container width instead
      const textW = textEl.offsetWidth
      const viewW = window.innerWidth
      // Use window.innerHeight instead of 100vh to stay in sync with JS progress calc.
      // In Safari, CSS 100vh and window.innerHeight can diverge, causing sticky
      // container height to mismatch the scroll progress, producing extra whitespace.
      const vh = window.innerHeight
      const maxShift = Math.max(0, textW - viewW + 100)

      // Cache maxShift — avoids re-reading scrollWidth during scroll (unreliable in Safari)
      maxShiftRef.current = maxShift

      // Pin sticky container to exact JS viewport height to match scroll math
      if (stickyRef.current) {
        stickyRef.current.style.height = `${vh}px`
      }

      const height = vh + maxShift + vh * 0.6
      setSectionHeight(`${height}px`)
    }

    // Double RAF: first ensures SplitText chars are in the DOM,
    // second ensures layout has fully settled (needed in Safari)
    requestAnimationFrame(() => requestAnimationFrame(calcHeight))
    window.addEventListener('resize', calcHeight)
    return () => window.removeEventListener('resize', calcHeight)
  }, [])

  // Horizontal scroll driven by Lenis scroll position
  useEffect(() => {
    const section = sectionRef.current
    const textWrapper = textWrapperRef.current
    if (!section || !textWrapper) return

    const onScroll = () => {
      // On mobile: skip horizontal transform
      if (window.innerWidth < 1024) {
        textWrapper.style.transform = ''
        return
      }

      const rect = section.getBoundingClientRect()
      const vh = window.innerHeight
      const sectionH = section.offsetHeight

      // progress: 0 when sticky starts (section top hits viewport top)
      // progress: 1 when section bottom reaches viewport bottom
      const scrollable = sectionH - vh
      const scrolled = -rect.top
      const progress = Math.min(1, Math.max(0, scrolled / scrollable))

      // Use cached maxShift — avoids unreliable scrollWidth reads during scroll in Safari
      const maxShift = maxShiftRef.current
      const x = -progress * maxShift

      textWrapper.style.transform = `translate3d(${x}px, 0, 0)`
    }

    const lenis = window.__lenis
    if (lenis) lenis.on('scroll', onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      if (lenis) lenis.off('scroll', onScroll)
      window.removeEventListener('scroll', onScroll)
    }
  }, [sectionHeight])

  // SplitText character animation — chars reveal as they scroll into view
  useGSAP(() => {
    const el = textRef.current
    if (!el) return

    const split = new SplitText(el, { type: 'chars' })

    // Set initial state: chars are dimmed, shifted down, and slightly rotated
    gsap.set(split.chars, {
      opacity: 0.2,
      y: () => gsap.utils.random(-80, 80),
      rotation: () => gsap.utils.random(-15, 15),
    })

    // Animate each char when it enters the viewport
    let animated = new Set()

    const onScroll = () => {
      const vw = window.innerWidth

      split.chars.forEach((char, i) => {
        if (animated.has(i)) return
        const rect = char.getBoundingClientRect()
        // Trigger when char enters the viewport
        if (rect.left < vw && rect.right > 0) {
          animated.add(i)
          gsap.to(char, {
            opacity: 1,
            y: 0,
            rotation: 0,
            duration: 1.0,
            ease: 'smoothOut',
            delay: gsap.utils.random(0, 0.15),
          })
        }
      })
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

  // CTA reveal
  useGSAP(() => {
    gsap.set(ctaRef.current, { opacity: 0, y: 20 })

    let triggered = false
    const onScroll = () => {
      if (triggered) return
      const rect = sectionRef.current.getBoundingClientRect()
      const vh = window.innerHeight
      if (rect.top < vh * 0.6) {
        triggered = true
        gsap.to(ctaRef.current, {
          opacity: 1, y: 0, duration: 1.1, ease: 'smoothOut',
        })
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

  // Mobile text reveal — line split (desktop uses horizontal char animation instead)
  useGSAP(() => {
    const el = mobileTextRef.current
    if (!el) return

    const split = new SplitText(el, { type: 'lines' })

    split.lines.forEach((line) => {
      const wrapper = document.createElement('div')
      wrapper.style.overflow = 'hidden'
      line.parentNode.insertBefore(wrapper, line)
      wrapper.appendChild(line)
    })

    gsap.set(split.lines, { opacity: 0, y: '100%' })
    gsap.set(mobileCtaRef.current, { opacity: 0, y: 20 })

    let triggered = false
    const onScroll = () => {
      if (triggered) return
      const rect = sectionRef.current.getBoundingClientRect()
      const vh = window.innerHeight
      if (rect.top < vh * 0.8) {
        triggered = true
        const tl = gsap.timeline()
        tl.to(split.lines, {
          opacity: 1, y: '0%', duration: 1.3, stagger: 0.12, ease: 'smoothOut',
        }, 0)
        tl.to(mobileCtaRef.current, {
          opacity: 1, y: 0, duration: 1.1, ease: 'smoothOut',
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
      split.revert()
    }
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="spring-to-action"
      className="relative bg-[#ffffff]"
      style={{ height: sectionHeight }}
      data-theme="light"
      data-scroll-section
    >
      {/* Desktop: sticky horizontal scroll container */}
      <div ref={stickyRef} className="hidden lg:flex sticky top-0 h-screen flex-col justify-center">
        <div className="overflow-hidden px-[48px]">
          <div
            ref={textWrapperRef}
            className="whitespace-nowrap will-change-transform"
            style={{ transform: 'translate3d(0, 0, 0)' }}
          >
            <p
              ref={textRef}
              className="inline-block text-[clamp(60px,10vw,157px)] font-extrabold uppercase leading-[1.07] tracking-[0.01em] text-[#393939]"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
            >
              {HEADING_TEXT}
            </p>
          </div>
        </div>

        {/* CTA button */}
        <div
          ref={ctaRef}
          className="mt-16 flex items-center justify-center"
        >
          <CTAButton label="CONNECT WITH US" variant="dark" href="#contact" />
        </div>
      </div>

      {/* Mobile: static stacked layout */}
      <div className="lg:hidden flex flex-col justify-center gap-10 px-5 py-20">
        <p
          ref={mobileTextRef}
          className="text-[36px] font-extrabold uppercase leading-[1.15] tracking-[0.01em] text-[#393939] break-words"
          style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
        >
          Where clarity, strategy and{' '}
          <span className="whitespace-nowrap">precise execution</span>
          {' '}nurture growth.
        </p>
        <div ref={mobileCtaRef} className="flex items-center justify-start">
          <CTAButton label="CONNECT WITH US" variant="dark" href="#contact" />
        </div>
      </div>
    </section>
  )
}
