import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@utils/gsap-utils'
import SplitType from 'split-type'

const SERVICES = [
  {
    number: '/01',
    title: 'Website\nDevelopment',
    description:
      'Great design starts with understanding people. We craft intuitive, user-first experiences that feel effortless, guide action, and build trust — turning every click into clarity and every interaction into meaningful engagement.',
    tags: [
      ['WORDPRESS', 'SHOPIFY', 'SQUARESPACE'],
      ['FRAMER', 'WEBFLOW', 'REACT'],
    ],
    image: '/images/service-web-dev.webp',
  },
  {
    number: '/02',
    title: 'Brand\nStrategy',
    description:
      'A strong brand is more than a logo — it\'s a feeling. We build brand identities that communicate your values, resonate with your audience, and stand the test of time.',
    tags: [
      ['IDENTITY', 'POSITIONING', 'MESSAGING'],
      ['GUIDELINES', 'NAMING', 'VOICE'],
    ],
    image: '/images/service-brand-strategy.webp',
  },
  {
    number: '/03',
    title: 'UI/UX\nDesign',
    description:
      'We design digital products that people love to use. From wireframes to high-fidelity prototypes, every decision is rooted in user research and design thinking.',
    tags: [
      ['FIGMA', 'PROTOTYPING', 'WIREFRAMES'],
      ['USER RESEARCH', 'DESIGN SYSTEMS'],
    ],
    image: '/images/service-uiux.webp',
  },
  {
    number: '/04',
    title: 'Content\nStrategy',
    description:
      'Words matter. We craft content strategies that align with your brand voice, connect with your audience, and drive meaningful engagement across every touchpoint.',
    tags: [
      ['COPYWRITING', 'SEO', 'EDITORIAL'],
      ['SOCIAL', 'CAMPAIGNS', 'STORYTELLING'],
    ],
    image: '/images/service-web-dev.webp',
  },
  {
    number: '/05',
    title: 'Digital\nMarketing',
    description:
      'Data-driven campaigns that reach the right people at the right time. We combine creativity with analytics to grow your audience and convert attention into action.',
    tags: [
      ['PAID ADS', 'EMAIL', 'ANALYTICS'],
      ['SOCIAL MEDIA', 'GROWTH', 'SEO'],
    ],
    image: '/images/service-web-dev.webp',
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
          className="service-item bg-white overflow-hidden flex flex-col p-5 h-screen sticky top-0 lg:p-[48px]"
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
                  className="service-title"
                  style={{
                    fontFamily: "'Hanken Grotesk', sans-serif",
                    fontWeight: 400,
                    fontSize: 'clamp(36px, 5.5vw, 88px)',
                    lineHeight: '0.92',
                    color: '#000',
                    margin: 0,
                    whiteSpace: 'pre-line',
                  }}
                >
                  {service.title}
                </h2>

                <p
                  className="service-desc"
                  style={{
                    fontFamily: "'Hanken Grotesk', sans-serif",
                    fontWeight: 400,
                    fontSize: 'clamp(14px, 1.3vw, 20px)',
                    lineHeight: '1.6',
                    color: '#000',
                    margin: 0,
                  }}
                >
                  {service.description}
                </p>
              </div>

              {/* Tech tags */}
              <div className="service-tags flex flex-col gap-2 lg:gap-[10px]">
                {service.tags.map((row, ri) => (
                  <div key={ri} className="flex items-center flex-wrap gap-6 lg:gap-9">
                    {row.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontFamily: "'Hanken Grotesk', sans-serif",
                          fontWeight: 400,
                          fontSize: 'clamp(11px, 1vw, 16px)',
                          lineHeight: '2',
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
              className="service-image overflow-hidden w-full aspect-square lg:w-[36%] lg:shrink-0 lg:max-h-[calc(100vh-200px)]"
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
