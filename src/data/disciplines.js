/*
  Bodies of work. Each one has its own page at /works/<slug>.
  `variant` selects the art direction of that page (see src/pages/Discipline.jsx).

  This is Kiran Adate's portfolio, so only Sculpture and Murals are shown. The studio's product
  lines (planters, FRP and GRC architectural work, water and garden work) belong on the company
  site, inventfineart.com; they are kept below with `archived: true`, hidden everywhere.

  Sources: the studio's own words from the old inventfineart.com (services and about pages),
  the brief (new-design.md) and the meeting of 2026-10-24 (decision.txt), as collected in
  site-v4/app/data/lines.js and content.js. The order and names of the first four follow the
  owner's written list; Water & Garden Works are the fountains, rockery and pergolas the old
  site showed as executed work.
*/

const pic = (id, alt, position) => ({ id, alt, position })

export const allDisciplines = [
  {
    slug: 'sculpture',
    name: 'Sculpture',
    shortName: 'Sculpture',
    variant: 'monument',
    accent: '#7A5537',
    headline: 'Figures, devotional forms, animals and abstract work.',
    intro:
      'Sculpture in steel, stone, bronze and fibre: figures and portraits, devotional forms, animals and birds, and abstract work, from pieces for a room to works for gardens and public places.',
    body: [
      'From a portrait statue to a lion assembled from machine parts, each piece begins as a sketch, a reference or an idea.',
      'It is then modelled, cast, welded or carved in the workshop and finished by hand.',
    ],
    note: 'Steel, stone, bronze and FRP: each chosen for the place a sculpture will stand, indoors or out.',
    materials: ['Steel', 'Stone', 'Bronze', 'FRP (GRP)'],
    groups: [
      { slug: 'figures', name: 'Figures & portraits' },
      { slug: 'devotional', name: 'Devotional' },
      { slug: 'animals', name: 'Animals & birds' },
      { slug: 'abstract', name: 'Abstract & contemporary' },
      { slug: 'nature', name: 'Garden & nature' },
    ],
    cover: pic('gallery/sculptures/84', 'Twisted ribbon form, a sculpture in two metals, by Kiran Adate'),
    context: pic('gallery/sculptures/80', 'Lion of machine parts, a steel sculpture, by Kiran Adate'),
  },
  {
    slug: 'murals',
    name: 'Murals & Reliefs',
    shortName: 'Murals',
    variant: 'relief',
    accent: '#7F5F22',
    headline: 'A composition carried across a wall.',
    intro:
      'Relief murals in steel, FRP, GRC and mixed media, each drawn to the wall it is made for.',
    body: [
      'A mural carries one composition across a wall: a carved scene, a pair of dancers, a field of metal leaves.',
      'Each is drawn to the wall’s exact size, then carved or cast in panels and assembled on the wall.',
    ],
    definitions: [
      { term: 'Mural', text: 'Artwork raised in relief on a wall: a figure, a scene or a pattern.' },
      { term: 'Wall feature', text: 'A set of decorative panels that covers a wall and gives it character.' },
    ],
    note: 'Light changes a relief through the day. Many of these walls are lit from within or from one side, so their carving reads as shadow.',
    materials: ['Steel', 'FRP', 'GRC', 'Mixed media'],
    groups: [
      { slug: 'murals', name: 'Murals' },
      { slug: 'wall-features', name: 'Wall features' },
    ],
    cover: pic('gallery/wall_murals/34', 'Carved relief wall, full length, by Kiran Adate'),
    context: pic('gallery/wall_murals/33', 'Dancers relief on a lobby wall, by Kiran Adate'),
  },
  {
    slug: 'planters',
    archived: true,
    name: 'Planters & Pots',
    shortName: 'Planters',
    variant: 'landscape',
    accent: '#4D5A3F',
    headline: 'Where nature meets design.',
    intro:
      'Decorative planters in FRP and GRC, made to sit with contemporary and traditional settings alike: in residential landscapes, on balconies, in gardens and in hotels.',
    body: [
      'A planter is the meeting point of a building and its garden. Its shape, size and finish decide whether planting looks like an afterthought or part of the design.',
      'The studio makes them in many styles, shapes and sizes, from faceted forms to classical urns and a planter carved as an elephant, in FRP for lightness or GRC for the weight and texture of stone.',
    ],
    note: 'Designs from the studio',
    designs: [
      { title: 'Removable planters', text: 'Planters on wheels, so even a heavy, fully planted pot can be moved.' },
      { title: 'Partition creeper planters', text: 'A planter with a trellis: creepers climb it and grow into a natural green partition.' },
      { title: 'Big trays for flower beds', text: 'Large, shallow FRP trays for flowering plants, easy to move.' },
    ],
    materials: ['FRP', 'GRC'],
    madeFor: ['Residential landscapes', 'Balconies', 'Gardens', 'Hospitality spaces', 'Commercial properties'],
    cover: pic('gallery/planters/3', 'Elephant planter in GRC, by Invent Fine Art', '50% 45%'),
    context: pic('gallery/planters/2', 'Classical urn planters in a garden, by Invent Fine Art'),
  },
  {
    slug: 'architectural',
    archived: true,
    name: 'Architectural Works in FRP & GRC',
    shortName: 'FRP & GRC',
    variant: 'drawing',
    accent: '#44515A',
    headline: 'Creative solutions, customised to each building.',
    intro:
      'Jaali screens, 3D façades, chhajjas, columns, arches, fins and sculptural furniture in FRP and GRC, made to the architect’s design for residential, commercial and large-scale projects.',
    body: [
      'Glassfibre Reinforced Concrete (GRC) adds character, detail and visual appeal to architectural spaces: façade elements, ornamental features, cornices, columns, mouldings and cladding. Fibre-Reinforced Plastic (FRP) brings the same freedom to decorative and project-specific pieces.',
      'In building elements, FRP and GRC take the place of RCC. They look right, are made faster, are lighter, and stay strong and durable.',
    ],
    note: 'Made as per the design and requirement of each building.',
    vocabulary: [
      { title: 'Grills, jaali & screens', text: 'Pierced screens for boundaries, façades and partitions.' },
      { title: 'Chhajjas', text: 'Shading eaves in FRP and GRC.' },
      { title: 'Columns & pillars', text: 'Plain, fluted or carved, in GRC.' },
      { title: 'Arches', text: 'Arch profiles cast to the building’s drawings.' },
      { title: 'Fins', text: 'FRP fins that hide ducting and pipes, or work as fencing.' },
      { title: 'Garden benches', text: 'Seats in GRC for gardens and landscapes.' },
      { title: 'Reception & console tables', text: 'Sculptural tables in FRP for lobbies.' },
    ],
    materials: ['FRP', 'GRC'],
    madeFor: ['Residential projects', 'Commercial projects', 'Large-scale projects'],
    cover: pic('gallery/grc_products/2', 'A 3D GRC façade wall, by Invent Fine Art'),
    context: pic('gallery/grc_products/1', 'GRC 3D façade panels across a building front, by Invent Fine Art'),
  },
  {
    slug: 'water-garden',
    archived: true,
    name: 'Water & Garden Works',
    shortName: 'Water & garden',
    variant: 'landscape',
    accent: '#3F5A58',
    headline: 'Water, stone and shade, shaped for a garden.',
    intro:
      'Fountains, water walls, rockery and waterfalls, pergolas and gazebos: executed work for courtyards, gardens, entrances and terraces.',
    body: [
      'Rockery answers the wish to bring nature back into a built place. Natural stone and artificial rock are shaped into walls, streams and waterfalls; fountains and water walls are planned and built with their pumps and lighting.',
      'Pergolas and gazebos complete a garden with shade, in GRC with lattice screens and columns.',
    ],
    note: 'Planned, built and lit by the studio’s own team.',
    materials: ['Natural stone', 'Artificial rock', 'GRC', 'Steel'],
    madeFor: ['Courtyards', 'Gardens', 'Entrances', 'Terraces'],
    groups: [
      { slug: 'water', name: 'Fountains & water walls' },
      { slug: 'rockery', name: 'Rockery' },
      { slug: 'structures', name: 'Pergolas & gazebos' },
    ],
    cover: pic('gallery/water_fountains/20', 'Rock waterfall, by Invent Fine Art'),
    context: pic('gallery/water_fountains/16', 'Sphere fountain in a residential garden, by Invent Fine Art'),
  },
]

// The bodies of work shown on the site (archived ones are left out of every list and page).
export const disciplines = allDisciplines.filter((d) => !d.archived)
export const disciplineBySlug = Object.fromEntries(disciplines.map((d) => [d.slug, d]))

/*
  Materials. GRC and FRP: the studio's own words (old site; meeting 2026-10-24).
  Steel, stone and bronze: general notes. TO CONFIRM with the studio.
  The swatches are drawn textures (Plate), not photographs.
*/
export const materials = [
  { name: 'Bronze', note: 'The classic material of statues. Holds the finest detail and darkens naturally with age.', plate: { kind: 'texture', variant: 'bronze', material: 'bronze', seed: 61 } },
  { name: 'Stone', note: 'Natural stone, carved by hand. No two pieces are alike, and it lasts for generations outdoors.', plate: { kind: 'texture', variant: 'stone', material: 'stone', seed: 63 } },
  { name: 'Steel', note: 'Strong in thin sections, for slim, open and bold forms: polished, brushed or painted.', plate: { kind: 'texture', variant: 'steel', material: 'steel', seed: 62 } },
  { name: 'FRP', note: 'Fibre-reinforced plastic. Light and strong, for large forms and pieces that stand outdoors.', plate: { kind: 'texture', variant: 'frp', material: 'frp', seed: 64 } },
  { name: 'GRC', note: 'Glassfibre reinforced concrete. Takes fine detail from the mould; used for relief murals.', plate: { kind: 'texture', variant: 'grc', material: 'grc', seed: 65 } },
]
