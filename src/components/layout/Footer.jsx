import { useRef, useEffect } from 'react'
import { gsap } from '@/utils/gsap-utils'

export default function Footer() {
  const footerRef = useRef(null)
  const spacerRef = useRef(null)
  const logoRef = useRef(null)

  // Keep spacer height in sync with footer height
  useEffect(() => {
    const footer = footerRef.current
    const spacer = spacerRef.current
    if (!footer || !spacer) return

    const sync = () => { spacer.style.height = footer.offsetHeight + 'px' }
    sync()

    const ro = new ResizeObserver(sync)
    ro.observe(footer)
    return () => ro.disconnect()
  }, [])

  // Animate logo when footer is revealed (spacer enters viewport)
  useEffect(() => {
    const spacer = spacerRef.current
    const logo = logoRef.current
    if (!spacer || !logo) return

    gsap.set(logo, { y: 80, opacity: 0 })

    let triggered = false
    const onScroll = () => {
      if (triggered) return
      const rect = spacer.getBoundingClientRect()
      if (rect.top < window.innerHeight) {
        triggered = true
        gsap.to(logo, { y: 0, opacity: 1, duration: 1.2, ease: 'smoothOut' })
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
  }, [])

  return (
    <>
      {/* Spacer — holds the footer's height in the document flow */}
      <div ref={spacerRef} />

      {/* Fixed footer — revealed as content above scrolls away */}
      <footer
        ref={footerRef}
        className="fixed bottom-0 left-0 right-0 bg-[#202020] px-[48px] pt-[60px] pb-0 max-lg:px-5 max-lg:pt-8 max-lg:pb-0 max-sm:px-4 max-sm:pt-6"
        style={{ fontFamily: "'Hanken Grotesk', sans-serif", zIndex: 0 }}
        data-scroll-section
      >
        {/* Top row */}
        <div className="flex items-start justify-between gap-12 mb-[100px] max-lg:flex-col max-lg:gap-6 max-lg:mb-8 max-sm:gap-4 max-sm:mb-6">
          {/* Credits */}
          <div className="flex items-start gap-[16px] shrink-0">
            <div className="size-[13px] bg-[#c96b00] mt-[5px]" />
            <div className="text-[20px] font-medium leading-[26px] tracking-[-1px] text-[#e0e0e0] max-lg:text-[18px]">
              <p>Design and build by</p>
              <p>&copy; Enlighten {new Date().getFullYear()}</p>
            </div>
          </div>

          {/* Contact Info */}
          <address className="flex flex-col gap-[12px] shrink-0 not-italic max-sm:gap-[8px]">
            <p className="text-[20px] font-normal leading-[28px] tracking-[0.2px] text-white max-lg:text-[18px]">
              Contact Info
            </p>
            <a
              href="mailto:priyanka@enlighten.in.net"
              className="text-[18px] font-normal leading-[28px] tracking-[-0.18px] text-[#aaa] hover:text-white transition-colors max-lg:text-[16px]"
            >
              priyanka@enlighten.in.net
            </a>
            <a
              href="tel:+919876543210"
              className="text-[18px] font-normal leading-[28px] tracking-[-0.18px] text-[#aaa] hover:text-white transition-colors max-lg:text-[16px]"
            >
              +91 9876543210
            </a>
          </address>

          {/* Contact form */}
          <form
            className="flex gap-[24px] items-end max-lg:flex-col max-lg:w-full max-sm:gap-3"
            onSubmit={(e) => e.preventDefault()}
            aria-label="Quick contact form"
          >
            <div className="flex flex-col gap-[8px] w-[320px] max-lg:w-full">
              <label
                htmlFor="footer-name"
                className="text-[20px] font-normal leading-[28px] tracking-[-0.2px] text-white max-lg:text-[18px]"
              >
                Name
              </label>
              <div className="border-b border-[#444] py-[32px] max-sm:py-[16px]">
                <input
                  id="footer-name"
                  type="text"
                  name="name"
                  placeholder="Jane Smith"
                  autoComplete="name"
                  className="w-full bg-transparent text-[18px] font-normal leading-[28px] tracking-[-0.18px] text-white placeholder:text-[#555] outline-none max-lg:text-[16px]"
                />
              </div>
            </div>
            <div className="flex flex-col gap-[8px] w-[320px] max-lg:w-full">
              <label
                htmlFor="footer-email"
                className="text-[20px] font-normal leading-[28px] tracking-[-0.2px] text-white max-lg:text-[18px]"
              >
                Email
              </label>
              <div className="border-b border-[#444] py-[32px] max-sm:py-[16px]">
                <input
                  id="footer-email"
                  type="email"
                  name="email"
                  placeholder="jane@example.com"
                  autoComplete="email"
                  required
                  className="w-full bg-transparent text-[18px] font-normal leading-[28px] tracking-[-0.18px] text-white placeholder:text-[#555] outline-none max-lg:text-[16px]"
                />
              </div>
            </div>
            <button
              type="submit"
              className="shrink-0 px-[28px] h-[50px] rounded-full bg-white text-[#202020] text-[14px] uppercase tracking-[0.8px] hover:bg-[#d0d0d0] hover:text-[#202020] transition-colors duration-300 max-lg:w-full"
              style={{ fontFamily: "'Mylius Modern', sans-serif" }}
            >
              Send
            </button>
          </form>
        </div>

        {/* Big logo */}
        <div ref={logoRef} className="w-full overflow-hidden">
          <img
            src="/images/footer-logo-white.svg"
            alt="Enlighten Creatives"
            className="w-full h-auto block"
          />
        </div>
      </footer>
    </>
  )
}
