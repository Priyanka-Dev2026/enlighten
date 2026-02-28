import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@utils/gsap-utils'

export default function MarqueeText({
  children,
  speed = 20,
  className = '',
  direction = 'left',
}) {
  const marqueeRef = useRef(null)

  useGSAP(() => {
    const items = marqueeRef.current.querySelectorAll('.marquee-item')
    const directionMultiplier = direction === 'left' ? -1 : 1

    gsap.to(items, {
      xPercent: directionMultiplier * -100,
      repeat: -1,
      duration: speed,
      ease: 'none',
    })
  }, { scope: marqueeRef })

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div ref={marqueeRef} className="inline-flex">
        <span className="marquee-item inline-block pr-8">{children}</span>
        <span className="marquee-item inline-block pr-8">{children}</span>
        <span className="marquee-item inline-block pr-8">{children}</span>
        <span className="marquee-item inline-block pr-8">{children}</span>
      </div>
    </div>
  )
}
