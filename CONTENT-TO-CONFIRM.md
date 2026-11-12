# Content to confirm with Kiran Adate (Invent Fine Art)

All content on this site comes from the studio's old website (inventfineart.com, archived in
`../Mine-site/VernoraTech Projects/inventfineart/old data`) and the catalogue prepared for
site-v4 (`site-v4/app/data`, `site-v4/CONTENT-GAPS.md`). Nothing has been invented. These
items still need the owner's confirmation or input before launch.

## Client photographs and press (added 2026-11-12)

The "Kiran Stone" folder gave the site Kiran Adate's own work, the making of it, and press
coverage. See `CLIENT-IMAGES.md` for every file, what is used where, and the fix prompts.

- **Facts now on the site, from Lokmat Times, Nagpur, 7 January 2015** (client's clippings
  `english.jpg`, `english.jpg1.jpg`): from Parali Vaijnath, Beed district; studied at the J.J. School
  of Art, Mumbai; met Vijay Darda at a monsoon exhibition at Jehangir Art Gallery; the Statue of
  Freedom of Press stands at Lokmat Media's printing press in Butibori; the Sculpture of Hawker,
  installed at Samvidhan Square, Nagpur, was unveiled on 6 January 2015 and reported as the
  country's first sculpture of a hawker; the quote on the home page. Confirm these read correctly.
- **Dates** for the Statue (carved Nov 2006 to Mar 2007, installed Apr 2007) and the Hawker (made
  2007, on site Jan 2008) come from the camera dates of the photographs.
- **Working titles** for four stone pieces: "Expectant couple" (2007), "Standing couple",
  "Reclining couple" and "Two torsos" (2012). Ask for their real titles, sizes and where they are.
- **Materials**: the Statue is given as "Stone"; the Hawker has no material yet (it looks like
  welded steel wire). Ask for both.
- **People**: `01102007542-002.jpg` is a black-and-white portrait of a man (2007). If it is Kiran
  Adate, it would suit the About page. The 2012 exhibition photos (`DSC05062.JPG`) need the
  exhibition's name and venue, and permission for the people shown.

## The portfolio (changed 2026-11-06)

The site now shows 29 works (22 sculptures, 7 murals) chosen from the studio catalogue: the
strongest photographs, leaving out watermarked or date-stamped photos, replicas and decor pieces.
The studio's product lines are hidden. To confirm with Kiran Adate:

- **The selection**: which of these 29 are Kiran Adate's own work, and which pieces are missing.
  The list is `PORTFOLIO` in `src/data/projects.js`.
- **The statement**: the text on the home and About pages ("The work moves between the figure and
  the abstract…") describes the works shown; it is not Kiran Adate's own words. Replace it with a
  statement from the artist (`artist.statement` in `src/data/site.js`).
- **Labels**: title, year, material and size for each of the 29 works.

## The artist

The site is presented under Kiran Adate's name, with Invent Fine Art as the studio. The spelling
"Adate" is the one the owner spelt out in the meeting of 2026-10-24 (`decision.txt` line 1248).

- **Personal work or studio work?** In the meeting the owner asked for a personal site with
  "मेरा personal काम" (personal work), awards and current projects, kept apart from the corporate
  work (lines 490 to 576). Every work on this site is from the studio's catalogue. Ask which works
  are Kiran Adate's own, and whether studio commissions should stay here.
- **Awards**: the owner mentioned awards in Kiran Adate's name. Get the names, years and who gave them.
- **December event**: the owner is one of 16 artists selected from India and abroad for an event
  on 3 to 6 December (the meeting mentions both Delhi and Gujarat). Get its name, venue and dates
  and add it to `src/data/exhibitions.js`; the home page will then announce it.
- **Biography**: training, how long Kiran Adate has worked as a sculptor, and a short statement in
  the artist's own words. The statement now on the site is the studio's.
- **Portrait**: the home page now opens with Kiran Adate's studio portrait (navy suit), cut out of its
  white background. The artist section and the About page still use the workshop photo; a photo of
  Kiran Adate at work would suit those best.
- **Domain and email**: kiranadate.com or kiranadate.in was discussed. `site.url` still points to
  inventfineart.com, and the contact email is still the studio's.

## Facts carried over from site-v4's list

| What | Value used now | File |
|---|---|---|
| Founding year | 2008 (old home page; the old about page says 2009) | `src/data/site.js` `since` |
| Certification | "ISO 9001 certified" (the old site says ISO 9001:2008, withdrawn in 2018) | `src/data/site.js` |
| Second email | inventfineart@gmail.com: still in use? | `src/data/site.js` |
| WhatsApp number | +91 93232 10327: is it the WhatsApp number? | `src/data/site.js` |
| Workshop district | "Thane 401203" as on the old site; Nalasopara is now in Palghar district | `src/data/site.js` |
| Client list | the 34 names from the old site (2017): current, and may it be published? | `src/data/site.js` `commissions` |

## Works (`src/data/projects.js`)

- **Titles** describe what each photo shows ("Figure on a bicycle", "Lion of machine parts").
  Ask the studio for each work's own name, and check the ones that name a subject: Gandhi statue,
  Statue of Liberty replica, Saraswati with veena, Stylised Ganesha, Reclining Ganesha,
  Seated Buddha, Buddha head, Statue of Freedom of Press.
- **Material, size, year and site** are known for almost no work. Each work page shows only the
  fields that are filled in (`medium`, `dimensions`, `year`, `location`), so add them as they arrive.
- **Same piece, several photos**: works that share a piece are merged (for example the four photos
  of the figure at the spinning wheel). Check the merges.
- **FRP works** marked `provisional: true` are photos that look fibre-made, used until the studio
  sends real FRP photographs.
- **Subject groups** (Figures & portraits, Devotional, Animals & birds, Abstract & contemporary,
  Garden & nature; Murals / Wall features) were assigned by eye.

## Exhibitions (`src/data/exhibitions.js`)

- Only one exhibition is known: **Vision of Art**, the group show of paintings and sculpture at
  Jehangir Art Gallery, Mumbai, 17 to 23 May 2016, from the poster on the old site. Ask which works
  were shown, and for any other exhibitions, art camps or fairs.

## Text

- The statement, practice and body-of-work texts restate the old site and the owner's words from the
  meeting of 2026-10-24. The notes on steel, stone and bronze (`materials` in `disciplines.js`) are
  general notes, not the owner's words.
- No portrait of the founder or team is on hand. The "studio" photo is the lion in the workshop.
  A photo of the artists at work would be the best single addition.

## Photographs still wanted

- Better photographs of the strongest works: many existing photos are site snapshots, and 71 are
  under 1,200 px wide.
- Designer planters (4 on hand), FRP products (none), installation views.
- The studio, the workshop and the people who make the work.
