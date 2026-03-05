import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/utils/gsap-utils'
import SplitType from 'split-type'

export default function InsightsHero({ featuredPost }) {
  const sectionRef = useRef(null)

  useGSAP(() => {
    const heading = new SplitType('.insights-hero-heading', { types: 'lines' })

    heading.lines?.forEach((line) => {
      const wrapper = document.createElement('div')
      wrapper.style.overflow = 'hidden'
      wrapper.style.display = 'block'
      line.parentNode.insertBefore(wrapper, line)
      wrapper.appendChild(line)
    })

    gsap.set(heading.lines, { yPercent: 110 })
    gsap.set('.insights-hero-image', { scale: 1.06, opacity: 0 })
    gsap.set('.insights-hero-badge', { opacity: 0, y: 12 })
    gsap.set('.insights-hero-btn', { opacity: 0, y: 12 })

    const tl = gsap.timeline({ delay: 0.1 })

    tl.to('.insights-hero-image', { scale: 1, opacity: 1, duration: 1.4, ease: 'smoothOut' }, 0)
      .to(heading.lines, { yPercent: 0, duration: 1.1, ease: 'smooth', stagger: 0.08 }, 0.3)
      .to('.insights-hero-badge', { opacity: 1, y: 0, duration: 0.7, ease: 'smoothOut' }, 0.4)
      .to('.insights-hero-btn', { opacity: 1, y: 0, duration: 0.7, ease: 'smoothOut' }, 0.6)
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="w-full"
      data-scroll-section
      data-theme="light"
    >
      {/* Page title */}
      <div className="px-[48px] pt-[140px] pb-[48px] max-lg:px-5 max-lg:pt-[100px] max-lg:pb-8">
        <h1
          className="insights-hero-heading"
          style={{
            fontFamily: "'Sentient', serif",
            fontWeight: 300,
            fontSize: 'clamp(52px, 9vw, 98px)',
            lineHeight: 1.08,
            letterSpacing: '-1px',
            color: '#0e0d0d',
            margin: 0,
          }}
        >
          Insights
        </h1>
      </div>

      {/* Featured article — full width image with overlay */}
      <div className="relative w-full overflow-hidden h-[60vh] lg:h-[70vh]">
        <img
          className="insights-hero-image absolute inset-0 w-full h-full object-cover"
          src={featuredPost.image}
          alt={featuredPost.title}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Overlay content */}
        <div className="absolute inset-0 flex flex-col justify-between p-[48px] max-lg:p-5">
          {/* Top: badge */}
          <div>
            <span
              className="insights-hero-badge inline-flex items-center gap-2 backdrop-blur-[2px] bg-[rgba(182,182,182,0.68)] px-3 py-[6px] rounded-[20px] text-[13px] font-normal leading-[20px] tracking-[0.1em] text-white"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  backgroundColor: '#fff',
                  flexShrink: 0,
                  animation: 'insight-hero-blink 2s ease-in-out infinite',
                }}
              />
              LATEST INSIGHT
            </span>
            <style>{`
              @keyframes insight-hero-blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.15; }
              }
            `}</style>
          </div>

          {/* Bottom: title + button */}
          <div className="flex flex-col gap-6 max-lg:gap-4">
            <h2
              className="insights-hero-heading text-white max-w-[600px] max-lg:max-w-none"
              style={{
                fontFamily: "'Hanken Grotesk', sans-serif",
                fontWeight: 400,
                fontSize: 'clamp(26px, 4vw, 54px)',
                lineHeight: '1.2',
                letterSpacing: '-0.02em',
              }}
            >
              {featuredPost.title}
            </h2>
            <a
              href={featuredPost.href}
              className="insights-hero-btn inline-flex items-center self-start bg-white rounded-[21px] px-[14px] py-[7px] text-[13px] font-medium leading-[20px] tracking-[0.08em] uppercase text-[#363636] hover:bg-opacity-90 transition-colors"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
            >
              READ ARTICLE
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
