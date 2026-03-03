import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@utils/gsap-utils'
import SplitType from 'split-type'

const PROJECTS = [
  {
    id: 1,
    category: 'WEBSITE DEVELOPMENT',
    client: 'Alam By Tulsi Patel',
    description:
      'Crafted a visually rich e-commerce Website for a luxury Indian festive wear brand, blending heritage storytelling with intuitive design and seamless navigation.',
    tags: ['SHOPIFY'],
    imageLeft: '/images/wl-p1-left.webp',
    imageRight: '/images/wl-p1-right.webp',
    aspectLeft: '3/4',
    aspectRight: '3/4',
  },
  {
    id: 2,
    category: ['WEBSITE DEVELOPMENT', 'UI/UX STRATEGY', 'GRAPHIC DESIGN'],
    client: '3D Creations',
    description:
      'Designed and developed a dynamic, informative corporate website highlighting their premium wallpapers through immersive visuals and seamless user journeys.',
    tags: ['WORDPRESS', 'BRANDING', 'UI/UX'],
    imageLeft: '/images/wl-p2-left.webp',
    imageRight: '/images/wl-p2-right.webp',
    aspectLeft: '3/4',
    aspectRight: '3/4',
  },
  {
    id: 3,
    category: ['WEBSITE DEVELOPMENT', 'GRAPHIC DESIGN'],
    client: 'Aura Femhealth',
    description:
      'Designed and developed an informative women\'s health platform presenting holistic care services through structured content, and seamless digital flow.',
    tags: ['WORDPRESS', 'BRANDING'],
    imageLeft: '/images/wl-p3-left.webp',
    imageRight: '/images/wl-p3-right.webp',
    aspectLeft: '3/4',
    aspectRight: '3/4',
  },
  {
    id: 4,
    category: ['WEBSITE DEVELOPMENT', 'MARKETING', 'UI/UX STRATEGY'],
    client: 'Nandita Sikchi',
    description:
      'Developed a sophisticated fashion e-commerce platform blending editorial aesthetics, fluid browsing experience, and a streamlined purchase journey.',
    tags: ['SHOPIFY', 'SOCIAL', 'UI/UX'],
    imageLeft: '/images/wl-p4-left.webp',
    imageRight: '/images/wl-p4-right.webp',
    aspectLeft: '3/4',
    aspectRight: '3/4',
  },
  {
    id: 5,
    category: ['WEBSITE DEVELOPMENT'],
    client: 'Consult For Impact',
    description:
      'Built a purpose-driven consultancy platform delivering clear impact insights, showcasing services through structured content and a thoughtful digital experience.',
    tags: ['FRAMER'],
    imageLeft: '/images/wl-p5-left.webp',
    imageRight: '/images/wl-p5-right.webp',
    aspectLeft: '3/4',
    aspectRight: '3/4',
  },
  {
    id: 6,
    category: ['WEBSITE DEVELOPMENT', 'UI/UX STRATEGY'],
    client: 'SKG Foundation',
    description:
      'Created a clean nonprofit website showcasing community work with clear messaging and meaningful engagement touchpoints.',
    tags: ['FRAMER', 'DESIGN'],
    imageLeft: '/images/wl-p6-left.webp',
    imageRight: '/images/wl-p6-right.webp',
    aspectLeft: '3/4',
    aspectRight: '3/4',
  },
  {
    id: 7,
    category: ['WEBSITE DEVELOPMENT'],
    client: 'Taurus Fashion',
    description:
      'Developed a refined fashion retail website presenting contemporary prêt collections with bold identity and seamless browsing flow.',
    tags: ['SHOPIFY'],
    imageLeft: '/images/wl-p7-left.webp',
    imageRight: '/images/wl-p7-right.webp',
    aspectLeft: '3/4',
    aspectRight: '3/4',
  },
  {
    id: 8,
    category: ['WEBSITE DEVELOPMENT', 'GRAPHIC DESIGN'],
    client: 'Young Founders Lab',
    description:
      'Built a purpose-driven platform empowering young entrepreneurs with clear pathways, insightful resources, and engaging community showcases.',
    tags: ['SQUARESPACE', 'BRANDING'],
    imageLeft: '/images/wl-p8-left.webp',
    imageRight: '/images/wl-p8-right.webp',
    aspectLeft: '3/4',
    aspectRight: '3/4',
  },
  {
    id: 9,
    category: ['WEBSITE DEVELOPMENT', 'GRAPHIC DESIGN', 'UI/UX STRATEGY'],
    client: 'XY Percent',
    description:
      'Developed a strategic consultancy website presenting insight-driven services, clear frameworks, and purposeful professional positioning for founder growth.',
    tags: ['FRAMER', 'BRANDING', 'UI/UX'],
    imageLeft: '/images/wl-p9-left.webp',
    imageRight: '/images/wl-p9-right.webp',
    aspectLeft: '3/4',
    aspectRight: '3/4',
  },
  {
    id: 11,
    category: ['WEBSITE DEVELOPMENT'],
    client: 'Precious Chemical',
    description:
      'A clean, professional website built to showcase industrial expertise, product offerings, and brand credibility for a leading chemical solutions company.',
    tags: ['WORDPRESS'],
    imageLeft: '/images/wl-p11-left.webp',
    imageRight: '/images/wl-p11-right.webp',
    aspectLeft: '3/4',
    aspectRight: '3/4',
  },
  {
    id: 10,
    category: ['WEBSITE DEVELOPMENT', 'UI/UX STRATEGY'],
    client: 'Flow Store',
    description:
      'Designed and built an ultra-elegant, minimal Shopify website showcasing curated pieces through clean architecture and a refined purchasing experience.',
    tags: ['SHOPIFY', 'UI/UX'],
    imageLeft: '/images/wl-p10-left.webp',
    imageRight: '/images/wl-p10-right.webp',
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

      {/* Info row — stacked on mobile, 2 cols on desktop (mirrors images row) */}
      <div className="grid grid-cols-1 gap-3 mb-7 md:grid-cols-[28%_1fr] md:gap-[2%] md:mb-7">
        {/* Category */}
        <span
          className="row-category text-[22px] md:text-[24px]"
          style={{
            fontFamily: "'Hanken Grotesk', sans-serif",
            fontWeight: 400,
            letterSpacing: '0.08em',
            color: '#0e0d0d',
            textTransform: 'uppercase',
          }}
        >
          {project.client}
        </span>

        {/* Description + Tags — side by side on desktop, stacked on mobile */}
        <div className="flex flex-col gap-3 md:flex-row md:items-start">
          {/* Description */}
          <p
            className="row-desc md:flex-1"
            style={{
              fontFamily: "'Hanken Grotesk', sans-serif",
              fontWeight: 400,
              fontSize: '20px',
              lineHeight: '28px',
              color: '#0e0d0d',
              margin: 0,
            }}
          >
            {project.description}
          </p>

          {/* Tags */}
          <div className="row-tags flex flex-row items-center md:flex-1 md:justify-end" style={{ gap: 12 }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "'Hanken Grotesk', sans-serif",
                  fontWeight: 400,
                  fontSize: '20px',
                  letterSpacing: '0.06em',
                  color: '#a4a4a4',
                  textTransform: 'uppercase',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
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
    : PROJECTS.filter((p) => Array.isArray(p.category) ? p.category.includes(filter) : p.category === filter)

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
