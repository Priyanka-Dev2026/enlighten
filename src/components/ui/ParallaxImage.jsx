import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@utils/gsap-utils'

export default function ParallaxImage({
  src,
  alt = '',
  className = '',
  speed = 0.3,
  scale = 1.2,
}) {
  const containerRef = useRef(null)
  const imageRef = useRef(null)

  useGSAP(() => {
    gsap.set(imageRef.current, { scale })

    gsap.to(imageRef.current, {
      yPercent: -15 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
      />
    </div>
  )
}
