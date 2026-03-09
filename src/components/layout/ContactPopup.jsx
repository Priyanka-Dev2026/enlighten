import { useRef, useState, useEffect, useCallback } from 'react'
import { gsap } from '@/utils/gsap-utils'

export default function ContactPopup() {
  const [visible, setVisible] = useState(false)
  const backdropRef = useRef(null)
  const panelRef = useRef(null)
  const tlRef = useRef(null)

  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const openPopup = useCallback(() => {
    setVisible(true)
    document.body.style.overflow = 'hidden'
    if (window.__lenis) window.__lenis.stop()
  }, [])

  const closePopup = useCallback(() => {
    tlRef.current?.kill()
    tlRef.current = gsap.timeline({
      onComplete: () => {
        setVisible(false)
        document.body.style.overflow = ''
        if (window.__lenis) window.__lenis.start()
      },
    })
    tlRef.current
      .to(panelRef.current, { y: 40, opacity: 0, duration: 0.45, ease: 'smooth' })
      .to(backdropRef.current, { opacity: 0, duration: 0.3, ease: 'smoothOut' }, '-=0.25')
  }, [])

  // Listen for the global open event fired by Navbar
  useEffect(() => {
    const handler = () => openPopup()
    window.addEventListener('open-contact-popup', handler)
    return () => window.removeEventListener('open-contact-popup', handler)
  }, [openPopup])

  // Animate in once visible mounts the DOM
  useEffect(() => {
    if (!visible) return
    tlRef.current?.kill()
    gsap.set(panelRef.current, { y: 60, opacity: 0 })
    gsap.set(backdropRef.current, { opacity: 0 })

    tlRef.current = gsap.timeline()
    tlRef.current
      .to(backdropRef.current, { opacity: 1, duration: 0.4, ease: 'smoothOut' })
      .to(panelRef.current, { y: 0, opacity: 1, duration: 0.65, ease: 'smooth' }, '-=0.2')
  }, [visible])

  // Close on Escape key
  useEffect(() => {
    if (!visible) return
    const onKey = (e) => { if (e.key === 'Escape') closePopup() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [visible, closePopup])

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: wire to backend / email service
    closePopup()
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[200]">
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/50"
        onClick={closePopup}
      />

      {/* Panel — centered, content-hugging, slides up from below */}
      <div className="absolute inset-0 flex items-center justify-center p-4 max-lg:p-0 max-lg:items-start max-lg:overflow-y-auto pointer-events-none">
        <div
          ref={panelRef}
          className="bg-white w-full max-w-[900px] pointer-events-auto shadow-2xl max-h-[82vh] overflow-y-auto max-lg:max-h-none max-lg:overflow-visible max-lg:min-h-full"
          style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
        >
          <div>
          <div className="px-[48px] pt-[60px] pb-0 max-lg:px-5 max-lg:pt-6">

            {/* Header row */}
            <div className="flex items-start justify-between gap-8 mb-8 max-lg:mb-5">
              <div>
                <h2 className="text-[28px] font-medium leading-[1.2] tracking-[-0.05em] text-[#393939] max-w-[520px] max-lg:text-[19px]">
                  Partner with us and give your brand the competitive edge.
                </h2>
                <p className="text-[18px] font-normal leading-[1.5] tracking-[0.18px] text-[#454545] mt-2 max-lg:text-[13px]">
                  Get in touch to find out how we can help.
                </p>
              </div>

              {/* Close */}
              <button
                onClick={closePopup}
                className="shrink-0 size-[32px] flex items-center justify-center text-[#111] hover:opacity-50 transition-opacity"
                aria-label="Close"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-8 max-lg:gap-4">

              {/* Name + Email row */}
              <div className="flex gap-8 max-lg:flex-col max-lg:gap-4">
                <div className="flex flex-col gap-2 flex-1">
                  <label className="text-[20px] font-normal tracking-[-0.02em] text-[#111] max-lg:text-[14px]">
                    Your Name
                  </label>
                  <div className="border-b border-[#acacac]">
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Jane Smith"
                      required
                      className="w-full py-5 text-[18px] font-normal text-[#111] placeholder-[#b5b5b5] bg-transparent outline-none max-lg:py-3 max-lg:text-[14px]"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <label className="text-[20px] font-normal tracking-[-0.02em] text-[#111] max-lg:text-[14px]">
                    Your Email
                  </label>
                  <div className="border-b border-[#acacac]">
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="jane@example.com"
                      required
                      className="w-full py-5 text-[18px] font-normal text-[#111] placeholder-[#b5b5b5] bg-transparent outline-none max-lg:py-3 max-lg:text-[14px]"
                    />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label className="text-[20px] font-normal tracking-[-0.02em] text-[#111] max-lg:text-[14px]">
                  Your Message
                </label>
                <div className="border-b border-[#acacac]">
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    required
                    rows={typeof window !== 'undefined' && window.innerWidth < 1024 ? 3 : 4}
                    className="w-full py-5 text-[18px] font-normal text-[#111] placeholder-[#b5b5b5] bg-transparent outline-none resize-none max-lg:py-3 max-lg:text-[14px] max-lg:rows-3"
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="pt-1">
                <button type="submit" className="group flex items-center cursor-pointer">
                  <span className="bg-[rgba(0,0,0,0.58)] rounded-[36px] px-[20px] h-[50px] flex items-center backdrop-blur-[1.95px]">
                    <span
                      className="relative block overflow-hidden text-[16px] uppercase tracking-[0.8px] text-white"
                      style={{ fontFamily: "'Mylius Modern', sans-serif" }}
                    >
                      <span className="block transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">SUBMIT</span>
                      <span className="absolute left-0 top-full block transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full" aria-hidden="true">SUBMIT</span>
                    </span>
                  </span>
                  <span className="bg-[rgba(0,0,0,0.58)] size-[50px] shrink-0 rounded-full backdrop-blur-[1.95px] flex items-center justify-center text-white">
                    <span className="relative block size-[12px] overflow-hidden">
                      <svg className="absolute inset-0 transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full group-hover:-translate-x-full" width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M11.25 0.625V8.75C11.25 8.91576 11.1842 9.07473 11.0669 9.19194C10.9497 9.30915 10.7908 9.375 10.625 9.375C10.4592 9.375 10.3003 9.30915 10.1831 9.19194C10.0658 9.07473 10 8.91576 10 8.75V2.13363L1.06719 11.0672C0.949877 11.1845 0.790937 11.2503 0.625 11.2503C0.459063 11.2503 0.300123 11.1845 0.182812 11.0672C0.065502 10.9499 -0.000305176 10.7909 -0.000305176 10.625C-0.000305176 10.4591 0.065502 10.3001 0.182812 10.1828L9.11637 1.25H2.5C2.33424 1.25 2.17527 1.18415 2.05806 1.06694C1.94085 0.949731 1.875 0.790761 1.875 0.625C1.875 0.459239 1.94085 0.300269 2.05806 0.183058C2.17527 0.065848 2.33424 0 2.5 0H10.625C10.7908 0 10.9497 0.065848 11.0669 0.183058C11.1842 0.300269 11.25 0.459239 11.25 0.625Z" fill="currentColor"/>
                      </svg>
                      <svg className="absolute inset-0 translate-y-full translate-x-full transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0 group-hover:translate-x-0" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M11.25 0.625V8.75C11.25 8.91576 11.1842 9.07473 11.0669 9.19194C10.9497 9.30915 10.7908 9.375 10.625 9.375C10.4592 9.375 10.3003 9.30915 10.1831 9.19194C10.0658 9.07473 10 8.91576 10 8.75V2.13363L1.06719 11.0672C0.949877 11.1845 0.790937 11.2503 0.625 11.2503C0.459063 11.2503 0.300123 11.1845 0.182812 11.0672C0.065502 10.9499 -0.000305176 10.7909 -0.000305176 10.625C-0.000305176 10.4591 0.065502 10.3001 0.182812 10.1828L9.11637 1.25H2.5C2.33424 1.25 2.17527 1.18415 2.05806 1.06694C1.94085 0.949731 1.875 0.790761 1.875 0.625C1.875 0.459239 1.94085 0.300269 2.05806 0.183058C2.17527 0.065848 2.33424 0 2.5 0H10.625C10.7908 0 10.9497 0.065848 11.0669 0.183058C11.1842 0.300269 11.25 0.459239 11.25 0.625Z" fill="currentColor"/>
                      </svg>
                    </span>
                  </span>
                </button>
              </div>

            </form>

            {/* Bottom spacer above logo */}
            <div className="h-10 max-lg:h-3" />
          </div>

          {/* Full-width wordmark */}
          <div className="w-full px-[48px] pb-[40px] max-lg:px-5 max-lg:pb-4">
            <img
              src="/images/enlighten-wordmark-dark.svg"
              alt="enlighten"
              className="w-full block"
              aria-hidden="true"
            />
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}
