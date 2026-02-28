import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/utils/gsap-utils'

export default function SmoothScroll({ children, autoStart = false }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: true,
    })

    // Expose instance so other components can stop/start scrolling
    window.__lenis = lenis

    // Stop by default — Hero entrance calls lenis.start() when done.
    // Pages without a Hero entrance should pass autoStart={true}.
    if (!autoStart) lenis.stop()

    lenis.on('scroll', ScrollTrigger.update)

    const tickerCallback = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tickerCallback)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tickerCallback)
      lenis.destroy()
      window.__lenis = null
    }
  }, [])

  return children
}
