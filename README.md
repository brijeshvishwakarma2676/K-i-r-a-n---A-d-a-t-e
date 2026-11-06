# Kiran Adate website

Website for Kiran Adate, a sculptor in Mumbai, and Invent Fine Art, the studio of sculptors, painters and designers Kiran Adate leads (since 2008). The artist's name is `site.name` and the studio's is `site.studio` in `src/data/site.js`. It is organised the way an artist's site is: bodies of work, single works with wall labels, exhibitions, the studio's story and record, and a quiet contact page. It is built with React, Vite, Tailwind CSS v4, React Router and Framer Motion.

All content comes from the studio's old website and the catalogue prepared for site-v4. Open items to confirm with the owner are listed in `CONTENT-TO-CONFIRM.md`.

## Run it

```bash
npm install
npm run dev       # local development at http://localhost:5173
npm run build     # production build in dist/
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
- **Rooms:** the page changes colour as you scroll. Each run of sections is wrapped in `<Tone name="…">` (`src/components/Tone.jsx`) or carries `data-tone="…"`; when it crosses the middle of the screen, the whole palette (background, text, lines, accent) fades to that room. Rooms: `light` (limestone), `night` (near black), `clay` (warm sand), `moss` (deep green), `stone` (cool grey), `earth` (geru red). The palettes and the fade are in `src/styles/global.css` under "ROOMS"; a fine grain and a soft pool of light sit behind every room. Home: light hero, night statement and lion, clay works, moss bodies of work, stone studio, light "In place", earth artist. About, Works, the body-of-work pages and work pages have rooms too.

All of it respects the visitor's reduced-motion setting: the page is then shown still, with no curtain.

## Deployment

The site is a single-page app, so the host must send every path to `index.html`:
- Netlify: handled by `public/_redirects`.
- Vercel: handled by `vercel.json`.
- Other hosts: add an equivalent rewrite rule.

Before launch:
- Work through `CONTENT-TO-CONFIRM.md`.
- `site.url` in `src/data/site.js` is set to https://www.inventfineart.com, which canonical and Open Graph URLs use.

SEO note: page titles, descriptions and Open Graph tags are set per page at runtime. Google renders JavaScript, but social link previews and some crawlers do not. For best results, add prerendering (for example `vite-plugin-prerender` or a prerender step on your host) or move the same components to a framework with static generation, such as Astro or Next.js. The components and data files carry over unchanged.

## Dependency versions

Versions are pinned exactly in `package.json`. Each pinned version was at least two weeks old at the time of the build.
