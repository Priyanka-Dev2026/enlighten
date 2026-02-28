import { useRef, useEffect } from 'react'
import { gsap } from '@/utils/gsap-utils'

export default function Footer() {
  const footerRef = useRef(null)
  const logoRef = useRef(null)

  // Logo reveal from bottom on scroll
  useEffect(() => {
    const footer = footerRef.current
    const logo = logoRef.current
    if (!footer || !logo) return

    gsap.set(logo, { y: 120, opacity: 0 })

    let triggered = false
    const onScroll = () => {
      if (triggered) return
      const rect = footer.getBoundingClientRect()
      const vh = window.innerHeight
      if (rect.top < vh * 0.75) {
        triggered = true
        gsap.to(logo, {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'smoothOut',
        })
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

  // Navbar dark text for this light section
  useEffect(() => {
    const footer = footerRef.current
    if (!footer) return

    const onScroll = () => {
      const rect = footer.getBoundingClientRect()
      const vh = window.innerHeight
      const nav = document.querySelector('nav')
      if (!nav) return

      if (rect.top < vh * 0.3 && rect.bottom > vh * 0.3) {
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
    }
  }, [])

  return (
    <footer
      ref={footerRef}
      className="border-t border-[#c1c1c1] bg-[#ffffff] px-[48px] py-[60px] max-lg:px-5 max-lg:py-12"
      style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
      data-theme="light"
      data-scroll-section
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-12 mb-[100px] max-lg:flex-col max-lg:gap-10 max-lg:mb-16">
        {/* Credits */}
        <div className="flex items-start gap-[16px] shrink-0">
          <div className="size-[13px] bg-[#c96b00] mt-[5px]" />
          <div className="text-[20px] font-medium leading-[26px] tracking-[-1px] text-[#393939] max-lg:text-[18px]">
            <p>Design and build by</p>
            <p>&copy; Enlighten {new Date().getFullYear()}</p>
          </div>
        </div>

        {/* Contact Info */}
        <address className="flex flex-col gap-[12px] shrink-0 not-italic">
          <p className="text-[20px] font-normal leading-[28px] tracking-[0.2px] text-[#111] max-lg:text-[18px]">
            Contact Info
          </p>
          <a
            href="mailto:priyanka@enlighten.in.net"
            className="text-[18px] font-normal leading-[28px] tracking-[-0.18px] text-[#111] hover:opacity-70 transition-opacity max-lg:text-[16px]"
          >
            priyanka@enlighten.in.net
          </a>
          <a
            href="tel:+919876543210"
            className="text-[18px] font-normal leading-[28px] tracking-[-0.18px] text-[#111] hover:opacity-70 transition-opacity max-lg:text-[16px]"
          >
            +91 9876543210
          </a>
        </address>

        {/* Contact form */}
        <form
          className="flex gap-[24px] items-end max-lg:flex-col max-lg:w-full"
          onSubmit={(e) => e.preventDefault()}
          aria-label="Quick contact form"
        >
          <div className="flex flex-col gap-[8px] w-[320px] max-lg:w-full">
            <label
              htmlFor="footer-name"
              className="text-[20px] font-normal leading-[28px] tracking-[-0.2px] text-[#111] max-lg:text-[18px]"
            >
              Name
            </label>
            <div className="border-b border-[#acacac] py-[20px]">
              <input
                id="footer-name"
                type="text"
                name="name"
                placeholder="Jane Smith"
                autoComplete="name"
                className="w-full bg-transparent text-[18px] font-normal leading-[28px] tracking-[-0.18px] text-[#111] placeholder:text-[#b5b5b5] outline-none max-lg:text-[16px]"
              />
            </div>
          </div>
          <div className="flex flex-col gap-[8px] w-[320px] max-lg:w-full">
            <label
              htmlFor="footer-email"
              className="text-[20px] font-normal leading-[28px] tracking-[-0.2px] text-[#111] max-lg:text-[18px]"
            >
              Email
            </label>
            <div className="border-b border-[#acacac] py-[20px]">
              <input
                id="footer-email"
                type="email"
                name="email"
                placeholder="jane@example.com"
                autoComplete="email"
                required
                className="w-full bg-transparent text-[18px] font-normal leading-[28px] tracking-[-0.18px] text-[#111] placeholder:text-[#b5b5b5] outline-none max-lg:text-[16px]"
              />
            </div>
          </div>
          <button
            type="submit"
            className="shrink-0 px-[28px] h-[50px] rounded-full bg-[#0e0d0d] text-white text-[14px] uppercase tracking-[0.8px] hover:bg-[#c96b00] transition-colors duration-300 max-lg:w-full"
            style={{ fontFamily: "'Mylius Modern', sans-serif" }}
          >
            Send
          </button>
        </form>
      </div>

      {/* Big logo */}
      <div
        ref={logoRef}
        className="w-full overflow-hidden"
      >
        <img
          src="/images/footer-logo.svg"
          alt="Enlighten Creatives"
          className="w-full h-auto"
        />
      </div>
    </footer>
  )
}
