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
    dimensions  size as the artist gives it, e.g. 'H 82 × W 42 × L 82 in'
    segment     product type within Architectural Works (see disciplines.js `vocabulary`)
    medium      material or finish, where known
    views       caption for each photo, in the same order as `images`
    images      photo ids from images.js; the first is the cover. A client photo still waiting
                for its enhanced copy (status "fix" in scripts/client-images.json) is skipped
                until it is imported, then appears by itself
    making      optional dated steps of how the work was made: { date, label, note, id? }, shown
                as a timeline on the work's page (`makingIntro` introduces it)
    beforeAfter optional { before: { id, label }, after: { id, label } }: two photos of the same
                shape, compared with a slider at the top of the making timeline
    turnaround  optional [{ id, label }]: photos from `images` taken around the work, in walking
                order; the work's page lets visitors drag to walk around it
    film        optional film of the work: { src, poster?, caption, date, length?, captions? }.
                `src` is a file in public/film (made with scripts/make-film.sh), `poster` a photo id
                (default: the cover), `date` the day it was published (YYYY-MM-DD, for Google),
                `length` like '2:40', `captions` an optional .vtt file in public/film. Shown on the
                work's page in "On film"; works without a film show no such section.
    featured    shown on the home page
    listed      false keeps an entry out of the works (lists, counts, work pages); see EXTRA

  PORTFOLIO (below RAW) is the curated selection the site shows, in order. Every other entry stays
  in RAW as the studio's archive and is not listed, counted or given a page. To keep the site light,
  the archive's photographs are not shipped (removed 2026-11-23): to bring an archive work back,
  restore its files and images.js lines from git (commit e563811) or from site-v4.
*/

import { images } from './images.js'

const RAW = [
  // SCULPTURE
  // Kiran Adate's own works, from his profile (2026): titles, sizes, materials and texts are his.
  { slug: 'freedom', title: 'Freedom', discipline: 'sculpture', group: 'figures', medium: 'Stainless steel 316, fabricated mesh', dimensions: 'H 102 × W 78 × L 36 in',
    views: ['Freedom', 'Freedom, in the gallery'], images: ['kiran/freedom', 'kiran/freedom-gallery'],
    description: [
      'Freedom is the expression of liberation, hope and the courage to rise beyond limitations. The human figure, with its arms extended towards the sky, embodies openness, confidence and an unrestrained spirit.',
      'The intricate wire structure symbolises the complexity of human experience, while the upward-reaching gesture reflects the desire to break boundaries and embrace endless possibilities.',
    ] },
  { slug: 'beyond-boundaries', title: 'Beyond Boundaries', discipline: 'sculpture', group: 'figures', medium: 'Stainless steel 316', dimensions: 'H 82 × W 42 × L 82 in',
    views: ['Beyond Boundaries', 'Beyond Boundaries, in the gallery'], images: ['kiran/beyond-boundaries', 'kiran/beyond-boundaries-gallery'],
    description: [
      'The sculpture symbolises human ambition, strength and the pursuit of infinite possibilities. The upward-reaching figure represents the determination to overcome limitations, while the circular ring signifies infinity, unity and continuity.',
      'The reflective stainless steel connects the work with its surroundings, celebrating the harmony between human potential and the universe.',
    ] },
  { slug: 'extraction-of-negative-energy', title: 'Extraction of Negative Energy', discipline: 'sculpture', group: 'figures', medium: 'Stainless steel 316', dimensions: 'H 62 × W 42 × D 24 in',
    views: ['Extraction of Negative Energy', 'Extraction of Negative Energy, in the gallery', 'Extraction of Negative Energy, another view'],
    images: ['kiran/extraction-of-negative-energy', 'kiran/extraction-of-negative-energy-front', 'kiran/extraction-of-negative-energy-side'],
    description: [
      'The sculpture represents the act of pulling negative energy out from within. The contorted human figure and the radiating wires symbolise an intense, invisible force drawing out negativity, emotional burdens and inner conflicts.',
      'The dynamic posture captures the struggle and release of this energy: a journey from inner tension towards liberation, balance and renewal.',
    ] },
  { slug: 'eternal-orbit', title: 'Eternal Orbit', discipline: 'sculpture', group: 'abstract', medium: 'Stainless steel 316 on a wooden base', dimensions: 'H 48 × D 16 in',
    views: ['Eternal Orbit', 'Eternal Orbit, from the side', 'Eternal Orbit, in the gallery'], images: ['kiran/eternal-orbit', 'kiran/eternal-orbit-side', 'kiran/eternal-orbit-gallery'],
    description: [
      'A celebration of balance, continuity and the eternal rhythm of life. The flowing metal forms make an infinite loop, while the suspended spheres stand for moments, energies or people moving within the larger cycle of existence.',
      'The sculpture explores the relationship between motion and stillness, the individual and the whole. The intertwined curves follow the continuous journey of life, and the reflective spheres mirror the world around them: we are all connected within an ever-changing whole.',
    ] },
  { slug: 'kinetic-equilibrium', title: 'Kinetic Equilibrium', discipline: 'sculpture', group: 'abstract', medium: 'Stainless steel 316', dimensions: 'H 68 × W 9 × L 9 in',
    views: ['Kinetic Equilibrium', 'Kinetic Equilibrium, in the gallery'], images: ['kiran/kinetic-equilibrium', 'kiran/kinetic-equilibrium-gallery'],
    description: [
      'An abstract kinetic sculpture about the delicate relationship between movement and balance. Suspended at a single point of balance, its geometric forms create a dynamic interplay of tension, motion and stability: harmony within constant change.',
    ] },
  { slug: 'hugging', title: 'Hugging', discipline: 'sculpture', group: 'figures', medium: 'Black marble, carved from one block', dimensions: 'H 29 × W 9 × L 16 in',
    views: ['Hugging', 'Hugging, from the front', 'Hugging, from the side'], images: ['kiran/hugging', 'kiran/hugging-front', 'kiran/hugging-side'],
    description: [
      '“The emotion of human nature.” The sculpture celebrates the universal human need for love, connection and emotional security. The embracing figures express warmth, trust and togetherness through their intertwined forms and gentle curves.',
      'Carved in stone, it holds an intimate moment where words become unnecessary and emotions speak through touch: the desire to give love, receive comfort and find strength in one another.',
    ] },
  { slug: 'spectator', title: 'Spectator', discipline: 'sculpture', group: 'figures', medium: 'Black marble, carved from one block', dimensions: 'H 35 × W 9 × L 14 in',
    views: ['Spectator', 'Spectator, from the front'], images: ['kiran/spectator', 'kiran/spectator-front'],
    description: [
      'Carved from a single block of black marble, Spectator embodies the silent presence of an observer. Its layered textures and faceless form stand for the complexity of human experience and the emotions hidden beneath the surface.',
      'The sculpture invites reflection on the fine line between watching life unfold and taking part in it.',
    ] },
  { slug: 'couple', title: 'Couple', discipline: 'sculpture', group: 'figures', medium: 'Bronze', dimensions: 'H 30 × W 8 × L 19 in',
    views: ['Couple', 'Couple, from the front'], images: ['kiran/couple', 'kiran/couple-front'],
    description: [
      'The sculpture represents the emotional bond between two people: love, trust and togetherness. Their close embrace and contrasting textures reflect the beauty of human relationships and the unspoken connection that unites two souls.',
    ] },
  // Installations from the client's photographs (2026). Titles describe what the photos show:
  // working titles until the studio names them (see CONTENT-TO-CONFIRM.md).
  { slug: 'figure-in-flight', title: 'Figure in flight', discipline: 'sculpture', group: 'figures', images: ['kiran/figure-in-flight'] },
  { slug: 'polished-oval-with-an-opening', title: 'Polished oval with an opening', discipline: 'sculpture', group: 'abstract',
    views: ['Polished oval with an opening', 'Polished oval with an opening, at the entrance', 'Polished oval with an opening, from the side'],
    images: ['kiran/polished-oval', 'kiran/polished-oval-entrance', 'kiran/polished-oval-side'] },
  { slug: 'ribbon-in-a-reception-lobby', title: 'Ribbon in a reception lobby', discipline: 'sculpture', group: 'abstract',
    views: ['Ribbon in a reception lobby', 'Ribbon in a reception lobby, from the side', 'Ribbon in a reception lobby, with the reception desk'],
    images: ['kiran/lobby-ribbon', 'kiran/lobby-ribbon-side', 'kiran/lobby-ribbon-wide'] },
  { slug: 'column-of-mirrored-cubes', title: 'Column of mirrored cubes', discipline: 'sculpture', group: 'abstract',
    views: ['Column of mirrored cubes', 'Column of mirrored cubes, being installed'], images: ['kiran/cube-column', 'kiran/cube-column-installing'] },
  { slug: 'twisted-form-on-a-terrace', title: 'Twisted form on a terrace', discipline: 'sculpture', group: 'abstract',
    views: ['Twisted form on a terrace', 'Twisted form on a terrace, from the side', 'Twisted form on a terrace, another view'],
    images: ['kiran/terrace-twist', 'kiran/terrace-twist-side', 'kiran/terrace-twist-view'] },
  { slug: 'interlocking-rings', title: 'Interlocking rings', discipline: 'sculpture', group: 'abstract',
    views: ['Interlocking rings, in the workshop', 'Interlocking rings, in the workshop, another view'], images: ['kiran/interlocking-rings', 'kiran/interlocking-rings-side'] },
  { slug: 'folded-steel-form', title: 'Folded steel form', discipline: 'sculpture', group: 'abstract',
    views: ['Folded steel form', 'Folded steel form, another view'], images: ['kiran/folded-form', 'kiran/folded-form-side'] },
  { slug: 'tall-twisting-form', title: 'Tall twisting form', discipline: 'sculpture', group: 'abstract', images: ['kiran/tall-twisting-form'] },
  { slug: 'steel-arch', title: 'Steel arch', discipline: 'sculpture', group: 'abstract', images: ['kiran/steel-arch'] },
  { slug: 'rings-of-steel-rod-in-a-garden', title: 'Rings of steel rod in a garden', discipline: 'sculpture', group: 'abstract', images: ['kiran/garden-rings'] },
  { slug: 'pierced-steel-lanterns', title: 'Pierced steel lanterns', discipline: 'sculpture', group: 'nature',
    views: ['Pierced steel lanterns', 'Pierced steel lanterns, at night', 'A pierced steel lantern among pebbles', 'Pierced steel lanterns in a row'],
    images: ['kiran/lanterns', 'kiran/lanterns-night', 'kiran/lantern-among-pebbles', 'kiran/lanterns-row'] },
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
  { slug: 'sculpture-of-hawker', code: 'IFA-SC-041', title: 'Sculpture of Hawker', discipline: 'sculpture', group: 'figures', year: '2007–08', location: 'Samvidhan Square, Nagpur', featured: true,
    views: ['Sculpture of Hawker', 'Sculpture of Hawker, detail', 'Sculpture of Hawker, side view', 'Sculpture of Hawker, from behind'],
    images: ['kiran/hawker-front', 'kiran/hawker-detail', 'kiran/hawker-side', 'kiran/hawker-back'],
    beforeAfter: { before: { id: 'kiran/hawker-frame', label: 'The frame, 2007' }, after: { id: 'kiran/hawker-front', label: 'Finished' } },
    turnaround: [{ id: 'kiran/hawker-front', label: 'Front' }, { id: 'kiran/hawker-side', label: 'Side' }, { id: 'kiran/hawker-back', label: 'Back' }],
    makingIntro: 'From the first frame in the workshop in September 2007 to the unveiling in Nagpur in January 2015. Dates are from the photographs taken along the way.',
    making: [
      { date: 'September 2007', label: 'The frame', note: 'The figure and the bicycle begin as a frame in the workshop.', id: 'kiran/hawker-frame' },
      { date: 'September 2007', label: 'Building up', note: 'The figure is built up over the frame.', id: 'kiran/hawker-welding' },
      { date: 'September 2007', label: 'In the workshop', note: 'The sculpture nearly complete, in the workshop.', id: 'kiran/hawker-workshop' },
      { date: 'January 2008', label: 'On site', note: 'In Nagpur, before installation.', id: 'kiran/hawker-gate' },
      { date: '6 January 2015', label: 'Unveiled', note: 'Unveiled at Samvidhan Square, Nagpur, and reported as the country’s first sculpture of a hawker.', id: 'kiran/hawker-unveiling' },
    ],
    description: [
      'A newspaper hawker on his bicycle, holding up the day’s paper. Installed by Lokmat Media at Samvidhan Square in Nagpur, it was unveiled on 6 January 2015 by a senior hawker, Gajanan Meshram, in the presence of the Chief Minister of Maharashtra, Devendra Fadnavis, and reported as the country’s first sculpture of a hawker.',
      '“Capturing the laborious devotion and commitment of the hawker, who, irrespective of seasons – rainy, summer or winter, carries out his task, was a challenge. It was this challenge that strengthened my conviction and this is how I could create the Sculpture of Hawker.” Kiran Adate, in Lokmat Times, January 2015.',
    ] },
  { slug: 'pair-of-dancers', code: 'IFA-SC-042', title: 'Pair of dancers', discipline: 'sculpture', group: 'figures', images: ['gallery/sculptures/51'] },
  { slug: 'lotus-leaves', code: 'IFA-SC-043', title: 'Lotus leaves', discipline: 'sculpture', group: 'nature', images: ['gallery/sculptures/52'] },
  { slug: 'statue-of-liberty-replica-large', code: 'IFA-SC-044', title: 'Statue of Liberty replica, large', discipline: 'sculpture', group: 'figures', images: ['gallery/sculptures/53'] },
  { slug: 'illuminated-hand-on-a-building', code: 'IFA-SC-046', title: 'Illuminated hand on a building', discipline: 'sculpture', group: 'abstract', images: ['gallery/sculptures/55'] },
  { slug: 'reclining-ganesha', code: 'IFA-SC-047', title: 'Reclining Ganesha', discipline: 'sculpture', group: 'devotional', images: ['gallery/sculptures/56'] },
  { slug: 'leaning-figure-with-a-silver-mane', code: 'IFA-SC-048', codes: ['IFA-SC-048', 'IFA-SC-049', 'IFA-SC-050'], title: 'Leaning figure with a silver mane', discipline: 'sculpture', group: 'abstract', views: ['Leaning figure with a silver mane', 'Leaning figure with a silver mane, side view', 'Leaning figure with a silver mane, front view'], images: ['gallery/sculptures/57', 'gallery/sculptures/58', 'gallery/sculptures/59'], featured: true },
  { slug: 'relief-figure-on-a-rock', code: 'IFA-SC-051', title: 'Relief figure on a rock', discipline: 'sculpture', group: 'figures', images: ['gallery/sculptures/60'] },
  { slug: 'statue-of-freedom-of-press', code: 'IFA-SC-052', title: 'Statue of Freedom of Press', discipline: 'sculpture', group: 'figures', medium: 'Stone', year: 2007, location: 'Lokmat Media printing press, Butibori, Nagpur', featured: true,
    views: ['Statue of Freedom of Press, at night', 'Statue of Freedom of Press, detail', 'Statue of Freedom of Press, by day, with its plaque'],
    images: ['kiran/freedom-of-press-night', 'kiran/freedom-of-press-night-close', 'kiran/freedom-of-press-day'],
    beforeAfter: { before: { id: 'kiran/freedom-of-press-team', label: 'Roughing out, 2006' }, after: { id: 'kiran/freedom-of-press-in-the-yard', label: 'Finished, 2007' } },
    makingIntro: 'From the raw block in November 2006 to the statue at Butibori in April 2007. Dates are from the photographs taken along the way.',
    making: [
      { date: 'November 2006', label: 'The block', note: 'The block is split to size in the stone yard.', id: 'kiran/freedom-of-press-block' },
      { date: 'November 2006', label: 'Roughing out', note: 'The block is cut down to the rough shape of the two figures.', id: 'kiran/freedom-of-press-team' },
      { date: 'December 2006', label: 'Carving', note: 'The forms are carved, in a cloud of stone dust.', id: 'kiran/freedom-of-press-dust' },
      { date: 'December 2006', label: 'The figures', note: 'The two figures, and the newspaper across their laps, take shape.', id: 'kiran/freedom-of-press-carving' },
      { date: 'March 2007', label: 'Finished', note: 'The finished statue in the stone yard, before it leaves for Nagpur.', id: 'kiran/freedom-of-press-in-the-yard' },
      { date: 'April 2007', label: 'Installed', note: 'Installed at Lokmat Media’s printing press in Butibori, Nagpur.' },
    ],
    description: [
      'Two figures sit side by side, reading the newspaper that lies across their laps. The idea came from Vijay Darda, chairman of the Editorial Board of Lokmat Media; the statue stands at Lokmat Media’s printing press in Butibori, Nagpur.',
      'Carved from a block of stone between November 2006 and March 2007, and installed in April 2007.',
    ] },
  // Kiran Adate's own stone works, from the client's photographs (titles are working titles: see CONTENT-TO-CONFIRM.md)
  { slug: 'expectant-couple', title: 'Expectant couple', discipline: 'sculpture', group: 'figures', medium: 'Stone', year: 2007, views: ['Expectant couple', 'Expectant couple, in the stone yard', 'Expectant couple, from the side'], images: ['kiran/expectant-couple', 'kiran/expectant-couple-front', 'kiran/expectant-couple-side'] },
  { slug: 'standing-couple', title: 'Standing couple', discipline: 'sculpture', group: 'figures', medium: 'Stone', year: 2012, views: ['Standing couple', 'Standing couple, in the stone yard'], images: ['kiran/standing-couple', 'kiran/standing-couple-in-the-yard'] },
  { slug: 'reclining-couple', title: 'Reclining couple', discipline: 'sculpture', group: 'figures', medium: 'Stone', year: 2012, views: ['Reclining couple', 'Reclining couple, from above'], images: ['kiran/reclining-couple', 'kiran/reclining-couple-above'] },
  { slug: 'two-torsos', title: 'Two torsos', discipline: 'sculpture', group: 'figures', medium: 'Stone', year: 2012, images: ['kiran/two-torsos'] },
  { slug: 'stone-column', title: 'Stone column', discipline: 'sculpture', group: 'abstract', medium: 'Stone', images: ['kiran/stone-column'] },
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
  { slug: 'sliced-figures-on-a-rock', code: 'IFA-SC-072', title: 'Sliced figures on a rock', discipline: 'sculpture', group: 'figures', images: ['kiran/sliced-figures-on-a-rock', 'gallery/sculptures/86'] },
  { slug: 'chain-of-figures', code: 'IFA-SC-073', title: 'Chain of figures', discipline: 'sculpture', group: 'abstract', images: ['gallery/sculptures/87'] },
  { slug: 'steel-flame-fountain', code: 'IFA-SC-074', title: 'Steel flame fountain', discipline: 'sculpture', group: 'abstract', images: ['gallery/sculptures/88'] },
  { slug: 'seated-figure-on-steps', code: 'IFA-SC-075', title: 'Seated figure on steps', discipline: 'sculpture', group: 'figures', images: ['gallery/sculptures/89'] },
  { slug: 'fountain-sculpture', code: 'IFA-SC-076', title: 'Fountain sculpture', discipline: 'sculpture', group: 'nature', images: ['gallery/sculptures/90'] },

  // MURALS & WALL FEATURES
  // From the client's photographs (2026). Soaring Higher is named on its plaque; the others have working titles.
  { slug: 'soaring-higher', title: 'Soaring Higher', discipline: 'murals', group: 'murals', year: 2023, medium: 'Stainless steel, 1,733 handmade pieces', dimensions: '74 ft wall',
    images: ['kiran/soaring-higher'],
    description: [
      'A kinetic wall installation for SBICAPS, made in 2023 by The Good Edge with Invent Fine Art. It is inspired by murmuration, when great flocks of birds make shifting, synchronised waves across the sky.',
      'Across a 74-foot wall, 1,733 handmade stainless steel pieces stir with the slightest air current, as the birds turn into the “seeds of progress” of the SBICAPS emblem and back again, in the brand’s own colours.',
    ] },
  { slug: 'flowing-wall-installation', title: 'Flowing wall installation', discipline: 'murals', group: 'wall-features',
    views: ['Flowing wall installation', 'Flowing wall installation, in a bedroom', 'Flowing wall installation, closer'],
    images: ['kiran/flowing-wall', 'kiran/flowing-wall-room', 'kiran/flowing-wall-detail'] },
  { slug: 'lit-relief-in-a-lounge', title: 'Lit relief in a lounge', discipline: 'murals', group: 'murals', images: ['kiran/lit-relief'] },
  { slug: 'gold-and-black-relief-wall', title: 'Gold and black relief wall', discipline: 'murals', group: 'murals', images: ['kiran/gold-relief-wall'] },
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
  // Sculpture: Kiran Adate's own works from his profile first, then the public works and stone pieces
  'freedom',
  'beyond-boundaries',
  'extraction-of-negative-energy',
  'eternal-orbit',
  'kinetic-equilibrium',
  'hugging',
  'spectator',
  'couple',
  'statue-of-freedom-of-press',
  'sculpture-of-hawker',
  'figure-in-flight',
  'polished-oval-with-an-opening',
  'ribbon-in-a-reception-lobby',
  'column-of-mirrored-cubes',
  'twisted-form-on-a-terrace',
  'interlocking-rings',
  'folded-steel-form',
  'tall-twisting-form',
  'steel-arch',
  'rings-of-steel-rod-in-a-garden',
  'pierced-steel-lanterns',
  'expectant-couple',
  'standing-couple',
  'reclining-couple',
  'two-torsos',
  'stone-column',
  'twisted-ribbon-form',
  'lion-of-machine-parts',
  'leaning-figure-with-a-silver-mane',
  'seated-buddha',
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
  'soaring-higher',
  'flowing-wall-installation',
  'lit-relief-in-a-lounge',
  'gold-and-black-relief-wall',
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
  // Photos not imported yet (waiting for an enhanced copy) are left out; captions keep their places.
  const pics = w.images.flatMap((id, i) => (images[id] ? [{
    id,
    alt: w.listed === false ? captionFor(w, i) : `${captionFor(w, i)}, by Kiran Adate`,
    caption: captionFor(w, i),
  }] : []))
  // The making: dated steps, each with an optional photograph.
  const making = w.making?.map((s) => ({
    ...s,
    image: s.id ? { id: s.id, alt: `${w.title}: ${s.note}`, caption: `${s.label}, ${s.date}. ${s.note}` } : null,
  }))
  // Walk around: views (from `images`) in the order of a walk around the work.
  const turnaround = w.turnaround?.map((t) => ({ label: t.label, image: pics.find((p) => p.id === t.id) }))
  // Before and after: { before, after } each { id, label }, compared with a slider.
  const side = (s) => s && { label: s.label, image: { id: s.id, alt: `${w.title}: ${s.label}` } }
  const beforeAfter = w.beforeAfter && { before: side(w.beforeAfter.before), after: side(w.beforeAfter.after) }
  // Film: the still shown before it plays is a photo of the work (the cover unless named).
  const film = w.film && { ...w.film, poster: w.film.poster ? { id: w.film.poster, alt: '' } : { ...pics[0], alt: '' } }
  return { ...w, cover: pics[0], gallery: pics.slice(1), making, turnaround, beforeAfter, film }
}

const bySlug = Object.fromEntries(RAW.map((w) => [w.slug, w]))
const noPhoto = PORTFOLIO.filter((slug) => bySlug[slug] && !bySlug[slug].images.some((id) => images[id]))
if (noPhoto.length) throw new Error(`These works have no imported photo yet: ${noPhoto.join(', ')}`)
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
