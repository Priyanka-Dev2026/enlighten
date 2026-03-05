import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@utils/gsap-utils'
import SplitType from 'split-type'

const SERVICES = [
  {
    number: '/01',
    title: 'Website Development',
    description:
      'A powerful website isn\'t just visual - it\'s strategic. We create clean, user-first, search-friendly websites that tell your story, earn trust, and drive real business results.',
    tags: [
      ['WORDPRESS', 'SHOPIFY', 'SQUARESPACE'],
      ['FRAMER', 'WEBFLOW', 'REACT'],
    ],
    image: '/images/service-web-dev.webp',
  },
  {
    number: '/02',
    title: 'UI/UX Strategy',
    description:
      'Great design starts with understanding people. We craft intuitive, user-first experiences that feel effortless, guide action, and build trust - turning every click into clarity and every interaction into meaningful engagement.',
    tags: [
      ['UX RESEARCH', 'USABILITY TESTING'],
      ['UX FLOW', 'DESIGN ELEMENTS', 'ENGAGING ANIMATION'],
    ],
    image: '/images/service-uiux.webp',
  },
  {
    number: '/03',
    title: 'Brand Communication',
    description:
      'Your brand deserves to be heard and remembered. We shape clear, consistent messaging that reflects your values, connects with your audience, and builds trust - helping your business speak with purpose across every digital touchpoint.',
    tags: [
      ['BRAND VOICE', 'CLEAR MESSAGING'],
      ['STRONG POSITIONING', 'EMOTIONAL CONNECT'],
    ],
    image: '/images/service-brand-strategy.webp',
  },
  {
    number: '/04',
    title: 'Marketing',
    description:
      'We approach marketing with clarity and intention. Through thoughtful strategy, relevant content, and consistent execution, we help your brand stay visible, connect with the right audience, and grow steadily.',
    tags: [
      ['SEO', 'SOCIAL MEDIA MARKETING'],
      ['EMAIL MARKETING', 'ADVERTISING'],
    ],
    image: '/images/service-digital-marketing.jpg',
  },
  {
    number: '/05',
    title: 'Graphic Design',
    description:
      'We design with purpose. From brand visuals to marketing creatives, our graphics are clean, consistent, and intentional - helping your business communicate clearly, and professionally across every digital and print touchpoint.',
    tags: [
      ['BROCHURE', 'CATALOGUE', 'STANDEE'],
      ['PACKAGING', 'EXHIBITION POSTERS'],
    ],
    image: '/images/service-content-strategy.jpg',
  },
]

export default function ServicesList() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    const items = gsap.utils.toArray('.service-item', sectionRef.current)
    const isMobile = window.innerWidth < 1024
    const cleanups = []

    items.forEach((item, i) => {
      const titleEl = item.querySelector('.service-title')
      const split = new SplitType(titleEl, { types: 'lines' })

      split.lines?.forEach((line) => {
        const wrapper = document.createElement('div')
        wrapper.style.overflow = 'hidden'
        wrapper.style.display = 'block'
        line.parentNode.insertBefore(wrapper, line)
        wrapper.appendChild(line)
      })

      const number = item.querySelector('.service-number')
      const desc = item.querySelector('.service-desc')
      const tags = item.querySelector('.service-tags')
      const image = item.querySelector('.service-image')
      const divider = item.querySelector('.service-divider')

      if (!isMobile) {
        // ── Desktop: sticky ScrollTrigger entrance + scale-down ──────────
        gsap.set(divider, { scaleX: 0, transformOrigin: 'left center' })
        gsap.set(number, { opacity: 0, y: 12 })
        gsap.set(split.lines, { yPercent: 110 })
        gsap.set(desc, { opacity: 0, y: 16 })
        gsap.set(tags, { opacity: 0, y: 12 })
        gsap.set(image, { opacity: 0, scale: 1.04 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start:
              i === 0
                ? 'top 80%'
                : () => `top+=${(i - 1) * window.innerHeight + window.innerHeight * 0.3} top`,
            toggleActions: 'play none none none',
            invalidateOnRefresh: true,
          },
        })

        tl.to(divider, { scaleX: 1, duration: 0.5, ease: 'smoothOut' })
          .to(number, { opacity: 1, y: 0, duration: 0.35, ease: 'smoothOut' }, '-=0.25')
          .to(split.lines, { yPercent: 0, duration: 0.7, ease: 'smooth', stagger: 0.05 }, '-=0.15')
          .to(desc, { opacity: 1, y: 0, duration: 0.5, ease: 'smoothOut' }, '-=0.4')
          .to(tags, { opacity: 1, y: 0, duration: 0.35, ease: 'smoothOut' }, '-=0.25')
          .to(image, { opacity: 1, scale: 1, duration: 0.65, ease: 'smoothOut' }, '-=0.5')

        if (i < items.length - 1) {
          gsap.to(item, {
            scale: 0.88,
            borderRadius: '16px',
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: () => `top+=${i * window.innerHeight} top`,
              end: () => `top+=${(i + 1) * window.innerHeight} top`,
              scrub: true,
              invalidateOnRefresh: true,
            },
          })
        }
      } else {
        // ── Mobile: simple fade-in as each item enters viewport ───────────
        const els = [divider, number, titleEl, desc, tags, image].filter(Boolean)
        gsap.set(els, { opacity: 0, y: 20 })

        let triggered = false
        const onScroll = () => {
          if (triggered) return
          if (item.getBoundingClientRect().top < window.innerHeight * 0.88) {
            triggered = true
            gsap.to(els, { opacity: 1, y: 0, duration: 0.8, ease: 'smoothOut', stagger: 0.08 })
          }
        }

        const lenis = window.__lenis
        if (lenis) lenis.on('scroll', onScroll)
        window.addEventListener('scroll', onScroll, { passive: true })
        onScroll()

        cleanups.push(() => {
          if (window.__lenis) window.__lenis.off('scroll', onScroll)
          window.removeEventListener('scroll', onScroll)
        })
      }
    })

    return () => cleanups.forEach((c) => c())
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      style={{ backgroundColor: '#ffffff' }}
      className="w-full"
      data-scroll-section
    >
      {SERVICES.map((service, i) => (
        <div
          key={i}
          className="service-item bg-white overflow-hidden flex flex-col p-5 lg:h-screen lg:sticky lg:top-0 lg:p-[48px]"
        >
          {/* Top divider */}
          <div
            className="service-divider w-full mb-5 lg:mb-10"
            style={{ height: 1, backgroundColor: '#c0c0c0', flexShrink: 0 }}
          />

          {/* Two-column layout */}
          <div
            className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-[5%]"
            style={{ flex: 1, minHeight: 0 }}
          >
            {/* Left: number + title + description + tags */}
            <div className="flex flex-col gap-6 lg:gap-9 w-full lg:w-[55%]">

              {/* Number */}
              <p
                className="service-number"
                style={{
                  fontFamily: "'Hanken Grotesk', sans-serif",
                  fontWeight: 400,
                  fontSize: 'clamp(16px, 1.6vw, 30px)',
                  lineHeight: 1,
                  color: '#000',
                  margin: 0,
                  letterSpacing: '0',
                }}
              >
                {service.number}
              </p>

              {/* Title + description */}
              <div className="flex flex-col gap-5 lg:gap-8">
                <h2
                  className="service-title text-[28px] lg:text-[58px] whitespace-nowrap tracking-[-0.03em] lg:tracking-[-0.06em]"
                  style={{
                    fontFamily: "'Hanken Grotesk', sans-serif",
                    fontWeight: 400,
                    lineHeight: '0.92',
                    textTransform: 'uppercase',
                    color: '#000',
                    margin: 0,
                  }}
                >
                  {service.title}
                </h2>

                <p
                  className="service-desc"
                  style={{
                    fontFamily: "'Hanken Grotesk', sans-serif",
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '28px',
                    color: '#000',
                    margin: 0,
                  }}
                >
                  {service.description}
                </p>
              </div>

              {/* Tech tags */}
              <div className="service-tags flex flex-wrap gap-x-4 gap-y-1 lg:flex-col lg:gap-2 lg:gap-[10px]">
                {service.tags.map((row, ri) => (
                  <div key={ri} className="flex items-center flex-wrap gap-x-4 gap-y-1 lg:gap-9">
                    {row.map((tag) => (
                      <span
                        key={tag}
                        className="text-[16px] lg:text-[18px]"
                        style={{
                          fontFamily: "'Hanken Grotesk', sans-serif",
                          fontWeight: 400,
                          lineHeight: '1.4',
                          letterSpacing: '0.05em',
                          color: '#a4a4a4',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: image */}
            <div
              className="service-image overflow-hidden w-full h-[450px] lg:h-[613px] lg:aspect-none lg:w-[36%] lg:shrink-0"
            >
              <img
                src={service.image}
                alt={service.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}
