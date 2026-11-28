/*
  How each kind of work is made in the studio, step by step. Every work page with a known technique
  has a making section: a work with its own dated story (`making` in projects.js, e.g. the Statue
  of Freedom of Press) shows that; any other work shows the steps of the technique it was made by
  (`process` in projects.js), as text, ending with the work itself in place.

  A work's page only ever shows photographs of that work: steps here carry no photographs, and
  `id: 'self'` is the page's own cover. projects.js stops the build if a making step shows a
  photograph that is not the work's own. Set `process` only where the technique is certain (the
  artist's own facts, or unmistakable in the photographs); otherwise leave it out and the page
  shows no making section until the studio says how the work was made.
*/
export const PROCESSES = {
  stone: {
    name: 'Carved stone',
    intro: 'Stone forgives nothing: what is cut away cannot be put back. A stone work is carved by hand from a single block, from the outside in.',
    steps: [
      { label: 'The block', note: 'A block is chosen in the stone yard for its colour and soundness, then split to size.' },
      { label: 'From the model', note: 'Points are taken off the model and carried to the block with a pointing machine, so that the proportions hold at full size.' },
      { label: 'Roughing out', note: 'The block is roughed out to the main masses, with stone left to spare everywhere.' },
      { label: 'Carving', note: 'The forms are brought out with point, claw and flat chisels and with grinders, working all round the block so that no side runs ahead of the others.' },
      { label: 'Finishing', note: 'The surfaces are finished by hand with rasps and abrasives: some left ribbed or textured, some rubbed down to a polish, so that the light can tell them apart.' },
      { label: 'In place', note: 'The finished work.', id: 'self' },
    ],
  },
  metal: {
    name: 'Welded metal',
    intro: 'A metal figure is built, not carved: a welded frame first, then the body added to it piece by piece, and the whole finished by hand.',
    steps: [
      { label: 'The frame', note: 'The figure begins as a steel frame welded to the drawing. The gesture and proportions are settled here, before any surface goes on.' },
      { label: 'Building up', note: 'The body is built up over the frame, strip by strip or piece by piece.' },
      { label: 'In the workshop', note: 'The joints are ground back and the surface finished in the workshop, so that nothing is left to correct on site.' },
      { label: 'On site', note: 'The work travels to its site and is fixed to its base.' },
      { label: 'In place', note: 'The finished work.', id: 'self' },
    ],
  },
  steel: {
    name: 'Fabricated stainless steel',
    intro: 'Stainless steel hides nothing: in a mirror finish every weld and every dent shows. The work is cut, formed and welded from sheet and tube, then ground and polished until it reads as one surface.',
    steps: [
      { label: 'Drawing and model', note: 'The form is drawn and tried out as a small model, then worked out at full size.' },
      { label: 'Cutting and forming', note: 'Stainless steel sheet and tube are cut, rolled and pressed to the curves of the form.' },
      { label: 'Welding', note: 'The pieces are welded together in the workshop, and the welds ground away until the form reads as one surface.' },
      { label: 'Polishing', note: 'The surface is polished to a mirror or brushed to a soft sheen.' },
      { label: 'In place', note: 'The finished work.', id: 'self' },
    ],
  },
  cast: {
    name: 'Modelled and cast',
    intro: 'A cast work is modelled in clay, moulded, cast and finished by hand. The life of the figure is made in the clay; every stage after it is about keeping that life.',
    steps: [
      { label: 'Modelling in clay', note: 'The figure is modelled in clay at full size, over an armature.' },
      { label: 'The mould', note: 'A mould is taken from the clay, in sections.' },
      { label: 'Casting', note: 'The work is cast from the mould, in bronze, fibreglass or resin.' },
      { label: 'Finishing', note: 'The seams are chased and cleaned up, and the patina or colour is laid on.' },
      { label: 'In place', note: 'The finished work.', id: 'self' },
    ],
  },
  relief: {
    name: 'Relief',
    intro: 'How a relief wall is made in the studio: drawn at full size, modelled, cast or fabricated in panels, and fixed to the wall on site.',
    steps: [
      { label: 'Drawing', note: 'The design is drawn at the full size of the wall.' },
      { label: 'Modelling', note: 'The relief is modelled in clay, or cut and formed in metal.' },
      { label: 'Casting', note: 'Modelled panels are moulded and cast, often in GRC (glass-fibre reinforced concrete).' },
      { label: 'Fixing on site', note: 'The panels are fixed, joined and finished in place, and the light is set low and to one side to bring the relief up.' },
      { label: 'In place', note: 'The finished work.', id: 'self' },
    ],
  },
}

/*
  The studio's way of working, for a work whose technique is not yet confirmed: every work page
  then still has its making section, without guessing at a material or a technique it may not
  have been made by (no "Technique" line, no technique's name). It says only what holds for every
  work: drawn, settled in a model, made at full size in the studio's workshop, finished by hand.
  Once the studio says how such a work was made, give it a `process` and this is no longer used.
*/
export const STUDIO_WAY = {
  title: 'From drawing to work',
  intro: 'The path every work takes in the studio, from the first drawing to its place.',
  steps: [
    { label: 'The idea', note: 'A work starts on paper: drawings of the form, its size, and where it will stand.' },
    { label: 'The model', note: 'A small model settles the form in the round before anything is made at full size.' },
    { label: 'At full size', note: 'The work is made at full size in the studio’s workshop, by hand.' },
    { label: 'Finishing', note: 'The surface, colour and base are finished by hand, and the work is looked at from every side.' },
    { label: 'In place', note: 'The finished work.', id: 'self' },
  ],
}
