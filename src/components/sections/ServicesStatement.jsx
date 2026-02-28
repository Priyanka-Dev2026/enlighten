import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@utils/gsap-utils'
import SplitType from 'split-type'

export default function ServicesStatement() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    const heading = new SplitType('.services-statement-text', { types: 'lines' })

    heading.lines?.forEach((line) => {
      const wrapper = document.createElement('div')
      wrapper.style.overflow = 'hidden'
      wrapper.style.display = 'block'
      line.parentNode.insertBefore(wrapper, line)
      wrapper.appendChild(line)
    })

    gsap.set(heading.lines, { yPercent: 110 })

    gsap.to(heading.lines, {
      yPercent: 0,
      duration: 1.2,
      ease: 'smooth',
      stagger: 0.1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      style={{ backgroundColor: '#ffffff' }}
      className="w-full"
      data-scroll-section
    >
      <div className="px-[48px] py-[68px] max-lg:px-5 max-lg:py-12">
        <p
          className="services-statement-text"
          style={{
            fontFamily: "'Hanken Grotesk', sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(36px, 5vw, 72px)',
            lineHeight: '1.06',
            letterSpacing: '0.01em',
            color: '#282828',
            margin: 0,
          }}
        >
          Digital experiences that push<br />
          boundaries and deliver<br />
          excellence.
        </p>
      </div>
    </section>
  )
}
