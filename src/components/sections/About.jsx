import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, SplitText } from '@/utils/gsap-utils'

export default function About({ entranceComplete }) {
  const sectionRef = useRef(null)
  const labelRef = useRef(null)
  const textRef = useRef(null)
  const img1Ref = useRef(null)
  const img2Ref = useRef(null)

  // Hide all elements immediately on mount so they don't flash during the preloader
  useGSAP(() => {
    gsap.set(labelRef.current, { opacity: 0 })
    gsap.set(textRef.current, { opacity: 0 })
    gsap.set([img1Ref.current, img2Ref.current], { opacity: 0 })
  }, { scope: sectionRef })

  useGSAP(() => {
    if (!entranceComplete) return

    // Split paragraph into lines for staggered reveal
    const split = new SplitText(textRef.current, {
      type: 'lines',
      linesClass: 'about-line',
    })

    // Wrap each line in an overflow-hidden container for clean clip
    split.lines.forEach((line) => {
      const wrapper = document.createElement('div')
      wrapper.style.overflow = 'hidden'
      line.parentNode.insertBefore(wrapper, line)
      wrapper.appendChild(line)
    })

    // Initial states
    gsap.set(labelRef.current, { opacity: 0, y: 30 })
    // Re-expose the paragraph so its split lines are individually controllable
    gsap.set(textRef.current, { opacity: 1 })
    gsap.set(split.lines, { opacity: 0, y: '100%' })
    gsap.set([img1Ref.current, img2Ref.current], {
      clipPath: 'inset(100% 0 0 0)',
      opacity: 0,
    })

    // Lenis scroll listener — bypasses ScrollTrigger to avoid Hero pin offset issues
    let triggered = false
    const onScroll = () => {
      if (triggered) return
      const rect = sectionRef.current.getBoundingClientRect()
      const vh = window.innerHeight
      if (rect.top < vh * 0.8) {
        triggered = true

        const tl = gsap.timeline()

        // Label: fade in + slide up
        tl.to(labelRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'smoothOut',
        }, 0)

        // Text lines: staggered slide-up reveal
        tl.to(split.lines, {
          opacity: 1,
          y: '0%',
          duration: 1.3,
          stagger: 0.12,
          ease: 'smoothOut',
        }, 0.2)

        // Images: clip reveal from bottom + fade in
        tl.to(img1Ref.current, {
          clipPath: 'inset(0% 0 0 0)',
          opacity: 1,
          duration: 1.6,
          ease: 'smooth',
        }, 0.7)

        tl.to(img2Ref.current, {
          clipPath: 'inset(0% 0 0 0)',
          opacity: 1,
          duration: 1.6,
          ease: 'smooth',
        }, 0.9)
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
  }, { scope: sectionRef, dependencies: [entranceComplete] })

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-[#ffffff] px-[48px] pt-[124px] pb-[60px] max-lg:px-5 max-lg:pt-16 max-lg:pb-10"
      data-theme="light"
      data-scroll-section
    >
      <div className="flex items-start justify-between gap-16 max-lg:flex-col max-lg:gap-10">
        {/* Left: Label */}
        <div ref={labelRef} className="flex items-center gap-[22px] shrink-0">
          <div className="size-[17px] bg-[#c96b00]" />
          <p
            className="text-[36px] font-medium leading-[38px] tracking-[-2.16px] text-[#393939] max-lg:text-[28px]"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
          >
            About Us
          </p>
        </div>

        {/* Right: Content */}
        <div className="flex flex-col gap-[65px] items-end w-full max-w-[858px] max-lg:max-w-none">
          <p
            ref={textRef}
            className="text-[32px] font-normal leading-[34px] tracking-[0.32px] text-[#393939] w-full max-lg:text-[22px] max-lg:leading-[30px]"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
          >
            We believe in collaboration, innovation and quality—bringing ideas to life through cutting-edge design and development, seamless functionality and strategic insight. Our goal is to transform every client vision into a dynamic, functional and engaging online presence that stands out in a crowded digital landscape.
          </p>

          {/* Images */}
          <div className="flex gap-[27px] items-center w-full max-lg:flex-col">
            <div
              ref={img1Ref}
              className="h-[329px] w-[286px] shrink-0 overflow-hidden max-lg:w-full max-lg:h-[350px]"
            >
              <img
                src="/images/about-phone.webp"
                alt="Mobile design showcase"
                className="h-full w-full object-cover"
              />
            </div>
            <div
              ref={img2Ref}
              className="h-[329px] flex-1 overflow-hidden max-lg:w-full max-lg:h-[280px]"
            >
              <img
                src="/images/about-team.webp"
                alt="Team collaboration"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
