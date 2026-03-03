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
      id="services-statement"
      style={{ backgroundColor: '#ffffff' }}
      className="w-full"
      data-scroll-section
    >
      <div className="px-[48px] py-[68px] max-lg:px-5 max-lg:py-12">
        <p
          className="services-statement-text text-[30px] lg:text-[clamp(36px,5vw,72px)] max-lg:leading-[34px] lg:leading-[1]"
          style={{
            fontFamily: "'Hanken Grotesk', sans-serif",
            fontWeight: 400,
            letterSpacing: '-0.06em',
            color: '#282828',
            margin: 0,
          }}
        >
          Digital experiences<br className="lg:hidden" />{' '}that push<br className="hidden lg:block" />{' '}boundaries<br className="lg:hidden" />{' '}and deliver<br className="hidden lg:block" />{' '}excellence.
        </p>
      </div>
    </section>
  )
}
