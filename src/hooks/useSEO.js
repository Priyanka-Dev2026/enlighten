import { useEffect } from 'react'

/**
 * Updates document.title and meta description on mount.
 * Call at the top of each page component.
 */
export default function useSEO({ title, description }) {
  useEffect(() => {
    if (title) document.title = `${title} — Enlighten Creatives`

    if (description) {
      let tag = document.querySelector('meta[name="description"]')
      if (tag) tag.setAttribute('content', description)
    }
  }, [title, description])
}
