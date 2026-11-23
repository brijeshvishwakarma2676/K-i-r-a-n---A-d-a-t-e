# Client photographs ("Kiran Stone")

Source folder: `/run/media/brijesh/0050-1781/Kiran Stone` (145 JPEGs, one folder, plus a Windows
`Thumbs.db`). The originals are never changed. The site uses web copies made by
`scripts/import-client-images.py` from the list in `scripts/client-images.json`.

**How fixes work.** Save an enhanced image next to its original as `fix-<original filename>` (same
name, same extension, with `fix-` in front), then run:

```bash
python3 -I scripts/import-client-images.py "/run/media/brijesh/0050-1781/Kiran Stone"
```

The script uses a `fix-` file whenever one exists, for every entry. Images marked **waiting** below
appear on the site only once their `fix-` file exists; images marked **ready** are already on the
site and are replaced by their `fix-` version automatically if one is made.

What the photographs are: Kiran Adate's own work. The **Statue of Freedom of Press** (stone,
carved Nov 2006 to Mar 2007, Lokmat Media printing press, Butibori, Nagpur), the **Sculpture of
Hawker** (made in 2007, installed at Samvidhan Square, Nagpur, unveiled 6 January 2015), stone
figures from 2007 and 2012, and press coverage from January 2015. Dates come from the camera data;
facts come from the Lokmat Times clipping of 7 January 2015 (`english.jpg`, `english.jpg1.jpg`).

---

## 1. On the site now (ready, 31 images)

| Original | Site id | Where it is used |
|---|---|---|
| `IMG_0740edit.jpg` | kiran/freedom-of-press-night | Statue of Freedom of Press: cover |
| `IMG_0734.JPG` | kiran/freedom-of-press-night-close | Statue page; About: full-width plate |
| `Freedom of Press Sculpture at Lokmat.png` (cleaned version supplied separately, in ~/Downloads) | kiran/freedom-of-press-day | Home: the large plate; Statue page, third view |
| `IMG_0639.JPG` | kiran/freedom-of-press-in-the-yard | Home: "From block to statue" 05; Statue page |
| `IMG_0442.JPG` | kiran/freedom-of-press-carving | Home: "From block to statue" 04; Statue page |
| `IMG_0266.JPG` | kiran/freedom-of-press-block | Home: "From block to statue" 01; Statue page |
| `IMG_0283.JPG` | kiran/freedom-of-press-team | Home: "From block to statue" 02; Statue page |
| `IMG_0427.JPG` | kiran/freedom-of-press-dust | Home: "From block to statue" 03; Statue page |
| `IMG_1090.jpg` | kiran/hawker-front | Home hero, scene 02; Sculpture of Hawker: cover |
| `IMG_1095.jpg` | kiran/hawker-detail | Sculpture page (body of work): context plate; Hawker page |
| `IMG_1091.jpg` | kiran/hawker-side | Hawker page |
| `IMG_1093.jpg` | kiran/hawker-back | Hawker page |
| `IMG_0093.jpg` | kiran/hawker-gate | Home: "In place"; Hawker page |
| `03092007380.jpg` | kiran/hawker-frame | Hawker page (process) |
| `20092007457.jpg` | kiran/hawker-welding | Hawker page (process) |
| `23092007485.jpg` | kiran/hawker-workshop | About: the workshop; Hawker page |
| `MSR_2093.JPG` | kiran/hawker-unveiling | Hawker page: the unveiling, 6 January 2015 |
| `kiran1.jpg` | kiran/expectant-couple | Expectant couple: cover; Home: Selected works |
| `IMG_0584.JPG` | kiran/expectant-couple-front | Expectant couple page |
| `07.JPG` | kiran/expectant-couple-side | Expectant couple page |
| `DSC02065.jpg` | kiran/standing-couple | Standing couple: cover; Home: Selected works |
| `DSC02064.JPG` | kiran/standing-couple-in-the-yard | Standing couple page |
| `DSC02063.JPG` | kiran/reclining-couple | Reclining couple: cover; Home: Selected works |
| `DSC02062.jpg` | kiran/reclining-couple-above | Reclining couple page |
| `DSC02061.jpg` | kiran/two-torsos | Two torsos: cover; Sculpture (body of work): cover; Home: Bodies of work |
| `DSC02055.JPG` | kiran/carving-with-a-pointing-machine | Home: artist section; About |
| `english.jpg` | kiran/press-lokmat-times-front | About › Press; Hawker page › In the press |
| `english.jpg1.jpg` | kiran/press-lokmat-times-adate | About › Press; Hawker page › In the press |
| `hindi.jpg` | kiran/press-lokmat-samachar-front | About › Press; Hawker page › In the press |
| `hindi.jpg1.jpg` | kiran/press-lokmat-samachar-inside | About › Press; Hawker page › In the press |
| `7 jan 2015 lokmat.jpg` | kiran/press-lokmat-marathi | About › Press; Hawker page › In the press |

The clippings are shown as pages that open full size, and are also the source of the artist's quote
(home page, Hawker page) and the biography (Parali Vaijnath, J.J. School of Art).

---

## 2. Waiting for a fixed version (not on the site until `fix-` exists)

**Fixes received 2026-11-23** (saved as `.png` in `~/Documents/Kiran Adate/`) and checked by eye
against the originals. An AI fix may only clean the photograph; if it changes the sculpture itself,
it cannot be used, because the site would show a work Kiran Adate did not make.

| Fix | Result |
|---|---|
| `fix-IMG_0005 (33).png` | **Used**: the form matches the original; shown as the new work "Stone column" (working title) |
| `fix-DSC05062.png` | **Imported, not shown**: faithful; still needs the exhibition and the two people confirmed |
| `fix-IMG_0765.png` | **Not used**: the stone figures were given realistic faces, hair and clothes; the real sculpture's heads are smooth and abstract. Redo it and tell the tool not to touch the figures (or mask them) |
| `fix-02102007557.png` | **Not used**: the figure got a face and a different raised hand, and the whole background was invented |
| `fix-29092007535.png` | **Not used**: the sculpture got a face and a scaled surface; the worker at the back is a different face |
| `fix-000 (1).png` | **Not used**: the rods inside the frame are a different number and arrangement |
| `fix-IMG_0092.png` | **Not used**: wrong picture. It shows the Freedom of Press statue at sunset, not the Hawker by day |

An entry in `scripts/client-images.json` points at a fix kept elsewhere with `"fix": "<full path>"`.
A `fix-` file next to the original may now be `.jpg`, `.png` or `.webp`.

### `IMG_0765.JPG` → `fix-IMG_0765.JPG`
Statue of Freedom of Press at sunset, in front of the Lokmat building (to be used as kiran/freedom-of-press-sunset).

> Edit this photograph of an outdoor stone sculpture at sunset. Remove the orange date stamp "04/05/2007 18:22" in the bottom-right corner and rebuild the grass underneath it. Remove the man walking past on the left of the plinth and any other passer-by, filling the area with the matching grass, plinth and building behind. The sculpture is backlit: lift the shadows on the two seated stone figures and the stepped plinth so the carving and the newspaper read clearly, while keeping the warm sunset sky, the fountain and the building. Correct a slight tilt so the building and plinth edges are level. Reduce noise, sharpen gently, keep colours natural and warm. Do not change the shape, proportions or texture of the sculpture, and do not add anything new. Output at the original size, 1600 × 1200 or larger.

### `IMG_0092.jpg` → `fix-IMG_0092.jpg`
Sculpture of Hawker, full side view on site, 2008 (to be used as kiran/hawker-wide).

> Clean up this daylight photograph of a life-size metal sculpture of a newspaper hawker riding a bicycle, standing on a rusted steel base plate on a paved road. Remove the clutter around it: the white sacks and bags on the ground, the table, the tools and debris behind and beside the sculpture, so the paving, kerb and garden behind look tidy and continuous. Keep the steel base plate, the bicycle and every part of the figure exactly as they are. Balance the exposure so the bright sky is not blown out and the dark metal figure shows its wound-wire texture; neutral white balance, crisp but natural sharpening. Do not alter the sculpture's shape or add any objects. Output at 2592 × 1944.

### `02102007557.jpg` → `fix-02102007557.jpg`
Sculpture of Hawker at night under street light, 2007 (to be used as kiran/hawker-night).

> Restore this night photograph of a metal sculpture of a man on a bicycle holding up a newspaper, taken under orange sodium street light with a phone camera. Correct the heavy orange colour cast towards a neutral, slightly warm night tone so the dark metal reads as bronze-brown and steel; reduce the strong noise and blotchiness; recover detail in the figure and the bicycle wheels. Remove the ladder on the right and darken the cluttered background into a clean, deep night background. Keep the sculpture exactly as it is. Increase resolution to about 3000 px on the long side with realistic, not painterly, detail.

### `29092007535.jpg` → `fix-29092007535.jpg`
Finishing the Sculpture of Hawker in the workshop, 2007 (to be used as kiran/hawker-finishing).

> Correct this washed-out workshop photograph of two craftsmen finishing a life-size metal sculpture of a cyclist. The image is overexposed with a purple-white glare from the work lights: restore normal exposure and contrast, bring back the colour of the dark metal figure, the bicycle and the workers' clothes, and tame the blown highlights in the background. Neutral white balance, moderate noise reduction, natural sharpening. Keep the people and the workshop as they are (this is a documentary process photo); do not change faces or add anything. Output at 1536 × 2048 or larger.

### `DSC05062.JPG` → `fix-DSC05062.JPG`
Exhibition view, April 2012: two men beside a stone sculpture on a white plinth in a gallery (to be used as kiran/exhibition-2012). **Confirm the exhibition (name, venue) and who is pictured before this is published.**

> Enhance this small, low-resolution (480 × 640) photograph taken in an art gallery: two men standing either side of a stone sculpture on a white plinth, with framed works on the walls. Upscale 4× to about 1920 × 2560 with realistic detail. Correct the yellow cast to neutral gallery white, reduce noise and JPEG artefacts, sharpen the sculpture's stone texture. Preserve both people's faces and identities exactly: no beautification, no reshaping. Do not add or remove anything.

### `000 (1).JPG` → `fix-000 (1).JPG`
A pink sandstone frame with thin dark rods inside, a small studio sculpture (to be used as kiran/stone-frame).

> Upscale and clean this small (480 × 640) product photo of a pink sandstone sculpture: an upright rough-cut stone frame with a rectangular opening, holding a cluster of thin dark vertical rods. Upscale 4× to about 1920 × 2560 with realistic stone grain (do not invent new carving). Replace the creased grey cloth backdrop with a seamless, even light-grey studio background and a soft natural shadow under the base. Neutral white balance so the stone stays pink-beige; even, soft studio lighting; sharp edges. Do not change the sculpture's shape.

### `IMG_0005 (33).jpg` → `fix-IMG_0005 (33).jpg`
A tall pale-yellow sandstone abstract column (to be used as kiran/stone-column).

> Restore this small (424 × 717) photograph of a tall abstract sculpture in pale yellow sandstone: a vertical column with stepped, cut-in planes. Upscale 4× to about 1700 × 2870 with realistic stone texture. Correct the perspective so the column stands straight and vertical. Replace the busy dark tiled wall behind it with a plain, even charcoal-grey backdrop, keeping a soft shadow at the base. Neutral white balance, gentle studio light from one side to show the planes. Do not change the sculpture's form.

---

## 3. Optional improvements to images already on the site

These are on the site now. A `fix-` version replaces the original automatically on the next import.

### `IMG_0734.JPG` → `fix-IMG_0734.JPG`
> Night photograph of a lit stone sculpture of two seated figures reading a newspaper. Remove the white jeep at the right edge and any other parked vehicles, filling with matching dark night background. Reduce noise in the dark areas, keep the warm uplight on the stone, keep the street lamps. Do not change the sculpture.

### `IMG_0639.JPG` → `fix-IMG_0639.JPG`
> Dusk photograph of a finished stone sculpture of two seated figures among stone blocks in a stone yard. Lift the exposure by about one stop and open the shadows so the carving and the newspaper read clearly; keep the stone blocks around it as the setting. Neutral grey stone colour, reduce noise. Do not change the sculpture.

### `IMG_1090.jpg` → `fix-IMG_1090.jpg`
> Daylight photograph of a metal sculpture of a newspaper hawker on a bicycle. Remove the white sacks and the table at the left and right edges and the debris on the paving; keep the garden, building and the rusted base plate. Recover the bright sky, neutral white balance, crisp natural sharpening. Do not change the sculpture.

### `DSC02065.jpg` → `fix-DSC02065.jpg`
> Outdoor photograph of a stone sculpture of a standing couple on a lawn, hills behind. Remove the green garden hose on the grass and any small debris; even out the lawn. Slightly lift shadows on the stone, keep the natural daylight and the hills. Do not change the sculpture.

### `DSC02064.JPG` → `fix-DSC02064.JPG`
> Photograph of a stone sculpture of a couple standing on sand in an open-air stone yard. Remove the black power cable and the power tool on the sand and the stone block in the bottom-left corner; keep the sand, the hills and the garden behind. Neutral white balance, slight shadow lift. Do not change the sculpture.

### `DSC02063.JPG` → `fix-DSC02063.JPG`
> Top-down photograph of a white stone sculpture of a reclining couple lying on sand. Remove the sandal at the top right, the scraps of paper and loose stone chips around it, leaving clean, even sand. Even out the light, neutral white, keep the fine chisel texture of the stone. Do not change the sculpture.

---

## 4. Not used (and why)

| Files | Reason |
|---|---|
| `04.jpg`, `Copy of IMG_0636.JPG`, `english.jpg1 - Copy.jpg` | Exact duplicates of `IMG_0740edit.jpg`, `IMG_0636.JPG`, `english.jpg1.jpg` |
| `05 (1) copy.jpg`, `05.jpg` | Same embracing-couple piece already on the site from the studio catalogue; these are 400 px wide |
| `IMG_0732` | Night view of the Statue; too dark for the large home-page plate, replaced there by the cleaned daylight photograph with the plaque |
| `IMG_0739`, `IMG_0740`, `IMG_0741`, `IMG_0745`, `IMG_0746`, `IMG_0747`, `IMG_0753`, `IMG_0758`, `IMG_0759` | More night views of the Statue of Freedom of Press; the best three are used (`IMG_0759` also has a date stamp) |
| `00 (3).JPG`, `Copy of IMG_0762.JPG`, `IMG_0760`–`IMG_0764`, `IMG_0766` | Sunset views with a burnt-in date stamp; `IMG_0765` (the best) is in the fix list |
| `IMG_0697`, `IMG_0699`, `IMG_0700`, `IMG_0708`–`IMG_0710` | Installation under a canopy, with scaffolding and date stamps |
| `IMG_0281`, `IMG_0282`, `IMG_0285`, `IMG_0287`, `IMG_0296`, `IMG_0298`, `IMG_0428`, `IMG_0431`, `IMG_0448`, `IMG_0449`, `IMG_0505`, `IMG_0635`, `IMG_0636`, `IMG_0641`, `IMG_0643` | Good alternates of the Statue's carving; five are used for the block-to-statue sequence, more would repeat |
| `IMG_0257`, `IMG_0258` | A hill fort and a quarry face: no stated link to a work |
| `IMG_0091`, `IMG_0094`, `IMG_0095`, `IMG_1089`, `IMG_1092`, `IMG_1094`, `IMG_1096`–`IMG_1099` | More views of the finished Sculpture of Hawker; five are used |
| `03092007367-001`, `03092007373-001`, `03092007375-001`, `03092007378`, `03092007382`, `04092007390`, `04092007394`, `04092007395-002`, `13092007415`, `16092007421`, `16092007425`, `17092007431`, `18092007444`, `20092007450`, `20092007452`, `20092007453`, `20092007461`, `21092007473`, `23092007484`, `23092007486`, `24072007116`, `24092007487`, `29092007524`–`29092007534`, `02102007553`, `02102007558` | Phone photos of the Hawker being made (2007); three are used, the rest repeat them or are badly over- or under-exposed |
| `MSR_2090`, `MSR_2091`, `MSR_2092`, `MSR_2094` | Other frames of the 2015 unveiling; `MSR_2093` is used |
| `2015-01-07~06ngp-vruttapatra_ns.jpg`, `sculpture of hawkers.jpg` | The unveiling crowd; small and crowded |
| `DSC02051`–`DSC02053`, `DSC02056`–`DSC02060` | Stone carving in 2012, alternates of `DSC02055`, and pieces still in progress |
| `07 (1).JPG` | The expectant couple with a person standing beside it; the other three views are better |
| `LANDSCAPE ART INSTALLATION I.jpg`, `… II.jpg` | Same piece as "Sliced figures on a rock", already on the site; heavily compressed |
| `DSC05064.JPG` | Second, weaker frame of the 2012 exhibition (`DSC05062` is in the fix list) |
| `01102007542-002.jpg`, `24092007503.jpg` | Portraits of a man (2007). **If this is Kiran Adate, say so**: `01102007542-002.jpg` would suit the About page after enhancement |
| `Thumbs.db` | Windows thumbnail cache, not an image |

---

# Client photographs ("Kiran Adate" folder, November 2026)

Source: `/home/brijesh/Documents/Kiran Adate` (120 photographs, Kiran Adate's profile PDF, and
Mac `._` files that are not images). The originals are never changed. The profile's own photographs
are larger than the folder's copies of the same works; they are taken out of the PDF with
`python3 -I scripts/extract-profile-photos.py "/home/brijesh/Documents/Kiran Adate/Kiran Adate_ Profile.pdf"`
into `client-sources/profile-pdf/` (not in git).

**Why the photos look soft.** They are exports from Apple Photos, not the camera originals:
files ending `_4_5005_c` are 360×480 previews, files ending `_1_105_c` are 768×1024 copies. The
iPhone originals (about 3024×4032) are far sharper than any enhancement can make these.
**Best fix: ask Kiran Adate to export the originals** (Photos → select → File → Export → *Export
Unmodified Original*, or AirDrop) and put them in the folder with the same names; any `fix-` file
can then be made from the original instead.

**How fixes work here.** Save the enhanced image next to its original in the "Kiran Adate" folder
as `fix-<original filename>`, then run `python3 -I scripts/import-client-images.py` (no folder
needed for these), `sh scripts/make-avif.sh` and `python3 -I scripts/make-share-images.py`.
Images marked **waiting** appear on their work's page by themselves once imported.

**How to enhance.** Use a faithful upscaler, not an image generator: **Upscayl** (free desktop app,
model "Real-ESRGAN" / "Ultrasharp", 4× for the 360×480 files, 2× for the 768×1024 ones), or
Topaz Photo AI. Generators (ChatGPT, Gemini, Midjourney) redraw the picture and can change the
artwork, which a portfolio must not do. If one is used anyway, give it this prompt with the photo:

> Enhance this photograph of a sculpture for an artist's portfolio. Increase resolution and
> sharpness, remove noise and JPEG artefacts, correct white balance and exposure. Do NOT change
> the sculpture in any way: same shape, proportions, surface, texture, reflections, colours,
> welds and details; do not add, remove, smooth or invent anything on the artwork. Keep the
> background, framing and aspect ratio exactly as they are. Output a realistic photograph, not an
> illustration. Size: <2× or 4×> the original.

Check every result against the original at 100% before using it.

## A. Waiting: on the site once a `fix-` file exists (5)

| Original | Site id | Work |
|---|---|---|
| `87A12801-67F5-4334-8B32-408A7C3F2883_4_5005_c.jpeg` | kiran/cube-column-installing | Column of mirrored cubes, being installed |
| `317EAAC5-5875-45F4-B60E-71CE3B2A156B_4_5005_c.jpeg` | kiran/terrace-twist-view | Twisted form on a terrace |
| `78EC8EC9-B368-49D7-A209-CB4C70FB93C0_4_5005_c.jpeg` | kiran/lanterns-night | Pierced steel lanterns, at night |
| `A00A2A4A-CE25-49C5-A991-75CAE7C5EDDC_4_5005_c.jpeg` | kiran/lantern-among-pebbles | Pierced steel lanterns |
| `E195452C-7B38-4225-BAAC-49847D0AFE6F_4_5005_c.jpeg` | kiran/lanterns-row | Pierced steel lanterns |

(and `IMG_0765.JPG` etc. from the "Kiran Stone" list above, unchanged)

## B. On the site now; a 2× version would make them sharper (most useful first)

Profile photographs (cover images; enhance the PDF copies in `client-sources/profile-pdf/`, save as
`fix-<name>.jpg` there): `freedom.jpg`, `beyond-boundaries.jpg`, `eternal-orbit.jpg`,
`extraction-of-negative-energy.jpg`, `kinetic-equilibrium.jpg`, `couple.jpg`, `hugging.jpg`,
`spectator.jpg` (720×1280, the smallest).

From the folder (768×1024 or similar), with the work each belongs to:

| Original | Work |
|---|---|
| `66C84A94-9619-4567-B057-91A3F3575E6F_1_105_c.jpeg` | Soaring Higher (home page). Its only photo is a close-up, and the mirror bird reflects the photographer's face: a photo of the whole wall is wanted |
| `AB2395F5-FA54-490E-AF17-09903E569501.jpeg` | Lit relief in a lounge (home page) |
| `7D1FB97C-3B86-44C9-93B3-E98B3483C31C_1_105_c.jpeg` | Pierced steel lanterns (home page) |
| `C8B93FF1-9066-43BD-B8B5-F8C5D8791213_1_105_c.jpeg` | Sliced figures on a rock (home page) |
| `FCB5C23B-05B1-4D44-B79D-90BFDAA85905_1_105_c.jpeg`, `F92D2410-…_1_105_c.jpeg`, `FD6884BC-…_1_105_c.jpeg` | Ribbon in a reception lobby |
| `D1ACAA60-…_1_105_c.jpeg`, `276EA6F8-…_1_105_c.jpeg`, `63470D65-…_1_105_c.jpeg` | Polished oval with an opening |
| `62C3A6FC-D07D-47BF-A455-02D0EFB05A25_1_201_a.jpeg` | Column of mirrored cubes |
| `1EE6134E-AE04-4FC8-BDDF-0FA7412264C0_1_105_c.jpeg` | Figure in flight |
| `9D5BBE63-BD5C-4606-9CA0-D743257E3E26.jpeg`, `5A5BB8DB-…_1_105_c.jpeg` | Folded steel form |
| `C123B869-…_1_105_c.jpeg`, `7F975FE0-…_1_105_c.jpeg`, `D3F29C00-…_1_105_c.jpeg` | Flowing wall installation |

The full list of files and the work each is used for is in `scripts/client-images.json`.

## C. Good subjects not on the site yet (need a name, a clean photo, or both)

| File(s) | What it shows | What is needed |
|---|---|---|
| `D48ACEDB-319A-4A9A-8B9F-4B929FDC33AF.png` | "Inner Silence", black marble, H 30 × W 9 × L 16 in | A plain photo: this is a designed card with the title printed over the sculpture |
| `5B2EB9AD-BD47-4486-A5CA-76A29B325EEC.png` | "Expected Angle" (Angel?), black marble, H 30 × 11 × 12 in | Same; and confirm the spelling of the title |
| `596EFD27-…`, `A1692A8C-…`, `BF02B55B-…`, `63B7A2A1-…`, `FE7D5852-…` (`_4_5005_c`) | Steel fruit: strawberry, apple and star fruit, pineapple, grapes | Originals or 4× fixes; a title for the series |
| `6F2ADF35-…`, `9F47E713-…` (`_4_5005_c`) | Large perforated crescent ring, outdoors | Originals or fixes; name and place |
| `353A08F8-…_4_5005_c`, `A8001C57-…_1_105_c` | Radiating "wings" on a roundabout (finished, and being built) | Name and place |
| `781DFD1F-…`, `852FB3AF-…` (`_4_5005_c`) | Twisted steel helix at a building entrance | Originals or fixes; name |
| `9ECE2953-9779-44C5-9DF1-9283745B3393.jpeg`, `F13019A7-…_1_105_c.jpeg` | Lion of machine parts (gold, and red) | Is it the lion already on the site, repainted, or another one? |
| `3FEC3DC4-…`, `42F31E41-…`, `5EE0E9A3-…` (`_4_5005_c`) | Rings at night; wire string forms | Originals or fixes; names |
| `0BE8E9D5-8BE5-4B6F-81F3-290A98BE6555.jpeg` | Plaque of Soaring Higher (used for its facts) | Nothing: kept as the source of the text |
| `WhatsApp Image 2026-11-21 at 1.47.35 PM.jpeg`, `…1.47.48 PM.jpeg` | Portrait (full size, 3024×4032) | Confirm it is Kiran Adate and that it may be used; could replace the About portrait |
| profile PDF page 1 (`client-sources/profile-pdf/kiran-adate-portrait.jpg`) | Kiran Adate's portrait from the profile | Could be used on About or in the portfolio PDF |
