import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, SplitText } from '@utils/gsap-utils'
import { ANIMATION } from '@utils/constants'

export default function RevealText({
  children,
  as: Tag = 'div',
  className = '',
  type = 'chars', // 'chars' | 'words' | 'lines'
  stagger = ANIMATION.STAGGER.TEXT,
  duration = ANIMATION.DURATION.SLOW,
  delay = 0,
  scrub = false,
}) {
  const textRef = useRef(null)

  useEffect(() => {
    const el = textRef.current
    const split = new SplitText(el, { type })

    const targets = split[type]

    gsap.set(targets, { y: '110%', opacity: 0 })

    const anim = gsap.to(targets, {
      y: '0%',
      opacity: 1,
      duration,
      stagger,
      delay,
      ease: ANIMATION.EASE.SMOOTH_OUT,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        end: 'bottom 20%',
        scrub: scrub ? 1 : false,
        toggleActions: scrub ? undefined : 'play none none none',
      },
    })

    return () => {
      anim.kill()
      split.revert()
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === el)
        .forEach((t) => t.kill())
    }
  }, [type, stagger, duration, delay, scrub])

  return (
    <Tag ref={textRef} className={`overflow-hidden ${className}`}>
      {children}
    </Tag>
  )
}
