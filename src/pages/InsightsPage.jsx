import useSEO from '@/hooks/useSEO'
import SmoothScroll from '@components/layout/SmoothScroll'
import CustomCursor from '@components/layout/CustomCursor'
import Navbar from '@components/layout/Navbar'
import Footer from '@components/layout/Footer'
import InsightsHero from '@components/sections/InsightsHero'
import InsightsList from '@components/sections/InsightsList'
import { CASE_STUDIES } from '@/data/caseStudies'

const FEATURED_POST = {
  title: CASE_STUDIES[0].title,
  image: CASE_STUDIES[0].image,
  href: `/insights/${CASE_STUDIES[0].slug}`,
}

const POSTS = [
  ...CASE_STUDIES.filter((cs) => cs.slug !== FEATURED_POST.href.split('/').pop()).map((cs) => ({
    tag: cs.tag.toUpperCase(),
    title: cs.title,
    excerpt: cs.intro,
    image: cs.image,
    href: `/insights/${cs.slug}`,
  })),
]

export default function InsightsPage() {
  useSEO({
    title: 'Insights',
    description: 'News, stories, and insights from the Enlighten team.',
  })

  return (
    <SmoothScroll autoStart>
      <CustomCursor />
      <Navbar variant="dark" />
      <main id="main-content" style={{ backgroundColor: '#ffffff' }}>
        <InsightsHero featuredPost={FEATURED_POST} />
        <InsightsList posts={POSTS} />
      </main>
      <Footer />
    </SmoothScroll>
  )
}
