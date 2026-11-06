import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { site } from '../data/site'

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

// Sets the page title, description, canonical URL and Open Graph tags for each route.
export default function Seo({ title, description = site.description, image }) {
  const { pathname } = useLocation()
  useEffect(() => {
    const full = title ? `${title} | ${site.name}` : `${site.name} | ${site.short}`
    const url = `${site.url}${pathname}`
    document.title = full
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', full)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:site_name', site.name)
    if (image) setMeta('property', 'og:image', image)
    setMeta('name', 'twitter:card', 'summary_large_image')
    let link = document.head.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = url
  }, [title, description, image, pathname])
  return null
}
