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
    intro: 'How a stone work is made in the studio: carved by hand from a single block.',
    steps: [
      { label: 'The block', note: 'A block of stone is chosen and split to size in the stone yard.' },
      { label: 'From the model', note: 'Points are measured off a small model and carried over to the stone with a pointing machine.' },
      { label: 'Roughing out', note: 'The block is cut down to the rough shape of the forms.' },
      { label: 'Carving', note: 'The forms are carved with chisels and grinders, in a cloud of stone dust.' },
      { label: 'Finishing', note: 'The surfaces are worked by hand: some left ribbed or textured, some smoothed and polished.' },
      { label: 'In place', note: 'The finished work.', id: 'self' },
    ],
  },
  metal: {
    name: 'Welded metal',
    intro: 'How a metal figure is made in the studio: a welded frame, built up piece by piece and finished by hand.',
    steps: [
      { label: 'The frame', note: 'The figure begins as a steel frame, welded in the workshop to the drawing.' },
      { label: 'Building up', note: 'The body is built up over the frame, strip by strip or piece by piece.' },
      { label: 'In the workshop', note: 'The joints are ground and the surface finished before the work leaves the workshop.' },
      { label: 'On site', note: 'The work travels to its site and is fixed to its base.' },
      { label: 'In place', note: 'The finished work.', id: 'self' },
    ],
  },
  steel: {
    name: 'Fabricated stainless steel',
    intro: 'How a stainless steel work is made in the studio: cut, formed and welded from sheet and tube, then ground and polished.',
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
    intro: 'How a cast work is made in the studio: modelled in clay, moulded, cast and finished by hand.',
    steps: [
      { label: 'Modelling in clay', note: 'The figure is modelled in clay at full size, over an armature.' },
      { label: 'The mould', note: 'A mould is taken from the clay, in sections.' },
      { label: 'Casting', note: 'The work is cast from the mould, in bronze, fibreglass or resin.' },
      { label: 'Finishing', note: 'The seams are cleaned up and the surface is given its patina or colour.' },
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
      { label: 'Fixing on site', note: 'The panels are fixed to the wall, joined and finished in place, and the lighting is set to bring out the relief.' },
      { label: 'In place', note: 'The finished work.', id: 'self' },
    ],
  },
}
