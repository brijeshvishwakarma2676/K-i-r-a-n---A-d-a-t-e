# Kiran Adate website

Website for Kiran Adate, a sculptor in Mumbai, and Invent Fine Art, the studio of sculptors, painters and designers Kiran Adate leads (since 2008). The artist's name is `site.name` and the studio's is `site.studio` in `src/data/site.js`. It is organised the way an artist's site is: bodies of work, single works with wall labels, exhibitions, the studio's story and record, and a quiet contact page. It is built with React, Vite, Tailwind CSS v4, React Router and Framer Motion.

All content comes from the studio's old website and the catalogue prepared for site-v4. Open items to confirm with the owner are listed in `CONTENT-TO-CONFIRM.md`.

## Run it

```bash
npm install
npm run dev       # local development at http://localhost:5173
npm run build     # production build in dist/, every page pre-rendered (see below)
npm run preview   # serve the production build locally
```

You need Node 20 or newer.

## Where things live

```
src/
  data/          All content: studio details, disciplines, projects. Edit these files first.
    site.js         Studio name, contact details, addresses, statement, story, facility, client record
    disciplines.js  The five bodies of work and the materials
    projects.js     All 134 works (IFA catalogue codes), with their photos
    exhibitions.js  Exhibitions (current/upcoming/past is worked out from the date)
    images.js       Index of the photographs in public/img (sizes, colours, responsive files)
  pages/         One file per route: Home, Works, Discipline, Project, About, Contact, NotFound
  sections/      Home page sections, plus the Invitation closing line used on most pages
  components/    Header, Footer, ArtImage, Plate, Lightbox, ProjectCard, Masonry, Seo, motion helpers
  layouts/       RootLayout: header, footer and page transitions
  hooks/         Body scroll lock and dialog focus trap
  styles/        global.css: design tokens (colours, fonts) and shared classes
  utils/         Enquiry submission and the seeded random helper for placeholder plates
```

Routes:

| Path | Page |
| --- | --- |
| `/` | Home |
| `/works` | All works, filterable by body of work |
| `/works/sculpture`, `/works/murals`, `/works/planters`, `/works/architectural`, `/works/water-garden` | Body of work pages |
| `/works/:body/:work` | A single work, one per entry in `projects.js` |
| `/exhibitions` | Current, upcoming and past exhibitions |
| `/about` | Statement, biography, materials and CV |
| `/contact` | Contact form, representation and studio details. `/contact?work=<slug>` starts a message about that work |

## Changing content

Text: edit the files in `src/data/`. Values marked `CONFIRM` still need the owner's confirmation.

This is Kiran Adate's portfolio, not the company catalogue:

- **Which works are shown:** the `PORTFOLIO` list in `src/data/projects.js` (29 works, in order). Every other entry in `RAW` is the studio's archive: not listed, counted or given a page. Add a slug to `PORTFOLIO` to show a work.
- **Bodies of work:** only Sculpture and Murals & Reliefs. Planters, FRP & GRC and Water & Garden are kept in `src/data/disciplines.js` with `archived: true`; their pages show "not found". One line on the Works page and in the footer points to the company site (`site.products` in `src/data/site.js`).
- **Not shown on purpose:** catalogue codes, view counts, client numbers, ISO certification and sales wording. The client list appears only on the About page, as "Selected commissions".

Photographs: each work lists photo ids, for example `images: ['gallery/sculptures/15']`. The ids are keys in `src/data/images.js`, which points to WebP files in `public/img` at 480, 960 and up to 1600 px wide. They were copied from site-v4's optimised set (`site-v4/public/img`). To add a photo, put its WebP files in `public/img`, add an entry to `images.js`, and use its id in `projects.js`. The first photo of a work is its cover.

A work page shows only the label fields that are filled in: `medium`, `dimensions`, `year`, `location`. Add them as the studio supplies them.

The home page's hero work is set by `heroSlug` in `src/sections/Hero.jsx`; the selected works are listed in `src/sections/SelectedWorks.jsx`.

### The home page portrait

The hero has two scenes that take turns every 8 seconds (`SCENE_MS` in `src/sections/Hero.jsx`): "The artist", with the portrait and the name in two lines, and "The work", with one work (`heroSlug`) standing on the name in a single line. `heroSlug` can also be `'kiran-adate'`, the portrait's entry in `EXTRA` in `src/data/projects.js`: it is never listed among the works, and in the hero it links to About. On wide screens the letters of the name glide between the two arrangements. Visitors can pick a scene or pause; the change stops while the hero is off screen and never runs by itself with reduced motion.

The portrait is a cut-out (transparent WebP) from `public/img/portrait/kiran-adate-{480,800,1074}.webp`, set in `src/sections/Hero.jsx` (`portrait`). To replace it, export a new cut-out at the same three widths with a transparent background and the bottom edge cropped straight, then update `w` and `h` there.

## Client photographs

Kiran Adate's own photographs (ids `kiran/…`) are imported by `scripts/import-client-images.py`,
using the list in `scripts/client-images.json`, from three sources: the "Kiran Stone" drive (file
names), the "Kiran Adate" folder in Documents (full paths), and the photographs in his profile PDF
(taken out with `scripts/extract-profile-photos.py` into `client-sources/`, which is not in git).
The script writes WebP files to `public/img/kiran/` and the manifest `src/data/clientImages.js`
(merged into `src/data/images.js`), converting colours to sRGB. Originals are never changed. A
photo whose source is not at hand (drive unplugged) keeps its earlier files. A work can list a
photo that is still waiting for its `fix-` file: it is skipped until imported, then appears.

Some photographs need retouching first. `CLIENT-IMAGES.md` lists each one with a ready-to-use
prompt for an AI image editor. Save the result next to the original as `fix-<original filename>`
and run the script again: a `fix-` file is always preferred, and images that were waiting for one
appear on the site.

```bash
python3 -I scripts/import-client-images.py "/run/media/brijesh/0050-1781/Kiran Stone"   # or no folder
sh scripts/make-avif.sh                      # AVIF copies of new photos (the build checks)
python3 -I scripts/make-share-images.py      # link-preview pictures, if a cover changed
```

Every WebP in `public/img` has an AVIF copy beside it, about half the size, which browsers that
read AVIF are given (`ArtImage`, `Lightbox`, the hero portrait). `npm run build` stops if one is
missing.

## Enquiry form

The contact form validates every field. Until a form service is connected, a valid submission shows a confirmation and offers to open the message in the visitor's email app. Nothing is sent.

To send enquiries for real, set an endpoint that accepts a JSON POST (for example Formspree, Web3Forms or your own API):

```bash
# .env
VITE_ENQUIRY_ENDPOINT=https://your-form-endpoint
```

The request logic is in `src/utils/enquiry.js`.

## Design system

Colours are defined in `src/styles/global.css` under `@theme`:
- Limestone `#E7E3DA` is the page colour.
- Basalt `#262522` is used for dark rooms and the footer.
- Ink `#22211E` is the text colour.
- Geru `#8A3B26`, the red-ochre earth pigment, is the single accent for interactive elements.
- Each body of work adds one material tint (`accent` in `disciplines.js`).
- Work titles are set in italic Cormorant (`.label-title`), as on a gallery wall label.

Type pairs Cormorant Garamond for display with Archivo for text. Small labels use Archivo at an expanded width. Both fonts are self-hosted through Fontsource, so no requests go to Google.

Dark mode tokens are included. `index.html` pins `data-theme="light"` because the site is designed as a light gallery. Remove that attribute to follow the visitor's system setting.

Motion lives in `src/components/Motion.jsx` and `src/layouts/RootLayout.jsx`:

- **Between pages** a basalt curtain rises with the next page's name, then lifts away (not on the first visit).
- **Headings** rise word by word (`SplitText`); text blocks fade up (`Reveal`, `Stagger`).
- **Work photographs** are uncovered from below as they scroll in (`ImageReveal`) and catch a band of light on hover (`.sheen` in `global.css`).
- **Home page**: the hero light follows the pointer and the work turns slightly towards it; the statement brightens word by word as it is scrolled (`ScrollWords`); figures count up (`Counter`); client names drift past in two bands (`Marquee`); the footer name rises letter by letter.
- A thin geru line at the top of the screen shows how far the page has been read (`ScrollProgress`).
- **Background:** one light page colour throughout, with a fine grain and a soft pool of light behind it (`body::before`/`::after` in `src/styles/global.css`); a few sections sit on their own paper or stone panels.

All of it respects the visitor's reduced-motion setting: the page is then shown still, with no curtain.

**Performance.** Everything that moves is animated with `transform` and `opacity`, which the GPU composites without repainting: reveals lift a cover in the page's colour instead of animating `clip-path`, the curtain is two scaled panels, the hero light is a moved gradient disc. Avoid animating CSS variables, `filter`, `clip-path`, `backdrop-filter` or `mix-blend-mode` on large areas: on an ordinary laptop those made scrolling drop to about 20 frames a second. Home-page sections far from the screen use `.cv-auto` (`content-visibility: auto`), so they are not rendered until they come near.

## Speed

The site is built to open fast and scroll smoothly on modest phones. Measured on a phone-class
device (CPU slowed 6×, slow 4G), the main picture or heading appears in about 1 to 3 seconds, and
scrolling holds 60 frames a second. How, and what to keep doing when changing it:

- **Pages arrive ready.** Every page is pre-rendered, and the browser shows it before any script
  runs. React then takes over that same page (`hydrateRoot` in `src/main.jsx`), in small slices
  so the page stays responsive. The first render in the browser must match the HTML exactly. For
  anything the build cannot know, use the hooks in `src/lib`: `useMedia` / `useReducedMotion`
  (screen size, motion setting), `useToday` (today's date), `useHydrated`. Do not read `window`,
  `localStorage` or the date while rendering. A mismatch makes React redraw the page, and shows
  in the console as "Page redrawn instead of reused".
- **Nothing on screen waits for scripts.** Entrances as a page opens are CSS animations
  (`.enter-*`). Reveals while scrolling are CSS transitions started by one shared observer
  (`src/lib/reveal.js`): use `Reveal`, `Stagger`, `SplitText`, `ClipReveal`, `ImageReveal` from
  `src/components/Motion.jsx` rather than framer-motion's `whileInView`, and don't give content
  `initial={{ opacity: 0 }}` on first render. framer-motion is for motion that follows the scroll
  or the pointer, drags, overlays and page changes.
- **Only what a page needs is downloaded.** The Hindi and Marathi dictionaries load when chosen,
  Lenis only on devices with a mouse or trackpad, the placeholder plates only where shown. Every
  section below a page's first screen takes the `cv-auto` class: the browser skips drawing it, and
  its fonts and photos wait, until it comes near.
- **Animate only `transform` and `opacity`**, which the GPU moves without repainting the page.

### Smooth scrolling

Mouse wheels and trackpads glide (Lenis, `src/lib/smoothScroll.js`); phones keep their own touch
scrolling, and visitors who ask for less motion get the browser's normal scrolling. Overlays pause
it through `useLockBody`. Anything that scrolls by itself inside the page needs `data-lenis-prevent`
(or `data-lenis-prevent-horizontal` for a sideways strip), or the wheel will move the page instead.

### Checking locally

`npm run preview` serves `/about` (no trailing slash) with the home page's HTML, so open pages as
`/about/` there; the live host serves each page's own file. `scripts/check-pages.mjs` opens every
page in English and Hindi against a running preview and reports any page that is redrawn instead
of reused, or logs an error (see the top of the script for how to run it). To see the details of a
mismatch, build with React's development checks first: `NODE_ENV=development npm run build`.

## Languages

The site reads in English, Hindi and Marathi; the switch is in the header and the choice is
remembered in the browser. Text is translated by its English wording: `t('Works')` (from `useT()`
in `src/i18n/index.jsx`) looks the sentence up in `src/i18n/hi.js` and `src/i18n/mr.js`. A sentence
with no translation yet shows in English, so new text never breaks a page; add its translation to
both files. Headings given to `SplitText`, quotes given to `ScrollWords` and `<Seo>` titles translate
themselves. Kiran Adate's quote uses his own Hindi and Marathi words from the Lokmat papers of
7 January 2015. Pre-rendered pages are in English; the chosen language applies when the app starts.
The translations should be read by a native speaker before launch (see `CONTENT-TO-CONFIRM.md`).

## Pre-rendering, search and link previews

`npm run build` runs three steps: the normal Vite build, a server build of `src/entry-server.jsx`,
and `scripts/prerender.mjs`, which renders every page (listed in `entry-server.jsx`) to its own
`dist/<path>/index.html` with its title, description, canonical link, link-preview tags and
structured data (schema.org `Person` on the home and About pages, `VisualArtwork` on each work).
It also writes `dist/sitemap.xml`, `dist/robots.txt` and `dist/404.html`, and preloads the two
fonts used on first paint. In the browser the app takes over once the page's code has loaded.

Link previews (WhatsApp, LinkedIn…) use 1200x630 JPEGs in `public/share/`, one per work and
`kiran-adate.jpg` for other pages, made by `python3 -I scripts/make-share-images.py`. The build
stops if a work has none.

## Portfolio PDF

`/portfolio` is the portfolio as A4 landscape sheets, built from the same data. The downloadable
file `public/kiran-adate-portfolio.pdf` (linked from About and Contact) is made from it:

```bash
npm run build
PLAYWRIGHT=/path/to/node_modules/playwright/index.mjs node scripts/make-portfolio-pdf.mjs
npm run build    # copies the new PDF into dist
```

It needs Playwright with Chromium, and Ghostscript (`gs`) to compress the photographs (27 MB to
about 2 MB).

## Films of the work

A work can have a film (`film` in `src/data/projects.js`). Its page then gets an "On film" section:
a still from the work's photographs with a play button, and the video only once it is pressed, so a
film costs visitors nothing until they ask for it. Google also gets the film's details.

```bash
sh scripts/make-film.sh ~/Downloads/hawker-making.mov hawker   # writes public/film/hawker.mp4
```

then add `film: { src: '/film/hawker.mp4', caption: '…', date: 'YYYY-MM-DD', length: '2:40' }` to the
work (the script prints the length). Optional: `poster` (a photo id; default the cover) and
`captions` (a `.vtt` file in `public/film`). The build stops if a film named in the data is missing.
No work has a film yet.

## Visitor statistics

Off until configured: set `site.analytics.cloudflareToken` (Cloudflare Web Analytics, free) or
`site.analytics.plausibleDomain` (Plausible) in `src/data/site.js`. Both are cookie-free, so no
cookie banner is needed.

## Deployment

Every page is a file in `dist/`, so no rewrite to `index.html` is needed and unknown addresses get
`404.html` with a real 404 status:
- Netlify: `public/_redirects` is kept empty on purpose.
- Vercel: `vercel.json` sets the full build (`npm run build`, output `dist`), so every page is a
  file; a project left on plain `vite build` has only the home page and every refresh is a 404.
  It also carries the cache rules and the short links (kept in step by scripts/prerender.mjs).
- Other static hosts: serve `dist/` as files, with `404.html` for missing paths.

Before launch:
- Work through `CONTENT-TO-CONFIRM.md`.
- `site.url` in `src/data/site.js` is set to https://www.inventfineart.com; canonical links, the
  sitemap and link previews use it. Change it when the domain (kiranadate.com or .in) is chosen.

## Dependency versions

Versions are pinned exactly in `package.json`. Each pinned version was at least two weeks old at the time of the build.
