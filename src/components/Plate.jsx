import { useId, useMemo } from 'react'
import { seeded, range, pick, mix } from '../utils/random'

/*
  Plate draws a demonstration image as SVG: a sculpture on a plinth, a planter group,
  a relief wall, a jaali screen and so on, lit from the left like a gallery photograph.
  It exists so the site can be reviewed before photography arrives. Once an image has a
  real `src` in src/data, <ArtImage> shows the photograph and this component is not used.
*/

// [deep shadow, mid-dark, mid, light, highlight]
const MATERIALS = {
  bronze: ['#22150c', '#563620', '#86583a', '#b48252', '#ddb07c'],
  steel: ['#24282b', '#535b61', '#899197', '#c3c9cd', '#f0f2f3'],
  stone: ['#77705f', '#999180', '#b8b09f', '#d5cebf', '#ebe6da'],
  frp: ['#9a958a', '#bbb6ab', '#d7d2c7', '#eae6de', '#f9f7f2'],
  grc: ['#6c6963', '#8c8982', '#a8a59e', '#c3c0b8', '#d9d6cf'],
  corten: ['#331a0e', '#683319', '#924a25', '#b4643a', '#cf895a'],
}

const GREENS = ['#46533a', '#56643f', '#66744a', '#3c4733', '#7a8558', '#5b6b4d']

const ell = (cx, cy, rx, ry) =>
  `M${cx - rx},${cy} A${rx},${ry} 0 1 0 ${cx + rx},${cy} A${rx},${ry} 0 1 0 ${cx - rx},${cy} Z`

const poly = (pts) => `M${pts.map((p) => p.join(',')).join(' L')} Z`

export default function Plate({
  kind = 'sculpture',
  variant,
  material = 'bronze',
  scene = 'gallery',
  seed = 1,
  ratio = 4 / 5,
  scale = 1,
  aperture,
  title,
  className = '',
}) {
  const raw = useId()
  const uid = 'p' + raw.replace(/[^a-zA-Z0-9]/g, '')
  const W = 1000
  const H = Math.round(W / ratio)

  const art = useMemo(() => {
    const rand = seeded(`${kind}-${variant}-${material}-${seed}`)
    const pal = MATERIALS[material] || MATERIALS.stone
    const ctx = { uid, W, H, rand, pal, scale, url: (n) => `url(#${uid}-${n})` }
    const builder = BUILDERS[kind] || BUILDERS.sculpture
    return builder({ ...ctx, variant, scene, aperture })
  }, [uid, W, H, kind, variant, material, scene, seed, scale, aperture])

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <MaterialDefs uid={uid} pal={MATERIALS[material] || MATERIALS.stone} />
      {art}
    </svg>
  )
}

function MaterialDefs({ uid, pal }) {
  const [d, md, m, l, hi] = pal
  return (
    <defs>
      <linearGradient id={`${uid}-m`} x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stopColor={md} />
        <stop offset="0.2" stopColor={l} />
        <stop offset="0.32" stopColor={hi} />
        <stop offset="0.5" stopColor={l} />
        <stop offset="0.78" stopColor={m} />
        <stop offset="1" stopColor={d} />
      </linearGradient>
      <linearGradient id={`${uid}-mr`} x1="1" x2="0" y1="0" y2="0">
        <stop offset="0" stopColor={md} />
        <stop offset="0.35" stopColor={m} />
        <stop offset="0.7" stopColor={l} />
        <stop offset="1" stopColor={md} />
      </linearGradient>
      <linearGradient id={`${uid}-mflat`} x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stopColor={l} />
        <stop offset="1" stopColor={m} />
      </linearGradient>
      <linearGradient id={`${uid}-mside`} x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stopColor={md} />
        <stop offset="1" stopColor={d} />
      </linearGradient>
      <linearGradient id={`${uid}-shade`} x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stopColor="#fff" stopOpacity="0.12" />
        <stop offset="0.55" stopColor="#000" stopOpacity="0" />
        <stop offset="1" stopColor="#000" stopOpacity="0.28" />
      </linearGradient>
      <radialGradient id={`${uid}-sphere`} cx="0.36" cy="0.32" r="0.75">
        <stop offset="0" stopColor={hi} />
        <stop offset="0.25" stopColor={l} />
        <stop offset="0.6" stopColor={m} />
        <stop offset="0.9" stopColor={md} />
        <stop offset="1" stopColor={d} />
      </radialGradient>
      <filter id={`${uid}-b1`} x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="7" />
      </filter>
      <filter id={`${uid}-b2`} x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="18" />
      </filter>
      <filter id={`${uid}-b3`} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="40" />
      </filter>
    </defs>
  )
}

/* ------------------------------------------------------------------ scenes */

function Scene({ scene, uid, W, H, rand, floorY }) {
  const fy = floorY
  const id = (n) => `${uid}-s${n}`
  if (scene === 'none') return null

  if (scene === 'night') {
    return (
      <g>
        <defs>
          <linearGradient id={id('w')} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#302e2a" />
            <stop offset="1" stopColor="#1d1c1a" />
          </linearGradient>
          <linearGradient id={id('f')} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#2b2a27" />
            <stop offset="1" stopColor="#141312" />
          </linearGradient>
          <radialGradient id={id('l')} cx="0.48" cy="0.12" r="0.62">
            <stop offset="0" stopColor="#8d8270" stopOpacity="0.7" />
            <stop offset="1" stopColor="#8d8270" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width={W} height={fy} fill={`url(#${id('w')})`} />
        <rect width={W} height={fy} fill={`url(#${id('l')})`} />
        <rect y={fy} width={W} height={H - fy} fill={`url(#${id('f')})`} />
        <ellipse cx={W * 0.52} cy={fy + (H - fy) * 0.42} rx={W * 0.34} ry={(H - fy) * 0.28} fill="#6d6455" opacity="0.45" filter={`url(#${uid}-b3)`} />
      </g>
    )
  }

  if (scene === 'garden') {
    const trees = Array.from({ length: 16 }, (_, i) => ({
      x: (i / 15) * W + range(rand, -40, 40),
      r: range(rand, 50, 120),
      y: fy - 40 - range(rand, 10, 90),
    }))
    return (
      <g>
        <defs>
          <linearGradient id={id('w')} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#d6dcd7" />
            <stop offset="1" stopColor="#eceee7" />
          </linearGradient>
          <linearGradient id={id('f')} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#a0a58b" />
            <stop offset="1" stopColor="#7f866b" />
          </linearGradient>
        </defs>
        <rect width={W} height={fy} fill={`url(#${id('w')})`} />
        <g filter={`url(#${uid}-b1)`} opacity="0.6">
          {trees.map((t, i) => (
            <circle key={i} cx={t.x} cy={t.y} r={t.r} fill={i % 3 ? '#5f6c54' : '#6f7b61'} />
          ))}
        </g>
        <rect y={fy - 46} width={W} height={50} fill="#55604a" />
        <rect y={fy} width={W} height={H - fy} fill={`url(#${id('f')})`} />
        <polygon points={`${W * 0.3},${fy} ${W * 0.7},${fy} ${W * 0.95},${H} ${W * 0.05},${H}`} fill="#cdc6b6" opacity="0.85" />
      </g>
    )
  }

  if (scene === 'lobby') {
    const wins = [0, 1, 2].map((i) => ({ x: W * 0.05 + i * W * 0.135, w: W * 0.1 }))
    return (
      <g>
        <defs>
          <linearGradient id={id('w')} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#e5e1d8" />
            <stop offset="1" stopColor="#d6d1c6" />
          </linearGradient>
          <linearGradient id={id('f')} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#c8c2b5" />
            <stop offset="1" stopColor="#a9a295" />
          </linearGradient>
        </defs>
        <rect width={W} height={fy} fill={`url(#${id('w')})`} />
        {wins.map((w, i) => (
          <g key={i}>
            <rect x={w.x} y={H * 0.06} width={w.w} height={fy - H * 0.06} fill="#f7f6f1" />
            <line x1={w.x + w.w / 2} x2={w.x + w.w / 2} y1={H * 0.06} y2={fy} stroke="#cfc9bd" strokeWidth="3" />
            <line x1={w.x} x2={w.x + w.w} y1={fy * 0.45} y2={fy * 0.45} stroke="#cfc9bd" strokeWidth="3" />
          </g>
        ))}
        <rect y={fy} width={W} height={H - fy} fill={`url(#${id('f')})`} />
        <g opacity="0.32" filter={`url(#${uid}-b1)`}>
          {wins.map((w, i) => (
            <polygon key={i} points={`${w.x},${fy} ${w.x + w.w},${fy} ${w.x + w.w + W * 0.3},${H} ${w.x + W * 0.3},${H}`} fill="#fffdf6" />
          ))}
        </g>
      </g>
    )
  }

  if (scene === 'terrace') {
    return (
      <g>
        <defs>
          <linearGradient id={id('w')} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#ccc8bf" />
            <stop offset="1" stopColor="#bdb8ae" />
          </linearGradient>
          <linearGradient id={id('f')} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#ab9579" />
            <stop offset="1" stopColor="#8d775b" />
          </linearGradient>
          <radialGradient id={id('l')} cx="0.2" cy="0.1" r="0.9">
            <stop offset="0" stopColor="#fff8ea" stopOpacity="0.45" />
            <stop offset="1" stopColor="#fff8ea" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width={W} height={fy} fill={`url(#${id('w')})`} />
        {Array.from({ length: Math.floor(fy / 70) }, (_, i) => (
          <line key={i} x1="0" x2={W} y1={(i + 1) * 70} y2={(i + 1) * 70} stroke="#000" strokeOpacity="0.06" strokeWidth="2" />
        ))}
        <rect width={W} height={fy} fill={`url(#${id('l')})`} />
        <rect y={fy} width={W} height={H - fy} fill={`url(#${id('f')})`} />
        {Array.from({ length: 9 }, (_, i) => {
          const y = fy + ((H - fy) * (i * i + 2)) / 100
          return y < H ? <line key={i} x1="0" x2={W} y1={y} y2={y} stroke="#000" strokeOpacity="0.1" strokeWidth="2" /> : null
        })}
      </g>
    )
  }

  // gallery (default)
  return (
    <g>
      <defs>
        <linearGradient id={id('w')} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#e2ded5" />
          <stop offset="1" stopColor="#d3cec3" />
        </linearGradient>
        <linearGradient id={id('f')} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#c9c3b7" />
          <stop offset="1" stopColor="#ada699" />
        </linearGradient>
        <radialGradient id={id('l')} cx="0.38" cy="0.22" r="0.65">
          <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width={W} height={fy} fill={`url(#${id('w')})`} />
      <rect width={W} height={fy} fill={`url(#${id('l')})`} />
      <rect y={fy} width={W} height={H - fy} fill={`url(#${id('f')})`} />
      <rect y={fy - 5} width={W} height={5} fill="#c4beb2" />
    </g>
  )
}

/* -------------------------------------------------------------- sculptures */

function sculptureForm(variant, cx, by, s, rand, url, uid, aperture = 0.36) {
  if (variant === 'cairn') {
    const stones = []
    let y = by
    const n = 5
    for (let i = 0; i < n; i++) {
      const rx = (150 - i * 22) * s * range(rand, 0.9, 1.08)
      const ry = (44 - i * 3) * s * range(rand, 0.9, 1.15)
      const x = cx + range(rand, -14, 14) * s
      y -= ry * 0.92
      stones.push({ x, y, rx, ry })
      y -= ry * 0.92
    }
    const sil = stones.map((t) => ell(t.x, t.y, t.rx, t.ry)).join(' ')
    return {
      width: 300 * s,
      height: by - y,
      sil,
      body: stones.map((t, i) => (
        <g key={i}>
          <path d={ell(t.x, t.y, t.rx, t.ry)} fill={url('m')} />
          <path d={ell(t.x, t.y, t.rx, t.ry)} fill={url('shade')} />
        </g>
      )),
    }
  }

  if (variant === 'ring') {
    const R = 230 * s
    const r = 150 * s
    const baseH = 26 * s
    const cy = by - baseH - R + 6 * s
    const d = `${ell(cx, cy, R, R)} ${ell(cx, cy, r, r)}`
    const base = poly([[cx - 60 * s, by], [cx + 60 * s, by], [cx + 50 * s, by - baseH], [cx - 50 * s, by - baseH]])
    return {
      width: 2 * R,
      height: 2 * R + baseH,
      sil: `${d} ${base}`,
      body: (
        <g>
          <path d={base} fill={url('mside')} />
          <path d={d} fillRule="evenodd" fill={url('m')} />
          <path d={d} fillRule="evenodd" fill={url('shade')} />
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth={3 * s} />
          <circle cx={cx} cy={cy} r={R - 2 * s} fill="none" stroke="#000" strokeOpacity="0.15" strokeWidth={4 * s} />
        </g>
      ),
    }
  }

  if (variant === 'twist') {
    const n = 10
    const Hh = 580 * s
    const W0 = 170 * s
    const ph = range(rand, 0, 3)
    const pts = Array.from({ length: n + 1 }, (_, i) => ({
      y: by - (i / n) * Hh,
      w: W0 * (0.5 + 0.5 * Math.abs(Math.sin(i * 0.72 + ph))),
      x: cx + 20 * s * Math.sin(i * 0.55 + ph),
    }))
    const segs = pts.slice(0, -1).map((p, i) => {
      const q = pts[i + 1]
      return poly([[p.x - p.w / 2, p.y], [p.x + p.w / 2, p.y], [q.x + q.w / 2, q.y], [q.x - q.w / 2, q.y]])
    })
    return {
      width: W0,
      height: Hh,
      sil: segs.join(' '),
      body: segs.map((d, i) => (
        <g key={i}>
          <path d={d} fill={url(i % 2 ? 'mr' : 'm')} stroke={url(i % 2 ? 'mr' : 'm')} strokeWidth="1" />
          <path d={d} fill="#000" opacity={i % 2 ? 0.08 : 0} />
        </g>
      )),
    }
  }

  if (variant === 'sphere') {
    const R = 165 * s
    const blockH = 90 * s
    const block = poly([[cx - 120 * s, by], [cx + 120 * s, by], [cx + 120 * s, by - blockH], [cx - 120 * s, by - blockH]])
    const cy = by - blockH - R + 10 * s
    return {
      width: 2 * R,
      height: 2 * R + blockH,
      sil: `${ell(cx, cy, R, R)} ${block}`,
      body: (
        <g>
          <path d={block} fill={url('mflat')} />
          <path d={block} fill={url('shade')} />
          <ellipse cx={cx + 20 * s} cy={by - blockH + 2 * s} rx={R * 0.75} ry={14 * s} fill="#000" opacity="0.3" filter={`url(#${uid}-b1)`} />
          <circle cx={cx} cy={cy} r={R} fill={url('sphere')} />
        </g>
      ),
    }
  }

  if (variant === 'standing') {
    const k = s
    const d = `M${cx - 72 * k},${by} C${cx - 96 * k},${by - 150 * k} ${cx - 18 * k},${by - 270 * k} ${cx - 58 * k},${by - 390 * k}
      C${cx - 92 * k},${by - 480 * k} ${cx - 30 * k},${by - 585 * k} ${cx + 12 * k},${by - 585 * k}
      C${cx + 64 * k},${by - 585 * k} ${cx + 86 * k},${by - 488 * k} ${cx + 52 * k},${by - 392 * k}
      C${cx + 22 * k},${by - 290 * k} ${cx + 98 * k},${by - 150 * k} ${cx + 74 * k},${by} Z`
    return {
      width: 190 * k,
      height: 585 * k,
      sil: d,
      body: (
        <g>
          <path d={d} fill={url('m')} />
          <path d={d} fill={url('shade')} />
          <path d={`M${cx - 6 * k},${by - 520 * k} C${cx - 30 * k},${by - 430 * k} ${cx + 20 * k},${by - 340 * k} ${cx - 4 * k},${by - 240 * k}`} stroke="#fff" strokeOpacity="0.22" strokeWidth={5 * k} fill="none" />
        </g>
      ),
    }
  }

  // monolith with aperture (default)
  const Wd = 230 * s
  const Hh = 560 * s
  const x0 = cx - Wd / 2
  const top = by - Hh
  const r = Wd / 2
  const hr = 58 * s
  const hy = top + Hh * aperture
  const outer = `M${x0},${by} V${top + r} A${r},${r} 0 0 1 ${x0 + Wd},${top + r} V${by} Z`
  const hole = ell(cx, hy, hr, hr)
  const maskId = `${uid}-hole`
  return {
    width: Wd,
    height: Hh,
    sil: `${outer} ${hole}`,
    body: (
      <g>
        <defs>
          <mask id={maskId}>
            <rect x={cx - hr - 2} y={hy - hr - 2} width={hr * 2 + 4} height={hr * 2 + 4} fill="#fff" />
            <circle cx={cx + 16 * s} cy={hy} r={hr} fill="#000" />
          </mask>
        </defs>
        <path d={`${outer} ${hole}`} fillRule="evenodd" fill={url('m')} />
        <path d={`${outer} ${hole}`} fillRule="evenodd" fill={url('shade')} />
        <circle cx={cx} cy={hy} r={hr} fill={url('mside')} mask={`url(#${maskId})`} />
      </g>
    ),
  }
}

function Plinth({ cx, by, w, h, depth = 14 }) {
  const top = by - h
  return (
    <g>
      <polygon points={`${cx - w / 2},${top} ${cx + w / 2},${top} ${cx + w / 2 - depth},${top - depth} ${cx - w / 2 + depth},${top - depth}`} fill="#ece7dc" />
      <rect x={cx - w / 2} y={top} width={w} height={h} fill="#d2ccbf" />
      <rect x={cx - w / 2} y={top} width={w * 0.18} height={h} fill="#fff" opacity="0.18" />
      <rect x={cx + w / 2 - w * 0.22} y={top} width={w * 0.22} height={h} fill="#000" opacity="0.1" />
    </g>
  )
}

function buildSculpture({ uid, W, H, rand, url, scale, variant, scene, aperture }) {
  const fy = H * (scene === 'none' ? 0.9 : 0.74)
  const s = (H / 1150) * scale * (W / H < 1 ? 1 : 1.25 * Math.min(1, (W / H) * 0.5))
  const plinthH = scene === 'garden' ? 40 * s : 80 * s
  const by = scene === 'none' ? H * 0.94 : fy + (H - fy) * 0.42
  const cx = W * (scene === 'none' ? 0.5 : range(rand, 0.48, 0.56))
  const form = sculptureForm(variant, cx, by - plinthH - 2, s, rand, url, uid, aperture)
  const plinthW = Math.max(form.width * 1.18, 200 * s)
  return (
    <g>
      <Scene scene={scene} uid={uid} W={W} H={H} rand={rand} floorY={fy} />
      {scene !== 'garden' && scene !== 'none' && (
        <path d={form.sil} fillRule="evenodd" transform={`translate(${70 * s} ${-60 * s})`} fill="#000" opacity={scene === 'night' ? 0.35 : 0.1} filter={`url(#${uid}-b2)`} />
      )}
      <ellipse cx={cx + 40 * s} cy={by + 4} rx={plinthW * 0.8} ry={22 * s} fill="#000" opacity="0.32" filter={`url(#${uid}-b1)`} />
      <Plinth cx={cx} by={by} w={plinthW} h={plinthH} depth={14 * s} />
      <ellipse cx={cx + 10 * s} cy={by - plinthH - 4 * s} rx={form.width * 0.45} ry={8 * s} fill="#000" opacity="0.35" filter={`url(#${uid}-b1)`} />
      {form.body}
    </g>
  )
}

/* ---------------------------------------------------------------- planters */

function foliage(rand, cx, cy, spread, count, k, keyp, style = 'leafy') {
  const out = []
  if (style === 'spiky') {
    for (let i = 0; i < count; i++) {
      const a = range(rand, -Math.PI * 0.95, -Math.PI * 0.05)
      const len = range(rand, 0.6, 1) * spread
      const x2 = cx + Math.cos(a) * len
      const y2 = cy + Math.sin(a) * len * 1.25
      const w = 10 * k
      out.push(<path key={`${keyp}s${i}`} d={`M${cx - w},${cy} Q${(cx + x2) / 2},${(cy + y2) / 2 - 10 * k} ${x2},${y2} Q${(cx + x2) / 2 + 6 * k},${(cy + y2) / 2} ${cx + w},${cy} Z`} fill={pick(rand, GREENS)} />)
    }
    return out
  }
  if (style === 'flowers') {
    for (let i = 0; i < count; i++) {
      const x = cx + range(rand, -spread, spread)
      const y = cy - range(rand, 0, spread * 0.25)
      out.push(<circle key={`${keyp}f${i}`} cx={x} cy={y} r={range(rand, 5, 10) * k} fill={pick(rand, ['#e8dfcf', '#c9a27a', '#b27a6a', '#ece6da', '#9e8a4e'])} />)
      if (i % 2) out.push(<ellipse key={`${keyp}l${i}`} cx={x + 8 * k} cy={y + 9 * k} rx={6 * k} ry={12 * k} transform={`rotate(${range(rand, -60, 60)} ${x + 8 * k} ${y + 9 * k})`} fill={pick(rand, GREENS)} />)
    }
    return out
  }
  for (let i = 0; i < count; i++) {
    const a = range(rand, Math.PI, Math.PI * 2)
    const rr = Math.sqrt(rand()) * spread
    const x = cx + Math.cos(a) * rr
    const y = cy + Math.sin(a) * rr * 1.1 + 10 * k
    const rot = range(rand, -70, 70)
    out.push(
      <ellipse key={`${keyp}${i}`} cx={x} cy={y} rx={range(rand, 7, 15) * k} ry={range(rand, 18, 34) * k} transform={`rotate(${rot} ${x} ${y})`} fill={pick(rand, GREENS)} opacity={range(rand, 0.85, 1)} />,
    )
  }
  return out
}

function Cylinder({ x, by, w, h, url, k, rand, plant = 'leafy', idx }) {
  const rimY = by - h
  const ry = w * 0.12
  return (
    <g>
      <ellipse cx={x + w * 0.62} cy={by + 2} rx={w * 0.72} ry={ry * 0.9} fill="#000" opacity="0.28" />
      {foliage(rand, x + w / 2, rimY - 4 * k, w * (plant === 'spiky' ? 0.9 : 0.62), plant === 'spiky' ? 16 : 70, k, `c${idx}`, plant)}
      <rect x={x} y={rimY} width={w} height={h} fill={url('m')} />
      <rect x={x} y={rimY} width={w} height={h} fill={url('shade')} />
      <ellipse cx={x + w / 2} cy={by} rx={w / 2} ry={ry} fill={url('m')} />
      <ellipse cx={x + w / 2} cy={rimY} rx={w / 2} ry={ry} fill="#efebe3" opacity="0.5" />
      <ellipse cx={x + w / 2} cy={rimY + 2} rx={w / 2 - 8 * k} ry={ry - 4 * k} fill="#3b322a" />
      {foliage(rand, x + w / 2, rimY + 2 * k, w * 0.4, plant === 'spiky' ? 6 : 26, k, `cf${idx}`, plant)}
    </g>
  )
}

function Bowl({ x, by, w, h, url, k, rand, idx }) {
  const top = by - h
  const d = `M${x},${top} L${x + w},${top} C${x + w},${top + h * 0.55} ${x + w * 0.78},${by} ${x + w * 0.62},${by} L${x + w * 0.38},${by} C${x + w * 0.22},${by} ${x},${top + h * 0.55} ${x},${top} Z`
  return (
    <g>
      <ellipse cx={x + w * 0.6} cy={by + 2} rx={w * 0.45} ry={10 * k} fill="#000" opacity="0.3" />
      {foliage(rand, x + w / 2, top, w * 0.8, 18, k, `b${idx}`, 'spiky')}
      <path d={d} fill={url('m')} />
      <path d={d} fill={url('shade')} />
      <ellipse cx={x + w / 2} cy={top} rx={w / 2} ry={w * 0.08} fill="#ebe6dd" opacity="0.55" />
      <ellipse cx={x + w / 2} cy={top + 2} rx={w / 2 - 8 * k} ry={w * 0.08 - 4 * k} fill="#3b322a" />
    </g>
  )
}

function Trough({ x, by, w, h, url, k, rand, wheels, creeper, tray, idx }) {
  const wheelR = wheels ? 18 * k : 0
  const base = by - wheelR * 1.6
  const top = base - h
  const depth = 18 * k
  const plant = tray ? 'flowers' : 'leafy'
  return (
    <g>
      <ellipse cx={x + w * 0.55} cy={by + 2} rx={w * 0.58} ry={12 * k} fill="#000" opacity="0.3" />
      {creeper && (
        <g>
          {[0, 1].map((i) => (
            <rect key={i} x={x + (i ? w - 12 * k : 4 * k)} y={top - h * 3.2} width={8 * k} height={h * 3.2} fill="#3a3732" />
          ))}
          <rect x={x + 4 * k} y={top - h * 3.2} width={w - 8 * k} height={8 * k} fill="#3a3732" />
          {Array.from({ length: 9 }, (_, i) => (
            <line key={i} x1={x + 12 * k + (i * (w - 24 * k)) / 8} x2={x + 12 * k + (i * (w - 24 * k)) / 8} y1={top - h * 3.2} y2={top} stroke="#4a463f" strokeWidth={2 * k} />
          ))}
          {Array.from({ length: 9 }, (_, i) =>
            foliage(rand, x + 12 * k + (i * (w - 24 * k)) / 8, top - range(rand, 0.3, 1) * h * 2.6, 28 * k, 14, k * 0.7, `cr${idx}-${i}`),
          )}
        </g>
      )}
      {foliage(rand, x + w * 0.5, top, w * 0.48, tray ? 70 : 60, k, `t${idx}`, plant).map((el) => el)}
      <polygon points={`${x},${top} ${x + w},${top} ${x + w - depth},${top - depth * 0.6} ${x + depth},${top - depth * 0.6}`} fill="#3b322a" />
      <rect x={x} y={top} width={w} height={h} fill={url('mflat')} />
      <rect x={x} y={top} width={w} height={h} fill={url('shade')} />
      <rect x={x} y={top} width={w} height={6 * k} fill="#fff" opacity="0.25" />
      {wheels &&
        [0.15, 0.85].map((p, i) => (
          <g key={i}>
            <rect x={x + w * p - 3 * k} y={base} width={6 * k} height={wheelR * 0.7} fill="#2c2a27" />
            <circle cx={x + w * p} cy={by - wheelR} r={wheelR} fill="#2c2a27" />
            <circle cx={x + w * p} cy={by - wheelR} r={wheelR * 0.4} fill="#77736b" />
          </g>
        ))}
    </g>
  )
}

function buildPlanter({ uid, W, H, rand, url, scale, variant, scene }) {
  const fy = H * 0.66
  const by = fy + (H - fy) * 0.55
  const k = (Math.min(W, H) / 1000) * scale * 1.15
  let items
  if (variant === 'wheels') {
    items = [
      <Trough key="a" idx="a" x={W * 0.12} by={by} w={W * 0.42} h={150 * k} url={url} k={k} rand={rand} wheels />,
      <Trough key="b" idx="b" x={W * 0.58} by={by + 30 * k} w={W * 0.3} h={130 * k} url={url} k={k} rand={rand} wheels />,
    ]
  } else if (variant === 'creeper') {
    items = [<Trough key="a" idx="a" x={W * 0.18} by={by} w={W * 0.64} h={120 * k} url={url} k={k} rand={rand} creeper />]
  } else if (variant === 'tray') {
    items = [<Trough key="a" idx="a" x={W * 0.08} by={by} w={W * 0.84} h={70 * k} url={url} k={k} rand={rand} tray />]
  } else if (variant === 'bowls') {
    items = [
      <Bowl key="a" idx="a" x={W * 0.14} by={by} w={300 * k} h={190 * k} url={url} k={k} rand={rand} />,
      <Bowl key="b" idx="b" x={W * 0.52} by={by + 26 * k} w={380 * k} h={230 * k} url={url} k={k} rand={rand} />,
    ]
  } else {
    items = [
      <Cylinder key="a" idx="a" x={W * 0.16} by={by - 10 * k} w={170 * k} h={360 * k} url={url} k={k} rand={rand} plant="spiky" />,
      <Cylinder key="b" idx="b" x={W * 0.42} by={by + 14 * k} w={230 * k} h={250 * k} url={url} k={k} rand={rand} />,
      <Cylinder key="c" idx="c" x={W * 0.7} by={by + 34 * k} w={150 * k} h={170 * k} url={url} k={k} rand={rand} />,
    ]
  }
  return (
    <g>
      <Scene scene={scene} uid={uid} W={W} H={H} rand={rand} floorY={fy} />
      {items}
    </g>
  )
}

/* ------------------------------------------------------------------ murals */

function buildMural({ uid, W, H, rand, pal, variant, scene }) {
  const room = scene !== 'none'
  const fy = H * 0.8
  const m = room ? { x: W * 0.1, y: H * 0.1, w: W * 0.8, h: fy - H * 0.2 } : { x: 0, y: 0, w: W, h: H }
  const dark = variant === 'steelfins'
  const base = dark ? '#2d2c29' : mix(pal[3], '#d8d2c6', 0.5)
  const clip = `${uid}-mclip`
  const lit = mix(base, '#ffffff', 0.32)
  const shade = mix(base, '#000000', 0.32)
  let relief = null

  if (variant === 'pyramids') {
    const cols = 9
    const cs = m.w / cols
    const rows = Math.ceil(m.h / cs)
    const tiles = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = m.x + c * cs
        const y = m.y + r * cs
        const g = 3
        const inv = rand() < 0.28
        const cx = x + cs / 2 + range(rand, -cs * 0.08, cs * 0.08)
        const cy = y + cs / 2 + range(rand, -cs * 0.08, cs * 0.08)
        const tl = [x + g, y + g]
        const tr = [x + cs - g, y + g]
        const br = [x + cs - g, y + cs - g]
        const bl = [x + g, y + cs - g]
        const faces = [
          [tl, tr, 'top'],
          [tr, br, 'right'],
          [br, bl, 'bottom'],
          [bl, tl, 'left'],
        ]
        const tone = { top: mix(base, '#fff', 0.18), left: lit, right: shade, bottom: mix(base, '#000', 0.18) }
        const swap = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' }
        faces.forEach(([a, b, f], i) => {
          tiles.push(<polygon key={`${r}-${c}-${i}`} points={`${a.join(',')} ${b.join(',')} ${cx},${cy}`} fill={tone[inv ? swap[f] : f]} />)
        })
      }
    }
    relief = tiles
  } else if (variant === 'arcs') {
    const cx = m.x + m.w * 0.18
    const cy = m.y + m.h
    const bands = 9
    relief = Array.from({ length: bands }, (_, i) => {
      const R = (i + 1) * (Math.max(m.w, m.h) / bands) * 0.95
      const t = R * 0.07 + 8
      const d = `M${cx - R},${cy} A${R},${R} 0 0 1 ${cx + R},${cy} L${cx + R - t},${cy} A${R - t},${R - t} 0 0 0 ${cx - R + t},${cy} Z`
      return (
        <g key={i}>
          <path d={d} transform="translate(10 12)" fill="#000" opacity="0.28" filter={`url(#${uid}-b1)`} />
          <path d={d} fill={i % 2 ? mix(base, '#fff', 0.12) : mix(base, '#fff', 0.2)} />
          <path d={`M${cx - R},${cy} A${R},${R} 0 0 1 ${cx + R},${cy}`} fill="none" stroke="#fff" strokeOpacity="0.4" strokeWidth="3" />
        </g>
      )
    })
  } else if (variant === 'leaves') {
    relief = Array.from({ length: 14 }, (_, i) => {
      const x = m.x + range(rand, 0.05, 0.95) * m.w
      const y = m.y + range(rand, 0.05, 0.95) * m.h
      const L = range(rand, 0.18, 0.34) * m.w
      const rot = range(rand, -70, 70)
      const d = `M0,0 C${L * 0.25},${-L * 0.28} ${L * 0.75},${-L * 0.24} ${L},0 C${L * 0.75},${L * 0.24} ${L * 0.25},${L * 0.28} 0,0 Z`
      return (
        <g key={i} transform={`translate(${x} ${y}) rotate(${rot})`}>
          <path d={d} transform="translate(9 11)" fill="#000" opacity="0.3" filter={`url(#${uid}-b1)`} />
          <path d={d} fill={mix(base, '#fff', range(rand, 0.1, 0.25))} />
          <path d={`M0,0 L${L},0`} stroke={shade} strokeOpacity="0.5" strokeWidth="3" />
        </g>
      )
    })
  } else if (variant === 'steelfins') {
    const n = 22
    relief = Array.from({ length: n }, (_, i) => {
      const w = range(rand, 14, 34)
      const x = m.x + (i + 0.5) * (m.w / n) - w / 2
      const h = range(rand, 0.45, 0.95) * m.h
      const y = m.y + (m.h - h) * range(rand, 0, 1)
      return (
        <g key={i}>
          <rect x={x + 14} y={y + 10} width={w} height={h} fill="#000" opacity="0.55" filter={`url(#${uid}-b1)`} />
          <rect x={x} y={y} width={w} height={h} fill={`url(#${uid}-m)`} />
        </g>
      )
    })
  } else {
    // ridges: flowing horizontal relief bands
    const bands = 13
    const step = m.h / bands
    const ph = range(rand, 0, 6)
    relief = Array.from({ length: bands + 1 }, (_, i) => {
      const y0 = m.y + i * step
      const amp = step * range(rand, 0.4, 0.9)
      const pts = []
      for (let x = m.x - 20; x <= m.x + m.w + 20; x += 20) {
        pts.push([x, y0 + amp * Math.sin(x / (m.w * 0.18) + ph + i * 0.45) * Math.sin(x / (m.w * 0.55) + i * 0.2)])
      }
      const t = step * 0.55
      const topPath = pts.map((p, j) => `${j ? 'L' : 'M'}${p[0]},${p[1]}`).join(' ')
      const d = `${topPath} ${pts.slice().reverse().map((p) => `L${p[0]},${p[1] + t}`).join(' ')} Z`
      return (
        <g key={i}>
          <path d={d} transform="translate(6 12)" fill="#000" opacity="0.3" filter={`url(#${uid}-b1)`} />
          <path d={d} fill={mix(base, '#fff', 0.14)} />
          <path d={topPath} fill="none" stroke="#fff" strokeOpacity="0.45" strokeWidth="3" />
        </g>
      )
    })
  }

  return (
    <g>
      <defs>
        <clipPath id={clip}>
          <rect x={m.x} y={m.y} width={m.w} height={m.h} />
        </clipPath>
        <linearGradient id={`${uid}-rake`} x1="0" x2="1" y1="0" y2="0.3">
          <stop offset="0" stopColor="#fff" stopOpacity={dark ? 0.14 : 0.26} />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity={dark ? 0.35 : 0.22} />
        </linearGradient>
      </defs>
      {room ? (
        <g>
          <rect width={W} height={fy} fill={dark ? '#24231f' : '#dcd7cc'} />
          <rect y={fy} width={W} height={H - fy} fill={dark ? '#191816' : '#bab3a6'} />
          <rect x={m.x + 16} y={m.y + 22} width={m.w} height={m.h} fill="#000" opacity="0.35" filter={`url(#${uid}-b2)`} />
        </g>
      ) : null}
      <g clipPath={`url(#${clip})`}>
        <rect x={m.x} y={m.y} width={m.w} height={m.h} fill={base} />
        {relief}
        <rect x={m.x} y={m.y} width={m.w} height={m.h} fill={`url(#${uid}-rake)`} />
      </g>
      {room && <rect y={fy} width={W} height={H - fy} fill={`url(#${uid}-rake)`} opacity="0.6" />}
    </g>
  )
}

/* ----------------------------------------------- architectural elements */

function buildJaali({ uid, W, H, pal, variant, scene }) {
  const room = scene !== 'none'
  const fy = H * 0.78
  const p = room ? { x: W * 0.16, y: H * 0.06, w: W * 0.68, h: fy - H * 0.06 } : { x: 0, y: 0, w: W, h: H }
  const cs = 110
  const tile = `${uid}-jt`
  const panel = pal[3]
  const glow = '#fbf6e9'
  let hole
  if (variant === 'circles') {
    const r = cs * 0.26
    hole = [[0.5, 0.25], [0.75, 0.5], [0.5, 0.75], [0.25, 0.5]].map(([a, b]) => ell(a * cs, b * cs, r, r)).join(' ')
  } else if (variant === 'lattice') {
    const g = cs * 0.14
    hole = `${poly([[g, g], [cs / 2 - g / 2, g], [g, cs / 2 - g / 2]])} ${poly([[cs - g, g], [cs - g, cs / 2 - g / 2], [cs / 2 + g / 2, g]])} ${poly([[cs - g, cs - g], [cs / 2 + g / 2, cs - g], [cs - g, cs / 2 + g / 2]])} ${poly([[g, cs - g], [g, cs / 2 + g / 2], [cs / 2 - g / 2, cs - g]])} ${poly([[cs / 2, cs * 0.3], [cs * 0.7, cs / 2], [cs / 2, cs * 0.7], [cs * 0.3, cs / 2]])}`
  } else {
    // eight-point star
    const c = cs / 2
    const a = cs * 0.3
    const pts = []
    for (let i = 0; i < 16; i++) {
      const ang = (Math.PI / 8) * i
      const rr = i % 2 ? a * 0.62 : a
      pts.push([c + Math.cos(ang) * rr, c + Math.sin(ang) * rr])
    }
    hole = poly(pts)
  }
  return (
    <g>
      <defs>
        <pattern id={tile} width={cs} height={cs} patternUnits="userSpaceOnUse" x={p.x} y={p.y}>
          <rect width={cs} height={cs} fill={panel} />
          <path d={hole} fill="#000" opacity="0.35" transform="translate(4 5)" />
          <path d={hole} fill={glow} />
        </pattern>
        <linearGradient id={`${uid}-jl`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.12" />
          <stop offset="1" stopColor="#000" stopOpacity="0.25" />
        </linearGradient>
      </defs>
      {room && (
        <g>
          <rect width={W} height={fy} fill="#a59e90" />
          <rect y={fy} width={W} height={H - fy} fill="#8f887b" />
          <g opacity="0.5" filter={`url(#${uid}-b1)`}>
            <rect x={p.x} y={fy} width={p.w} height={p.h} fill={`url(#${tile})`} transform={`matrix(1 0 0.9 0.32 ${-0.9 * fy * 0.32 + 30} ${fy * 0.68})`} />
          </g>
          <rect x={p.x + 18} y={p.y + 14} width={p.w} height={p.h} fill="#000" opacity="0.3" filter={`url(#${uid}-b2)`} />
        </g>
      )}
      <rect x={p.x} y={p.y} width={p.w} height={p.h} fill={`url(#${tile})`} />
      <rect x={p.x} y={p.y} width={p.w} height={p.h} fill={`url(#${uid}-jl)`} />
      {room && <rect x={p.x} y={p.y} width={p.w} height={p.h} fill="none" stroke={pal[1]} strokeWidth="16" />}
    </g>
  )
}

function buildFacade({ uid, W, H, rand, pal, variant }) {
  const ground = H * 0.88
  const sky = (
    <g>
      <defs>
        <linearGradient id={`${uid}-sky`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#d9ddd9" />
          <stop offset="1" stopColor="#ebebe5" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${uid}-sky)`} />
      <rect y={ground} width={W} height={H - ground} fill="#9b958a" />
    </g>
  )
  const wall = mix(pal[3], '#e2ddd2', 0.4)
  const wallShade = mix(wall, '#000', 0.18)

  if (variant === 'fins') {
    const top = H * 0.08
    const n = 12
    const gap = W / n
    const floors = 5
    return (
      <g>
        {sky}
        <rect x={0} y={top} width={W} height={ground - top} fill={wall} />
        {Array.from({ length: floors }, (_, f) => {
          const fh = (ground - top) / floors
          return <rect key={f} x={0} y={top + f * fh + fh * 0.18} width={W} height={fh * 0.62} fill="#4b5157" opacity="0.85" />
        })}
        {Array.from({ length: n }, (_, i) => {
          const x = i * gap + gap * 0.35
          const fw = gap * 0.22
          const side = gap * 0.18
          return (
            <g key={i}>
              <polygon points={`${x + fw},${top} ${x + fw + side * 2.2},${top} ${x + fw + side * 2.2},${ground} ${x + fw},${ground}`} fill="#000" opacity="0.16" />
              <rect x={x + fw} y={top} width={side} height={ground - top} fill={wallShade} />
              <rect x={x} y={top} width={fw} height={ground - top} fill={`url(#${uid}-mflat)`} />
              <rect x={x} y={top} width={fw * 0.3} height={ground - top} fill="#fff" opacity="0.2" />
            </g>
          )
        })}
        <rect x={0} y={top - 18} width={W} height={18} fill={wallShade} />
      </g>
    )
  }

  if (variant === 'columns') {
    const top = H * 0.12
    const n = 4
    const colW = W * 0.09
    return (
      <g>
        {sky}
        <rect x={0} y={top} width={W} height={ground - top} fill={mix(wall, '#000', 0.05)} />
        <rect x={0} y={top} width={W} height={(ground - top) * 0.8} fill="#000" opacity="0.08" />
        {Array.from({ length: n }, (_, i) => {
          const x = W * 0.12 + i * ((W * 0.76 - colW) / (n - 1))
          const capH = colW * 0.45
          return (
            <g key={i}>
              <rect x={x + colW * 0.7} y={top + capH} width={colW * 1.3} height={ground - top - capH} fill="#000" opacity="0.14" filter={`url(#${uid}-b1)`} />
              <rect x={x - colW * 0.15} y={top} width={colW * 1.3} height={capH} fill={`url(#${uid}-mflat)`} />
              <rect x={x - colW * 0.15} y={top + capH - 8} width={colW * 1.3} height={8} fill="#000" opacity="0.18" />
              <rect x={x} y={top + capH} width={colW} height={ground - top - capH * 2} fill={`url(#${uid}-m)`} />
              {Array.from({ length: 5 }, (_, j) => (
                <line key={j} x1={x + (colW * (j + 1)) / 6} x2={x + (colW * (j + 1)) / 6} y1={top + capH} y2={ground - capH} stroke="#000" strokeOpacity="0.12" strokeWidth="3" />
              ))}
              <rect x={x - colW * 0.12} y={ground - capH} width={colW * 1.24} height={capH} fill={`url(#${uid}-mflat)`} />
            </g>
          )
        })}
      </g>
    )
  }

  if (variant === 'chhajja') {
    const top = H * 0.06
    const cols = 3
    const rows = 2
    const bayW = W / cols
    const rowH = (ground - top) / rows
    return (
      <g>
        {sky}
        <rect x={0} y={top} width={W} height={ground - top} fill={wall} />
        {Array.from({ length: rows * cols }, (_, i) => {
          const c = i % cols
          const r = Math.floor(i / cols)
          const wx = c * bayW + bayW * 0.24
          const ww = bayW * 0.52
          const wy = top + r * rowH + rowH * 0.34
          const wh = rowH * 0.56
          const sy = wy - 26
          const over = ww * 0.16
          return (
            <g key={i}>
              <rect x={wx} y={wy} width={ww} height={wh} fill="#4b5157" />
              <rect x={wx} y={wy} width={ww} height={wh * 0.45} fill="#000" opacity="0.28" />
              <line x1={wx + ww / 2} x2={wx + ww / 2} y1={wy} y2={wy + wh} stroke={wall} strokeWidth="6" />
              <polygon points={`${wx - over},${sy + 20} ${wx + ww + over},${sy + 20} ${wx + ww + over + 14},${sy + 46} ${wx - over - 14},${sy + 46}`} fill="#000" opacity="0.22" filter={`url(#${uid}-b1)`} />
              <polygon points={`${wx - over},${sy} ${wx + ww + over},${sy} ${wx + ww + over + 18},${sy + 18} ${wx - over - 18},${sy + 18}`} fill={`url(#${uid}-mflat)`} />
              <rect x={wx - over - 18} y={sy + 18} width={ww + over * 2 + 36} height={8} fill={wallShade} />
              {[0.12, 0.88].map((t) => (
                <polygon key={t} points={`${wx + ww * t - 8},${sy + 26} ${wx + ww * t + 8},${sy + 26} ${wx + ww * t + 3},${sy + 60} ${wx + ww * t - 3},${sy + 60}`} fill={wallShade} />
              ))}
            </g>
          )
        })}
      </g>
    )
  }

  // arches with chhajja (default)
  const top = H * 0.1
  const slabY = H * 0.26
  const n = 4
  const bay = W / n
  return (
    <g>
      {sky}
      <rect x={0} y={top} width={W} height={ground - top} fill={wall} />
      <rect x={-10} y={slabY} width={W + 20} height={22} fill={`url(#${uid}-mflat)`} />
      <rect x={0} y={slabY + 22} width={W} height={70} fill="#000" opacity="0.2" filter={`url(#${uid}-b1)`} />
      {Array.from({ length: n * 2 }, (_, i) => (
        <polygon key={i} points={`${(i + 0.5) * (W / (n * 2)) - 8},${slabY + 22} ${(i + 0.5) * (W / (n * 2)) + 8},${slabY + 22} ${(i + 0.5) * (W / (n * 2)) + 2},${slabY + 64} ${(i + 0.5) * (W / (n * 2)) - 2},${slabY + 64}`} fill={wallShade} />
      ))}
      {Array.from({ length: n }, (_, i) => {
        const x = i * bay + bay * 0.16
        const w = bay * 0.68
        const at = slabY + 120
        const r = w / 2
        const d = `M${x},${ground} V${at + r} A${r},${r} 0 0 1 ${x + w},${at + r} V${ground} Z`
        return (
          <g key={i}>
            <path d={d} transform="translate(-10 -6)" fill={`url(#${uid}-mflat)`} />
            <path d={d} fill="#3d3a35" />
            <path d={d} fill="#000" opacity="0.2" />
            <path d={`M${x + w * 0.55},${ground} V${at + r} A${r},${r} 0 0 1 ${x + w},${at + r} V${ground} Z`} fill="#fff" opacity="0.05" />
          </g>
        )
      })}
    </g>
  )
}

function buildFurniture({ uid, W, H, rand, url, scale, variant, scene }) {
  const fy = H * 0.66
  const by = fy + (H - fy) * 0.5
  const k = (Math.min(W, H) / 1000) * scale * 1.1
  const cx = W / 2
  let body
  if (variant === 'console') {
    const tw = 620 * k
    const th = 34 * k
    const h = 380 * k
    const topY = by - h
    const ped = `M${cx - 90 * k},${by} C${cx - 40 * k},${by - h * 0.45} ${cx - 120 * k},${topY + th + 60 * k} ${cx - 160 * k},${topY + th} L${cx + 160 * k},${topY + th} C${cx + 120 * k},${topY + th + 60 * k} ${cx + 40 * k},${by - h * 0.45} ${cx + 90 * k},${by} Z`
    body = (
      <g>
        <ellipse cx={cx + 30 * k} cy={by + 2} rx={150 * k} ry={14 * k} fill="#000" opacity="0.3" filter={`url(#${uid}-b1)`} />
        <path d={ped} fill={url('m')} />
        <path d={ped} fill={url('shade')} />
        <polygon points={`${cx - tw / 2},${topY} ${cx + tw / 2},${topY} ${cx + tw / 2 - 30 * k},${topY - 26 * k} ${cx - tw / 2 + 30 * k},${topY - 26 * k}`} fill={url('mflat')} />
        <rect x={cx - tw / 2} y={topY} width={tw} height={th} fill={url('m')} />
        <rect x={cx - tw / 2} y={topY + th} width={tw} height={6 * k} fill="#000" opacity="0.2" />
      </g>
    )
  } else {
    const sw = 760 * k
    const sh = 70 * k
    const legH = 170 * k
    const seatY = by - legH - sh
    body = (
      <g>
        <ellipse cx={cx + 40 * k} cy={by + 2} rx={sw * 0.55} ry={18 * k} fill="#000" opacity="0.3" filter={`url(#${uid}-b1)`} />
        {[-1, 1].map((sgn) => (
          <g key={sgn}>
            <rect x={cx + sgn * sw * 0.3 - 70 * k} y={seatY + sh} width={140 * k} height={legH} fill={url('m')} />
            <rect x={cx + sgn * sw * 0.3 - 70 * k} y={seatY + sh} width={140 * k} height={legH} fill={url('shade')} />
          </g>
        ))}
        <polygon points={`${cx - sw / 2},${seatY} ${cx + sw / 2},${seatY} ${cx + sw / 2 - 36 * k},${seatY - 40 * k} ${cx - sw / 2 + 36 * k},${seatY - 40 * k}`} fill={url('mflat')} />
        <rect x={cx - sw / 2} y={seatY} width={sw} height={sh} rx={4 * k} fill={url('m')} />
        <rect x={cx - sw / 2} y={seatY + sh} width={sw} height={8 * k} fill="#000" opacity="0.22" />
      </g>
    )
  }
  return (
    <g>
      <Scene scene={scene} uid={uid} W={W} H={H} rand={rand} floorY={fy} />
      {body}
    </g>
  )
}

/* ---------------------------------------------------- textures and people */

function buildTexture({ uid, W, H, rand, pal, variant }) {
  const material = variant || 'stone'
  const freq = { bronze: 0.012, steel: 0.004, stone: 0.02, frp: 0.006, grc: 0.05, corten: 0.015 }[material] ?? 0.02
  const fid = `${uid}-tex`
  return (
    <g>
      <defs>
        <filter id={fid} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency={material === 'steel' ? `0.002 0.08` : freq} numOctaves="4" seed={Math.floor(rand() * 100)} />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -1.1 1.05" />
        </filter>
        <linearGradient id={`${uid}-tl`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.3" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${uid}-mflat)`} />
      <rect width={W} height={H} filter={`url(#${fid})`} opacity={material === 'frp' ? 0.16 : material === 'bronze' ? 0.35 : 0.45} />
      {material === 'bronze' &&
        Array.from({ length: 7 }, (_, i) => (
          <circle key={i} cx={range(rand, 0, W)} cy={range(rand, 0, H)} r={range(rand, 60, 220)} fill="#4f6a5a" opacity="0.18" filter={`url(#${uid}-b3)`} />
        ))}
      {material === 'stone' &&
        Array.from({ length: 4 }, (_, i) => (
          <path key={i} d={`M${range(rand, -100, W)},-20 C${range(rand, 0, W)},${H * 0.3} ${range(rand, 0, W)},${H * 0.6} ${range(rand, 0, W)},${H + 20}`} stroke="#f4efe4" strokeOpacity="0.5" strokeWidth={range(rand, 1.5, 4)} fill="none" />
        ))}
      {material === 'grc' &&
        Array.from({ length: 160 }, (_, i) => (
          <circle key={i} cx={range(rand, 0, W)} cy={range(rand, 0, H)} r={range(rand, 1, 4)} fill="#3f3d39" opacity={range(rand, 0.2, 0.6)} />
        ))}
      <rect width={W} height={H} fill={`url(#${uid}-tl)`} />
    </g>
  )
}

function buildPortrait({ uid, W, H, rand, scene }) {
  const fy = H * 0.98
  const cx = W * 0.5
  const headRx = W * 0.105
  const headRy = W * 0.135
  const headY = H * 0.34
  const neckTop = headY + headRy * 0.7
  const shoulderY = H * 0.62
  const body = `M${cx - W * 0.42},${H + 10}
    C${cx - W * 0.42},${shoulderY + H * 0.12} ${cx - W * 0.36},${shoulderY + 6} ${cx - W * 0.2},${shoulderY - 6}
    C${cx - W * 0.1},${shoulderY - 12} ${cx - W * 0.07},${shoulderY - 30} ${cx - W * 0.065},${neckTop + 40}
    L${cx - W * 0.06},${neckTop}
    L${cx + W * 0.06},${neckTop}
    L${cx + W * 0.065},${neckTop + 40}
    C${cx + W * 0.07},${shoulderY - 30} ${cx + W * 0.1},${shoulderY - 12} ${cx + W * 0.2},${shoulderY - 6}
    C${cx + W * 0.36},${shoulderY + 6} ${cx + W * 0.42},${shoulderY + H * 0.12} ${cx + W * 0.42},${H + 10} Z`
  return (
    <g>
      <defs>
        <linearGradient id={`${uid}-fig`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#5b5650" />
          <stop offset="0.25" stopColor="#3e3a35" />
          <stop offset="1" stopColor="#2a2724" />
        </linearGradient>
      </defs>
      <Scene scene={scene || 'gallery'} uid={uid} W={W} H={H} rand={rand} floorY={fy} />
      <g filter={`url(#${uid}-b1)`} opacity="0.95">
        <path d={body} transform={`translate(${W * 0.07} ${-H * 0.01})`} fill="#000" opacity="0.1" />
        <path d={body} fill={`url(#${uid}-fig)`} />
        <ellipse cx={cx + W * 0.005} cy={headY} rx={headRx} ry={headRy} fill={`url(#${uid}-fig)`} />
      </g>
    </g>
  )
}

function buildStudio({ uid, W, H, rand, url, scale }) {
  const fy = H * 0.62
  const tableY = H * 0.7
  const s = Math.min(H / 1300, W / 2300) * scale
  const items = [
    { v: 'standing', x: 0.24 },
    { v: 'cairn', x: 0.47 },
    { v: 'ring', x: 0.74 },
  ]
  return (
    <g>
      <Scene scene="gallery" uid={uid} W={W} H={H} rand={rand} floorY={fy} />
      <rect x={0} y={tableY} width={W} height={H - tableY} fill="#8f7b62" />
      <rect x={0} y={tableY} width={W} height={10} fill="#b49b7c" />
      <rect x={0} y={tableY + 10} width={W} height={H} fill="#000" opacity="0.12" />
      {items.map((it, i) => {
        const f = sculptureForm(it.v, W * it.x, tableY + 2, s * (i === 1 ? 1.1 : 1), rand, url, `${uid}-st${i}`)
        return (
          <g key={i}>
            <ellipse cx={W * it.x + 14} cy={tableY + 4} rx={f.width * 0.6} ry={8} fill="#000" opacity="0.3" filter={`url(#${uid}-b1)`} />
            {f.body}
          </g>
        )
      })}
    </g>
  )
}

const BUILDERS = {
  sculpture: buildSculpture,
  planter: buildPlanter,
  mural: buildMural,
  jaali: buildJaali,
  facade: buildFacade,
  furniture: buildFurniture,
  texture: buildTexture,
  portrait: buildPortrait,
  studio: buildStudio,
}
