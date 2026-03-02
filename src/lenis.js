import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/utils/gsap-utils'

// Initialize Lenis at module level so window.__lenis is set synchronously
// before any React component mounts.
//
// WHY THIS MATTERS FOR SAFARI:
// SmoothScroll.jsx uses useEffect which fires AFTER all child useEffect /
// useGSAP (useLayoutEffect) calls — React processes effects bottom-up.
// This means every section's `const lenis = window.__lenis` captures null,
// so Lenis scroll handlers never register and only the native scroll fallback
// is used. Chrome's native scroll events are reliable enough; Safari's are not
// (momentum scrolling, touch events). Result: intermittent animation failures
// in Safari that work fine in Chrome.
//
// By creating Lenis here (module evaluation = before React.render()), every
// component that reads window.__lenis gets the real instance.

const lenis = new Lenis({
  lerp: 0.1,
  smoothWheel: true,
  syncTouch: true,
})

window.__lenis = lenis
lenis.stop() // Paused until Hero entrance calls lenis.start()

lenis.on('scroll', ScrollTrigger.update)

const lenisTickerCallback = (time) => lenis.raf(time * 1000)
gsap.ticker.add(lenisTickerCallback)
gsap.ticker.lagSmoothing(0)

export { lenis, lenisTickerCallback }
