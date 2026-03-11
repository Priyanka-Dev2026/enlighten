import { useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, SplitText } from '@/utils/gsap-utils'
import CTAButton from '@components/ui/CTAButton'

const projects = [
  {
    title: 'LOVE NATIVE',
    description: 'Bespoke E-commerce Experience',
    category: 'ECOMMERCE',
    year: '2025',
    image: '/images/work-love-native-desktop.webp',
    mobileImage: '/images/work-love-native-mobile.webp',
    url: 'https://lovenative.in/',
  },
  {
    title: 'SAPANA JAIN STUDIO',
    description: 'Elegant Digital Storefront',
    category: 'INTERIOR DESIGN',
    year: '2026',
    image: '/images/work-sapna-jain-desktop.webp',
    mobileImage: '/images/work-sapna-jain-mobile.webp',
    url: 'https://sapanajainstudio.com/',
  },
  {
    title: 'YOUNG FOUNDERS LAB',
    description: 'Elite Incubator for Student Founders',
    category: 'EDUCATION',
    year: '2025',
    image: '/images/work-young-founders-desktop.webp',
    mobileImage: '/images/work-young-founders-mobile.webp',
    url: 'https://www.youngfounderslab.org/',
  },
  {
    title: 'CONSULT FOR IMPACT',
    description: 'Brand Identity and Web Presence',
    category: 'EDUCATION',
    year: '2026',
    image: '/images/work-consult-for-impact-desktop.webp',
    mobileImage: '/images/work-consult-for-impact-mobile.webp',
    url: 'https://consultforimpact.org/',
  },
]

// Scramble text effect — progressively resolves characters from random glyphs
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*'

function scrambleText(element, newText, duration = 0.6) {
  if (!element) return null
  const totalFrames = Math.ceil(duration * 60)
  let frame = 0
  let rafId = null

  const update = () => {
    frame++
    const progress = frame / totalFrames
    const resolved = Math.floor(newText.length * progress)

    let result = ''
    for (let i = 0; i < newText.length; i++) {
      if (i < resolved) {
        result += newText[i]
      } else if (newText[i] === ' ') {
        result += ' '
      } else {
        result += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
      }
    }

    element.textContent = result

    if (frame < totalFrames) {
      rafId = requestAnimationFrame(update)
    } else {
      element.textContent = newText
    }
  }

  rafId = requestAnimationFrame(update)
  return () => {
    if (rafId) cancelAnimationFrame(rafId)
    element.textContent = newText
  }
}

export default function Work() {
  const sectionRef = useRef(null)
  const headerLabelRef = useRef(null)
  const headerTextRef = useRef(null)
  const headerCtaRef = useRef(null)
  // The overlay is position:fixed — it lives in the viewport, JS shows/hides it
  // as the cards scroll. Same effect as M&C's GSAP-pinned section approach,
  // but without ScrollTrigger (which breaks due to the Hero pin offset).
  const overlayRef = useRef(null)
  const titleRef = useRef(null)
  const descRef = useRef(null)
  const categoryRef = useRef(null)
  const yearRef = useRef(null)
  const cardsContainerRef = useRef(null)
  const activeIndexRef = useRef(0)
  const cancelScrambleRef = useRef({ title: null, desc: null, category: null, year: null })

  // Set initial background
  useGSAP(() => {
    gsap.set(sectionRef.current, { backgroundColor: '#ffffff' })
  }, { scope: sectionRef })

  // Header reveal animation
  useGSAP(() => {
    const label = headerLabelRef.current
    const text = headerTextRef.current
    if (!label || !text) return

    const split = new SplitText(text, { type: 'lines' })

    split.lines.forEach((line) => {
      const wrapper = document.createElement('div')
      wrapper.style.overflow = 'hidden'
      line.parentNode.insertBefore(wrapper, line)
      wrapper.appendChild(line)
    })

    gsap.set(label, { opacity: 0, y: 30 })
    gsap.set(split.lines, { opacity: 0, y: '100%' })
    gsap.set(headerCtaRef.current, { opacity: 0, y: 20 })

    // IntersectionObserver fires synchronously with layout — reliable on Safari
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const tl = gsap.timeline()
          tl.to(label, { opacity: 1, y: 0, duration: 1.1, ease: 'smoothOut' }, 0)
          tl.to(split.lines, { opacity: 1, y: '0%', duration: 1.3, stagger: 0.12, ease: 'smoothOut' }, 0.1)
          tl.to(headerCtaRef.current, { opacity: 1, y: 0, duration: 1.1, ease: 'smoothOut' }, 0.5)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -60% 0px', threshold: 0 }
    )
    observer.observe(sectionRef.current)

    return () => {
      observer.disconnect()
      split.revert()
    }
  }, { scope: sectionRef })

  // Background transition + fixed overlay show/hide
  useEffect(() => {
    const section = sectionRef.current
    const overlay = overlayRef.current
    const container = cardsContainerRef.current
    if (!section || !overlay || !container) return

    // Track overlay visibility so we only tween on state change
    let overlayVisible = false

    const update = () => {
      const sectionRect = section.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      const vh = window.innerHeight

      // ── Background colour transition (white → dark) ──
      const start = vh
      const end = vh * 0.2
      const progress = Math.min(1, Math.max(0, (start - sectionRect.top) / (start - end)))
      const v = Math.round(255 + (32 - 255) * progress)
      section.style.backgroundColor = `rgb(${v}, ${v}, ${v})`

      const lightSections = document.querySelectorAll('#about, #bold-in-numbers')
      lightSections.forEach((el) => {
        if (progress > 0) {
          el.style.backgroundColor = `rgb(${v}, ${v}, ${v})`
          const textProgress = Math.min(1, Math.max(0, (progress - 0.5) / 0.2))
          const textV = Math.round(57 + (255 - 57) * textProgress)
          el.style.color = `rgb(${textV}, ${textV}, ${textV})`
        } else {
          el.style.backgroundColor = ''
          el.style.color = 'rgb(57, 57, 57)'
        }
      })


      // ── Fixed overlay: clamp to last card ──
      // As the last card scrolls away, translate the overlay upward so the
      // text never floats outside the card. When containerRect.bottom is less
      // than the overlay height, the delta is negative → overlay tracks the card.
      const overlayH = overlay.offsetHeight
      const clampedY = Math.min(0, containerRect.bottom - overlayH)
      overlay.style.transform = `translateY(${clampedY}px)`

      // ── Fixed overlay visibility ──
      const shouldShow = containerRect.top <= 0 && containerRect.bottom > 0
      if (shouldShow !== overlayVisible) {
        overlayVisible = shouldShow
        if (shouldShow) {
          // Appear instantly — no fade in
          gsap.set(overlay, { opacity: 1 })
        } else {
          gsap.to(overlay, { opacity: 0, duration: 0.25, overwrite: true, ease: 'power2.inOut' })
        }
      }
    }

    let lenisSubscribed = false
    const subscribeLenis = () => {
      if (lenisSubscribed) return
      const lenis = window.__lenis
      if (lenis) { lenis.on('scroll', update); lenisSubscribed = true }
    }
    subscribeLenis()
    const rafId = requestAnimationFrame(subscribeLenis)
    window.addEventListener('scroll', update, { passive: true })
    update()

    return () => {
      cancelAnimationFrame(rafId)
      if (window.__lenis) window.__lenis.off('scroll', update)
      window.removeEventListener('scroll', update)
    }
  }, [])

  // Detect active card and scramble text
  useEffect(() => {
    const container = cardsContainerRef.current
    if (!container) return

    const onScroll = () => {
      const cards = container.querySelectorAll('.project-card')
      const vh = window.innerHeight
      const center = vh * 0.5

      let closestIndex = 0
      let closestDist = Infinity

      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect()
        const cardCenter = rect.top + rect.height / 2
        const dist = Math.abs(cardCenter - center)
        if (dist < closestDist) {
          closestDist = dist
          closestIndex = i
        }
      })

      if (closestIndex !== activeIndexRef.current) {
        activeIndexRef.current = closestIndex
        const project = projects[closestIndex]

        if (cancelScrambleRef.current.title) cancelScrambleRef.current.title()
        if (cancelScrambleRef.current.desc) cancelScrambleRef.current.desc()
        if (cancelScrambleRef.current.category) cancelScrambleRef.current.category()
        if (cancelScrambleRef.current.year) cancelScrambleRef.current.year()

        cancelScrambleRef.current.title = scrambleText(titleRef.current, project.title, 0.5)
        cancelScrambleRef.current.desc = scrambleText(descRef.current, project.description, 0.5)
        cancelScrambleRef.current.category = scrambleText(categoryRef.current, project.category, 0.3)
        cancelScrambleRef.current.year = scrambleText(yearRef.current, project.year, 0.3)
      }
    }

    let lenisSubscribed = false
    const subscribeLenis = () => {
      if (lenisSubscribed) return
      const lenis = window.__lenis
      if (lenis) { lenis.on('scroll', onScroll); lenisSubscribed = true }
    }
    subscribeLenis()
    const rafId = requestAnimationFrame(subscribeLenis)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      cancelAnimationFrame(rafId)
      if (window.__lenis) window.__lenis.off('scroll', onScroll)
      window.removeEventListener('scroll', onScroll)
      if (cancelScrambleRef.current.title) cancelScrambleRef.current.title()
      if (cancelScrambleRef.current.desc) cancelScrambleRef.current.desc()
      if (cancelScrambleRef.current.category) cancelScrambleRef.current.category()
      if (cancelScrambleRef.current.year) cancelScrambleRef.current.year()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="work"
      className="bg-white"
      data-scroll-section
    >
      {/* Our Work header */}
      <div
        className="flex items-start justify-between gap-16 px-[48px] py-[103px] max-lg:flex-col max-lg:gap-10 max-lg:px-5 max-lg:py-16"
        style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
      >
        <div ref={headerLabelRef} className="flex items-center gap-[22px] shrink-0">
          <div className="size-[17px] bg-[#c96b00]" />
          <p className="text-[36px] font-medium leading-[38px] tracking-[-2.2px] text-white max-lg:text-[28px]">
            Our Work
          </p>
        </div>
        <div className="flex flex-col gap-[65px] items-start w-full max-w-[859px] max-lg:max-w-none">
          <p ref={headerTextRef} className="text-[28px] font-normal leading-[34px] tracking-[0.32px] text-[#f7f7f7] max-lg:text-[22px] max-lg:leading-[30px]">
            From concept to code, we build clean, user-first websites that reflect your brand essence, guide visitors naturally, and turn attention into meaningful action.
          </p>
          <div ref={headerCtaRef}><CTAButton label="VIEW ALL" variant="light" href="/works" /></div>
        </div>
      </div>

      {/*
        Fixed overlay — mimics M&C's GSAP-pin approach without ScrollTrigger.
        M&C pins the whole section so their absolute overlay stays in the viewport.
        We achieve the same effect: overlay is position:fixed (always in viewport),
        and JS fades it in/out based on whether the cards container is scrolling past.
        No sticky quirks, no Safari containing-block bugs.
      */}
      <div
        ref={overlayRef}
        className="fixed top-0 left-0 right-0 z-10 flex h-[177.78vw] flex-col justify-between pointer-events-none px-6 pb-10 lg:h-[47.5vw] md:px-[107px] md:pb-[47px]"
        style={{ opacity: 0, fontFamily: "'Hanken Grotesk', sans-serif" }}
      >
        {/* Title + Description — vertically centered */}
        <div className="flex flex-1 items-center">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-14">
            <p ref={titleRef} className="text-[22px] font-semibold text-white tracking-wide md:text-2xl">
              {projects[0].title}
            </p>
            <p ref={descRef} className="text-[20px] font-normal text-white/80 tracking-wide md:text-2xl md:text-white">
              {projects[0].description}
            </p>
          </div>
        </div>
        {/* Category + Year — pinned to bottom */}
        <div className="flex items-center gap-6 text-xs tracking-wide text-white/75 md:text-lg md:gap-8">
          <p ref={categoryRef}>{projects[0].category}</p>
          <p ref={yearRef}>{projects[0].year}</p>
        </div>
      </div>

      {/* Project cards — normal stacked flow, scroll underneath the fixed overlay */}
      <div ref={cardsContainerRef}>
        {projects.map((project, i) => (
          <ProjectCard
            key={i}
            project={project}
            index={i}
          />
        ))}
      </div>
    </section>
  )
}

function ProjectCard({ project, index }) {
  const cardRef = useRef(null)
  const imgRef = useRef(null)

  // Parallax on the image
  useEffect(() => {
    const card = cardRef.current
    const img = imgRef.current
    if (!card || !img) return

    const onScroll = () => {
      const rect = card.getBoundingClientRect()
      const vh = window.innerHeight
      const progress = (vh / 2 - (rect.top + rect.height / 2)) / (vh / 2 + rect.height / 2)
      const y = progress * -80
      img.style.transform = `translate3d(0, ${y}px, 0) scale(1.15)`
    }

    const lenis = window.__lenis
    if (lenis) lenis.on('scroll', onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      if (lenis) lenis.off('scroll', onScroll)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className="project-card relative h-[177.78vw] lg:h-[47.5vw] w-full overflow-hidden"
      onClick={project.url ? () => window.open(project.url, '_blank', 'noopener,noreferrer') : undefined}
      style={project.url ? { cursor: 'pointer' } : undefined}
    >
      <picture>
        <source media="(max-width: 1023px)" srcSet={project.mobileImage || project.image} />
        <img
          ref={imgRef}
          src={project.image}
          alt={project.title}
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
          style={{ transform: 'translate3d(0, 0, 0) scale(1.15)' }}
          loading={index === 0 ? 'eager' : 'lazy'}
        />
      </picture>
      <div className="absolute inset-0 bg-black/25" />
    </div>
  )
}
