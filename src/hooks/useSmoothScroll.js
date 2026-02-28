import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/utils/gsap-utils'

export function useSmoothScroll() {
  const lenis = useRef(null)

  useEffect(() => {
    lenis.current = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    })

    lenis.current.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.current?.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.current?.destroy()
    }
  }, [])

  return lenis
}
