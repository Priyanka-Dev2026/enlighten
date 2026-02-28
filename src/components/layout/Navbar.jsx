import { useRef, forwardRef, useState, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import { gsap } from '@utils/gsap-utils'

const NAV_LINKS_LEFT = [
  { label: 'HOME', href: '/' },
  { label: 'SERVICES', href: '/services' },
  { label: 'OUR WORKS', href: '/works' },
]

const NAV_LINKS_RIGHT = [
  { label: 'ABOUT US', href: '/about' },
  { label: 'INSIGHTS', href: '#insights' },
]

const ALL_LINKS = [...NAV_LINKS_LEFT, ...NAV_LINKS_RIGHT]

const NavLink = forwardRef(({ href, label }, ref) => {
  const { pathname } = useLocation()
  const isInternal = href.startsWith('/')
  const isActive = isInternal && pathname === href
  const className = "nav-link group relative block overflow-hidden text-[16px] uppercase tracking-[0.8px]"
  const style = { fontFamily: "'Hanken Grotesk', sans-serif" }
  const children = (
    <>
      <span className="block transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
        {label}
      </span>
      <span className="absolute left-0 top-full block transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full" aria-hidden="true">
        {label}
      </span>
    </>
  )

  return isInternal ? (
    <Link ref={ref} to={href} className={className} style={style} data-cursor-hover aria-current={isActive ? 'page' : undefined}>
      {children}
    </Link>
  ) : (
    <a ref={ref} href={href} className={className} style={style} data-cursor-hover>
      {children}
    </a>
  )
})

NavLink.displayName = 'NavLink'

export default function Navbar({ entranceComplete, variant = 'light' }) {
  const navRef = useRef(null)
  const linksRef = useRef([])
  const isStaticDark = variant === 'dark'

  // Mobile menu
  const [menuOpen, setMenuOpen] = useState(false)
  const overlayRef = useRef(null)
  const menuLinksRef = useRef([])
  const menuTlRef = useRef(null)

  // Set overlay to hidden on mount
  useGSAP(() => {
    if (!overlayRef.current) return
    gsap.set(overlayRef.current, { clipPath: 'inset(0% 0% 100% 0%)' })
    gsap.set(menuLinksRef.current.filter(Boolean), { opacity: 0, y: 30 })
  }, { scope: navRef })

  const openMenu = useCallback(() => {
    setMenuOpen(true)
    menuTlRef.current?.kill()
    menuTlRef.current = gsap.timeline()
    menuTlRef.current
      .to(overlayRef.current, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 0.65,
        ease: 'smooth',
      })
      .to(menuLinksRef.current.filter(Boolean), {
        opacity: 1,
        y: 0,
        stagger: 0.07,
        duration: 0.55,
        ease: 'smoothOut',
      }, '-=0.25')
  }, [])

  const closeMenu = useCallback(() => {
    menuTlRef.current?.kill()
    menuTlRef.current = gsap.timeline({
      onComplete: () => setMenuOpen(false),
    })
    menuTlRef.current
      .to(menuLinksRef.current.filter(Boolean), {
        opacity: 0,
        y: -20,
        stagger: 0.04,
        duration: 0.25,
        ease: 'smoothIn',
      })
      .to(overlayRef.current, {
        clipPath: 'inset(0% 0% 100% 0%)',
        duration: 0.5,
        ease: 'smooth',
      }, '-=0.1')
  }, [])

  const toggleMenu = useCallback(() => {
    if (menuOpen) closeMenu()
    else openMenu()
  }, [menuOpen, openMenu, closeMenu])

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Kill timeline on unmount
  useEffect(() => {
    return () => { menuTlRef.current?.kill() }
  }, [])

  // Desktop: initial hidden state
  useGSAP(() => {
    if (isStaticDark) return
    const links = linksRef.current.filter(Boolean)
    gsap.set(links, { opacity: 0, y: -15 })
  }, { scope: navRef })

  // Desktop: stagger-in links, hide/show on scroll, color switch
  useGSAP(() => {
    if (isStaticDark) return
    if (!entranceComplete) return

    const links = linksRef.current.filter(Boolean)

    gsap.to(links, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.05,
      ease: 'smoothOut',
      delay: 1.0,
    })

    let lastScrollY = window.scrollY
    let navHidden = false

    const handleNavScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop
      if (scrollY < window.innerHeight * 2) {
        lastScrollY = scrollY
        return
      }
      const delta = scrollY - lastScrollY
      lastScrollY = scrollY

      if (delta > 4 && !navHidden) {
        navHidden = true
        gsap.to(navRef.current, { y: -100, duration: 0.35, ease: 'power2.in', overwrite: true })
      } else if (delta < -4 && navHidden) {
        navHidden = false
        gsap.to(navRef.current, { y: 0, duration: 0.45, ease: 'power3.out', overwrite: true })
      }
    }

    // ── Nav color: scan section at nav position, toggle nav-dark ─────────────
    // Uses getBoundingClientRect so it's unaffected by the Hero pin spacer offset.
    // Checks data-theme="light" (static sections) AND inline style.backgroundColor
    // luminance (Work / OurClients dynamic bg transitions).
    const updateNavColor = () => {
      if (!navRef.current) return
      const sections = document.querySelectorAll('[data-scroll-section]')
      let shouldBeDark = false
      sections.forEach(section => {
        const rect = section.getBoundingClientRect()
        if (rect.top > 60 || rect.bottom <= 60) return
        if (section.getAttribute('data-theme') === 'light') {
          shouldBeDark = true
          return
        }
        const bg = section.style.backgroundColor
        if (bg) {
          const m = bg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/)
          if (m) {
            const lum = (parseInt(m[1]) + parseInt(m[2]) + parseInt(m[3])) / 3
            if (lum > 127) shouldBeDark = true
          }
        }
      })
      navRef.current.classList.toggle('nav-dark', shouldBeDark)
    }

    const lenis = window.__lenis
    if (lenis) {
      lenis.on('scroll', handleNavScroll)
      lenis.on('scroll', updateNavColor)
    }
    window.addEventListener('scroll', handleNavScroll, { passive: true })
    window.addEventListener('scroll', updateNavColor, { passive: true })
    updateNavColor()

    return () => {
      if (lenis) {
        lenis.off('scroll', handleNavScroll)
        lenis.off('scroll', updateNavColor)
      }
      window.removeEventListener('scroll', handleNavScroll)
      window.removeEventListener('scroll', updateNavColor)
    }
  }, { dependencies: [entranceComplete, isStaticDark] })

  // Static dark variant: hide/show on scroll
  useEffect(() => {
    if (!isStaticDark) return

    let lastScrollY = window.scrollY
    let navHidden = false

    const handleNavScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop
      if (scrollY < 200) {
        lastScrollY = scrollY
        return
      }
      const delta = scrollY - lastScrollY
      lastScrollY = scrollY

      if (delta > 4 && !navHidden) {
        navHidden = true
        gsap.to(navRef.current, { y: -100, duration: 0.35, ease: 'power2.in', overwrite: true })
      } else if (delta < -4 && navHidden) {
        navHidden = false
        gsap.to(navRef.current, { y: 0, duration: 0.45, ease: 'power3.out', overwrite: true })
      }
    }

    const lenis = window.__lenis
    if (lenis) lenis.on('scroll', handleNavScroll)
    window.addEventListener('scroll', handleNavScroll, { passive: true })

    return () => {
      if (lenis) lenis.off('scroll', handleNavScroll)
      window.removeEventListener('scroll', handleNavScroll)
    }
  }, [isStaticDark])

  const setLinkRef = (i) => (el) => { linksRef.current[i] = el }

  return (
    <>
      {/*
        ── Mobile full-screen overlay ──
        Rendered OUTSIDE the <nav> element so that GSAP's translateY on the nav
        (hide-on-scroll) never creates a new CSS containing block that would break
        this overlay's `position: fixed` and make it appear clipped / small.
      */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[99] bg-[#202020] flex flex-col justify-between px-6 py-6 lg:hidden"
        aria-hidden={!menuOpen}
        style={{ pointerEvents: menuOpen ? 'auto' : 'none' }}
      >
        {/* Overlay header spacer (keeps layout consistent) */}
        <div className="h-[36px]" />

        {/* Links */}
        <nav className="flex flex-col">
          {ALL_LINKS.map((link, i) => {
            const isInternal = link.href.startsWith('/')
            const linkClass = "block py-5 text-[40px] font-medium text-white uppercase tracking-[-0.02em] border-b border-white/10 transition-opacity duration-200 active:opacity-50"
            const linkStyle = { fontFamily: "'Hanken Grotesk', sans-serif" }
            return (
              <div
                key={link.label}
                ref={(el) => { menuLinksRef.current[i] = el }}
              >
                {isInternal ? (
                  <Link
                    to={link.href}
                    onClick={closeMenu}
                    className={linkClass}
                    style={linkStyle}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className={linkClass}
                    style={linkStyle}
                  >
                    {link.label}
                  </a>
                )}
              </div>
            )
          })}
        </nav>

        {/* Overlay CTA */}
        <div
          ref={(el) => { menuLinksRef.current[ALL_LINKS.length] = el }}
          className="pb-4"
        >
          <a
            href="#contact"
            onClick={closeMenu}
            className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-[14px] uppercase tracking-[0.8px] text-[#202020]"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
          >
            GET IN TOUCH
          </a>
        </div>
      </div>

      <nav
        ref={navRef}
        className={`fixed top-0 left-0 z-[100] w-full ${isStaticDark ? 'nav-dark' : 'nav-light'}`}
        aria-label="Main navigation"
      >
        <a href="#main-content" className="skip-to-content">Skip to content</a>

        {/* Blur layer */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${(isStaticDark || entranceComplete) ? 'opacity-100' : 'opacity-0'}`}
          style={{
            backdropFilter: 'blur(37.8px)',
            WebkitBackdropFilter: 'blur(37.8px)',
            maskImage: 'linear-gradient(to bottom, black 0%, black 50%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 50%, transparent 100%)',
            bottom: '-20px',
          }}
        />

      {/* ── Nav bar row ── */}
      <div className="relative flex items-center justify-between px-[48px] py-[20px] max-lg:px-5 max-lg:py-4">

        {/* Desktop: left nav links */}
        <div className="hidden lg:flex items-center gap-10">
          {NAV_LINKS_LEFT.map((link, i) => (
            <NavLink
              key={link.label}
              ref={setLinkRef(i)}
              href={link.href}
              label={link.label}
            />
          ))}
        </div>

        {/* Mobile: logo (hidden until entrance completes) */}
        <Link
          to="/"
          className={`lg:hidden transition-opacity duration-500 ${(isStaticDark || entranceComplete) ? 'opacity-100' : 'opacity-0'}`}
          data-cursor-hover
        >
          <img
            src="/images/enlighten-logo.svg"
            alt="Enlighten"
            className="nav-logo-img h-[36px] w-auto transition-[filter] duration-500"
          />
        </Link>

        {/* Desktop: center logo — revealed by hero scroll animation */}
        <Link
          id="nav-logo"
          to="/"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block"
          style={{ opacity: isStaticDark ? 1 : 0 }}
          data-cursor-hover
        >
          <img
            src="/images/enlighten-logo.svg"
            alt="Enlighten"
            className="nav-logo-img h-[38px] w-auto transition-[filter] duration-500"
          />
        </Link>

        {/* Desktop: right nav links + CTA */}
        <div className="hidden lg:flex items-center gap-10">
          {NAV_LINKS_RIGHT.map((link, i) => (
            <NavLink
              key={link.label}
              ref={setLinkRef(NAV_LINKS_LEFT.length + i)}
              href={link.href}
              label={link.label}
            />
          ))}

          {/* CTA button + arrow */}
          <a
            ref={setLinkRef(NAV_LINKS_LEFT.length + NAV_LINKS_RIGHT.length)}
            href="#contact"
            className="group flex items-center"
            data-cursor-hover
          >
            <span className="nav-cta-bg rounded-[36px] px-[20px] h-[50px] flex items-center backdrop-blur-[1.95px] transition-colors duration-500">
              <span
                className="relative block overflow-hidden text-[16px] uppercase tracking-[0.8px] nav-link"
                style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
              >
                <span className="block transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                  GET IN TOUCH
                </span>
                <span className="absolute left-0 top-full block transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full" aria-hidden="true">
                  GET IN TOUCH
                </span>
              </span>
            </span>
            <span className="nav-arrow-bg size-[50px] shrink-0 rounded-full transition-colors duration-500 flex items-center justify-center">
              <span className="relative block size-[12px] overflow-hidden">
                <svg className="nav-arrow-icon absolute inset-0 transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full group-hover:-translate-x-full" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.25 0.625V8.75C11.25 8.91576 11.1842 9.07473 11.0669 9.19194C10.9497 9.30915 10.7908 9.375 10.625 9.375C10.4592 9.375 10.3003 9.30915 10.1831 9.19194C10.0658 9.07473 10 8.91576 10 8.75V2.13363L1.06719 11.0672C0.949877 11.1845 0.790937 11.2503 0.625 11.2503C0.459063 11.2503 0.300123 11.1845 0.182812 11.0672C0.065502 10.9499 -0.000305176 10.7909 -0.000305176 10.625C-0.000305176 10.4591 0.065502 10.3001 0.182812 10.1828L9.11637 1.25H2.5C2.33424 1.25 2.17527 1.18415 2.05806 1.06694C1.94085 0.949731 1.875 0.790761 1.875 0.625C1.875 0.459239 1.94085 0.300269 2.05806 0.183058C2.17527 0.065848 2.33424 0 2.5 0H10.625C10.7908 0 10.9497 0.065848 11.0669 0.183058C11.1842 0.300269 11.25 0.459239 11.25 0.625Z" fill="currentColor"/>
                </svg>
                <svg className="nav-arrow-icon absolute inset-0 translate-y-full translate-x-full transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0 group-hover:translate-x-0" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M11.25 0.625V8.75C11.25 8.91576 11.1842 9.07473 11.0669 9.19194C10.9497 9.30915 10.7908 9.375 10.625 9.375C10.4592 9.375 10.3003 9.30915 10.1831 9.19194C10.0658 9.07473 10 8.91576 10 8.75V2.13363L1.06719 11.0672C0.949877 11.1845 0.790937 11.2503 0.625 11.2503C0.459063 11.2503 0.300123 11.1845 0.182812 11.0672C0.065502 10.9499 -0.000305176 10.7909 -0.000305176 10.625C-0.000305176 10.4591 0.065502 10.3001 0.182812 10.1828L9.11637 1.25H2.5C2.33424 1.25 2.17527 1.18415 2.05806 1.06694C1.94085 0.949731 1.875 0.790761 1.875 0.625C1.875 0.459239 1.94085 0.300269 2.05806 0.183058C2.17527 0.065848 2.33424 0 2.5 0H10.625C10.7908 0 10.9497 0.065848 11.0669 0.183058C11.1842 0.300269 11.25 0.459239 11.25 0.625Z" fill="currentColor"/>
                </svg>
              </span>
            </span>
          </a>
        </div>

        {/* Mobile: hamburger / close button (hidden until entrance completes) */}
        <button
          onClick={toggleMenu}
          className={`lg:hidden p-1 transition-opacity duration-500 ${(isStaticDark || entranceComplete) ? 'opacity-100' : 'opacity-0'}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <div
            className="nav-hamburger-icon"
            style={{
              transition: 'transform 0.45s cubic-bezier(0.76,0,0.24,1)',
              transform: menuOpen ? 'rotate(45deg)' : 'rotate(0deg)',
              color: menuOpen ? '#fff' : undefined,
            }}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              {/* Top */}
              <rect x="9" y="0" width="4" height="4" fill="currentColor" />
              {/* Left */}
              <rect x="0" y="9" width="4" height="4" fill="currentColor" />
              {/* Center */}
              <rect x="9" y="9" width="4" height="4" fill="currentColor" />
              {/* Right */}
              <rect x="18" y="9" width="4" height="4" fill="currentColor" />
              {/* Bottom */}
              <rect x="9" y="18" width="4" height="4" fill="currentColor" />
            </svg>
          </div>
        </button>
      </div>
      </nav>
    </>
  )
}
