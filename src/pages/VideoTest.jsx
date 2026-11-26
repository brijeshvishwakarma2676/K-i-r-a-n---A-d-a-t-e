import { useEffect, useState } from 'react'
import Seo from '../components/Seo'
import AmbientVideo from '../components/AmbientVideo'

/*
  TEST PAGE: the Google Flow (Veo) clips, cut into silent loops in public/ambient-test, each shown
  sharp, softened as a background, and with text over it, so they can be judged in place. Reached
  only from the "Video test" button on the home page; kept out of search engines (robots.txt and
  a noindex tag). Remove this page, its route, the button and public/ambient-test when done.
*/
const base = '/ambient-test/'
const clips = [
  { id: 'v1-hand', verdict: 'best', note: 'V1, the hand on the stone (15 s). Cropped to remove the camera rig and watermark. Flaws: a grid pattern on the stone, a pouring stream of dust around 8 s.' },
  { id: 'hand-r2d', ratio: '3/4', verdict: 'best', note: 'Round 2, clip 4, cropped to the hand only. The hammer never enters, so the strike cannot look wrong; the chisel jolts and chips fall. Flaw: a wood-handled chisel (a woodworking tool).' },
  { id: 'steel', verdict: 'good', note: 'Round 1, steel. Cropped to remove the blurred figure and the watermark. Light moves over polished steel. Flaw: a dome, not a ribbon; only 4 s.' },
  { id: 'carve-r1', verdict: 'soft only', note: 'Round 1. The only clip where the hammer really hits the end of the chisel. Flaw: the dust curls like smoke. 4 s.' },
  { id: 'carve-r3d', verdict: 'soft only', note: 'Round 3, clip 4. Best stone and light. Flaw: the hammer hits the blade, chips pop in and out.' },
  { id: 'carve-r2d', verdict: 'soft only', note: 'Round 2, clip 4, full frame. Flaw: the hammer hits the stone, not the chisel; it floats for a moment.' },
  { id: 'carve-r3a', verdict: 'soft only', note: 'Round 3, clip 1. Flaw: the hammer strikes the shaft; the marble glows like soap.' },
  { id: 'carve-r3b', verdict: 'weak', note: 'Round 3, clip 2. Flaw: chips appear from nowhere, one hand holds both tools.' },
  { id: 'carve-r3c', verdict: 'weak', note: 'Round 3, clip 3. Flaw: the chisel changes from frame to frame.' },
  { id: 'carve-r2a', verdict: 'weak', note: 'Round 2, clip 1. Flaw: a "≡" engraving on the block, a bare foot, smoky dust.' },
  { id: 'carve-r2b', verdict: 'weak', note: 'Round 2, clip 2. Flaw: hammer pressed on the chisel side, smoky dust.' },
  { id: 'carve-r2c', verdict: 'weak', note: 'Round 2, clip 3. Flaw: a large smoke cloud, the hammer would hit the knuckles.' },
]
const modes = [
  { id: 'sharp', label: 'Sharp' },
  { id: 'soft', label: 'Soft background' },
  { id: 'text', label: 'With text over it' },
]
const looks = {
  sharp: {},
  soft: { filter: 'blur(6px) brightness(0.62) saturate(0.85)', transform: 'scale(1.06)' },
  text: { filter: 'blur(2px) brightness(0.5)', transform: 'scale(1.03)' },
}

export default function VideoTest() {
  const [mode, setMode] = useState('soft')
  useEffect(() => {
    const tag = document.createElement('meta')
    tag.name = 'robots'
    tag.content = 'noindex'
    document.head.appendChild(tag)
    return () => tag.remove()
  }, [])
  return (
    <div className="wrap pb-32 pt-[calc(var(--header-h)+3rem)]">
      <Seo title="Video test" />
      <p className="caption">Test page, not in the menu</p>
      <h1 className="display mt-2 text-[clamp(2.4rem,1.4rem+3.6vw,4.6rem)]">AI clips on the site</h1>
      <p className="mt-4 max-w-[60ch] text-[1.02rem]">
        All clips are silent loops with the watermark cropped off. They play only while on screen. The two clips of his real works
        (Statue of Freedom of Press, Beyond Boundaries) are left out: the AI redrew them.
      </p>

      <div role="radiogroup" aria-label="How to show the clips" className="mt-8 flex flex-wrap gap-2">
        {modes.map((m) => (
          <button
            key={m.id}
            type="button"
            role="radio"
            aria-checked={mode === m.id}
            onClick={() => setMode(m.id)}
            className={`border px-4 py-2 text-[0.92rem] ${mode === m.id ? 'border-ink bg-ink text-limestone' : 'border-stone hover:border-ink'}`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <h2 className="display mt-20 text-[2rem]">In place</h2>
      <section className="relative mt-6 overflow-hidden">
        <AmbientVideo src={`${base}carve-r3d.mp4`} poster={`${base}carve-r3d.jpg`} className="absolute inset-0 h-full w-full" style={looks[mode === 'sharp' ? 'text' : mode]} />
        <div className="relative grid min-h-[70svh] place-items-center px-6 py-24 text-center text-[#ECE7DD]">
          <div>
            <p className="caption !text-[#ECE7DD]/80">Stone</p>
            <p className="display mt-3 text-[clamp(2.2rem,1.4rem+3vw,4.2rem)] leading-[1.02]">The last of it is always done by hand.</p>
          </div>
        </div>
      </section>

      <section className="mt-16 grid grid-cols-12 gap-x-6 gap-y-8 bg-paper p-6 md:p-12">
        <div className="col-span-12 sm:col-span-6 md:col-span-4">
          <AmbientVideo src={`${base}hand-r2d.mp4`} poster={`${base}hand-r2d.jpg`} className="aspect-[3/4] w-full" />
        </div>
        <div className="col-span-12 self-center md:col-span-7 md:col-start-6">
          <p className="caption">Mood, beside text</p>
          <p className="display mt-2 text-[clamp(1.8rem,1.2rem+2vw,3rem)] leading-[1.05]">Every work begins small, and ends by hand.</p>
        </div>
      </section>

      <section className="relative mt-16 overflow-hidden">
        <AmbientVideo src={`${base}steel.mp4`} poster={`${base}steel.jpg`} className="absolute inset-0 h-full w-full" style={looks[mode === 'sharp' ? 'text' : mode]} />
        <div className="relative grid min-h-[60svh] place-items-center px-6 py-24 text-center text-[#ECE7DD]">
          <div>
            <p className="caption !text-[#ECE7DD]/80">Stainless steel</p>
            <p className="display mt-3 text-[clamp(2.2rem,1.4rem+3vw,4.2rem)] leading-[1.02]">Reflection, light, movement.</p>
          </div>
        </div>
      </section>

      <h2 className="display mt-24 text-[2rem]">Every clip</h2>
      <ul className="mt-8 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {clips.map((c) => (
          <li key={c.id}>
            <div className="relative overflow-hidden" style={{ aspectRatio: c.ratio || '16/9' }}>
              <AmbientVideo src={`${base}${c.id}.mp4`} poster={`${base}${c.id}.jpg`} className="absolute inset-0 h-full w-full" style={looks[mode]} />
              {mode === 'text' && <p className="display absolute inset-0 grid place-items-center px-4 text-center text-[1.6rem] text-[#ECE7DD]">Made by hand.</p>}
            </div>
            <p className="caption mt-3">
              {c.id} · <span className={c.verdict === 'best' || c.verdict === 'good' ? 'text-geru' : ''}>{c.verdict}</span>
            </p>
            <p className="mt-1 text-[0.95rem]">{c.note}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
