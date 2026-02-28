---
name: gsap-animations
description: GSAP animation patterns for React. Use this skill whenever building or modifying components that use GSAP animations, ScrollTrigger, timelines, text reveals, parallax, or any motion design. Covers useGSAP hook patterns, timeline orchestration, ScrollTrigger configuration, text splitting animations, page transitions, and performance optimization. Trigger on any mention of GSAP, animation, motion, transition, reveal, parallax, or scroll-driven effects in the portfolio project.
---

# GSAP Animation Patterns for React

## Core Hook Pattern

Always use `@gsap/react` — never raw `useEffect`:

```jsx
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/utils/gsap-utils'

function Component() {
  const container = useRef(null)

  useGSAP(() => {
    // Scoped selectors — ".box" only matches inside container
    gsap.from('.box', {
      y: 100,
      opacity: 0,
      stagger: 0.05,
      scrollTrigger: {
        trigger: '.box-wrapper',
        start: 'top 80%',
      }
    })
  }, { scope: container })

  return <div ref={container}>...</div>
}
```

## Timeline Orchestration

For coordinated multi-element animations (hero entrances, section reveals):

```jsx
useGSAP(() => {
  const tl = gsap.timeline({
    defaults: { ease: 'smooth', duration: 1.2 },
    scrollTrigger: {
      trigger: sectionRef.current,
      start: 'top 75%',
      toggleActions: 'play none none none', // play once
    }
  })

  tl.from('.heading-line', {
    yPercent: 110,
    rotateX: -80,
    stagger: 0.08,
    duration: 1.4,
  })
  .from('.subtitle', { opacity: 0, y: 30 }, '-=0.6')  // overlap
  .from('.cta', { scale: 0, ease: 'elastic.out(1, 0.5)' }, '-=0.4')
}, { scope: sectionRef })
```

### Timeline Position Tips
- `'-=0.5'` — start 0.5s before previous ends (overlap)
- `'+=0.2'` — start 0.2s after previous ends (gap)
- `'<'` — start at same time as previous
- `'<0.1'` — start 0.1s after previous starts

## Text Reveal Animations

Line-by-line reveal (most common Awwwards pattern):

```jsx
import SplitType from 'split-type'

useGSAP(() => {
  const text = new SplitType('.reveal-text', { types: 'lines' })

  // Wrap each line in overflow-hidden container
  text.lines.forEach(line => {
    const wrapper = document.createElement('div')
    wrapper.style.overflow = 'hidden'
    line.parentNode.insertBefore(wrapper, line)
    wrapper.appendChild(line)
  })

  gsap.from(text.lines, {
    yPercent: 110,
    duration: 1.2,
    ease: 'smooth',
    stagger: 0.08,
    scrollTrigger: {
      trigger: '.reveal-text',
      start: 'top 80%',
    }
  })
}, { scope: container })
```

### Character-by-character stagger:
```jsx
const text = new SplitType('.char-reveal', { types: 'chars' })
gsap.from(text.chars, {
  yPercent: 100,
  opacity: 0,
  rotateX: -90,
  stagger: 0.02,
  duration: 0.8,
  ease: 'smoothOut',
})
```

### Word-by-word fade:
```jsx
const text = new SplitType('.word-reveal', { types: 'words' })
gsap.from(text.words, {
  opacity: 0,
  y: 20,
  filter: 'blur(10px)',
  stagger: 0.04,
  duration: 0.6,
})
```

## ScrollTrigger Patterns

### Basic scroll-triggered reveal:
```jsx
gsap.from('.element', {
  y: 60,
  opacity: 0,
  duration: 1,
  ease: 'smoothOut',
  scrollTrigger: {
    trigger: '.element',
    start: 'top 85%',        // element top hits 85% of viewport
    toggleActions: 'play none none none',
  }
})
```

### Parallax effect (scrubbed):
```jsx
gsap.to('.parallax-image', {
  yPercent: -20,
  ease: 'none',
  scrollTrigger: {
    trigger: '.parallax-wrapper',
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1,               // 1 = smoothed scrub (important!)
  }
})
```

### Pin section during animation:
```jsx
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.pinned-section',
    start: 'top top',
    end: '+=300%',           // 3x viewport height of scroll
    pin: true,
    scrub: 1,
  }
})
tl.to('.panel-1', { xPercent: -100 })
  .to('.panel-2', { xPercent: -100 })
```

### Batch animations (for grids/lists):
```jsx
ScrollTrigger.batch('.grid-item', {
  onEnter: (elements) => {
    gsap.from(elements, {
      y: 60,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: 'smoothOut',
    })
  },
  start: 'top 90%',
})
```

### Responsive animations:
```jsx
ScrollTrigger.matchMedia({
  '(min-width: 1024px)': () => {
    // Desktop: full parallax
    gsap.to('.hero-image', {
      yPercent: -30,
      scrollTrigger: { trigger: '.hero', scrub: 1 }
    })
  },
  '(max-width: 1023px)': () => {
    // Mobile: simple fade only
    gsap.from('.hero-image', {
      opacity: 0,
      scrollTrigger: { trigger: '.hero', start: 'top 80%' }
    })
  },
})
```

## Common Awwwards Animation Recipes

### Magnetic Button:
```jsx
function MagneticButton({ children }) {
  const btnRef = useRef(null)

  useGSAP(() => {
    const btn = btnRef.current
    const handleMove = (e) => {
      const { left, top, width, height } = btn.getBoundingClientRect()
      const x = (e.clientX - left - width / 2) * 0.3
      const y = (e.clientY - top - height / 2) * 0.3
      gsap.to(btn, { x, y, duration: 0.4, ease: 'power2.out' })
    }
    const handleLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' })
    }
    btn.addEventListener('mousemove', handleMove)
    btn.addEventListener('mouseleave', handleLeave)
  }, { scope: btnRef })

  return <button ref={btnRef}>{children}</button>
}
```

### Infinite Marquee:
```jsx
useGSAP(() => {
  const marquee = gsap.to('.marquee-track', {
    xPercent: -50,
    repeat: -1,
    duration: 20,
    ease: 'none',
  })
  // Speed up on scroll
  ScrollTrigger.create({
    trigger: '.marquee-wrapper',
    onUpdate: (self) => {
      marquee.timeScale(1 + Math.abs(self.getVelocity() / 500))
      gsap.to(marquee, { timeScale: 1, duration: 0.8 })
    }
  })
})
```

### Image reveal (clip-path):
```jsx
gsap.from('.image-reveal', {
  clipPath: 'inset(100% 0% 0% 0%)',  // hidden from bottom
  duration: 1.4,
  ease: 'smooth',
  scrollTrigger: {
    trigger: '.image-reveal',
    start: 'top 80%',
  }
})
```

### Counter animation:
```jsx
gsap.from('.counter', {
  textContent: 0,
  duration: 2,
  ease: 'power1.out',
  snap: { textContent: 1 },
  scrollTrigger: { trigger: '.counter', start: 'top 85%' }
})
```

## Initial States

Always use `gsap.set()` instead of CSS for animation starting states to prevent FOUC:

```jsx
useGSAP(() => {
  // Set initial states
  gsap.set('.heading-line', { yPercent: 110 })
  gsap.set('.fade-element', { opacity: 0, y: 40 })

  // Then animate
  const tl = gsap.timeline({ delay: 0.3 })
  tl.to('.heading-line', { yPercent: 0, stagger: 0.08 })
    .to('.fade-element', { opacity: 1, y: 0 }, '-=0.5')
}, { scope: container })
```

## Performance Rules

1. **Only animate `transform` and `opacity`** — these are GPU-composited
2. **Use `scrub: 1`** not `scrub: true` — smoothed scrub prevents stutter
3. **Use `will-change: transform`** only on elements about to animate, remove after
4. **Use `force3D: true`** (GSAP default) to promote to GPU layer
5. **Avoid `filter` animations on mobile** — blur/brightness are expensive
6. **Use `ScrollTrigger.batch()`** instead of individual triggers for repeated items
7. **Call `ScrollTrigger.refresh()`** after images load or DOM changes
8. **Test with Chrome DevTools Performance tab** — target 60fps consistently
