/*
  EXHIBITIONS
  Source: the exhibition poster on the old inventfineart.com (gallery/other_products/10).
  Add each new exhibition, sculpture camp or art fair here; the newest appears first.

  Dates are ISO strings (YYYY-MM-DD). Whether a show is upcoming, current or past is worked
  out from today's date, so nothing needs to change when an exhibition opens or closes.

  kind     - 'Solo exhibition' | 'Group exhibition' | 'Sculpture camp' | 'Residency' | 'Art fair'
  works    - slugs from projects.js that were shown (none recorded yet)
  image    - a poster or installation view
*/

export const exhibitions = [
  {
    slug: 'vision-of-art',
    title: 'Vision of Art',
    kind: 'Group exhibition',
    venue: 'Jehangir Art Gallery (Auditorium Hall)',
    city: 'Mumbai',
    start: '2016-05-17',
    end: '2016-05-23',
    text: 'A group show of paintings and sculpture, opened on 17 May 2016 by the chief guest, Devendra Darda, Managing Director of Lokmat.',
    works: [],
    image: { id: 'gallery/other_products/10', alt: 'Poster for Vision of Art, a paintings and sculpture group show at Jehangir Art Gallery, Mumbai, 17 to 23 May 2016', fit: 'contain' },
  },
]

const today = () => new Date().toISOString().slice(0, 10)

export function statusOf(x, now = today()) {
  if (now < x.start) return 'upcoming'
  if (now > x.end) return 'past'
  return 'current'
}

const fmt = (iso, opts) => new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', opts)

// "17 to 23 May 2016", "16 October to 20 December 2026", or with both years across a new year
export function dateRange(x) {
  const [ys, ms] = [x.start.slice(0, 4), x.start.slice(5, 7)]
  const [ye, me] = [x.end.slice(0, 4), x.end.slice(5, 7)]
  const b = fmt(x.end, { day: 'numeric', month: 'long', year: 'numeric' })
  if (ys !== ye) return `${fmt(x.start, { day: 'numeric', month: 'long', year: 'numeric' })} to ${b}`
  if (ms !== me) return `${fmt(x.start, { day: 'numeric', month: 'long' })} to ${b}`
  return `${fmt(x.start, { day: 'numeric' })} to ${b}`
}

export const yearOf = (x) => Number(x.start.slice(0, 4))

// The exhibition to feature on the home page: a current one, else the next upcoming, else the latest.
export function featuredExhibition(now = today()) {
  if (!exhibitions.length) return null
  const sorted = [...exhibitions].sort((a, b) => (a.start < b.start ? 1 : -1))
  return (
    sorted.find((x) => statusOf(x, now) === 'current') ||
    [...sorted].reverse().find((x) => statusOf(x, now) === 'upcoming') ||
    sorted[0]
  )
}
