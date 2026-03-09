import { useEffect } from 'react'

function setMeta(selector, attr, value) {
  if (!value) return
  let tag = document.querySelector(selector)
  if (tag) tag.setAttribute(attr, value)
}

/**
 * Updates document.title, meta description, Open Graph, and Twitter Card tags.
 * Call at the top of each page component.
 */
export default function useSEO({ title, description, image, url }) {
  useEffect(() => {
    const fullTitle = title ? `${title} — Enlighten Creatives` : null
    const pageUrl = url || window.location.href
    const ogImage = image || '/images/og-image.jpg'

    if (fullTitle) document.title = fullTitle

    setMeta('meta[name="description"]', 'content', description)

    // Open Graph
    setMeta('meta[property="og:title"]', 'content', fullTitle)
    setMeta('meta[property="og:description"]', 'content', description)
    setMeta('meta[property="og:image"]', 'content', ogImage)
    setMeta('meta[property="og:url"]', 'content', pageUrl)

    // Twitter Card
    setMeta('meta[name="twitter:title"]', 'content', fullTitle)
    setMeta('meta[name="twitter:description"]', 'content', description)
    setMeta('meta[name="twitter:image"]', 'content', ogImage)
  }, [title, description, image, url])
}
