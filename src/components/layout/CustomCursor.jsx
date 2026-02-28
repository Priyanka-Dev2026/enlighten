import { useEffect, useRef } from 'react'
import { gsap } from '@utils/gsap-utils'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out',
      })
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: 'power2.out',
      })
    }

    // Grow on hover over interactive elements
    const handleMouseEnter = () => {
      gsap.to(follower, { scale: 2.5, duration: 0.3, ease: 'power2.out' })
      gsap.to(cursor, { scale: 0, duration: 0.3, ease: 'power2.out' })
    }

    const handleMouseLeave = () => {
      gsap.to(follower, { scale: 1, duration: 0.3, ease: 'power2.out' })
      gsap.to(cursor, { scale: 1, duration: 0.3, ease: 'power2.out' })
    }

    window.addEventListener('mousemove', moveCursor)

    const interactiveElements = document.querySelectorAll('a, button, [data-cursor-hover]')
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference"
      />
      <div
        ref={followerRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/50 mix-blend-difference"
      />
    </>
  )
}
