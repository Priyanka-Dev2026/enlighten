import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/utils/gsap-utils'
import SplitType from 'split-type'
import useSEO from '@/hooks/useSEO'
import CTAButton from '@/components/ui/CTAButton'
import SmoothScroll from '@components/layout/SmoothScroll'
import CustomCursor from '@components/layout/CustomCursor'
import Navbar from '@components/layout/Navbar'
import Footer from '@components/layout/Footer'

const ARTICLE = {
  tag: 'Latest News',
  date: '2026',
  readTime: '5 mins',
  title: 'Proud to Launch: The New Sapana Jain Studio Website',
  image: '/images/insight-sapana-jain.webp',
  intro: 'At Enlighten, we believe design can be a powerful tool for change — not just for big brands, but for grassroots organisations doing vital work in their communities. That\'s why we were proud to partner with Sapana Jain Studio to create a digital home that truly reflects the craft.',
  body: [
    {
      type: 'paragraph',
      text: 'The project came to us through a longstanding relationship built on trust and shared values. When we were introduced to the brief, we immediately saw an opportunity to help amplify a deeply considered creative vision with a website that matched its energy, ambition, and impact.',
    },
    {
      type: 'paragraph',
      text: 'Sapana Jain Studio supports an audience of discerning clients through considered collections, bespoke tailoring, and a commitment to slow fashion. But the existing website no longer reflected the full scope or spirit of the work.',
    },
    {
      type: 'paragraph',
      text: 'We set out to change that. Working closely with the studio team, we delivered a full digital rebuild — creating a space that is refined, welcoming, and effortless to navigate. The new site features:',
    },
    {
      type: 'list',
      items: [
        'A clean, editorial layout with clear paths for clients, press and wholesale enquiries',
        'Full-bleed photography that lets the garments breathe without heavy UI interference',
        'Smooth page transitions and carefully structured information architecture',
        'A flexible CMS setup so the studio team can manage collections and editorials independently',
      ],
    },
  ],
  attribution: {
    name: 'Sapana Jain',
    role: 'Founder, Sapana Jain Studio',
  },
  quote: "This website marks a new chapter for the studio. It's more than a digital upgrade — it's a reflection of our commitment to the clients we serve. We now have a platform that truly tells our story.",
  cta: { label: 'View Project', href: '#' },
}

const RELATED = [
  {
    tag: 'News',
    title: 'Proud to Launch: The New Henry Smith Foundation Website',
    excerpt: 'We partnered with the Henry Smith Foundation to craft a platform that communicates purpose with clarity.',
    image: '/images/insight-henry-smith.webp',
    href: '#',
  },
  {
    tag: 'Awards',
    title: 'We Won a Clutch Award for Top Creative Agency 2024',
    excerpt: 'Recognised among the top creative agencies globally, this Clutch award reflects the dedication our team brings to every project.',
    image: '/images/insights-article-placeholder.webp',
    href: '#',
  },
]

// ─── Hero ────────────────────────────────────────────────────────────────────

function ArticleHero({ article }) {
  const sectionRef = useRef(null)

  useGSAP(() => {
    const heading = new SplitType('.detail-title', { types: 'lines' })
    heading.lines?.forEach((line) => {
      const wrapper = document.createElement('div')
      wrapper.style.overflow = 'hidden'
      wrapper.style.display = 'block'
      line.parentNode.insertBefore(wrapper, line)
      wrapper.appendChild(line)
    })

    gsap.set(heading.lines, { yPercent: 110 })
    gsap.set('.detail-hero-img', { scale: 1.04, opacity: 0 })

    const tl = gsap.timeline({ delay: 0.1 })
    tl.to(heading.lines, { yPercent: 0, duration: 1.1, ease: 'smooth', stagger: 0.07 }, 0)
      .to('.detail-hero-img', { scale: 1, opacity: 1, duration: 1.5, ease: 'smoothOut' }, 0.25)
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="w-full bg-white" data-scroll-section data-theme="light">
      {/* Title */}
      <div className="px-[48px] pt-[140px] pb-[48px] max-lg:px-5 max-lg:pt-[100px] max-lg:pb-8">
        <h1
          className="detail-title"
          style={{
            fontFamily: "'Sentient', serif",
            fontWeight: 300,
            fontSize: 'clamp(32px, 9vw, 98px)',
            lineHeight: 1.08,
            letterSpacing: '-1px',
            color: '#0e0d0d',
            margin: 0,
            maxWidth: '1100px',
          }}
        >
          {article.title}
        </h1>
      </div>

      {/* Full-width image */}
      <div className="w-full overflow-hidden aspect-[2/1] max-lg:aspect-[4/3]">
        <img
          className="detail-hero-img w-full h-full object-cover"
          src={article.image}
          alt={article.title}
        />
      </div>
    </section>
  )
}

// ─── Body ────────────────────────────────────────────────────────────────────

function ArticleBody({ article }) {
  const sectionRef = useRef(null)

  useGSAP(() => {
    const blocks = gsap.utils.toArray('.article-block', sectionRef.current)
    blocks.forEach((block) => {
      gsap.set(block, { opacity: 0, y: 24 })
      let triggered = false
      const onScroll = () => {
        if (triggered) return
        if (block.getBoundingClientRect().top < window.innerHeight * 0.9) {
          triggered = true
          gsap.to(block, { opacity: 1, y: 0, duration: 0.9, ease: 'smoothOut' })
        }
      }
      const lenis = window.__lenis
      if (lenis) lenis.on('scroll', onScroll)
      window.addEventListener('scroll', onScroll, { passive: true })
      onScroll()
      block._cleanup = () => {
        if (window.__lenis) window.__lenis.off('scroll', onScroll)
        window.removeEventListener('scroll', onScroll)
      }
    })
    return () => blocks.forEach((b) => b._cleanup?.())
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="w-full bg-white" data-scroll-section data-theme="light">
      <div className="px-[48px] max-lg:px-5 pt-[64px] max-lg:pt-10">

        {/* Two-column layout: article left + sidebar right */}
        <div className="flex flex-row gap-[64px] max-lg:flex-col max-lg:gap-10">

          {/* ── Left: article content ── */}
          <div className="w-[55%] shrink-0 max-lg:w-full max-lg:order-2">

            {/* Intro */}
            <p
              className="article-block mb-8 max-lg:mb-6"
              style={{
                fontFamily: "'Hanken Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: 'clamp(18px, 2vw, 28px)',
                lineHeight: 1.5,
                color: '#393939',
                letterSpacing: '0.01em',
              }}
            >
              {article.intro}
            </p>

            {/* Body blocks */}
            {article.body.map((block, i) => {
              if (block.type === 'paragraph') {
                return (
                  <p
                    key={i}
                    className="article-block mb-6 max-lg:mb-5"
                    style={{
                      fontFamily: "'Hanken Grotesk', sans-serif",
                      fontWeight: 400,
                      fontSize: 'clamp(15px, 1.3vw, 20px)',
                      lineHeight: 1.7,
                      color: '#0c0c0c',
                      letterSpacing: '0.01em',
                    }}
                  >
                    {block.text}
                  </p>
                )
              }

              if (block.type === 'list') {
                return (
                  <ul
                    key={i}
                    className="article-block mb-6 pl-5 space-y-2 list-disc"
                    style={{
                      fontFamily: "'Hanken Grotesk', sans-serif",
                      fontWeight: 400,
                      fontSize: 'clamp(15px, 1.3vw, 20px)',
                      lineHeight: 1.7,
                      color: '#0c0c0c',
                      letterSpacing: '0.01em',
                    }}
                  >
                    {block.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                )
              }

              return null
            })}

            {/* Attribution */}
            <div className="article-block mt-12 max-lg:mt-10">
              <div className="w-full mb-5" style={{ height: 1, backgroundColor: '#c0c0c0' }} />
              <div className="flex items-center gap-[48px] max-lg:gap-6">
                <span
                  style={{
                    fontFamily: "'Hanken Grotesk', sans-serif",
                    fontWeight: 400,
                    fontSize: 'clamp(14px, 1.2vw, 18px)',
                    color: '#0c0c0c',
                    letterSpacing: '0.01em',
                  }}
                >
                  {article.attribution.name}
                </span>
                <span
                  style={{
                    fontFamily: "'Hanken Grotesk', sans-serif",
                    fontWeight: 400,
                    fontSize: 'clamp(14px, 1.2vw, 18px)',
                    color: '#0c0c0c',
                    letterSpacing: '0.01em',
                  }}
                >
                  {article.attribution.role}
                </span>
              </div>
            </div>

            {/* ── Quote block ── */}
            <div className="article-block mt-[80px] max-lg:mt-14">
              <p
                style={{
                  fontFamily: "'Hanken Grotesk', sans-serif",
                  fontWeight: 600,
                  fontSize: 'clamp(22px, 3.5vw, 52px)',
                  lineHeight: 1.3,
                  color: '#393939',
                  letterSpacing: '0.01em',
                }}
              >
                {article.quote}
              </p>
            </div>

            {/* ── View Project CTA ── */}
            <div className="article-block mt-[48px] max-lg:mt-10 pb-[80px] max-lg:pb-14">
              <CTAButton label={article.cta.label} variant="dark" href={article.cta.href} />
            </div>

          </div>

          {/* ── Right: sidebar ── */}
          <div className="flex-1 min-w-0 max-lg:w-full self-start sticky top-[100px] max-lg:static pb-[48px] max-lg:pb-0 max-lg:order-1">

            {/* Share */}
            <div className="article-block">
              <div className="w-full mb-4" style={{ height: 1, backgroundColor: '#c0c0c0' }} />
              <p
                className="mb-4"
                style={{
                  fontFamily: "'Hanken Grotesk', sans-serif",
                  fontWeight: 400,
                  fontSize: '16px',
                  color: '#0c0c0c',
                  letterSpacing: '0.01em',
                }}
              >
                Share:
              </p>
              <div className="flex items-center gap-3 mb-6">
                {['f', 'in', 'X'].map((label, i) => (
                  <button
                    key={i}
                    className="w-[46px] h-[46px] rounded-full bg-[#eee] flex items-center justify-center hover:bg-[#ddd] transition-colors"
                    style={{
                      fontFamily: "'Hanken Grotesk', sans-serif",
                      fontWeight: 600,
                      fontSize: '13px',
                      color: '#333',
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="w-full mb-6" style={{ height: 1, backgroundColor: '#c0c0c0' }} />
            </div>

            {/* Metadata */}
            <div className="article-block flex gap-[40px] max-lg:gap-8">
              <div className="flex flex-col gap-3">
                <span
                  style={{
                    fontFamily: "'Hanken Grotesk', sans-serif",
                    fontWeight: 600,
                    fontSize: 'clamp(13px, 1vw, 16px)',
                    color: '#0c0c0c',
                  }}
                >
                  Categories:
                </span>
                <span
                  style={{
                    fontFamily: "'Hanken Grotesk', sans-serif",
                    fontWeight: 400,
                    fontSize: 'clamp(13px, 1vw, 16px)',
                    color: '#555',
                  }}
                >
                  {article.tag}
                </span>
              </div>
              <div className="flex flex-col gap-3">
                <span
                  style={{
                    fontFamily: "'Hanken Grotesk', sans-serif",
                    fontWeight: 600,
                    fontSize: 'clamp(13px, 1vw, 16px)',
                    color: '#0c0c0c',
                  }}
                >
                  Read Time:
                </span>
                <span
                  style={{
                    fontFamily: "'Hanken Grotesk', sans-serif",
                    fontWeight: 400,
                    fontSize: 'clamp(13px, 1vw, 16px)',
                    color: '#555',
                  }}
                >
                  {article.readTime}
                </span>
              </div>
              <div className="flex flex-col gap-3">
                <span
                  style={{
                    fontFamily: "'Hanken Grotesk', sans-serif",
                    fontWeight: 600,
                    fontSize: 'clamp(13px, 1vw, 16px)',
                    color: '#0c0c0c',
                  }}
                >
                  Year:
                </span>
                <span
                  style={{
                    fontFamily: "'Hanken Grotesk', sans-serif",
                    fontWeight: 400,
                    fontSize: 'clamp(13px, 1vw, 16px)',
                    color: '#555',
                  }}
                >
                  {article.date}
                </span>
              </div>
            </div>

          </div>
        </div>


      </div>
    </section>
  )
}

// ─── Related Posts ────────────────────────────────────────────────────────────

function RelatedPosts({ posts }) {
  const sectionRef = useRef(null)

  useGSAP(() => {
    const cards = gsap.utils.toArray('.related-card', sectionRef.current)
    cards.forEach((card, i) => {
      gsap.set(card, { opacity: 0, y: 30 })
      let triggered = false
      const onScroll = () => {
        if (triggered) return
        if (card.getBoundingClientRect().top < window.innerHeight * 0.88) {
          triggered = true
          gsap.to(card, { opacity: 1, y: 0, duration: 0.9, delay: i * 0.1, ease: 'smoothOut' })
        }
      }
      const lenis = window.__lenis
      if (lenis) lenis.on('scroll', onScroll)
      window.addEventListener('scroll', onScroll, { passive: true })
      onScroll()
      card._cleanup = () => {
        if (window.__lenis) window.__lenis.off('scroll', onScroll)
        window.removeEventListener('scroll', onScroll)
      }
    })
    return () => cards.forEach((c) => c._cleanup?.())
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="w-full bg-white" data-scroll-section data-theme="light">
      <style>{`
        .related-img-clip { clip-path: inset(10% 0 0 0); transition: clip-path 0.9s cubic-bezier(0.76,0,0.24,1); }
        .related-card:hover .related-img-clip { clip-path: inset(0% 0 0 0); }
        .related-img-scale { transform: scale(1.08); transition: transform 0.9s cubic-bezier(0.76,0,0.24,1); }
        .related-card:hover .related-img-scale { transform: scale(1); }
        .related-ul-out { transform-origin: right center; transform: scaleX(1); transition: transform 0.35s cubic-bezier(0.76,0,0.24,1); }
        .related-card:hover .related-ul-out { transform: scaleX(0); }
        .related-ul-in { transform-origin: left center; transform: scaleX(0); transition: transform 0.35s cubic-bezier(0.76,0,0.24,1) 0.06s; }
        .related-card:hover .related-ul-in { transform: scaleX(1); }
        .related-card + .related-card { border-top: 1px solid #c0c0c0; }
      `}</style>

      {/* "Related Posts" heading */}
      <div className="px-[48px] pt-[48px] max-lg:px-5 max-lg:pt-10">
        <h2
          style={{
            fontFamily: "'Sentient', serif",
            fontWeight: 300,
            fontSize: 'clamp(36px, 5vw, 62px)',
            lineHeight: 1.0,
            letterSpacing: '0.05em',
            color: '#0e0d0d',
            margin: 0,
          }}
        >
          Related Posts
        </h2>
      </div>

      {/* Cards — same style as InsightsList */}
      <div className="mt-10 max-lg:mt-6">
        {posts.map((post, i) => (
          <a
            key={i}
            href={post.href}
            className="related-card group flex flex-row max-lg:flex-col w-full pl-[48px] pb-[48px] max-lg:pl-0 max-lg:pb-0"
          >
            {/* Image */}
            <div className="relative overflow-hidden w-full lg:w-[42%] aspect-[4/3] lg:aspect-auto lg:min-h-[360px] shrink-0">
              <div className="related-img-clip w-full h-full">
                <img
                  src={post.image}
                  alt={post.title}
                  className="related-img-scale w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-between flex-1 px-[48px] py-[40px] max-lg:px-5 max-lg:py-8">
              <div className="flex items-center gap-[10px] mb-6 max-lg:mb-4">
                <span className="w-[7px] h-[7px] rounded-full bg-[#c96b00] shrink-0" />
                <span
                  className="inline-flex items-center backdrop-blur-[2px] bg-[rgba(86,86,86,0.12)] border border-[rgba(0,0,0,0.08)] px-3 py-[5px] rounded-[20px] text-[12px] uppercase tracking-[0.1em] text-[#555]"
                  style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontWeight: 500 }}
                >
                  {post.tag}
                </span>
              </div>

              <div className="flex flex-col gap-4 flex-1">
                <h3
                  className="text-[clamp(22px,2.2vw,34px)] leading-[1.2] tracking-[-0.01em] text-[#080808]"
                  style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontWeight: 400 }}
                >
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p
                    className="text-[clamp(14px,1.1vw,18px)] leading-[1.65] text-[#555]"
                    style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontWeight: 400 }}
                  >
                    {post.excerpt}
                  </p>
                )}
              </div>

              <div className="mt-8 max-lg:mt-6">
                <span
                  className="relative self-start inline-block text-[13px] uppercase tracking-[0.1em] text-[#111]"
                  style={{ fontFamily: "'Hanken Grotesk', sans-serif", fontWeight: 500 }}
                >
                  Read Article →
                  <span className="related-ul-out absolute bottom-[-1px] left-0 h-[1px] w-full bg-[#111]" aria-hidden="true" />
                  <span className="related-ul-in absolute bottom-[-1px] left-0 h-[1px] w-full bg-[#111]" aria-hidden="true" />
                </span>
              </div>
            </div>
          </a>
        ))}

        {/* Bottom divider */}
        <div className="w-full mt-[48px] max-lg:mt-0" style={{ height: 1, backgroundColor: '#c0c0c0' }} />
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function InsightDetailPage() {
  useSEO({
    title: ARTICLE.title,
    description: ARTICLE.intro,
  })

  return (
    <SmoothScroll autoStart>
      <CustomCursor />
      <Navbar variant="dark" />
      <main id="main-content" style={{ backgroundColor: '#ffffff' }}>
        <ArticleHero article={ARTICLE} />
        <ArticleBody article={ARTICLE} />
        <RelatedPosts posts={RELATED} />
      </main>
      <Footer />
    </SmoothScroll>
  )
}
