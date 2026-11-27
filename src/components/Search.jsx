import { useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import { Search as SearchIcon, X } from 'lucide-react'
import { projects, workPath } from '../data/projects'
import { disciplineBySlug } from '../data/disciplines'
import { nav } from '../data/site'
import { srcFor } from './ArtImage'
import useLockBody from '../hooks/useLockBody'
import useFocusTrap from '../hooks/useFocusTrap'
import { ease } from './Motion'
import { useT } from '../i18n'

/*
  Search: type part of a work's name, its material, its place, its year or its catalogue code, and
  go straight to it. Opened from the header, or with "/" or Ctrl/⌘ K anywhere on the site.
  Words are matched in English and in the language being read, in any order; works whose name
  starts with what was typed come first. Arrow keys move through the results, Enter opens one.
*/
const fold = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

export default function Search({ onClose }) {
  const t = useT()
  const navigate = useNavigate()
  const ref = useRef(null)
  const [q, setQ] = useState('')
  const [active, setActive] = useState(0)
  useLockBody(true)
  useFocusTrap(ref, true, onClose)

  // Everything searchable, built once per language.
  const entries = useMemo(() => {
    const works = projects.map((p) => {
      const d = disciplineBySlug[p.discipline]
      const group = d.groups?.find((g) => g.slug === p.group)?.name
      const meta = [t(d.name), p.medium && t(p.medium), p.year, p.location && t(p.location)].filter(Boolean).join(' · ')
      return {
        to: workPath(p),
        title: t(p.title),
        meta,
        image: srcFor(p.cover, 480),
        name: fold(`${p.title} ${t(p.title)}`),
        hay: fold([p.title, t(p.title), d.name, t(d.name), group, group && t(group), p.medium, p.medium && t(p.medium), p.year, p.location, p.location && t(p.location), p.code, ...(p.codes || [])].join(' ')),
      }
    })
    const pages = [{ to: '/', label: 'Home' }, ...nav, { to: '/portfolio', label: 'Portfolio' }].map((n) => ({
      to: n.to,
      title: t(n.label),
      meta: t('Page'),
      name: fold(`${n.label} ${t(n.label)}`),
      hay: fold(`${n.label} ${t(n.label)}`),
      page: true,
    }))
    return { works, pages }
  }, [t])

  const results = useMemo(() => {
    const words = fold(q).split(/\s+/).filter(Boolean)
    if (!words.length) return entries.pages
    const phrase = words.join(' ')
    const score = (e) => (e.name.startsWith(phrase) ? 3 : e.name.includes(phrase) ? 2 : e.name.split(/\s+/).some((w) => w.startsWith(words[0])) ? 1 : 0)
    return [...entries.pages, ...entries.works]
      .filter((e) => words.every((w) => e.hay.includes(w)))
      .map((e, i) => ({ e, s: score(e), i }))
      .sort((a, b) => b.s - a.s || a.i - b.i)
      .slice(0, 12)
      .map((r) => r.e)
  }, [q, entries])

  // Replaces search's own history step, so Back from the chosen page returns to the page search
  // was opened on (src/hooks/useOverlay.js).
  const go = (to) => navigate(to, { replace: true })
  const onKey = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter' && results[active]) {
      e.preventDefault()
      go(results[active].to)
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-start justify-center bg-[rgb(20_19_18/0.45)] md:p-[8svh_var(--gutter)_4svh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={t('Search the works')}
        className="flex h-full w-full flex-col bg-limestone text-ink shadow-[0_30px_80px_rgb(0_0_0/0.35)] md:h-auto md:max-h-full md:max-w-[44rem]"
        initial={{ y: -16 }}
        animate={{ y: 0 }}
        exit={{ y: -16 }}
        transition={{ duration: 0.35, ease }}
      >
        <div className="flex items-center gap-3 border-b border-stone px-5 pt-[env(safe-area-inset-top,0px)] md:px-6">
          <SearchIcon size={20} strokeWidth={1.25} aria-hidden="true" className="shrink-0 text-ink-soft" />
          <input
            type="search"
            value={q}
            onChange={(e) => {
              setQ(e.target.value)
              setActive(0)
            }}
            onKeyDown={onKey}
            placeholder={t('A name, material, place or year')}
            aria-label={t('Search the works')}
            role="combobox"
            aria-expanded="true"
            aria-controls="search-results"
            aria-activedescendant={results[active] ? `search-${active}` : undefined}
            autoComplete="off"
            spellCheck="false"
            enterKeyHint="go"
            className="display h-16 min-w-0 flex-1 bg-transparent text-[1.6rem] outline-none placeholder:text-ink-soft/60 md:h-20 md:text-[2rem] [&::-webkit-search-cancel-button]:appearance-none"
          />
          <button type="button" onClick={onClose} className="-mr-2 flex items-center gap-2 p-2 text-[0.85rem]" aria-label={t('Close search')}>
            <span className="hidden sm:inline">Esc</span> <X size={18} strokeWidth={1.25} aria-hidden="true" />
          </button>
        </div>

        <p className="caption px-5 pt-4 md:px-6" aria-live="polite">
          {q.trim() ? (results.length ? t('{n} found', { n: results.length }) : t('Nothing matches “{q}”.', { q: q.trim() })) : t('Pages')}
        </p>
        <ul id="search-results" role="listbox" aria-label={t('Results')} className="flex-1 overflow-y-auto px-2 pb-4 pt-2 md:px-3" data-lenis-prevent>
          {results.map((r, i) => (
            <li
              key={r.to}
              id={`search-${i}`}
              role="option"
              aria-selected={i === active}
              onMouseEnter={() => setActive(i)}
              onClick={() => go(r.to)}
              className={`flex cursor-pointer items-center gap-4 px-3 py-2.5 transition-colors ${i === active ? 'bg-paper' : ''}`}
            >
              {r.image ? (
                <img src={r.image} alt="" loading="lazy" decoding="async" className="h-12 w-12 shrink-0 object-cover" />
              ) : (
                <span aria-hidden="true" className="h-12 w-12 shrink-0 border border-stone" />
              )}
              <span className="min-w-0">
                <span className={`block truncate text-[1.15rem] leading-tight ${r.page ? 'display' : 'label-title'} ${i === active ? 'text-geru' : ''}`}>{r.title}</span>
                <span className="caption block truncate">{r.meta}</span>
              </span>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  )
}
