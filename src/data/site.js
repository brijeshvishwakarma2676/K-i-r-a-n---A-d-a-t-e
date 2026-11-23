/*
  ARTIST AND STUDIO INFORMATION
  The site is Kiran Adate's (name as spelt by the owner in the meeting of 2026-10-24);
  Invent Fine Art is the studio Kiran Adate leads, and all works shown are made there.
  Source: the old inventfineart.com (raw_html), as checked for site-v4 (app/data/site.js,
  content.js, clients.js). Values marked CONFIRM are carried over from site-v4's
  CONTENT-GAPS.md and still need the owner's confirmation before launch.
*/

export const site = {
  name: 'Kiran Adate',
  role: 'Sculptor',
  short: 'Sculptor, Mumbai',
  studio: 'Invent Fine Art',
  studioRole: 'Studio of sculptors, painters and designers',
  tagline: 'Sculpture in steel, stone and bronze.',
  basedIn: 'Mumbai',
  since: 2008, // the studio's founding year. CONFIRM: the old home page says 2008, the old about page 2009
  url: 'https://www.inventfineart.com',
  description:
    'Kiran Adate is a sculptor in Mumbai, making figures, devotional forms, animals and abstract work in steel, stone, bronze and fibre, and relief murals.',

  email: 'inventfineart.mum@gmail.com',
  emailAlt: 'inventfineart@gmail.com', // CONFIRM: still in use?
  phones: [
    { label: '+91 93232 10327', tel: '+919323210327' },
    { label: '+91 96196 60089', tel: '+919619660089' },
    { label: '+91 89767 77123', tel: '+918976777123' },
  ],
  whatsapp: 'https://wa.me/919323210327', // CONFIRM: which number has WhatsApp

  office: {
    label: 'Office',
    lines: ['No. 14, Jay Bharat Zip Sangh', 'Vadar Pada, Kandivali East', 'Mumbai 400101, Maharashtra'],
    map: 'https://www.google.com/maps/search/?api=1&query=19.1982543,72.8644545',
  },
  workshop: {
    label: 'Studio and workshop',
    // CONFIRM: the source says Thane; Nalasopara is now in Palghar district
    lines: ['Opp. Jag Mata Mandir, Wagholi Road', 'Nalasopara West', 'Thane 401203, Maharashtra'],
    map: 'https://www.google.com/maps/search/?api=1&query=19.4196725,72.7856904',
    lat: 19.42,
    lon: 72.79,
  },
  visits: 'Studio visits by appointment.',
  // Visitor statistics without cookies (so no cookie banner is needed). Off while both are null.
  // Cloudflare Web Analytics (free): paste the token from its dashboard. Plausible (paid): the
  // site's domain as registered there. Only one is used; Cloudflare wins if both are set.
  analytics: { cloudflareToken: null, plausibleDomain: null },

  // The portfolio as a PDF, made from /portfolio by scripts/make-portfolio-pdf.mjs.
  portfolioPdf: '/kiran-adate-portfolio.pdf',

  // The studio's product lines (planters, FRP and GRC architectural work, water and garden work)
  // are not part of the portfolio; one line in the footer and on the Works page points to them.
  products: { name: 'Invent Fine Art', url: 'https://www.inventfineart.com', note: 'Planters, architectural work in FRP and GRC, and water and garden work' },

  certification: 'ISO 9001 certified', // CONFIRM: the old site says ISO 9001:2008, a version withdrawn in 2018

  // No gallery represents the studio. Set { name, city, href } to show a line, or leave null.
  representation: null,

  social: [{ label: 'YouTube', href: 'https://www.youtube.com/watch?v=cVt-3vbENOQ' }], // the film linked from the old home page

  credit: { label: 'Website by', name: 'Brijesh Vishwakarma', url: 'https://brijesh-dev-portfolio.vercel.app/' },
}

export const nav = [
  { to: '/works', label: 'Works' },
  { to: '/exhibitions', label: 'Exhibitions' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

// The artist. Kiran Adate's own statement, biography, training and awards are not on hand yet
// (see CONTENT-TO-CONFIRM.md); until they are, `statement` describes the work shown on the site and
// `practice` restates how the old studio site described the making, without the sales language.
export const artist = {
  // Kiran Adate's own words, from his artist profile (2026).
  statement:
    'For me, sculpture is an ongoing dialogue between material, imagination and space: a process of transforming matter into a meaningful visual experience.',
  statementSource: 'Kiran Adate, artist profile',

  shortBio:
    'Kiran Adate is a sculptor in Mumbai, from Parali Vaijnath in Beed district, Maharashtra, who trained in sculpture and modelling at the Sir J.J. School of Art in Mumbai. The work, in stone, bronze and more and more in stainless steel, ranges from public sculpture, such as the Statue of Freedom of Press and the Sculpture of Hawker in Nagpur, to figures and abstract forms for galleries and buildings. It is made in the workshop of Invent Fine Art, the studio Kiran Adate leads.',

  // Kiran Adate's own words, as printed in Lokmat Times, Nagpur, 7 January 2015 (client's clipping).
  quote: {
    text: 'Capturing the laborious devotion and commitment of the hawker, who, irrespective of seasons – rainy, summer or winter, carries out his task, was a challenge. It was this challenge that strengthened my conviction, and this is how I could create the Sculpture of Hawker.',
    source: 'Lokmat Times, January 2015',
  },

  // Facts reported in the same article: home village, art school, and how the two Nagpur works began.
  // The client's clippings from 7 January 2015, all on the unveiling of the Sculpture of Hawker.
  press: [
    { year: 2015, title: 'Salute to untiring efforts!', outlet: 'Lokmat Times, Nagpur, 7 January 2015, front page', image: 'kiran/press-lokmat-times-front', work: 'sculpture-of-hawker' },
    { year: 2015, title: 'Capturing commitment in a tough task: Adate', outlet: 'Lokmat Times, Nagpur, 7 January 2015', image: 'kiran/press-lokmat-times-adate', work: 'sculpture-of-hawker' },
    { year: 2015, title: 'श्रम को सलाम', outlet: 'Lokmat Samachar, Nagpur, 7 January 2015, front page', image: 'kiran/press-lokmat-samachar-front', work: 'sculpture-of-hawker' },
    { year: 2015, title: 'समर्पण का शिल्प बनाना चुनौतीपूर्ण', outlet: 'Lokmat Samachar, Nagpur, January 2015', image: 'kiran/press-lokmat-samachar-inside', work: 'sculpture-of-hawker' },
    { year: 2015, title: 'कष्टाला सलाम, त्यागाचा गौरव', outlet: 'Lokmat, Nagpur, 7 January 2015', image: 'kiran/press-lokmat-marathi', work: 'sculpture-of-hawker' },
  ],
  publicWorks: [
    // lat/lon place each work on the chart on the About page (town level, not exact); `map` opens
    // the place in Google Maps by name.
    { year: 2007, slug: 'statue-of-freedom-of-press', place: 'Lokmat Media printing press, Butibori, Nagpur', town: 'Butibori', lat: 20.93, lon: 78.95, map: 'https://www.google.com/maps/search/?api=1&query=Lokmat+printing+press+Butibori+Nagpur' },
    { year: 2015, slug: 'sculpture-of-hawker', place: 'Samvidhan Square, Nagpur; unveiled 6 January 2015', town: 'Nagpur', lat: 21.15, lon: 79.08, map: 'https://www.google.com/maps/search/?api=1&query=Samvidhan+Square+Nagpur' },
  ],
  education: { course: 'G.D. Art, Sculpture & Modelling', school: 'Sir J.J. School of Art, Mumbai', year: 2005 },

  // The artist's work in progress: carving stone with a pointing machine (client photograph, 2012).
  portrait: { id: 'kiran/carving-with-a-pointing-machine', alt: 'Carving stone with a pointing machine, 2012' },

  practice: [
    'A work begins with a sketch, a reference photograph or an idea, and often with the place where it will stand. A small model fixes the form before the full piece is made.',
    'The piece is then modelled, cast, welded or carved in the workshop at Nalasopara, near Mumbai, and finished by hand.',
    'After many sculptures in stone and bronze, the work has turned more and more to stainless steel. Strong, lasting and reflective, it suits abstract forms, geometric compositions and organic shapes, and lets a sculpture answer the light and the space around it. The interests stay the same: form, balance, proportion and space.',
  ],

  materialsNote: 'Sculpture in stainless steel, stone, bronze and FRP; murals in steel, FRP, GRC and mixed media.',

  // Clients named on the old site (our_client.html, 2017), shown only on the About page as a
  // record of commissions. CONFIRM: is the list current, and may it be published?
  commissions: [
    'Ashoka Restaurant, Nagpur',
    'B.E. Billimoria & Co. Ltd.',
    'Bombay Realty',
    'Chromed Design Studio, New Delhi',
    'CRISIL Risk & Infrastructure Solutions Ltd.',
    'Everest Moscot, Mumbai',
    'HiMedia Laboratories Pvt. Ltd., Mumbai',
    'India Fashion, Mumbai',
    'Indian Army, HQ 54 Inf Div., Hyderabad',
    'Indian Navy, HQ Magna, Porbandar',
    'Jay Associates',
    'Kalpataru, Mumbai',
    'Kotak Mahindra Bank',
    'L&T Finance Limited',
    'Lokmat News Paper Pvt. Ltd.',
    'M Moser Design Associates India Pvt. Ltd.',
    'Mahaavir, Navi Mumbai',
    'Mahindra Lifespace Developers Ltd., Mumbai',
    'Make Well Construction',
    'Mantri Developers',
    'Naik Navare Developers Pvt. Ltd., Mumbai',
    'Pendse & Associates',
    'Raymond Ltd., Mumbai',
    'Runwal Developers Pvt. Ltd.',
    'S.K. Associate, Mumbai',
    'Sanderson Group (India) Pvt. Ltd.',
    'Shree Mahalaxmi Developers, Neral',
    'Struct-Mast Engineers, Mumbai',
    'The Wadhwa Group, Mumbai',
    'Vardan Nursing Home Pvt. Ltd., Mumbai',
    'Vikram Tea Processor Pvt. Ltd., Jalna',
    'Wadhawan Holdings Pvt. Ltd., Mumbai',
    'White Shadow, Coimbatore',
    'Zenith Group, Kamothe',
  ],
}

// A WhatsApp chat with the studio, opened with a first message already written (about one work,
// when `work` is given). Visitors can edit it before sending.
export function whatsappLink(work) {
  const text = work
    ? `Hello, I would like to ask about “${work.title}” by ${site.name}: ${site.url}/works/${work.discipline}/${work.slug}`
    : `Hello, I would like to ask about a work by ${site.name}.`
  return `${site.whatsapp}?text=${encodeURIComponent(text)}`
}
