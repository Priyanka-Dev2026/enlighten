import { useEffect } from 'react'
import { lenis } from '@/lenis'

// Lenis is created in src/lenis.js at module level.
// This component only controls start/stop based on autoStart prop.
// Pages with a Hero entrance pass autoStart={false} (default) — Hero calls
// lenis.start() when its entrance animation completes.
// Pages without a Hero entrance pass autoStart={true}.
export default function SmoothScroll({ children, autoStart = false }) {
  useEffect(() => {
    if (autoStart) lenis.start()
  }, [autoStart])

  return children
}
