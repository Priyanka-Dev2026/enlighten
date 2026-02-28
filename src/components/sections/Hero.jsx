import { useRef, useEffect, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/utils/gsap-utils'

// Line coordinates (viewBox 0 0 1920 1080) — full edge-to-edge, desktop only
const GRID_LINES = [
  { x1: 96, y1: 0, x2: 96, y2: 1080 },
  { x1: 120, y1: 0, x2: 1372, y2: 1080 },
  { x1: 1404, y1: 0, x2: 1404, y2: 1080 },
  { x1: 665, y1: 0, x2: 1898, y2: 1080 },
  { x1: 1920, y1: 0, x2: 1920, y2: 1080 },
]

// Mobile line paths (viewBox 0 0 1130.37 668.502) — from Figma
const MOBILE_GRID_LINES = [
  'M1 666.513V2.47315',
  'M23.2579 6.18287L786.842 665.277',
  'M809.719 665.277V0.618287',
  'M354.041 1.23657L1113.92 667.75',
  'M1129.37 666.513V0',
]

export default function Hero({ onEntranceComplete }) {
  const sectionRef = useRef(null)
  const bgImageRef = useRef(null)
  const overlayRef = useRef(null)
  const gridSvgRef = useRef(null)
  const lineRefs = useRef([])
  const mobileLineRefs = useRef([])
  const mobileGridSvgRef = useRef(null)
  const taglineLeftRef = useRef(null)
  const taglineRightRef = useRef(null)
  const wordmarkRef = useRef(null)
  const darkOverlayRef = useRef(null)
  const centerLogoRef = useRef(null)
  const measureRef = useRef(null)
  const measureLeftRef = useRef(null)
  const measureRightRef = useRef(null)
  const mobileTaglineRef = useRef(null)

  const bgLoadedRef = useRef(false)
  const [entranceDone, setEntranceDone] = useState(false)

  // Preload hero background image
  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      bgLoadedRef.current = true
    }
    img.src = '/images/hero-bg.webp'
  }, [])

  // Main entrance animation (preloader + hero reveal in one timeline)
  useGSAP(() => {
    // Lock scrolling during entrance
    window.__lenis?.stop()
    document.body.style.overflow = 'hidden'

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      // Skip to final hero state
      gsap.set(darkOverlayRef.current, { opacity: 0 })
      gsap.set(centerLogoRef.current, { opacity: 0 })
      if (mobileGridSvgRef.current) {
        mobileGridSvgRef.current.style.position = 'absolute'
        mobileGridSvgRef.current.style.zIndex = '6'
      }
      gsap.set(bgImageRef.current, { scale: 1.05 })
      gsap.set(overlayRef.current, { opacity: 1 })
      gsap.set(wordmarkRef.current, { opacity: 1, y: 0 })
      gsap.set(taglineLeftRef.current, { opacity: 1 })
      gsap.set(taglineRightRef.current, { opacity: 1 })
      gsap.set(mobileTaglineRef.current, { opacity: 1, y: 0 })
      const lines = [...lineRefs.current.filter(Boolean), ...mobileLineRefs.current.filter(Boolean)]
      lines.forEach((line) => {
        gsap.set(line, { strokeDashoffset: 0 })
      })
      document.body.style.overflow = ''
      window.__lenis?.start()
      setEntranceDone(true)
      onEntranceComplete?.()
      return
    }

    const lines = [...lineRefs.current.filter(Boolean), ...mobileLineRefs.current.filter(Boolean)]

    // --- FLIP: Compute text deltas ---
    // Final positions (where texts are in the DOM)
    const leftFinal = taglineLeftRef.current.getBoundingClientRect()
    const rightFinal = taglineRightRef.current.getBoundingClientRect()
    // Centered positions (from hidden measurement div)
    const leftCenter = measureLeftRef.current.getBoundingClientRect()
    const rightCenter = measureRightRef.current.getBoundingClientRect()
    // Deltas: offset from final to centered
    const leftDx = leftCenter.left - leftFinal.left
    const leftDy = leftCenter.top - leftFinal.top
    const rightDx = rightCenter.left - rightFinal.left
    const rightDy = rightCenter.top - rightFinal.top

    // --- Initial states ---
    // Dark overlay covers everything
    gsap.set(darkOverlayRef.current, { opacity: 1 })
    // Background image behind dark overlay, zoomed
    gsap.set(bgImageRef.current, { scale: 1.15 })
    // Gradient overlay hidden initially
    gsap.set(overlayRef.current, { opacity: 0 })
    // Center logo hidden
    gsap.set(centerLogoRef.current, { opacity: 0, scale: 0.95 })
    // Taglines at centered position, hidden
    gsap.set(taglineLeftRef.current, { opacity: 0, x: leftDx, y: leftDy })
    gsap.set(taglineRightRef.current, { opacity: 0, x: rightDx, y: rightDy })
    // Wordmark hidden
    gsap.set(wordmarkRef.current, { opacity: 0, y: 80 })
    // Mobile tagline hidden
    gsap.set(mobileTaglineRef.current, { opacity: 0, y: 20 })
    // Lines: set stroke-dasharray/dashoffset for draw-in
    lines.forEach((line) => {
      const length = line.getTotalLength()
      gsap.set(line, {
        strokeDasharray: length,
        strokeDashoffset: length,
      })
    })

    // --- Master Timeline ---
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = ''
        window.__lenis?.start()
        setEntranceDone(true)
        onEntranceComplete?.()
      },
    })

    // Phase 1: Preloader Entrance (0s–1.8s)
    // Lines draw in
    tl.to(lines, {
      strokeDashoffset: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: 'power3.out',
    }, 0)

    // Center logo fades in
    tl.to(centerLogoRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: 'smoothOut',
    }, 0.6)

    // Taglines fade in at centered positions
    tl.to(taglineLeftRef.current, {
      opacity: 1,
      duration: 0.8,
      ease: 'smoothOut',
    }, 0.8)
    tl.to(taglineRightRef.current, {
      opacity: 1,
      duration: 0.8,
      ease: 'smoothOut',
    }, 0.8)

    // --- Hold (1.6s–2.6s) ---

    // Phase 2: Transition to Hero (2.6s–4.8s)
    // Center logo fades out
    tl.to(centerLogoRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.6,
      ease: 'smoothIn',
    }, 2.6)

    // Dark overlay + mobile grid lines fade to 0 (reveal hero-bg.jpg)
    tl.to(darkOverlayRef.current, {
      opacity: 0,
      duration: 1.4,
      ease: 'smooth',
      onStart: () => {
        // If bg image not loaded yet, pause and wait
        if (!bgLoadedRef.current) {
          tl.pause()
          const img = new Image()
          img.onload = () => {
            bgLoadedRef.current = true
            tl.resume()
          }
          img.src = '/images/hero-bg.webp'
        }
      },
    }, 2.8)

    // Mobile grid SVG: switch from fixed (preloader) to absolute (hero) at the same moment
    // the overlay fades — scroll is at 0 so the visual position is identical, seamless switch.
    // The section's overflow-hidden then clips the SVG to the hero image height.
    tl.call(() => {
      if (mobileGridSvgRef.current) {
        mobileGridSvgRef.current.style.position = 'absolute'
        mobileGridSvgRef.current.style.zIndex = '6'
      }
    }, null, 2.8)

    // BG image zoom settles
    tl.to(bgImageRef.current, {
      scale: 1.05,
      duration: 2.0,
      ease: 'smoothOut',
    }, 2.8)

    // Gradient overlay fades in
    tl.to(overlayRef.current, {
      opacity: 1,
      duration: 1.2,
      ease: 'smoothOut',
    }, 3.0)

    // Taglines move from centered to edge positions (FLIP complete)
    tl.to(taglineLeftRef.current, {
      x: 0,
      y: 0,
      duration: 1.2,
      ease: 'smooth',
    }, 3.0)
    tl.to(taglineRightRef.current, {
      x: 0,
      y: 0,
      duration: 1.2,
      ease: 'smooth',
    }, 3.0)

    // Wordmark fades in at bottom
    tl.to(wordmarkRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.4,
      ease: 'smoothOut',
    }, 3.2)

    // Mobile tagline fades in
    tl.to(mobileTaglineRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.0,
      ease: 'smoothOut',
    }, 3.2)

  }, { scope: sectionRef })

  // Scroll animation — only created after entrance completes
  useGSAP(() => {
    if (!entranceDone) return

    // Small delay to ensure DOM is settled after entrance
    ScrollTrigger.refresh()

    ScrollTrigger.matchMedia({
      '(min-width: 1024px)': () => {
        const wordmarkEl = wordmarkRef.current
        const navLogo = document.querySelector('#nav-logo')

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=100%',
            scrub: 1,
            pin: true,
            pinSpacing: true,
          },
        })

        // Wordmark: scale down + move up toward navbar center
        tl.to(wordmarkEl, {
          scale: 0.06,
          y: -(window.innerHeight * 0.46),
          duration: 1,
          ease: 'none',
        }, 0)

        // Cross-fade: wordmark fades out, navbar logo fades in
        tl.to(wordmarkEl, {
          opacity: 0,
          duration: 0.15,
        }, 0.85)
        if (navLogo) {
          tl.to(navLogo, {
            opacity: 1,
            duration: 0.15,
          }, 0.85)
        }
      },

      '(max-width: 1023px)': () => {
        gsap.to(wordmarkRef.current, {
          yPercent: -15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        })
      },
    })
  }, { scope: sectionRef, dependencies: [entranceDone] })

  return (
    <section
      ref={sectionRef}
      className="relative h-[668px] lg:h-screen w-full overflow-hidden bg-black"
      data-scroll-section
    >
      {/* Layer 1: Background image */}
      <div className="absolute inset-0">
        <img
          ref={bgImageRef}
          src="/images/hero-bg.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
        />
        {/* Gradient overlays from Figma */}
        <div
          ref={overlayRef}
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 100%), linear-gradient(90deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%)',
          }}
        />
      </div>

      {/* Layer 2a: Desktop grid lines — hidden on mobile */}
      <svg
        ref={gridSvgRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-[6] hidden lg:block"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
        fill="none"
      >
        {GRID_LINES.map((line, i) => (
          <line
            key={i}
            ref={(el) => { lineRefs.current[i] = el }}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="#B9B9B9"
            strokeOpacity="0.11"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      {/* Layer 2b: Mobile grid lines — fixed full-viewport, hidden on desktop */}
      <svg
        ref={mobileGridSvgRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-[201] lg:hidden"
        viewBox="0 0 1130.37 668.502"
        preserveAspectRatio="none"
        fill="none"
      >
        {MOBILE_GRID_LINES.map((d, i) => (
          <path
            key={i}
            ref={(el) => { mobileLineRefs.current[i] = el }}
            d={d}
            stroke="#B9B9B9"
            strokeOpacity="0.11"
            strokeWidth="2"
          />
        ))}
      </svg>

      {/* Layer 3: Dark overlay (preloader background) — fixed full-viewport on mobile, absolute on desktop */}
      <div
        ref={darkOverlayRef}
        className="fixed inset-0 z-[200] bg-[#232121] pointer-events-none lg:absolute lg:z-[5]"
      />

      {/* Layer 4: Center logo (preloader element, fades out) — fixed full-viewport on mobile, absolute on desktop */}
      <div
        ref={centerLogoRef}
        className="fixed inset-0 z-[202] flex items-center justify-center pointer-events-none lg:absolute lg:z-[7]"
      >
        <div className="w-[clamp(200px,21vw,404px)]">
          <img
            src="/images/enlighten-logo.svg"
            alt="Enlighten Creatives"
            className="h-auto w-full"
          />
        </div>
      </div>

      {/* Layer 5: Tagline — left (final position: edge) */}
      <p
        ref={taglineLeftRef}
        className="absolute left-[3.5%] top-[47%] z-[7] hidden text-[clamp(1.25rem,2.17vw,42px)] font-light tracking-[-1px] text-white md:block will-change-transform"
        style={{ fontFamily: "'Sentient', serif" }}
      >
        A people first
      </p>

      {/* Layer 5: Tagline — right (final position: edge) */}
      <p
        ref={taglineRightRef}
        className="absolute right-[5.5%] top-[47%] z-[7] hidden text-[clamp(1.25rem,2.17vw,42px)] font-light tracking-[-1px] text-white md:block will-change-transform"
        style={{ fontFamily: "'Sentient', serif" }}
      >
        digital studio
      </p>

      {/* Layer 6: Mobile tagline — left aligned, vertical centre */}
      <p
        ref={mobileTaglineRef}
        className="absolute left-[21px] top-[44%] z-[7] lg:hidden text-[42px] font-light leading-[1.2] tracking-[1.6px] text-white will-change-transform"
        style={{ fontFamily: "'Sentient', serif" }}
      >
        A people first<br />digital studio
      </p>

      {/* Layer 7: Enlighten wordmark — large at bottom (desktop only) */}
      <div
        ref={wordmarkRef}
        className="absolute bottom-[-2vh] left-0 z-[7] w-full will-change-transform max-lg:hidden"
        style={{ transformOrigin: '50% 50%' }}
      >
        <img
          src="/images/enlighten-wordmark.webp"
          alt="Enlighten"
          className="w-full h-auto"
        />
      </div>

      {/* Hidden measurement div for FLIP calculation (mirrors preloader centered layout) */}
      <div
        ref={measureRef}
        className="absolute inset-0 z-[-1] hidden items-center justify-center md:flex"
        style={{ visibility: 'hidden' }}
        aria-hidden="true"
      >
        <div className="flex items-center gap-[clamp(2rem,18.75vw,360px)]">
          <p
            ref={measureLeftRef}
            className="text-[clamp(1.25rem,2.17vw,42px)] font-light tracking-[-1px]"
            style={{ fontFamily: "'Sentient', serif" }}
          >
            A people first
          </p>
          <div className="w-[clamp(200px,21vw,404px)]">
            <div className="h-auto w-full" style={{ aspectRatio: '404/100' }} />
          </div>
          <p
            ref={measureRightRef}
            className="text-[clamp(1.25rem,2.17vw,42px)] font-light tracking-[-1px]"
            style={{ fontFamily: "'Sentient', serif" }}
          >
            digital studio
          </p>
        </div>
      </div>
    </section>
  )
}
