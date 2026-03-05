import useSEO from '@/hooks/useSEO'
import SmoothScroll from '@components/layout/SmoothScroll'
import CustomCursor from '@components/layout/CustomCursor'
import Navbar from '@components/layout/Navbar'
import Footer from '@components/layout/Footer'
import InsightsHero from '@components/sections/InsightsHero'
import InsightsList from '@components/sections/InsightsList'

const FEATURED_POST = {
  title: 'Proud to Launch: The New Sapana Jain Studio Website',
  image: '/images/insights-hero.webp',
  href: '#',
}

const POSTS = [
  {
    tag: 'NEWS',
    title: 'Proud to Launch: The New Sapana Jain Studio Website',
    excerpt: 'A refined digital home for the Sapana Jain Studio — blending editorial elegance with seamless e-commerce, built to reflect the brand\'s quiet luxury.',
    image: '/images/insight-sapana-jain.webp',
    href: '/insights/sapana-jain-studio',
  },
  {
    tag: 'NEWS',
    title: 'Proud to Launch: The New Henry Smith Foundation Website',
    excerpt: 'We partnered with the Henry Smith Foundation to craft a platform that communicates purpose with clarity — a developer-first build on a fully serverless infrastructure.',
    image: '/images/insight-henry-smith.webp',
    href: '#',
  },
  {
    tag: 'NEWS',
    title: 'Proud to Launch: The New Sapana Jain Studio Website',
    excerpt: 'A refined digital home for the Sapana Jain Studio — blending editorial elegance with seamless e-commerce, built to reflect the brand\'s quiet luxury.',
    image: '/images/insights-article-placeholder.webp',
    href: '#',
  },
  {
    tag: 'AWARDS',
    title: 'We Won a Clutch Award for Top Creative Agency 2024',
    excerpt: 'Recognised among the top creative agencies globally, this Clutch award reflects the dedication our team brings to every project — from strategy through to launch.',
    image: '/images/insights-article-placeholder.webp',
    href: '#',
  },
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
