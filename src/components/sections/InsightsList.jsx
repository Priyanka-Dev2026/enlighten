import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/utils/gsap-utils'

export default function InsightsList({ posts }) {
  const sectionRef = useRef(null)

  useGSAP(() => {
    const items = gsap.utils.toArray('.insight-item', sectionRef.current)

    items.forEach((item, i) => {
      gsap.set(item, { opacity: 0, y: 40 })

      let triggered = false
      const onScroll = () => {
        if (triggered) return
        if (item.getBoundingClientRect().top < window.innerHeight * 0.88) {
          triggered = true
          gsap.to(item, { opacity: 1, y: 0, duration: 1.0, delay: i * 0.1, ease: 'smoothOut' })
        }
      }

      const lenis = window.__lenis
      if (lenis) lenis.on('scroll', onScroll)
      window.addEventListener('scroll', onScroll, { passive: true })
      onScroll()

      item._cleanup = () => {
        if (window.__lenis) window.__lenis.off('scroll', onScroll)
        window.removeEventListener('scroll', onScroll)
      }
    })

    return () => {
      items.forEach((item) => item._cleanup?.())
    }
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white"
      data-scroll-section
      data-theme="light"
    >
      <style>{`
        .insight-img-scale {
          transform: scale(1);
          transition: transform 0.9s cubic-bezier(0.76, 0, 0.24, 1);
        }
        .insight-item:hover .insight-img-scale {
          transform: scale(1.06);
        }
        @keyframes insight-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.12; }
        }
        .insight-blink {
          animation: insight-blink 2s ease-in-out infinite;
        }
        .insight-underline-out {
          transform-origin: right center;
          transform: scaleX(1);
          transition: transform 0.38s cubic-bezier(0.76, 0, 0.24, 1);
        }
        .insight-item:hover .insight-underline-out {
          transform: scaleX(0);
        }
        .insight-underline-in {
          transform-origin: left center;
          transform: scaleX(0);
          transition: transform 0.38s cubic-bezier(0.76, 0, 0.24, 1) 0.06s;
        }
        .insight-item:hover .insight-underline-in {
          transform: scaleX(1);
        }
      `}</style>

      {/* Top divider */}
      <div className="w-full" style={{ height: 1, backgroundColor: '#c0c0c0' }} />

      {posts.map((post, i) => (
        <a
          key={i}
          href={post.href}
          className="insight-item group flex flex-row max-lg:flex-col w-full pl-[48px] pt-[48px] pb-[48px] max-lg:pl-0 max-lg:pt-8 max-lg:pb-8"
        >
          {/* Image — ~42% width on desktop */}
          <div className="relative overflow-hidden w-full lg:w-[42%] aspect-[4/3] lg:aspect-auto lg:min-h-[420px] shrink-0">
            <img
              src={post.image}
              alt={post.title}
              className="insight-img-scale absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Content — right column */}
          <div className="flex flex-col justify-between flex-1 px-[48px] py-[40px] max-lg:px-5 max-lg:py-8">
            {/* Top: tag badge */}
            <div className="flex items-center gap-[10px] mb-6 max-lg:mb-4">
              <span className="insight-blink w-[7px] h-[7px] rounded-full bg-[#c96b00] shrink-0" />
              <span
                className="inline-flex items-center backdrop-blur-[2px] bg-[rgba(86,86,86,0.12)] border border-[rgba(0,0,0,0.08)] px-3 py-[5px] rounded-[20px] text-[12px] uppercase tracking-[0.1em] text-[#555]"
                style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontWeight: 500 }}
              >
                {post.tag}
              </span>
            </div>

            {/* Middle: title + excerpt */}
            <div className="flex flex-col gap-5 flex-1">
              <h2
                className="text-[clamp(26px,2.8vw,42px)] leading-[1.18] tracking-[-0.02em] text-[#080808]"
                style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontWeight: 400 }}
              >
                {post.title}
              </h2>

              {post.excerpt && (
                <p
                  className="text-[clamp(15px,1.3vw,20px)] leading-[1.6] text-[#555] max-w-[580px]"
                  style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontWeight: 400 }}
                >
                  {post.excerpt}
                </p>
              )}
            </div>

            {/* Bottom: CTA */}
            <div className="mt-8 max-lg:mt-6">
              <span
                className="relative self-start inline-block text-[13px] uppercase tracking-[0.1em] text-[#111]"
                style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontWeight: 500 }}
              >
                Read Article →
                <span
                  className="insight-underline-out absolute bottom-[-1px] left-0 h-[1px] w-full bg-[#111]"
                  aria-hidden="true"
                />
                <span
                  className="insight-underline-in absolute bottom-[-1px] left-0 h-[1px] w-full bg-[#111]"
                  aria-hidden="true"
                />
              </span>
            </div>
          </div>

          {/* Bottom divider */}
          <div
            className="absolute bottom-0 left-0 w-full lg:hidden"
            style={{ height: 1, backgroundColor: '#c0c0c0' }}
          />
        </a>
      ))}

      {/* Outer wrapper for dividers between rows on desktop */}
      <style>{`
        .insight-item + .insight-item {
          border-top: 1px solid #c0c0c0;
        }
      `}</style>

      {/* Bottom divider */}
      <div className="w-full mt-[48px] max-lg:mt-0" style={{ height: 1, backgroundColor: '#c0c0c0' }} />
    </section>
  )
}
