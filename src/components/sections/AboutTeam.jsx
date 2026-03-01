import { useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@utils/gsap-utils'

const TEAM = [
  {
    name: 'Priyanka Aggarwal',
    role: 'FOUNDER',
    image: '/images/team-1.png',
    offset: false,
  },
  {
    name: 'Fiona Shareen',
    role: 'BRAND CONSULTANT',
    image: '/images/team-fiona.webp',
    offset: true,
  },
  {
    name: 'Siyanshi Garg',
    role: 'MANAGING DIRECTOR',
    image: '/images/team-siyanshi.png',
    offset: false,
  },
  {
    name: 'Prakriti Gupta',
    role: 'CONTENT STRATEGIST',
    image: '/images/team-prakriti.webp',
    offset: true,
  },
  {
    name: 'Tushar Garg',
    role: 'CREATIVE DESIGNER',
    image: '/images/team-tushar.png',
    offset: false,
  },
  {
    name: 'Pushkar',
    role: 'DESIGNER',
    image: '/images/team-pushkar.webp',
    offset: true,
  },
]

export default function AboutTeam() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    // ── Background reveal: overlay scrubs away as section enters viewport ─
    // The section is always #202020. The #ffffff overlay fades out on scroll.
    gsap.to('.team-overlay', {
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',   // overlay starts fading when section enters from bottom
        end: 'top top',        // fully gone by the time pin starts
        scrub: 1,
      },
    })

    // ── Entrance: header animates in as overlay clears ────────────────────
    gsap.set('.team-label', { opacity: 0, y: 16 })
    gsap.set('.team-desc', { opacity: 0, y: 16 })

    const entranceTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 40%',
        toggleActions: 'play none none none',
      },
    })

    entranceTl
      .to('.team-label', { opacity: 1, y: 0, duration: 0.7, ease: 'smoothOut' })
      .to('.team-desc', { opacity: 1, y: 0, duration: 0.7, ease: 'smoothOut' }, '-=0.4')

    // ── Horizontal scroll — desktop only ─────────────────────────────────
    ScrollTrigger.matchMedia({
      '(min-width: 1024px)': () => {
        const track = sectionRef.current.querySelector('.team-track')

        const getScrollDist = () => track.scrollWidth - sectionRef.current.offsetWidth

        gsap.to(track, {
          x: () => -getScrollDist(),
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1,
            start: 'top top',
            end: () => `+=${getScrollDist()}`,
            invalidateOnRefresh: true,
          },
        })
      },
    })
  }, { scope: sectionRef })

  // Switch nav to white over dark team section, back to black on leave
  useEffect(() => {
    const nav = document.querySelector('nav.fixed')
    if (!nav) return

    let isActive = false
    const onScroll = () => {
      const section = sectionRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      const active = rect.top <= 60 && rect.bottom > 60
      if (active && !isActive) {
        isActive = true
        nav.classList.remove('nav-dark')
        nav.classList.add('nav-light')
      } else if (!active && isActive) {
        isActive = false
        nav.classList.remove('nav-light')
        nav.classList.add('nav-dark')
      }
    }

    const lenis = window.__lenis
    if (lenis) lenis.on('scroll', onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      if (lenis) lenis.off('scroll', onScroll)
      window.removeEventListener('scroll', onScroll)
      nav.classList.remove('nav-light')
      nav.classList.add('nav-dark')
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden relative flex flex-col lg:h-screen"
      style={{ backgroundColor: '#202020' }}
      data-scroll-section
    >
      {/* Light overlay — scrubs away on scroll, revealing the dark bg */}
      <div
        className="team-overlay absolute inset-0 pointer-events-none"
        style={{ backgroundColor: '#ffffff', zIndex: 10 }}
      />

      {/* Header row */}
      <div
        className="team-label-row px-5 pt-16 pb-8 flex flex-col gap-5 relative shrink-0 md:px-[48px] md:pt-[72px] md:pb-[58px] md:flex-row md:items-start md:justify-between"
        style={{ zIndex: 11 }}
      >
        {/* Label */}
        <div className="team-label flex items-center gap-[22px] shrink-0">
          <div style={{ width: 17, height: 17, backgroundColor: '#c96b00', flexShrink: 0 }} />
          <p
            className="text-[28px] font-medium leading-[38px] tracking-[0px] text-white md:text-[36px]"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif", margin: 0 }}
          >
            Meet the Team
          </p>
        </div>

        {/* Description */}
        <p
          className="team-desc"
          style={{
            fontFamily: "'Hanken Grotesk', sans-serif",
            fontWeight: 400,
            fontSize: '28px',
            lineHeight: '34px',
            letterSpacing: '0.01em',
            color: '#b8b8b8',
            maxWidth: 857,
            margin: 0,
          }}
        >
          Talks open the door to deeper exploration of topics and themes, and are an invitation to
          find inspiration.
        </p>
      </div>

      {/* Cards track — vertical on mobile, horizontal scroll on desktop */}
      <div
        className="team-track flex flex-col gap-10 px-5 pb-12 relative w-full lg:flex-row lg:items-start lg:w-max lg:min-w-full lg:px-[48px] lg:pb-[48px]"
        style={{ zIndex: 11, flex: 1, gap: 'clamp(24px, 4.5vw, 86px)' }}
      >
        {TEAM.map((member, i) => (
          <div
            key={i}
            className={`team-card flex flex-col w-full lg:shrink-0 lg:w-[clamp(260px,25vw,481px)] ${member.offset ? 'lg:mt-auto' : ''}`}
            style={{
              justifyContent: 'flex-start',
              gap: 16,
              height: undefined,
            }}
          >
            {/* Photo */}
            <div
              className={`w-full relative overflow-hidden flex-shrink-0 h-[320px] ${i === 0 ? 'lg:h-[calc(60vh-130px)]' : 'lg:h-[calc(65vh-130px)]'}`}
            >
              <img
                src={member.image}
                alt={member.name}
                className="team-photo absolute inset-0 w-full h-full object-cover object-top"
                style={{ filter: 'grayscale(1)', transition: 'filter 0.5s ease' }}
              />
            </div>

            {/* Name */}
            <p
              style={{
                fontFamily: "'Hanken Grotesk', sans-serif",
                fontWeight: 400,
                fontSize: 'clamp(16px, 1.6vw, 28px)',
                lineHeight: '1.3',
                letterSpacing: '0.01em',
                color: '#e5e5e5',
                margin: 0,
              }}
            >
              {member.name}
            </p>

            {/* Role */}
            <p
              style={{
                fontFamily: "'Hanken Grotesk', sans-serif",
                fontWeight: 400,
                fontSize: '15px',
                lineHeight: '1.4',
                letterSpacing: '0.01em',
                color: '#7a7a7a',
                margin: 0,
              }}
            >
              {member.role}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
