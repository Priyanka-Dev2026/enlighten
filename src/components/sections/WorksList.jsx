import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@utils/gsap-utils'
import SplitType from 'split-type'

const PROJECTS = [
  {
    id: 1,
    category: 'WEBSITES',
    client: 'Alam By Tulsi Patel',
    description:
      'Alam by Tulsi Patel is a brand born from a vision to celebrate the beauty of India\'s rich textile heritage. Rooted in Gujarati traditions, each piece showcases the timeless artistry of marodi embroidery - brought to life through high-end, sustainable festive wear.',
    tags: ['WEBFLOW', 'UI/UX'],
    date: '10/24',
    imageLeft: '/images/wl-p1-left.webp',
    imageRight: '/images/wl-p1-right.webp',
    aspectLeft: '3/4',
    aspectRight: '3/4',
  },
  {
    id: 2,
    category: 'BRANDING',
    client: '3D Creations',
    description:
      'A thoughtful brand identity crafted for a creative professional — minimal, elegant, and unmistakably personal.',
    tags: ['BRANDING', 'IDENTITY'],
    date: '09/24',
    imageLeft: '/images/wl-p2-left.webp',
    imageRight: '/images/wl-p2-right.webp',
    aspectLeft: '3/4',
    aspectRight: '3/4',
  },
  {
    id: 3,
    category: 'WEBSITES',
    client: 'Aura Femhealth',
    description:
      'A bold e-commerce experience designed around community and craft — seamless checkout meets editorial storytelling.',
    tags: ['SHOPIFY', 'UI/UX'],
    date: '08/24',
    imageLeft: '/images/wl-p3-left.webp',
    imageRight: '/images/wl-p3-right.webp',
    aspectLeft: '3/4',
    aspectRight: '3/4',
  },
  {
    id: 4,
    category: 'UI/UX',
    client: 'Nandita Sikchi',
    description:
      'An artist portfolio that puts the work front and centre — immersive imagery, fluid navigation, zero distractions.',
    tags: ['FIGMA', 'REACT'],
    date: '07/24',
    imageLeft: '/images/wl-p4-left.webp',
    imageRight: '/images/wl-p4-right.webp',
    aspectLeft: '3/4',
    aspectRight: '3/4',
  },
  {
    id: 5,
    category: 'WEBSITES',
    client: 'Consult For Impact',
    description:
      'A wellness brand brought to life online — warm, inviting, and designed to convert curious visitors into loyal clients.',
    tags: ['WORDPRESS', 'UI/UX'],
    date: '06/24',
    imageLeft: '/images/wl-p5-left.webp',
    imageRight: '/images/wl-p5-right.webp',
    aspectLeft: '3/4',
    aspectRight: '3/4',
  },
  {
    id: 6,
    category: 'SOCIAL',
    client: 'SKG Foundation',
    description:
      'A fintech platform that makes complex finance feel accessible — dark, confident, and built for sophisticated users.',
    tags: ['REACT', 'DESIGN'],
    date: '05/24',
    imageLeft: '/images/wl-p6-left.webp',
    imageRight: '/images/wl-p6-right.webp',
    aspectLeft: '3/4',
    aspectRight: '3/4',
  },
  {
    id: 7,
    category: 'BRANDING',
    client: 'Tarus Fashion',
    description:
      'A travel content brand that needed presence as rich as its stories — a visual identity built for the scroll-first world.',
    tags: ['BRANDING', 'SOCIAL'],
    date: '04/24',
    imageLeft: '/images/wl-p7-left.webp',
    imageRight: '/images/wl-p7-right.webp',
    aspectLeft: '3/4',
    aspectRight: '3/4',
  },
]

function ProjectRow({ project, index }) {
  const rowRef = useRef(null)

  useGSAP(() => {
    const divider = rowRef.current.querySelector('.row-divider')
    const categoryEl = rowRef.current.querySelector('.row-category')
    const descEl = rowRef.current.querySelector('.row-desc')
    const tagsEl = rowRef.current.querySelector('.row-tags')
    const leftImg = rowRef.current.querySelector('.row-img-left')
    const rightImg = rowRef.current.querySelector('.row-img-right')

    // ── Split text into lines ──────────────────────────────────────────
    const wrapLines = (split) => {
      split.lines?.forEach((line) => {
        const wrapper = document.createElement('div')
        wrapper.style.overflow = 'hidden'
        wrapper.style.display = 'block'
        line.parentNode.insertBefore(wrapper, line)
        wrapper.appendChild(line)
      })
    }

    const catSplit = new SplitType(categoryEl, { types: 'lines' })
    wrapLines(catSplit)

    const descSplit = new SplitType(descEl, { types: 'lines' })
    wrapLines(descSplit)

    // ── Initial states ─────────────────────────────────────────────────
    gsap.set(divider, { scaleX: 0, transformOrigin: 'left center' })
    gsap.set(catSplit.lines, { yPercent: 110 })
    gsap.set(descSplit.lines, { yPercent: 110 })
    gsap.set(tagsEl, { opacity: 0, y: 12 })
    // Both images slide up from bottom
    gsap.set(leftImg, { y: 80, opacity: 0 })
    gsap.set(rightImg, { y: 80, opacity: 0 })

    // ── Timeline ───────────────────────────────────────────────────────
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: rowRef.current,
        start: 'top 82%',
        toggleActions: 'play none none none',
      },
    })

    tl.to(divider, { scaleX: 1, duration: 0.5, ease: 'smoothOut' })
      .to(catSplit.lines, { yPercent: 0, duration: 0.45, ease: 'smooth' }, '-=0.25')
      .to(descSplit.lines, { yPercent: 0, duration: 0.6, ease: 'smooth', stagger: 0.04 }, '-=0.3')
      .to(tagsEl, { opacity: 1, y: 0, duration: 0.4, ease: 'smoothOut' }, '-=0.4')
      .to(leftImg, { y: 0, opacity: 1, duration: 0.75, ease: 'smoothOut' }, '-=0.35')
      .to(rightImg, { y: 0, opacity: 1, duration: 0.75, ease: 'smoothOut' }, '-=0.6')
  }, { scope: rowRef })

  return (
    <div ref={rowRef} className="project-row" style={{ paddingBottom: 64 }} data-cursor-hover>

      {/* Divider */}
      <div
        className="row-divider"
        style={{ height: 1, backgroundColor: '#c0c0c0', marginBottom: 32 }}
      />

      {/* Info row — stacked on mobile, 3 cols on desktop */}
      <div className="grid grid-cols-1 gap-3 mb-7 md:grid-cols-[28%_1fr_20%] md:gap-[2%] md:mb-7">
        {/* Category */}
        <span
          className="row-category"
          style={{
            fontFamily: "'Hanken Grotesk', sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(11px, 1vw, 16px)',
            letterSpacing: '0.08em',
            color: '#0e0d0d',
            textTransform: 'uppercase',
          }}
        >
          {project.client}
        </span>

        {/* Description */}
        <p
          className="row-desc"
          style={{
            fontFamily: "'Hanken Grotesk', sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(14px, 1.2vw, 20px)',
            lineHeight: '1.5',
            color: '#0e0d0d',
            margin: 0,
          }}
        >
          {project.description}
        </p>

        {/* Tags + date */}
        <div className="row-tags flex flex-row items-center justify-between md:flex-col md:items-end" style={{ gap: 6 }}>
          <div className="flex items-center" style={{ gap: 12 }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "'Hanken Grotesk', sans-serif",
                  fontWeight: 400,
                  fontSize: 'clamp(11px, 1vw, 16px)',
                  letterSpacing: '0.06em',
                  color: '#a4a4a4',
                  textTransform: 'uppercase',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <span
            style={{
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontWeight: 400,
              fontSize: 'clamp(11px, 0.9vw, 15px)',
              color: '#a4a4a4',
              letterSpacing: '0.04em',
            }}
          >
            {project.date}
          </span>
        </div>
      </div>

      {/* Images — stacked on mobile, side by side on desktop (aligned with description column) */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-[28%_1fr] md:gap-[2%]">
        {/* Spacer — desktop only */}
        <div className="hidden md:block" />

        {/* Images: stacked on mobile, side by side on desktop */}
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="row-img-left overflow-hidden flex-1">
            <img
              src={project.imageLeft}
              alt={`${project.client} — project preview`}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
          <div className="row-img-right overflow-hidden flex-1">
            <img
              src={project.imageRight}
              alt={`${project.client} — detail view`}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function WorksList({ filter }) {
  const sectionRef = useRef(null)

  const filtered = filter === 'ALL'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === filter)

  return (
    <section
      ref={sectionRef}
      style={{ backgroundColor: '#ffffff' }}
      className="w-full px-5 md:px-[48px]"
      data-scroll-section
      aria-label="Project portfolio"
    >
      <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {filtered.map((project, i) => (
          <li key={project.id}>
            <ProjectRow project={project} index={i} />
          </li>
        ))}
      </ol>
    </section>
  )
}
