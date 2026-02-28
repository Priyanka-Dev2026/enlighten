# CLAUDE.md — Agency Portfolio (Awwwards-Style)

## Project Overview

This is a premium, Awwwards-quality portfolio website for a creative agency. Built with React + Vite, GSAP for animations, Lenis for smooth scrolling, and Tailwind CSS for styling. Every interaction, transition, and scroll effect must feel intentional, polished, and worthy of an Awwwards site of the day nomination.

## Tech Stack

- **Framework:** React 18+ (Vite)
- **Animation:** GSAP 3.12+ with ScrollTrigger, CustomEase
- **Smooth Scroll:** Lenis (`lenis`)
- **Text Splitting:** `split-type` (free) or GSAP SplitText (Club)
- **Styling:** Tailwind CSS 4
- **Fonts:** Custom WOFF2 fonts (loaded via @font-face)

## Architecture & Conventions

### File Structure
- `src/components/sections/` — Full page sections (Hero, About, Work, etc.)
- `src/components/ui/` — Reusable animated micro-components
- `src/components/layout/` — Navbar, Footer, Cursor, Preloader, SmoothScroll wrapper
- `src/components/animations/` — Animation hooks and utilities
- `src/hooks/` — Custom React hooks
- `src/utils/` — GSAP registration, constants, helpers
- `src/styles/` — Global CSS, font declarations, CSS animations

### Naming Conventions
- Components: PascalCase (`HeroSection.jsx`)
- Hooks: camelCase with `use` prefix (`useMousePosition.js`)
- Utils: camelCase (`gsap-utils.js`)
- CSS classes: Tailwind utilities + custom classes with BEM for complex components

### Component Pattern
Every section component follows this structure:

```jsx
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/utils/gsap-utils'

export default function SectionName() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    // All GSAP animations here
    // ScrollTrigger instances are auto-cleaned by useGSAP
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="section-name" data-scroll-section>
      {/* Content */}
    </section>
  )
}
```

## GSAP Rules (CRITICAL)

### Do's
- **Always** use `useGSAP()` hook from `@gsap/react` — never raw `useEffect` for GSAP
- **Always** pass `{ scope: containerRef }` to `useGSAP` for automatic selector scoping
- **Always** use `gsap.context()` if you must use `useEffect` (legacy code only)
- **Always** register plugins in `gsap-utils.js` once, import from there
- **Always** use CSS `will-change: transform` only on elements actively being animated
- **Always** animate `transform` and `opacity` only (GPU composited properties)
- **Always** use `ScrollTrigger.refresh()` after dynamic content loads
- **Always** use `gsap.set()` for initial states instead of CSS (prevents flash)

### Don'ts
- **Never** use `useEffect` + manual `gsap.context().revert()` — use `useGSAP` instead
- **Never** register GSAP plugins inside components — do it once in `gsap-utils.js`
- **Never** animate `width`, `height`, `top`, `left` — use `transform` equivalents
- **Never** create ScrollTrigger instances outside of `useGSAP` or `gsap.context()`
- **Never** forget to handle resize — use `ScrollTrigger.matchMedia()` for responsive
- **Never** use `querySelector` inside components — use refs or GSAP's scoped selectors

### Animation Quality Standards
- Easing: Use custom eases (`smooth`, `smoothOut`) — never default `power1`
- Duration: 0.8s–1.8s for reveals, 0.3s–0.5s for hover micro-interactions
- Stagger: 0.02s–0.05s for text characters, 0.05s–0.15s for elements
- ScrollTrigger scrub: Use `scrub: 1` (smoothed) not `scrub: true` (jerky)
- Parallax: Subtle (10-30% speed difference), never extreme
- Text reveals: Split by lines → animate each line, use `overflow: hidden` on wrapper

## Design Standards

### Typography
- Use premium variable fonts (Clash Display, Satoshi, Neue Montreal, etc.)
- Display headings: 8vw–15vw on desktop, large and impactful
- Body: 16px–18px, 1.5–1.7 line height
- Letter spacing: Tight on headings (-0.02em to -0.05em), normal on body

### Colors
- Commit to a strong palette — dark mode preferred for Awwwards style
- Use CSS custom properties for all colors
- High contrast between text and background
- Accent color used sparingly for maximum impact

### Layout
- Full viewport sections (`min-h-screen` or `100vh`)
- Generous whitespace — let content breathe
- Asymmetric layouts for visual interest
- Grid-breaking elements for dynamic composition
- Max-width containers: 1400px–1600px

### Micro-interactions
- Custom cursor that reacts to hoverable elements (scale, blend mode)
- Magnetic buttons (elements subtly follow cursor on hover)
- Image reveals on hover (clip-path or mask animations)
- Smooth color transitions on section changes
- Parallax on images during scroll

## Responsive Strategy

Use `ScrollTrigger.matchMedia()` for responsive animations:

```js
ScrollTrigger.matchMedia({
  "(min-width: 1024px)": function() {
    // Desktop animations (full parallax, complex staggers)
  },
  "(max-width: 1023px)": function() {
    // Tablet/mobile (simplified animations, no parallax)
  },
})
```

- Desktop: Full animation experience
- Tablet: Reduced parallax, simpler staggers
- Mobile: Fade-in only, no horizontal scroll, no parallax, no custom cursor

## Performance Budget

- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Total JS bundle: < 200KB gzipped
- Fonts: < 150KB total (subset if needed)
- Images: WebP/AVIF, lazy loaded below fold
- Target: Consistent 60fps during all animations

## Lenis Smooth Scroll Setup

```jsx
// SmoothScroll.jsx wrapper
import Lenis from 'lenis'
import { useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/utils/gsap-utils'

export default function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])

  return children
}
```

## When Building a New Section

1. Read the relevant skill in `.claude/skills/`
2. Check the Figma reference/screenshot for layout
3. Build the HTML structure first with Tailwind
4. Add `useGSAP` hook with all animations
5. Wire ScrollTrigger for scroll-based effects
6. Add responsive handling via `matchMedia`
7. Test at 60fps — optimize if needed
8. Add hover micro-interactions last

## Custom Skills Available

- `.claude/skills/gsap-animations/SKILL.md` — GSAP patterns, ScrollTrigger, timelines
- `.claude/skills/section-builder/SKILL.md` — Section architecture and responsive patterns
- `.claude/skills/scroll-animations/SKILL.md` — Scroll-driven animation recipes

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run preview` — Preview production build
