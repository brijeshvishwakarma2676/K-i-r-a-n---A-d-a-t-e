import { createContext, useContext, useEffect } from 'react'
import { useLocation } from 'react-router'
import { site } from '../data/site'
import { srcFor } from './ArtImage'
import { useT } from '../i18n'

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

// The picture shown when a page without its own image is shared (WhatsApp, LinkedIn…). Share
// pictures are 1200x630 JPEGs made by scripts/make-share-images.py; each work has its own.
export const defaultShareImage = `${site.url}/share/kiran-adate.jpg`
export const shareImageFor = (p) => `${site.url}/share/${p.slug}.jpg`

// When pages are pre-rendered (scripts/prerender.mjs) there is no document to change: Seo writes
// what it would set into this object instead, and the script puts it in the page's <head>.
export const HeadContext = createContext(null)

/*
  Sets the page title, description, canonical URL and Open Graph tags for each route.
  `image` is an absolute URL for link previews; `jsonLd` is structured data (schema.org)
  describing the page for search engines.
*/
export default function Seo({ title: titleEn, description: descriptionEn = site.description, image = defaultShareImage, jsonLd }) {
  const { pathname } = useLocation()
  const t = useT()
  const title = titleEn && t(titleEn)
  const description = t(descriptionEn)
  const head = useContext(HeadContext)
  const fullName = t('Sculptor {name}', { name: t(site.name) })
  const full = title ? `${title} | ${fullName}` : `${fullName} | ${t(site.basedIn)}`
  if (head) Object.assign(head, { title: full, description, image, jsonLd, url: `${site.url}${pathname}` })

  useEffect(() => {
    const url = `${site.url}${pathname}`
    document.title = full
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', full)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:site_name', site.fullName)
    setMeta('property', 'og:image', image)
    setMeta('name', 'twitter:card', 'summary_large_image')
    let link = document.head.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = url
    let ld = document.getElementById('json-ld')
    if (jsonLd) {
      if (!ld) {
        ld = document.createElement('script')
        ld.type = 'application/ld+json'
        ld.id = 'json-ld'
        document.head.appendChild(ld)
      }
      ld.textContent = JSON.stringify(jsonLd)
    } else ld?.remove()
  }, [full, description, image, jsonLd, pathname])
  return null
}

// Structured data for the artist, used on the home and About pages.
export function personLd(artist) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    jobTitle: 'Sculptor',
    url: site.url,
    image: `${site.url}${srcFor({ id: artist.portrait.id }, 960)}`,
    description: site.description,
    address: { '@type': 'PostalAddress', addressLocality: 'Mumbai', addressCountry: 'IN' },
    alumniOf: { '@type': 'CollegeOrUniversity', name: artist.education.school },
    worksFor: { '@type': 'Organization', name: site.studio },
  }
}
