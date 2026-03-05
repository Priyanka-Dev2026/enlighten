import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/utils/gsap-utils'
import CTAButton from '@/components/ui/CTAButton'

const POSTS = [
  {
    title: 'Proud to Launch: The New Sapana Jain Studio Website',
    image: '/images/insight-sapana-jain.webp',
    href: '#',
  },
  {
    title: 'Proud to Launch: The New Henry Smith Foundation Website',
    image: '/images/insight-henry-smith.webp',
    href: '#',
    overlay: true,
  },
]

export default function Insights() {
  const sectionRef = useRef(null)
  const labelRef = useRef(null)
  const dividerRef = useRef(null)
  const cardsRef = useRef(null)

  useGSAP(() => {
    gsap.set(labelRef.current, { opacity: 0, y: 20 })
    gsap.set(dividerRef.current, { scaleX: 0, transformOrigin: 'left center' })
    gsap.set(cardsRef.current.children, { opacity: 0, y: 30 })

    let triggered = false
    const onScroll = () => {
      if (triggered) return
      const rect = sectionRef.current.getBoundingClientRect()
      if (rect.top < window.innerHeight * 0.8) {
        triggered = true
        const tl = gsap.timeline()
        tl.to(labelRef.current, { opacity: 1, y: 0, duration: 0.9, ease: 'smoothOut' }, 0)
        tl.to(dividerRef.current, { scaleX: 1, duration: 0.7, ease: 'smoothOut' }, 0.1)
        tl.to(cardsRef.current.children, {
          opacity: 1, y: 0, duration: 1.0, stagger: 0.12, ease: 'smoothOut',
        }, 0.25)
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
      id="insights"
      className="w-full bg-white pt-[80px] max-lg:pt-[60px]"
      data-scroll-section
      data-theme="light"
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-[48px] pb-[40px] max-lg:px-5 max-lg:pb-8 max-lg:flex-col max-lg:items-start max-lg:gap-6"
        style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
      >
        {/* Left: label */}
        <div ref={labelRef} className="flex items-center gap-[22px]">
          <div className="size-[17px] bg-[#c96b00] shrink-0" />
          <p className="text-[36px] font-medium leading-[38px] tracking-[-2.16px] text-[#393939] max-lg:text-[28px]">
            Latest news
          </p>
        </div>

        {/* Right: VIEW ALL button */}
        <CTAButton label="VIEW ALL" variant="dark" href="#" />
      </div>

      {/* Full-width horizontal divider */}
      <div
        ref={dividerRef}
        className="w-full"
        style={{ height: 1, backgroundColor: '#c0c0c0' }}
      />

      {/* Cards grid */}
      <div ref={cardsRef} className="flex max-lg:flex-col">
        {POSTS.map((post, i) => (
          <a
            key={i}
            href={post.href}
            className={`group relative flex flex-col w-full lg:w-1/2 ${i === 0 ? 'lg:border-r border-[#c0c0c0]' : ''}`}
          >
            {/* Title */}
            <div className="px-[48px] pt-[32px] pb-[32px] max-lg:px-5 max-lg:pt-6 max-lg:pb-5">
              <h3
                className="text-[26px] leading-[34px] tracking-[0.37px] text-[#111] max-lg:text-[20px] max-lg:leading-[28px]"
                style={{
                  fontFamily: "'Hanken Grotesk', sans-serif",
                  fontWeight: 400,
                }}
              >
                {post.title}
              </h3>
            </div>

            {/* Horizontal divider above image */}
            <div className="w-full" style={{ height: 1, backgroundColor: '#c0c0c0' }} />

            {/* Image */}
            <div className="relative overflow-hidden h-[456px] max-lg:h-[260px]">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {post.overlay && (
                <div className="absolute inset-0 bg-black/20" />
              )}
              {/* Badge */}
              <span
                className="absolute top-[32px] left-[48px] max-lg:left-5 max-lg:top-4 backdrop-blur-[2px] bg-[rgba(182,182,182,0.68)] px-3 py-[6px] rounded-[20px] text-[18px] font-normal leading-[24px] tracking-[0.18px] text-white whitespace-nowrap max-lg:text-[14px]"
                style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
              >
                LATEST INSIGHT
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
