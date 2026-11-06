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
  tagline: 'Reinventing spaces through innovations in art.',
  basedIn: 'Mumbai',
  since: 2008, // the studio's founding year. CONFIRM: the old home page says 2008, the old about page 2009
  url: 'https://www.inventfineart.com',
  description:
    'Kiran Adate is a sculptor in Mumbai and leads Invent Fine Art, a studio of sculptors, painters and designers making sculpture, murals, planters and architectural art in steel, stone, bronze, FRP and GRC since 2008.',

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
  },
  visits: 'Studio visits by appointment.',

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

// The artist and the studio. The statement and practice are the studio's own words (old home and
// about pages, tidied; no new claims). No biography, training or awards are on hand yet.
export const artist = {
  statement:
    'Invent Fine Art is a community of artists, committed to bringing outstanding art to the commercial world. As sculptors, painters and designers, we work in every area of interior and architectural design, at indoor as well as outdoor sites, and we take each work from its first concept to its complete execution.',

  shortBio:
    'Kiran Adate is a sculptor in Mumbai and leads Invent Fine Art, a team of sculptors, painters and designers. Since 2008 the studio has made sculpture, murals, planters and architectural art for homes, gardens, hotels, offices and public places, designing and making every piece in its own workshop.',

  // A photograph of the studio at work, used until a portrait of Kiran Adate is on hand.
  portrait: { id: 'gallery/sculptures/78', alt: 'Lion of machine parts taking shape in the Invent Fine Art workshop' },

  practice: [
    'We are a team of artisans and product designers. We create work with an artistic inclination for designers and architects and their projects, and translate each client’s idea into a piece that works both aesthetically and practically.',
    'A work can begin with a sketch, a reference photograph or a drawing, with the size and the site. We develop the design, and 3D-print a miniature of it for approval before the full piece is made.',
    'Everything is made in our own manufacturing unit, with the latest tools, technology and machinery, and examined on numerous factors before it leaves. It is delivered in careful packing and fixed on site by our own team.',
  ],

  materialsNote:
    'Sculptures in steel, stone, bronze and FRP. Murals in steel, FRP, GRC and mixed media. Planters and architectural elements in FRP and GRC, which take the place of RCC: they look right, are made faster, are lighter, and stay strong and durable.',

  // The four units of the facility (old about page).
  facility: [
    { name: 'Manufacturing', text: 'Equipped with the latest tools, technology and machinery.' },
    { name: 'Quality control', text: 'Every piece is examined on numerous factors before it is delivered.' },
    { name: 'Research & development', text: 'Works alongside the other units, as part of the same facility.' },
    { name: 'Warehousing & packaging', text: 'Work leaves in careful packing and reaches the site as it left the studio.' },
  ],

  // Also made by the studio (old about and services pages).
  alsoMake: ['Acoustic wall panels', '3D wall façades', 'Rockery work', 'Water fountains', 'GRC railings, pergolas and gazebos'],

  // Clients named on the old site (our_client.html, 2017). CONFIRM: is the list current, and may it be published?
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
