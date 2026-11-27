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

/*
  Search engines show about 155 characters of a description. A longer one is cut here at the last
  full sentence that fits, or else at a word, so the snippet never stops mid-word.
*/
export function fitDescription(text, max = 158) {
  const s = String(text).replace(/\s+/g, ' ').trim()
  if (s.length <= max) return s
  const sentence = s.slice(0, max).match(/^.*[.!?](?=\s|$)/)
  if (sentence && sentence[0].length >= 90) return sentence[0]
  return `${s.slice(0, max - 1).replace(/[\s,;:–-]+\S*$/, '')}…`
}

// When pages are pre-rendered (scripts/prerender.mjs) there is no document to change: Seo writes
// what it would set into this object instead, and the script puts it in the page's <head>.
export const HeadContext = createContext(null)

/*
  Sets the page title, description, canonical URL and Open Graph tags for each route.
  `image` is an absolute URL for link previews (1200x630, see make-share-images.py); `jsonLd` is
  structured data (schema.org) describing the page for search engines, one object or a list;
  `noindex` keeps a page out of search results (the not-found page).
*/
export default function Seo({ title: titleEn, description: descriptionEn = site.metaDescription, image = defaultShareImage, jsonLd, noindex = false }) {
  const { pathname } = useLocation()
  const t = useT()
  const title = titleEn && t(titleEn)
  const description = fitDescription(t(descriptionEn))
  const head = useContext(HeadContext)
  const fullName = t('Sculptor {name}', { name: t(site.name) })
  const full = title ? `${title} | ${fullName}` : `${fullName} | ${t(site.basedIn)}`
  if (head) Object.assign(head, { title: full, description, image, imageAlt: title || fullName, jsonLd, noindex, url: `${site.url}${pathname}` })

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
    setMeta('property', 'og:image:alt', title || fullName)
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', full)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', image)
    if (noindex) setMeta('name', 'robots', 'noindex')
    else document.head.querySelector('meta[name="robots"]')?.remove()
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
  }, [full, description, image, jsonLd, noindex, pathname, title, fullName])
  return null
}

/*
  Structured data (schema.org). The artist, his studio and the site each have a fixed @id, so every
  page that mentions them points to the same thing and search engines join them into one picture:
  Kiran Adate, sculptor, who leads Invent Fine Art in Mumbai, whose works this site shows.
*/
export const ids = { person: `${site.url}/#kiran-adate`, studio: `${site.url}/#studio`, site: `${site.url}/#website` }

export function personLd(artist) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': ids.person,
    name: site.name,
    alternateName: 'किरण अदाते',
    jobTitle: 'Sculptor',
    url: `${site.url}/about`,
    image: `${site.url}${srcFor({ id: artist.portrait.id }, 960)}`,
    description: site.description,
    address: { '@type': 'PostalAddress', addressLocality: 'Mumbai', addressRegion: 'Maharashtra', addressCountry: 'IN' },
    alumniOf: { '@type': 'CollegeOrUniversity', name: artist.education.school },
    worksFor: { '@id': ids.studio },
    knowsAbout: ['Sculpture', 'Stone carving', 'Bronze sculpture', 'Stainless steel sculpture', 'Relief murals', 'Public art'],
  }
}

export function studioLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ids.studio,
    name: site.studio,
    url: site.url,
    logo: `${site.url}/favicon.svg`,
    description: `${site.studioRole}, led by sculptor ${site.name}, ${site.basedIn}.`,
    foundingDate: String(site.since),
    founder: { '@id': ids.person },
    email: site.email,
    telephone: site.phones.map((p) => p.tel),
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.office.lines.slice(0, 2).join(', '),
      addressLocality: 'Mumbai',
      postalCode: '400101',
      addressRegion: 'Maharashtra',
      addressCountry: 'IN',
    },
    contactPoint: { '@type': 'ContactPoint', contactType: 'customer service', email: site.email, telephone: site.phones[0].tel, availableLanguage: ['English', 'Hindi', 'Marathi'] },
  }
}

export function websiteLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': ids.site,
    name: site.fullName,
    url: site.url,
    inLanguage: ['en', 'hi', 'mr'],
    about: { '@id': ids.person },
    publisher: { '@id': ids.studio },
  }
}

// The trail shown under a result in search: [{ name, path }], from the home page down.
export function breadcrumbLd(trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...trail].map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: `${site.url}${c.path}` })),
  }
}

// A page that lists works: its name, description and every work on it, in order.
export function collectionLd({ name, description, path, works }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: `${site.url}${path}`,
    isPartOf: { '@id': ids.site },
    about: { '@id': ids.person },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: works.length,
      itemListElement: works.map((w, i) => ({ '@type': 'ListItem', position: i + 1, name: w.name, url: `${site.url}${w.path}` })),
    },
  }
}
