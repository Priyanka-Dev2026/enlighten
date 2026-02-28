---
name: scroll-animations
description: Scroll-driven animation recipes for the agency portfolio. Use this skill when implementing scroll-based effects like parallax, horizontal scrolling, pinned sections, scroll-triggered reveals, progress-based animations, velocity-reactive effects, scroll-linked color changes, or any animation tied to scroll position. Also use when integrating Lenis smooth scroll with GSAP ScrollTrigger. Trigger on mentions of scroll animation, parallax, pin, scrub, horizontal scroll, scroll progress, or scroll-linked effects.
---

# Scroll Animation Recipes

## Lenis + ScrollTrigger Integration

This must be set up once in the app root. Lenis handles smooth scrolling, ScrollTrigger hooks into it:

```jsx
// SmoothScroll.jsx — wrap entire app
import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/utils/gsap-utils'

export default function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: true,        // smooth on touch devices too
    })

    // Connect Lenis scroll to ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Use GSAP ticker for Lenis RAF
    const tickerCallback = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tickerCallback)
    gsap.ticker.lagSmoothing(0) // prevent jumps

    return () => {
      gsap.ticker.remove(tickerCallback)
      lenis.destroy()
    }
  }, [])

  return children
}
```

## Parallax Recipes

### Basic image parallax (most common):
```jsx
// Image moves slower than scroll — creates depth
gsap.to('.parallax-img', {
  yPercent: -15,              // subtle — don't overdo it
  ease: 'none',
  scrollTrigger: {
    trigger: '.parallax-wrapper',
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1,                 // always use smoothed scrub
  }
})
```

**CSS requirement for parallax images:**
```css
.parallax-wrapper {
  overflow: hidden;
  height: 60vh;              /* fixed height container */
}
.parallax-img {
  height: 120%;              /* taller than container for movement room */
  width: 100%;
  object-fit: cover;
  will-change: transform;
}
```

### Multi-layer parallax (hero depth effect):
```jsx
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1,
  }
})
tl.to('.hero-bg', { yPercent: 30, scale: 1.1 }, 0)     // slowest (background)
  .to('.hero-mid', { yPercent: 15 }, 0)                  // medium
  .to('.hero-text', { yPercent: -10, opacity: 0 }, 0)    // fastest (foreground)
```

### Text parallax (subtle vertical shift):
```jsx
gsap.to('.parallax-text', {
  yPercent: -30,
  ease: 'none',
  scrollTrigger: {
    trigger: '.parallax-text',
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1.5,
  }
})
```

## Horizontal Scroll Section

Pin a section and scroll its content horizontally:

```jsx
useGSAP(() => {
  const track = document.querySelector('.horizontal-track')
  const items = gsap.utils.toArray('.horizontal-item')

  // Calculate total scroll distance
  const totalWidth = track.scrollWidth - window.innerWidth

  gsap.to(track, {
    x: -totalWidth,
    ease: 'none',
    scrollTrigger: {
      trigger: '.horizontal-section',
      start: 'top top',
      end: () => `+=${totalWidth}`,
      pin: true,
      scrub: 1,
      anticipatePin: 1,       // prevents jump when pin starts
      invalidateOnRefresh: true,
    }
  })

  // Stagger items as they enter viewport
  items.forEach((item) => {
    gsap.from(item, {
      opacity: 0,
      x: 100,
      scrollTrigger: {
        trigger: item,
        containerAnimation: tl,  // tie to horizontal scroll
        start: 'left 80%',
        toggleActions: 'play none none none',
      }
    })
  })
}, { scope: sectionRef })
```

**HTML structure:**
```jsx
<section ref={sectionRef} className="horizontal-section overflow-hidden">
  <div className="horizontal-track flex gap-8 px-12">
    {items.map(item => (
      <div className="horizontal-item w-[40vw] shrink-0" key={item.id}>
        {/* Card content */}
      </div>
    ))}
  </div>
</section>
```

## Pin + Reveal Patterns

### Stacked cards reveal (cards stack and unstack on scroll):
```jsx
const cards = gsap.utils.toArray('.stack-card')

cards.forEach((card, i) => {
  ScrollTrigger.create({
    trigger: card,
    start: 'top 10%',
    end: 'bottom 10%',
    pin: true,
    pinSpacing: false,        // cards stack without adding space
  })

  // Scale down previous cards as new ones appear
  if (i > 0) {
    gsap.to(cards[i - 1], {
      scale: 0.95,
      opacity: 0.5,
      scrollTrigger: {
        trigger: card,
        start: 'top bottom',
        end: 'top top',
        scrub: 1,
      }
    })
  }
})
```

### Section-by-section snap scrolling:
```jsx
const sections = gsap.utils.toArray('.snap-section')

sections.forEach((section) => {
  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    snap: 1,                  // snap to full section
  })
})
```

## Progress-Based Animations

### Scroll progress bar:
```jsx
gsap.to('.progress-bar', {
  scaleX: 1,
  transformOrigin: 'left center',
  ease: 'none',
  scrollTrigger: {
    trigger: 'body',
    start: 'top top',
    end: 'bottom bottom',
    scrub: 0.3,
  }
})
```

### Element reveal tied to scroll depth:
```jsx
gsap.fromTo('.reveal-mask', {
  clipPath: 'inset(0 100% 0 0)',  // hidden from right
}, {
  clipPath: 'inset(0 0% 0 0)',    // fully visible
  ease: 'none',
  scrollTrigger: {
    trigger: '.reveal-wrapper',
    start: 'top 60%',
    end: 'top 20%',
    scrub: 1,
  }
})
```

## Velocity-Reactive Effects

### Marquee that speeds up with scroll:
```jsx
const marquee = gsap.to('.marquee-inner', {
  xPercent: -50,
  repeat: -1,
  duration: 20,
  ease: 'none',
})

ScrollTrigger.create({
  onUpdate: (self) => {
    const velocity = Math.abs(self.getVelocity())
    const speedMultiplier = 1 + (velocity / 500)
    marquee.timeScale(Math.min(speedMultiplier, 5))  // cap at 5x
    gsap.to(marquee, { timeScale: 1, duration: 1.5 })
  }
})
```

### Text skew on scroll (velocity-based):
```jsx
let currentSkew = 0

ScrollTrigger.create({
  onUpdate: (self) => {
    const velocity = self.getVelocity()
    const skew = gsap.utils.clamp(-5, 5, velocity / 300)
    if (Math.abs(skew - currentSkew) > 0.1) {
      currentSkew = skew
      gsap.to('.skew-text', {
        skewY: skew,
        duration: 0.3,
        ease: 'power2.out',
      })
    }
  }
})
```

## Scroll-Linked Color/Theme Change

```jsx
const sections = gsap.utils.toArray('[data-bg]')

sections.forEach((section) => {
  const bg = section.dataset.bg
  const text = section.dataset.text

  ScrollTrigger.create({
    trigger: section,
    start: 'top 50%',
    end: 'bottom 50%',
    onEnter: () => {
      gsap.to('body', { backgroundColor: bg, color: text, duration: 0.6 })
    },
    onEnterBack: () => {
      gsap.to('body', { backgroundColor: bg, color: text, duration: 0.6 })
    },
  })
})
```

**Usage:**
```jsx
<section data-bg="#0a0a0a" data-text="#ffffff">Dark section</section>
<section data-bg="#f5f0eb" data-text="#1a1a1a">Light section</section>
```

## Performance Checklist for Scroll Animations

- [ ] Always `scrub: 1` or higher — never `scrub: true`
- [ ] `anticipatePin: 1` on pinned sections to prevent jump
- [ ] `invalidateOnRefresh: true` for dynamic-width horizontal scroll
- [ ] Kill parallax on mobile via `ScrollTrigger.matchMedia()`
- [ ] Add `will-change: transform` only during active animations
- [ ] Use `ScrollTrigger.refresh()` after images/fonts load
- [ ] Limit simultaneous scrubbed animations to < 10 on mobile
- [ ] Use `fastScrollEnd: true` on ScrollTrigger for performance
