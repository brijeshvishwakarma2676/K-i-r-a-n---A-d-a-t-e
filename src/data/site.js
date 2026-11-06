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
  },
  visits: 'Studio visits by appointment.',

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
  statement:
    'The work moves between the figure and the abstract: dancers, a cyclist and a cellist; the Buddha and Ganesha; a lion built from machine parts and a rhinoceros in metal mesh; ribbons of metal turning in space. Each piece begins as a sketch or a small model and is carved, cast or welded, then finished by hand.',

  shortBio:
    'Kiran Adate is a sculptor in Mumbai, working in steel, stone, bronze and fibre: portrait statues and devotional figures, animals, abstract forms and relief murals. The work is made in the workshop of Invent Fine Art, the studio Kiran Adate leads, founded in 2008.',

  // A photograph of the studio at work, used until a portrait of Kiran Adate is on hand.
  portrait: { id: 'gallery/sculptures/78', alt: 'Lion of machine parts taking shape in the workshop' },

  practice: [
    'A work begins with a sketch, a reference photograph or an idea, and often with the place where it will stand. A small model fixes the form before the full piece is made.',
    'The piece is then modelled, cast, welded or carved in the workshop at Nalasopara, near Mumbai, and finished by hand.',
  ],

  materialsNote: 'Sculpture in steel, stone, bronze and FRP; murals in steel, FRP, GRC and mixed media.',

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
