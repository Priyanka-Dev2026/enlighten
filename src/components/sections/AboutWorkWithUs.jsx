import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/utils/gsap-utils'

export default function AboutWorkWithUs() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    const label = sectionRef.current.querySelector('.wwu-label')
    const text = sectionRef.current.querySelector('.wwu-text')
    const image = sectionRef.current.querySelector('.wwu-image')

    gsap.set(label, { opacity: 0, y: 20 })
    gsap.set(text, { opacity: 0, y: 24 })
    gsap.set(image, { opacity: 0, scale: 1.04 })

    let triggered = false
    const onScroll = () => {
      if (triggered) return
      const rect = sectionRef.current.getBoundingClientRect()
      if (rect.top < window.innerHeight * 0.8) {
        triggered = true
        const tl = gsap.timeline()
        tl.to(label, { opacity: 1, y: 0, duration: 0.9, ease: 'smoothOut' }, 0)
        tl.to(image, { opacity: 1, scale: 1, duration: 1.2, ease: 'smoothOut' }, 0.1)
        tl.to(text, { opacity: 1, y: 0, duration: 1.0, ease: 'smoothOut' }, 0.25)
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
      id="work-with-us"
      className="w-full bg-white"
      data-scroll-section
      data-theme="light"
    >
      <div className="flex min-h-[700px] max-lg:flex-col">

        {/* Left: text content */}
        <div className="flex flex-col justify-between px-[48px] pt-[80px] pb-[80px] w-full lg:w-1/2 max-lg:px-5 max-lg:pt-14 max-lg:pb-10">

          {/* Label */}
          <div className="wwu-label flex items-center gap-[22px] mb-[80px] max-lg:mb-10">
            <div className="size-[17px] bg-[#c96b00] shrink-0" />
            <p
              className="text-[36px] font-medium leading-[38px] tracking-[-2.16px] text-[#393939] max-lg:text-[28px]"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
            >
              Work with us
            </p>
          </div>

          {/* Body text */}
          <div className="wwu-text flex flex-col gap-6 flex-1">
            <p
              className="text-[32px] leading-[34px] tracking-[0.32px] text-[#111] max-lg:text-[22px] max-lg:leading-[30px]"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontWeight: 400 }}
            >
              Want to work alongside some of the most talented digital minds on the planet?
            </p>
            <p
              className="text-[20px] leading-[30px] tracking-[0.2px] text-[#555] max-lg:text-[20px] max-lg:leading-[30px]"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontWeight: 400 }}
            >
              So do we. We want Enlighten to represent the world that we live in, with talent that's diverse in background and skillsets. We want you to bring your whole self to work, and we believe that we're at our best when we tap into our differences and collaborate across varied personal experiences and perspectives to arrive at unique solutions.
            </p>
            <p
              className="text-[20px] leading-[30px] tracking-[0.2px] text-[#555] max-lg:text-[20px] max-lg:leading-[30px]"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontWeight: 400 }}
            >
              If this sounds like the type of place where you'd like to work, mail us at{' '}
              <a href="mailto:priyanka@enlighten.in.net" className="text-[#111] underline underline-offset-2">
                priyanka@enlighten.in.net
              </a>
            </p>
          </div>

        </div>

        {/* Right: image */}
        <div className="wwu-image overflow-hidden w-full lg:w-1/2 self-stretch max-lg:order-first max-lg:h-[400px]">
          <img
            src="/images/about-work-with-us-new.png"
            alt="Work with us at Enlighten"
            className="w-full h-full object-cover block"
          />
        </div>

      </div>
    </section>
  )
}
