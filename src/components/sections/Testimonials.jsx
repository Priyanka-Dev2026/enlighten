import { useRef, useState, useEffect, useCallback } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, SplitText } from '@/utils/gsap-utils'

const TESTIMONIALS = [
  {
    quote: "Priyanka was very helpful, considerate and reliable to work with. It is usually difficult to have technical details translated into the website owner's vision. Priyanka can do that better than anyone I know. I would highly recommend working with her.",
    name: "Ravi Kapoor",
    role: "Ex-IRS Officer, Public Speaker",
    image: "/images/testimonial-tulsi.webp",
    linkedin: "https://www.linkedin.com/in/ravi-kapoor-001bb1132?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
  },
  {
    quote: "I have worked with Priyanka in the past regarding Web Design, SEO, and Social Media Marketing. The most unique thing about her is her time delivery and commitment to the client and the services she delivers. She has the most patience and capability to handle any situation that arises. I am looking forward to working with her in the future.",
    name: "Tejas G Naik",
    role: "Founder, Marketing Mane",
    image: "/images/testimonial-tejas.webp",
  },
  {
    quote: "Few things that come to my mind while talking about Priyanka; Very talented, professional and smart worker. She gives 200% to the project and most importantly adherence to timelines is what fascinates me. She understands your requirement and always come up with out of the box ideas that really works. Wish her all the best.",
    name: "Gagandeep Singh",
    role: "Co-Founder, KNAM Marketing Pvt. Ltd.",
    image: "/images/testimonial-gagandeep.webp",
  },
  {
    quote: "Priyanka's team takes care of all our social media engagements, website development, marketing poster designs and much more. My company Precious Electrochem is lucky to have collaborated with Priyanka's company as she assures the best of ideas and support. I do not think things would have gone as smoothly if it weren't for Priyanka's company, effort and dedication to offer 100% customer satisfaction. Highly recommend Priyanka and her Company.",
    name: "Kartik Jain",
    role: "Scientist & Business Head, Precious Electrochem",
    image: "/images/testimonial-fourth.webp",
  },
  {
    quote: "Priyanka and her team were incredibly prompt, consistently responsive, and always available to answer questions (no matter how small). What truly stood out was how they went above and beyond the initial scope to ensure everything worked smoothly and looked polished. Communication was clear, timelines were respected, and execution was seamless from start to finish. If you're looking for a reliable, proactive, and detail-oriented web development partner, this team delivers.",
    name: "Aishani Sheth",
    role: "Founder, Consult For Impact",
    image: "/images/testimonial-aishani.webp",
  },
]

export default function Testimonials() {
  const sectionRef = useRef(null)
  const labelRef = useRef(null)
  const quoteRef = useRef(null)
  const authorRef = useRef(null)
  const avatarsRef = useRef(null)
  const hasRevealedRef = useRef(false)
  const isTransitioningRef = useRef(false)
  const isFirstRender = useRef(true)
  const [activeIndex, setActiveIndex] = useState(0)

  // Initial scroll-triggered reveal — SplitText lines + staggered elements
  useGSAP(() => {
    const quote = quoteRef.current
    if (!quote) return

    const split = new SplitText(quote, { type: 'lines' })

    split.lines.forEach((line) => {
      const wrapper = document.createElement('div')
      wrapper.style.overflow = 'hidden'
      line.parentNode.insertBefore(wrapper, line)
      wrapper.appendChild(line)
    })

    gsap.set(labelRef.current, { opacity: 0, y: 30 })
    gsap.set(split.lines, { opacity: 0, y: '100%' })
    gsap.set(authorRef.current, { opacity: 0, y: 20 })
    gsap.set(avatarsRef.current, { opacity: 0, y: 20 })

    let triggered = false
    const onScroll = () => {
      if (triggered) return
      const rect = sectionRef.current.getBoundingClientRect()
      const vh = window.innerHeight
      if (rect.top < vh * 0.8) {
        triggered = true

        const tl = gsap.timeline({
          onComplete: () => {
            split.revert()
            hasRevealedRef.current = true
          },
        })

        tl.to(labelRef.current, { opacity: 1, y: 0, duration: 1.1, ease: 'smoothOut' }, 0)
        tl.to(split.lines, { opacity: 1, y: '0%', duration: 1.3, stagger: 0.12, ease: 'smoothOut' }, 0.1)
        tl.to(authorRef.current, { opacity: 1, y: 0, duration: 1.1, ease: 'smoothOut' }, 0.5)
        tl.to(avatarsRef.current, { opacity: 1, y: 0, duration: 1.1, ease: 'smoothOut' }, 0.65)
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

  // Fade in new content after activeIndex state updates (i.e. after React re-renders new text)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    if (!hasRevealedRef.current) return

    gsap.set(quoteRef.current, { y: 16 })
    gsap.set(authorRef.current, { y: 10 })
    gsap.to([quoteRef.current, authorRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: 'smoothOut',
      onComplete: () => { isTransitioningRef.current = false },
    })
  }, [activeIndex])

  const handleSelect = useCallback((index) => {
    if (index === activeIndex || isTransitioningRef.current || !hasRevealedRef.current) return
    isTransitioningRef.current = true

    // Fade out current quote + author, then swap content
    gsap.to([quoteRef.current, authorRef.current], {
      opacity: 0,
      y: -16,
      duration: 0.4,
      ease: 'smoothIn',
      onComplete: () => setActiveIndex(index),
    })
  }, [activeIndex])

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="bg-[#ffffff] border-t border-[#898989] px-[48px] py-[103px] max-lg:px-5 max-lg:py-16"
      data-theme="light"
      data-scroll-section
    >
      <div className="flex items-start justify-between gap-16 max-lg:flex-col max-lg:gap-10">

        {/* Left: label */}
        <div
          ref={labelRef}
          className="flex items-start gap-[22px] shrink-0"
          style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
        >
          <div className="size-[17px] bg-[#c96b00] shrink-0 mt-[9px]" />
          <p className="text-[36px] font-medium leading-[38px] tracking-[0px] text-[#393939] max-lg:text-[28px] max-lg:leading-[34px]">
            Hear from the Brands<br />That Trust Us
          </p>
        </div>

        {/* Right: testimonial content */}
        <div className="flex flex-col gap-[65px] flex-1 max-w-[858px] max-lg:max-w-none">

          {/* Quote */}
          <p
            ref={quoteRef}
            className="text-[28px] font-normal leading-[34px] tracking-[0.32px] text-[#111] max-lg:text-[22px] max-lg:leading-[30px]"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
          >
            {TESTIMONIALS[activeIndex].quote}
          </p>

          {/* Author name + role */}
          <div
            ref={authorRef}
            className="flex flex-col gap-[8px]"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
          >
            {TESTIMONIALS[activeIndex].linkedin ? (
              <a
                href={TESTIMONIALS[activeIndex].linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[17px] font-normal leading-normal text-[#070707] underline underline-offset-2 hover:text-[#c96b00] transition-colors duration-300"
              >
                {TESTIMONIALS[activeIndex].name}
              </a>
            ) : (
              <p className="text-[17px] font-normal leading-normal text-[#070707]">
                {TESTIMONIALS[activeIndex].name}
              </p>
            )}
            <p className="text-[17px] font-normal leading-normal text-[#7d7d7d]">
              {TESTIMONIALS[activeIndex].role}
            </p>
          </div>

          {/* Avatar selector */}
          <div ref={avatarsRef} className="flex items-center gap-[12px] flex-wrap">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                aria-label={`View testimonial from ${t.name}`}
                aria-pressed={i === activeIndex}
                data-cursor-hover
                className="relative size-[74px] shrink-0 rounded-full overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c96b00] focus-visible:ring-offset-2 max-lg:size-[56px]"
                style={{
                  transition: 'filter 0.5s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.5s cubic-bezier(0.76, 0, 0.24, 1), transform 0.3s cubic-bezier(0.76, 0, 0.24, 1)',
                  filter: i === activeIndex ? 'grayscale(0%)' : 'grayscale(100%)',
                  opacity: i === activeIndex ? 1 : 0.6,
                  transform: 'scale(1)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)' }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
              >
                <img
                  src={t.image}
                  alt={t.name}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
