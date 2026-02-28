---
name: section-builder
description: Build premium Awwwards-quality page sections for the agency portfolio. Use this skill when creating any new section component (Hero, About, Work, Services, Team, Contact, Testimonials, etc.) or when the user provides a Figma screenshot/description of a section to implement. Covers section component architecture, responsive layout patterns, content structure, and integration with GSAP animations and ScrollTrigger. Trigger on requests to "build a section", "create the [X] section", "implement this Figma design", or any section-level component work.
---

# Section Builder — Awwwards Portfolio

## Section Component Template

Every section follows this exact pattern:

```jsx
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/utils/gsap-utils'
import SplitType from 'split-type'

export default function SectionName() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    // 1. Text splitting (if needed)
    const headingText = new SplitType('.section-heading', { types: 'lines' })

    // 2. Wrap lines in overflow-hidden
    headingText.lines?.forEach(line => {
      const wrapper = document.createElement('div')
      wrapper.style.overflow = 'hidden'
      wrapper.style.display = 'block'
      line.parentNode.insertBefore(wrapper, line)
      wrapper.appendChild(line)
    })

    // 3. Set initial states
    gsap.set(headingText.lines, { yPercent: 110 })

    // 4. Build timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      }
    })

    tl.to(headingText.lines, {
      yPercent: 0,
      duration: 1.2,
      ease: 'smooth',
      stagger: 0.08,
    })

    // 5. Responsive handling
    ScrollTrigger.matchMedia({
      '(max-width: 1023px)': () => {
        // Simplified mobile animations
      }
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
      data-scroll-section
    >
      <div className="container mx-auto px-6 lg:px-12 py-24 lg:py-32">
        {/* Section content */}
      </div>
    </section>
  )
}
```

## Section Layout Patterns

### Full-width hero with centered content:
```jsx
<section className="relative h-screen flex items-center justify-center overflow-hidden">
  <div className="absolute inset-0 z-0">
    {/* Background image/video with parallax */}
  </div>
  <div className="relative z-10 text-center max-w-[90vw]">
    <h1 className="text-[12vw] lg:text-[10vw] font-bold leading-[0.9] tracking-tighter">
      {/* Split text heading */}
    </h1>
  </div>
</section>
```

### Two-column asymmetric (text left, media right):
```jsx
<section className="min-h-screen py-24 lg:py-32">
  <div className="container mx-auto px-6 lg:px-12">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
      <div className="lg:col-span-5">
        {/* Text content — heading, body, CTA */}
      </div>
      <div className="lg:col-span-6 lg:col-start-7">
        {/* Image/media with reveal animation */}
      </div>
    </div>
  </div>
</section>
```

### Horizontal scroll gallery (pinned):
```jsx
<section className="horizontal-scroll overflow-hidden">
  <div className="flex gap-8 pin-wrapper" style={{ width: `${items.length * 40}vw` }}>
    {items.map(item => (
      <div key={item.id} className="w-[35vw] shrink-0">
        {/* Card content */}
      </div>
    ))}
  </div>
</section>
```

### Full-width image break between sections:
```jsx
<section className="relative h-[70vh] overflow-hidden">
  <div className="absolute inset-0">
    <img
      className="parallax-image w-full h-[120%] object-cover"
      src={image}
      alt=""
    />
  </div>
  <div className="absolute inset-0 bg-black/30" />
  <div className="relative z-10 flex items-center justify-center h-full">
    <p className="text-[5vw] text-white font-bold">Quote or statement</p>
  </div>
</section>
```

### Stats/numbers row:
```jsx
<div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-16 border-t border-white/10">
  {stats.map((stat, i) => (
    <div key={i} className="stat-item">
      <span className="counter text-[4vw] lg:text-[3vw] font-bold block">
        {stat.value}
      </span>
      <span className="text-sm uppercase tracking-widest opacity-50 mt-2 block">
        {stat.label}
      </span>
    </div>
  ))}
</div>
```

## Section-Specific Guidance

### Hero
- Full viewport height, centered or left-aligned heading
- Text: 8vw–15vw, tightest tracking, boldest weight
- Entrance: text line reveal + subtitle fade + CTA scale
- Scroll indicator at bottom (animated bouncing arrow or "scroll" text)
- Optional: preloader wipe that reveals the hero

### Work/Portfolio Grid
- Masonry or uniform grid of project thumbnails
- Hover: image scale + overlay with project name + cursor change
- Click: page transition to case study
- Use `ScrollTrigger.batch()` for staggered reveal on scroll
- Each card: image with clip-path reveal or scale-up

### About
- Large statement text (split into lines, revealed on scroll)
- Team photos or agency image with parallax
- Stats counter that counts up when scrolled into view

### Services
- Accordion or expandable list with GSAP height animation
- OR horizontal scroll-through of service cards
- Each service: icon + title + description with staggered reveal

### Testimonials
- Carousel with GSAP-powered slide transitions
- Large quote text with character reveal
- Client logo/avatar fades in after quote

### Contact
- Split layout: form left, info right (or vice versa)
- Form fields animate in sequentially
- Submit button: magnetic hover effect
- Background: subtle gradient shift or grain texture

## Responsive Rules

- **Desktop (1024+):** Full animation experience, complex layouts, parallax
- **Tablet (768–1023):** Simplified animations, single-column where needed, reduced parallax
- **Mobile (< 768):** Fade-in only, no parallax, no custom cursor, no horizontal scroll, stack everything vertical

```jsx
// In every section's useGSAP:
ScrollTrigger.matchMedia({
  '(min-width: 1024px)': () => {
    // Full desktop animations
  },
  '(min-width: 768px) and (max-width: 1023px)': () => {
    // Tablet: reduced motion
  },
  '(max-width: 767px)': () => {
    // Mobile: simple fades only
    gsap.from('.fade-mobile', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      scrollTrigger: { trigger: '.fade-mobile', start: 'top 85%' }
    })
  },
})
```

## When User Provides a Figma Screenshot

1. Analyze the visual hierarchy: what's largest? what draws the eye?
2. Identify the grid/layout structure
3. Note all typography sizes, weights, spacing
4. Identify color usage and contrast
5. Ask about animations if not described
6. Build mobile-first, enhance for desktop
7. Match the Figma pixel-perfectly on desktop, adapt thoughtfully on mobile
