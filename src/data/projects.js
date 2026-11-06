/*
  WORKS
  The studio's own catalogue, from the photographs on the old inventfineart.com and the
  catalogue built for site-v4 (codes IFA-SC-…, IFA-MU-…, IFA-PL-…, IFA-GRC-…, IFA-GRL-…, IFA-FRP-…
  are the same codes). One entry per work; several photos of one piece share an entry.

  TO CONFIRM WITH THE STUDIO before launch (see CONTENT-TO-CONFIRM.md):
  - Titles describe what each photo shows. Replace them with the studio's own names.
  - Material, size, year and site are not known for most works. Add them as
    medium, dimensions, year, location when the studio supplies them; the pages show
    whatever is filled in and hide the rest.
  - `provisional: true` marks photos used as stand-ins for the FRP range.
  - Water & garden works have no catalogue codes on the old site.

  Fields:
    slug        URL of the work: /works/<discipline>/<slug>
    code        catalogue number; `codes` when the entry merges several photos
    title       name of the work
    discipline  body of work (slug from disciplines.js)
    group       subject filter within a body of work (see disciplines.js `groups`)
    segment     product type within Architectural Works (see disciplines.js `vocabulary`)
    medium      material or finish, where known
    views       caption for each photo, in the same order as `images`
    images      photo ids from images.js; the first is the cover
    featured    shown on the home page
    listed      false keeps an entry out of the works (lists, counts, work pages); see EXTRA

  PORTFOLIO (below RAW) is the curated selection the site shows, in order. Every other entry stays
  in RAW as the studio's archive and is not listed, counted or given a page.
*/

const RAW = [
  // SCULPTURE
  { slug: 'hands-holding-a-beam', code: 'IFA-SC-001', title: 'Hands holding a beam', discipline: 'sculpture', group: 'abstract', images: ['gallery/sculptures/1'] },
  { slug: 'saraswati-with-veena', code: 'IFA-SC-002', title: 'Saraswati with veena', discipline: 'sculpture', group: 'devotional', images: ['gallery/sculptures/2'] },
  { slug: 'striding-figures', code: 'IFA-SC-003', title: 'Striding figures', discipline: 'sculpture', group: 'figures', images: ['gallery/sculptures/3'] },
  { slug: 'wall-mounted-ribbon-forms', code: 'IFA-SC-004', title: 'Wall-mounted ribbon forms', discipline: 'sculpture', group: 'abstract', images: ['gallery/sculptures/5'] },
  { slug: 'fountain-with-plant-forms', code: 'IFA-SC-005', title: 'Fountain with plant forms', discipline: 'sculpture', group: 'nature', images: ['gallery/sculptures/7'] },
  { slug: 'columns-of-climbing-figures', code: 'IFA-SC-006', title: 'Columns of climbing figures', discipline: 'sculpture', group: 'abstract', images: ['gallery/sculptures/8'] },
  { slug: 'runner-around-a-column', code: 'IFA-SC-007', title: 'Runner around a column', discipline: 'sculpture', group: 'figures', images: ['gallery/sculptures/9'] },
  { slug: 'abstract-form-in-a-park', code: 'IFA-SC-008', title: 'Abstract form in a park', discipline: 'sculpture', group: 'abstract', images: ['gallery/sculptures/10'] },
  { slug: 'illuminated-coil-hand', code: 'IFA-SC-009', title: 'Illuminated coil hand', discipline: 'sculpture', group: 'abstract', images: ['gallery/sculptures/11'] },
  { slug: 'equestrian-statue', code: 'IFA-SC-010', codes: ['IFA-SC-010', 'IFA-SC-011'], title: 'Equestrian statue', discipline: 'sculpture', group: 'figures', views: ['Equestrian statue', 'Equestrian statue on a plinth'], images: ['gallery/sculptures/13', 'gallery/sculptures/14'] },
  { slug: 'seated-buddha', code: 'IFA-SC-012', title: 'Seated Buddha', discipline: 'sculpture', group: 'devotional', medium: 'Gold finish', images: ['gallery/sculptures/15'], featured: true },
  { slug: 'abstract-ring-form', code: 'IFA-SC-013', title: 'Abstract ring form', discipline: 'sculpture', group: 'abstract', images: ['gallery/sculptures/16'] },
  { slug: 'elephant-heads-with-a-basket', code: 'IFA-SC-014', title: 'Elephant heads with a basket', discipline: 'sculpture', group: 'animals', images: ['gallery/sculptures/17'] },
  { slug: 'stylised-ganesha', code: 'IFA-SC-015', title: 'Stylised Ganesha', discipline: 'sculpture', group: 'devotional', images: ['gallery/sculptures/18'], featured: true },
  { slug: 'giant-garden-chess-set', code: 'IFA-SC-016', codes: ['IFA-SC-016', 'IFA-SC-017'], title: 'Giant garden chess set', discipline: 'sculpture', group: 'nature', views: ['Giant garden chess set', 'Giant garden chess set, full view'], images: ['gallery/sculptures/19', 'gallery/sculptures/20'] },
  { slug: 'tree-of-birds', code: 'IFA-SC-018', title: 'Tree of birds', discipline: 'sculpture', group: 'abstract', images: ['gallery/sculptures/21'] },
  { slug: 'leaping-figure', code: 'IFA-SC-019', title: 'Leaping figure', discipline: 'sculpture', group: 'figures', images: ['gallery/sculptures/23'] },
  { slug: 'birds-on-a-ledge', code: 'IFA-SC-020', title: 'Birds on a ledge', discipline: 'sculpture', group: 'animals', images: ['gallery/sculptures/24'] },
  { slug: 'birds-by-a-pool', code: 'IFA-SC-021', title: 'Birds by a pool', discipline: 'sculpture', group: 'animals', images: ['gallery/sculptures/25'] },
  { slug: 'embracing-couple', code: 'IFA-SC-022', title: 'Embracing couple', discipline: 'sculpture', group: 'figures', images: ['gallery/sculptures/28'] },
  { slug: 'dancer-with-a-flowing-robe', code: 'IFA-SC-023', title: 'Dancer with a flowing robe', discipline: 'sculpture', group: 'figures', images: ['gallery/sculptures/30'] },
  { slug: 'dancer-with-a-bird', code: 'IFA-SC-024', title: 'Dancer with a bird', discipline: 'sculpture', group: 'figures', images: ['gallery/sculptures/31'] },
  { slug: 'couple-on-a-boulder', code: 'IFA-SC-025', codes: ['IFA-SC-025', 'IFA-SC-026'], title: 'Couple on a boulder', discipline: 'sculpture', group: 'figures', views: ['Couple on a boulder', 'Couple on a boulder, garden view'], images: ['gallery/sculptures/32', 'gallery/sculptures/33'] },
  { slug: 'rhinoceros-in-metal-mesh', code: 'IFA-SC-027', codes: ['IFA-SC-027', 'IFA-SC-028'], title: 'Rhinoceros in metal mesh', discipline: 'sculpture', group: 'animals', views: ['Rhinoceros in metal mesh', 'Rhinoceros in metal mesh, on display'], images: ['gallery/sculptures/35', 'gallery/sculptures/36'] },
  { slug: 'statue-of-liberty-replica', code: 'IFA-SC-029', codes: ['IFA-SC-029', 'IFA-SC-031'], title: 'Statue of Liberty replica', discipline: 'sculpture', group: 'figures', views: ['Statue of Liberty replica', 'Statue of Liberty replica on a plinth'], images: ['gallery/sculptures/37', 'gallery/sculptures/39'] },
  { slug: 'cellist', code: 'IFA-SC-030', title: 'Cellist', discipline: 'sculpture', group: 'figures', images: ['gallery/sculptures/38'] },
  { slug: 'gandhi-statue', code: 'IFA-SC-032', codes: ['IFA-SC-032', 'IFA-SC-033', 'IFA-SC-045'], title: 'Gandhi statue', discipline: 'sculpture', group: 'figures', views: ['Gandhi statue', 'Gandhi statue, front view', 'Gandhi statue, in the workshop'], images: ['gallery/sculptures/40', 'gallery/sculptures/41', 'gallery/sculptures/54'] },
  { slug: 'figure-in-a-wall-niche', code: 'IFA-SC-034', title: 'Figure in a wall niche', discipline: 'sculpture', group: 'figures', images: ['gallery/sculptures/43'] },
  { slug: 'figure-with-kites', code: 'IFA-SC-035', codes: ['IFA-SC-035', 'IFA-SC-036'], title: 'Figure with kites', discipline: 'sculpture', group: 'figures', views: ['Figure with kites', 'Figure with kites, side view'], images: ['gallery/sculptures/44', 'gallery/sculptures/45'] },
  { slug: 'figure-at-the-spinning-wheel', code: 'IFA-SC-037', codes: ['IFA-SC-037', 'IFA-SC-038', 'IFA-SC-039', 'IFA-SC-040'], title: 'Figure at the spinning wheel', discipline: 'sculpture', group: 'figures', views: ['Figure at the spinning wheel', 'Figure at the spinning wheel, side view', 'Figure at the spinning wheel, detail', 'Figure at the spinning wheel, rear view'], images: ['gallery/sculptures/46', 'gallery/sculptures/47', 'gallery/sculptures/48', 'gallery/sculptures/49'] },
  { slug: 'figure-on-a-bicycle', code: 'IFA-SC-041', title: 'Figure on a bicycle', discipline: 'sculpture', group: 'figures', images: ['gallery/sculptures/50'], featured: true },
  { slug: 'pair-of-dancers', code: 'IFA-SC-042', title: 'Pair of dancers', discipline: 'sculpture', group: 'figures', images: ['gallery/sculptures/51'] },
  { slug: 'lotus-leaves', code: 'IFA-SC-043', title: 'Lotus leaves', discipline: 'sculpture', group: 'nature', images: ['gallery/sculptures/52'] },
  { slug: 'statue-of-liberty-replica-large', code: 'IFA-SC-044', title: 'Statue of Liberty replica, large', discipline: 'sculpture', group: 'figures', images: ['gallery/sculptures/53'] },
  { slug: 'illuminated-hand-on-a-building', code: 'IFA-SC-046', title: 'Illuminated hand on a building', discipline: 'sculpture', group: 'abstract', images: ['gallery/sculptures/55'] },
  { slug: 'reclining-ganesha', code: 'IFA-SC-047', title: 'Reclining Ganesha', discipline: 'sculpture', group: 'devotional', images: ['gallery/sculptures/56'] },
  { slug: 'leaning-figure-with-a-silver-mane', code: 'IFA-SC-048', codes: ['IFA-SC-048', 'IFA-SC-049', 'IFA-SC-050'], title: 'Leaning figure with a silver mane', discipline: 'sculpture', group: 'abstract', views: ['Leaning figure with a silver mane', 'Leaning figure with a silver mane, side view', 'Leaning figure with a silver mane, front view'], images: ['gallery/sculptures/57', 'gallery/sculptures/58', 'gallery/sculptures/59'], featured: true },
  { slug: 'relief-figure-on-a-rock', code: 'IFA-SC-051', title: 'Relief figure on a rock', discipline: 'sculpture', group: 'figures', images: ['gallery/sculptures/60'] },
  { slug: 'statue-of-freedom-of-press', code: 'IFA-SC-052', title: 'Statue of Freedom of Press', discipline: 'sculpture', group: 'figures', images: ['gallery/sculptures/61'] },
  { slug: 'standing-portrait-statue', code: 'IFA-SC-053', title: 'Standing portrait statue', discipline: 'sculpture', group: 'figures', images: ['gallery/sculptures/62'] },
  { slug: 'figure-at-the-spinning-wheel-large', code: 'IFA-SC-054', codes: ['IFA-SC-054', 'IFA-SC-055'], title: 'Figure at the spinning wheel, large', discipline: 'sculpture', group: 'figures', views: ['Figure at the spinning wheel, large', 'Figure at the spinning wheel, large, side view'], images: ['gallery/sculptures/63', 'gallery/sculptures/64'] },
  { slug: 'wall-of-climbing-figures', code: 'IFA-SC-056', title: 'Wall of climbing figures', discipline: 'sculpture', group: 'figures', images: ['gallery/sculptures/65'] },
  { slug: 'running-figures', code: 'IFA-SC-057', title: 'Running figures', discipline: 'sculpture', group: 'figures', images: ['gallery/sculptures/66'] },
  { slug: 'portrait-statue-clay-model', code: 'IFA-SC-058', codes: ['IFA-SC-058', 'IFA-SC-059', 'IFA-SC-060'], title: 'Portrait statue, clay model', discipline: 'sculpture', group: 'figures', views: ['Portrait statue, clay model', 'Portrait statue, clay model, side view', 'Portrait statue, clay model, three-quarter view'], images: ['gallery/sculptures/67', 'gallery/sculptures/68', 'gallery/sculptures/69'] },
  { slug: 'portrait-statue', code: 'IFA-SC-061', codes: ['IFA-SC-061', 'IFA-SC-062'], title: 'Portrait statue', discipline: 'sculpture', group: 'figures', views: ['Portrait statue', 'Portrait statue, side view'], images: ['gallery/sculptures/70', 'gallery/sculptures/71'] },
  { slug: 'seated-figure-in-meditation', code: 'IFA-SC-063', title: 'Seated figure in meditation', discipline: 'sculpture', group: 'figures', images: ['gallery/sculptures/74'] },
  { slug: 'buddha-head', code: 'IFA-SC-064', title: 'Buddha head', discipline: 'sculpture', group: 'devotional', images: ['gallery/sculptures/75'] },
  { slug: 'figure-holding-a-child', code: 'IFA-SC-065', title: 'Figure holding a child', discipline: 'sculpture', group: 'figures', images: ['gallery/sculptures/76'] },
  { slug: 'tall-standing-figure', code: 'IFA-SC-066', title: 'Tall standing figure', discipline: 'sculpture', group: 'figures', images: ['gallery/sculptures/77'] },
  { slug: 'lion-of-machine-parts', code: 'IFA-SC-068', codes: ['IFA-SC-068', 'IFA-SC-067'], title: 'Lion of machine parts', discipline: 'sculpture', group: 'animals', views: ['Lion of machine parts', 'Lion of machine parts, in the workshop'], images: ['gallery/sculptures/80', 'gallery/sculptures/78'] },
  { slug: 'eagle-and-sword-landmark', code: 'IFA-SC-069', title: 'Eagle and sword landmark', discipline: 'sculpture', group: 'animals', images: ['gallery/sculptures/83'] },
  { slug: 'twisted-ribbon-form', code: 'IFA-SC-070', title: 'Twisted ribbon form', discipline: 'sculpture', group: 'abstract', images: ['gallery/sculptures/84'], featured: true },
  { slug: 'mesh-egg-and-stacked-books', code: 'IFA-SC-071', title: 'Mesh egg and stacked books', discipline: 'sculpture', group: 'abstract', images: ['gallery/sculptures/85'] },
  { slug: 'sliced-figures-on-a-rock', code: 'IFA-SC-072', title: 'Sliced figures on a rock', discipline: 'sculpture', group: 'figures', images: ['gallery/sculptures/86'] },
  { slug: 'chain-of-figures', code: 'IFA-SC-073', title: 'Chain of figures', discipline: 'sculpture', group: 'abstract', images: ['gallery/sculptures/87'] },
  { slug: 'steel-flame-fountain', code: 'IFA-SC-074', title: 'Steel flame fountain', discipline: 'sculpture', group: 'abstract', images: ['gallery/sculptures/88'] },
  { slug: 'seated-figure-on-steps', code: 'IFA-SC-075', title: 'Seated figure on steps', discipline: 'sculpture', group: 'figures', images: ['gallery/sculptures/89'] },
  { slug: 'fountain-sculpture', code: 'IFA-SC-076', title: 'Fountain sculpture', discipline: 'sculpture', group: 'nature', images: ['gallery/sculptures/90'] },

  // MURALS & WALL FEATURES
  { slug: 'relief-frieze-wall', code: 'IFA-GRC-008', title: 'Relief frieze wall', discipline: 'murals', group: 'murals', medium: 'GRC', images: ['gallery/grc_products/12'] },
  { slug: 'figurative-relief-panel', code: 'IFA-GRC-009', title: 'Figurative relief panel', discipline: 'murals', group: 'murals', medium: 'GRC', images: ['gallery/grc_products/13'] },
  { slug: 'botanical-relief-panel', code: 'IFA-GRC-010', title: 'Botanical relief panel', discipline: 'murals', group: 'murals', medium: 'GRC', images: ['gallery/grc_products/14'] },
  { slug: 'lotus-relief-wall', code: 'IFA-GRC-011', title: 'Lotus relief wall', discipline: 'murals', group: 'murals', medium: 'GRC', images: ['gallery/grc_products/15'] },
  { slug: 'woven-leaf-installations', code: 'IFA-MU-001', title: 'Woven leaf installations', discipline: 'murals', images: ['gallery/wall_murals/2'] },
  { slug: 'lit-textured-stone-wall', code: 'IFA-MU-002', title: 'Lit textured stone wall', discipline: 'murals', group: 'wall-features', images: ['gallery/wall_murals/3'] },
  { slug: 'wave-textured-wall-panels', code: 'IFA-MU-003', title: 'Wave-textured wall panels', discipline: 'murals', group: 'wall-features', images: ['gallery/wall_murals/4'] },
  { slug: 'white-tree-relief', code: 'IFA-MU-004', title: 'White tree relief', discipline: 'murals', group: 'murals', images: ['gallery/wall_murals/5'] },
  { slug: 'vase-form-relief-figures', code: 'IFA-MU-005', title: 'Vase-form relief figures', discipline: 'murals', group: 'murals', images: ['gallery/wall_murals/6'] },
  { slug: 'orchid-relief-reception-wall', code: 'IFA-MU-006', title: 'Orchid relief, reception wall', discipline: 'murals', group: 'murals', images: ['gallery/wall_murals/7'] },
  { slug: 'leaf-wall-lights', code: 'IFA-MU-007', title: 'Leaf wall lights', discipline: 'murals', group: 'wall-features', images: ['gallery/wall_murals/8'] },
  { slug: 'metal-leaf-wall-installation', code: 'IFA-MU-008', title: 'Metal leaf wall installation', discipline: 'murals', group: 'murals', images: ['gallery/wall_murals/9'], featured: true },
  { slug: 'metal-leaves-on-a-blue-wall', code: 'IFA-MU-009', title: 'Metal leaves on a blue wall', discipline: 'murals', group: 'wall-features', images: ['gallery/wall_murals/10'] },
  { slug: 'wheat-relief-kitchen-wall', code: 'IFA-MU-010', title: 'Wheat relief, kitchen wall', discipline: 'murals', group: 'murals', images: ['gallery/wall_murals/11'] },
  { slug: 'white-3d-block-panel', code: 'IFA-MU-011', title: 'White 3D block panel', discipline: 'murals', group: 'wall-features', images: ['gallery/wall_murals/14'] },
  { slug: 'metal-swirl-ring', code: 'IFA-MU-012', title: 'Metal swirl ring', discipline: 'murals', group: 'murals', images: ['gallery/wall_murals/15'] },
  { slug: 'metal-pods-on-a-wood-wall', code: 'IFA-MU-013', title: 'Metal pods on a wood wall', discipline: 'murals', group: 'wall-features', images: ['gallery/wall_murals/16'] },
  { slug: 'relief-wall-panels', code: 'IFA-MU-014', title: 'Relief wall panels', discipline: 'murals', group: 'wall-features', images: ['gallery/wall_murals/17'] },
  { slug: 'textured-feature-wall', code: 'IFA-MU-015', title: 'Textured feature wall', discipline: 'murals', group: 'wall-features', images: ['gallery/wall_murals/18'] },
  { slug: 'glass-tile-panel', code: 'IFA-MU-016', title: 'Glass tile panel', discipline: 'murals', group: 'wall-features', images: ['gallery/wall_murals/19'] },
  { slug: 'leaf-wall-art-panel', code: 'IFA-MU-017', title: 'Leaf wall art panel', discipline: 'murals', group: 'murals', images: ['gallery/wall_murals/20'] },
  { slug: 'metal-eagle-wall-art', code: 'IFA-MU-018', title: 'Metal eagle wall art', discipline: 'murals', group: 'murals', images: ['gallery/wall_murals/21'] },
  { slug: 'sunburst-mirror', code: 'IFA-MU-019', title: 'Sunburst mirror', discipline: 'murals', group: 'murals', images: ['gallery/wall_murals/22'] },
  { slug: 'painted-masks-wall', code: 'IFA-MU-020', title: 'Painted masks wall', discipline: 'murals', group: 'wall-features', images: ['gallery/wall_murals/23'] },
  { slug: 'metal-tree-by-a-window', code: 'IFA-MU-021', title: 'Metal tree by a window', discipline: 'murals', images: ['gallery/wall_murals/24'] },
  { slug: 'painted-plates-on-a-stone-wall', code: 'IFA-MU-022', title: 'Painted plates on a stone wall', discipline: 'murals', group: 'wall-features', images: ['gallery/wall_murals/25'] },
  { slug: 'floral-relief-panel', code: 'IFA-MU-023', title: 'Floral relief panel', discipline: 'murals', group: 'murals', images: ['gallery/wall_murals/26'] },
  { slug: 'teal-disc-wall-pieces', code: 'IFA-MU-024', title: 'Teal disc wall pieces', discipline: 'murals', group: 'wall-features', images: ['gallery/wall_murals/27'] },
  { slug: 'metal-figures-wall-and-floor', code: 'IFA-MU-025', title: 'Metal figures, wall and floor', discipline: 'murals', group: 'murals', images: ['gallery/wall_murals/28'] },
  { slug: 'lit-stone-panels-with-water', code: 'IFA-MU-026', title: 'Lit stone panels with water', discipline: 'murals', group: 'wall-features', images: ['gallery/wall_murals/29'] },
  { slug: 'lit-leaf-wall-light', code: 'IFA-MU-027', title: 'Lit leaf wall light', discipline: 'murals', group: 'wall-features', images: ['gallery/wall_murals/30'] },
  { slug: 'tiled-art-panel-lobby', code: 'IFA-MU-028', title: 'Tiled art panel, lobby', discipline: 'murals', group: 'wall-features', images: ['gallery/wall_murals/31'] },
  { slug: 'carved-relief-wall', code: 'IFA-MU-029', title: 'Carved relief wall', discipline: 'murals', group: 'murals', images: ['gallery/wall_murals/32'], featured: true },
  { slug: 'dancers-relief-lobby-wall', code: 'IFA-MU-030', title: 'Dancers relief, lobby wall', discipline: 'murals', group: 'murals', images: ['gallery/wall_murals/33'], featured: true },
  { slug: 'carved-relief-wall-full-length', code: 'IFA-MU-031', title: 'Carved relief wall, full length', discipline: 'murals', group: 'murals', images: ['gallery/wall_murals/34'] },
  { slug: 'illuminated-leaf-wall-lights', code: 'IFA-MU-032', title: 'Illuminated leaf wall lights', discipline: 'murals', group: 'wall-features', images: ['gallery/wall_murals/35'] },

  // PLANTERS & POTS
  { slug: 'faceted-planters', code: 'IFA-PL-001', title: 'Faceted planters', discipline: 'planters', images: ['gallery/planters/1'] },
  { slug: 'classical-urn-planters', code: 'IFA-PL-002', title: 'Classical urn planters', discipline: 'planters', images: ['gallery/planters/2'] },
  { slug: 'elephant-planter', code: 'IFA-PL-003', title: 'Elephant planter', discipline: 'planters', images: ['gallery/planters/3'], featured: true },
  { slug: 'stone-face-planter', code: 'IFA-PL-004', title: 'Stone-face planter', discipline: 'planters', images: ['gallery/planters/4'] },

  // ARCHITECTURAL WORKS IN FRP & GRC
  { slug: '3d-facade-panels', code: 'IFA-GRC-001', codes: ['IFA-GRC-001', 'IFA-GRC-002', 'IFA-GRC-003'], title: '3D façade panels', discipline: 'architectural', medium: 'GRC', views: ['3D façade panels', '3D façade wall', '3D façade, corner detail'], images: ['gallery/grc_products/1', 'gallery/grc_products/2', 'gallery/grc_products/3'], featured: true },
  { slug: 'facade-cladding', code: 'IFA-GRC-004', codes: ['IFA-GRC-004', 'IFA-GRC-005', 'IFA-GRC-006'], title: 'Façade cladding', discipline: 'architectural', medium: 'GRC', views: ['Façade cladding', 'Façade cladding, installation', 'Façade cladding, on site'], images: ['gallery/grc_products/7', 'gallery/grc_products/8', 'gallery/grc_products/9'] },
  { slug: 'heritage-style-facade', code: 'IFA-GRC-007', title: 'Heritage-style façade', discipline: 'architectural', medium: 'GRC', images: ['gallery/grc_products/11'] },
  { slug: 'geometric-jali-screen', code: 'IFA-GRL-001', title: 'Geometric jali screen', discipline: 'architectural', segment: 'jaali-screens', medium: 'GRC', images: ['gallery/grc_products/4'], featured: true },
  { slug: 'geometric-jali-cladding', code: 'IFA-GRL-002', title: 'Geometric jali cladding', discipline: 'architectural', segment: 'jaali-screens', medium: 'GRC', images: ['gallery/grc_products/5'] },
  { slug: 'jali-panel-geometric-pattern', code: 'IFA-GRL-003', title: 'Jali panel, geometric pattern', discipline: 'architectural', segment: 'jaali-screens', medium: 'GRC', images: ['gallery/grc_products/6'] },
  { slug: 'jali-partition', code: 'IFA-GRL-004', title: 'Jali partition', discipline: 'architectural', segment: 'jaali-screens', medium: 'GRC', images: ['gallery/grc_products/10'] },
  { slug: 'jali-gate-and-boundary-screen', code: 'IFA-GRL-005', codes: ['IFA-GRL-005', 'IFA-GRL-006'], title: 'Jali gate and boundary screen', discipline: 'architectural', segment: 'jaali-screens', medium: 'GRC', views: ['Jali gate and boundary screen', 'Jali boundary screen'], images: ['gallery/wall_murals/12', 'gallery/wall_murals/13'] },
  { slug: 'wave-wall-sculpture', code: 'IFA-FRP-001', title: 'Wave wall sculpture', discipline: 'architectural', images: ['gallery/other_products/3'], provisional: true },
  { slug: 'illuminated-lobby-installation', code: 'IFA-FRP-002', title: 'Illuminated lobby installation', discipline: 'architectural', images: ['gallery/other_products/6'], provisional: true },
  { slug: 'sculptural-table', code: 'IFA-FRP-003', codes: ['IFA-FRP-003', 'IFA-FRP-004'], title: 'Sculptural table', discipline: 'architectural', views: ['Sculptural table', 'Sculptural table, lounge view'], images: ['gallery/other_products/8', 'gallery/other_products/9'], provisional: true },
  { slug: 'curved-interior-installation', code: 'IFA-FRP-005', codes: ['IFA-FRP-005', 'IFA-FRP-006', 'IFA-FRP-007'], title: 'Curved interior installation', discipline: 'architectural', views: ['Curved interior installation', 'Curved interior, detail', 'Sphere and curved wall'], images: ['gallery/other_products/11', 'gallery/other_products/12', 'gallery/other_products/13'], provisional: true },
  { slug: 'anchor-and-eagle-landmark', code: 'IFA-FRP-008', title: 'Anchor and eagle landmark', discipline: 'architectural', images: ['gallery/other_products/14'], provisional: true },

  // WATER & GARDEN WORKS
  { slug: 'rockery-pool', title: 'Rockery pool', discipline: 'water-garden', group: 'water', images: ['gallery/water_fountains/1'] },
  { slug: 'illuminated-fountain', title: 'Illuminated fountain', discipline: 'water-garden', group: 'water', images: ['gallery/water_fountains/2'] },
  { slug: 'illuminated-fountain-at-night', title: 'Illuminated fountain at night', discipline: 'water-garden', group: 'water', images: ['gallery/water_fountains/3', 'gallery/water_fountains/5'] },
  { slug: 'bowl-fountain-in-a-garden', title: 'Bowl fountain in a garden', discipline: 'water-garden', group: 'water', images: ['gallery/water_fountains/6'] },
  { slug: 'rock-wall', title: 'Rock wall', discipline: 'water-garden', group: 'rockery', images: ['gallery/water_fountains/7'] },
  { slug: 'stone-sphere-on-a-lawn', title: 'Stone sphere on a lawn', discipline: 'water-garden', group: 'water', images: ['gallery/water_fountains/8'] },
  { slug: 'tiered-fountain-at-an-entrance', title: 'Tiered fountain at an entrance', discipline: 'water-garden', group: 'water', images: ['gallery/water_fountains/9'] },
  { slug: 'stone-water-wall', title: 'Stone water wall', discipline: 'water-garden', group: 'water', images: ['gallery/water_fountains/10'] },
  { slug: 'rockery-stream', title: 'Rockery stream', discipline: 'water-garden', group: 'rockery', images: ['gallery/water_fountains/12', 'gallery/water_fountains/13'] },
  { slug: 'buddha-water-feature', title: 'Buddha water feature', discipline: 'water-garden', group: 'water', images: ['gallery/water_fountains/14'] },
  { slug: 'water-wall', title: 'Water wall', discipline: 'water-garden', group: 'water', images: ['gallery/water_fountains/15'] },
  { slug: 'sphere-fountain', title: 'Sphere fountain', discipline: 'water-garden', group: 'water', images: ['gallery/water_fountains/16', 'gallery/water_fountains/17'], featured: true },
  { slug: 'cascade-wall', title: 'Cascade wall', discipline: 'water-garden', group: 'water', images: ['gallery/water_fountains/18'] },
  { slug: 'fountain-pool', title: 'Fountain pool', discipline: 'water-garden', group: 'water', images: ['gallery/water_fountains/19'] },
  { slug: 'rock-waterfall', title: 'Rock waterfall', discipline: 'water-garden', group: 'rockery', images: ['gallery/water_fountains/20'], featured: true },
  { slug: 'pergola-with-columns', title: 'Pergola with columns', discipline: 'water-garden', group: 'structures', images: ['gallery/other_products/1'] },
  { slug: 'garden-gazebo', title: 'Garden gazebo', discipline: 'water-garden', group: 'structures', images: ['gallery/other_products/2'] },
  { slug: 'pergola-with-columns-second-view', title: 'Pergola with columns, second view', discipline: 'water-garden', group: 'structures', images: ['gallery/other_products/4'] },
  { slug: 'gazebo-with-lattice-screens', title: 'Gazebo with lattice screens', discipline: 'water-garden', group: 'structures', images: ['gallery/other_products/5'] },
  { slug: 'rooftop-pergola', title: 'Rooftop pergola', discipline: 'water-garden', group: 'structures', images: ['gallery/other_products/7'] },
  { slug: 'rockery-entrance', title: 'Rockery entrance', discipline: 'water-garden', group: 'rockery', images: ['gallery/other_products/15'] },
  { slug: 'garden-pergola', title: 'Garden pergola', discipline: 'water-garden', group: 'structures', images: ['gallery/other_products/16'] },
  { slug: 'lattice-pergola', title: 'Lattice pergola', discipline: 'water-garden', group: 'structures', images: ['gallery/other_products/17'] },
]

// The selection shown on the site, in this order: the strongest photographs of sculpture and
// murals, without watermarks, date stamps, replicas or decor pieces. Add a slug here to show it.
const PORTFOLIO = [
  // Sculpture
  'twisted-ribbon-form',
  'lion-of-machine-parts',
  'leaning-figure-with-a-silver-mane',
  'seated-buddha',
  'figure-on-a-bicycle',
  'rhinoceros-in-metal-mesh',
  'stylised-ganesha',
  'runner-around-a-column',
  'embracing-couple',
  'figure-at-the-spinning-wheel',
  'reclining-ganesha',
  'cellist',
  'figure-with-kites',
  'buddha-head',
  'leaping-figure',
  'gandhi-statue',
  'saraswati-with-veena',
  'sliced-figures-on-a-rock',
  'columns-of-climbing-figures',
  'wall-of-climbing-figures',
  'abstract-ring-form',
  'tall-standing-figure',
  // Murals
  'dancers-relief-lobby-wall',
  'carved-relief-wall-full-length',
  'metal-leaf-wall-installation',
  'figurative-relief-panel',
  'relief-frieze-wall',
  'floral-relief-panel',
  'metal-figures-wall-and-floor',
]

// Not works: entries that can be featured by slug (the hero's `heroSlug`) but are never listed
// among the works, counted, or given a work page.
const EXTRA = [
  { slug: 'kiran-adate', title: 'Kiran Adate', discipline: 'sculpture', listed: false, views: ['Portrait of Kiran Adate'], images: ['portrait/kiran-adate'] },
]

const captionFor = (w, i) => (w.views ? w.views[i] : i === 0 ? w.title : `${w.title}, view ${i + 1}`)

const build = (w) => {
  const pics = w.images.map((id, i) => ({
    id,
    alt: w.listed === false ? captionFor(w, i) : `${captionFor(w, i)}, by Kiran Adate`,
    caption: captionFor(w, i),
  }))
  return { ...w, cover: pics[0], gallery: pics.slice(1) }
}

const bySlug = Object.fromEntries(RAW.map((w) => [w.slug, w]))
const missing = PORTFOLIO.filter((slug) => !bySlug[slug])
if (missing.length) throw new Error(`PORTFOLIO lists unknown works: ${missing.join(', ')}`)

// The works shown on the site.
export const projects = PORTFOLIO.map((slug) => build(bySlug[slug]))

// Every shown work and every unlisted entry, by slug (check `listed === false` before linking to a work page).
export const projectBySlug = Object.fromEntries([...projects, ...EXTRA.map(build)].map((p) => [p.slug, p]))
export const projectsFor = (slug) => projects.filter((p) => p.discipline === slug)
export const featuredProjects = projects.filter((p) => p.featured)

// The URL of a single work: /works/<body of work>/<work>
export const workPath = (p) => `/works/${p.discipline}/${p.slug}`

// A wall-label line: the medium where it is known.
export const medium = (p) => p.medium || ''
