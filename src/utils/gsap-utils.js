import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { CustomEase } from 'gsap/CustomEase'

// Register all plugins once
gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase)

// Default easing for Awwwards-style feel
CustomEase.create('smooth', '0.76, 0, 0.24, 1')
CustomEase.create('smoothOut', '0.16, 1, 0.3, 1')
CustomEase.create('smoothIn', '0.6, 0, 0.86, 0')

// Animation defaults
gsap.defaults({
  ease: 'smooth',
  duration: 1.2,
})

export { gsap, ScrollTrigger, SplitText }
