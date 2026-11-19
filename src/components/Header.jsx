import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { X } from 'lucide-react'
import { nav, site } from '../data/site'
import useLockBody from '../hooks/useLockBody'
import useFocusTrap from '../hooks/useFocusTrap'
import { ease } from './Motion'
import { LANGS, useLang, useT } from '../i18n'

export default function Header() {
  const { pathname } = useLocation()
  const { scrollY } = useScroll()
  const [solid, setSolid] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const t = useT()
  // Pages whose opening section is dark get light lettering until the header turns solid.
  const darkTop = pathname === '/works/murals' && !solid

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setSolid(y > 24)
    setHidden(y > 320 && y > prev + 4 && !open)
    if (y < prev - 4) setHidden(false)
  })

  useEffect(() => setOpen(false), [pathname])

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top,0px)] transition-colors duration-500 ${
          solid ? 'bg-limestone/[0.97]' : 'bg-transparent'
        } ${darkTop ? 'on-dark text-bone' : 'text-ink'}`}
        animate={{ y: hidden ? '-100%' : '0%' }}
        transition={{ duration: 0.45, ease }}
      >
        <div className="wrap flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link to="/" className="group flex items-baseline gap-3" aria-label={`${site.name}, home`}>
            <span className="display latin text-[1.7rem] leading-none">{site.name}</span>
            <span className="caption hidden xl:inline">{t(site.short)}</span>
          </Link>

          <nav aria-label={t('Main')} className="hidden items-center gap-9 md:flex">
            <ul className="flex items-center gap-9">
              {nav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `relative py-2 text-[0.85rem] [font-variation-settings:'wdth'_112] tracking-[0.01em] transition-colors ${
                        darkTop
                          ? isActive ? 'text-bone' : 'text-bone/70 hover:text-bone'
                          : isActive ? 'text-ink' : 'text-ink-soft hover:text-ink'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {t(item.label)}
                        <span
                          className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-current transition-transform duration-500 ease-gallery ${
                            isActive ? 'scale-x-100' : 'scale-x-0'
                          }`}
                        />
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
            <LangSwitch dark={darkTop} />
          </nav>

          <button
            type="button"
            className="text-[0.85rem] [font-variation-settings:'wdth'_112] md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            {t('Menu')}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>{open && <MobileMenu onClose={() => setOpen(false)} />}</AnimatePresence>
    </>
  )
}

// English, Hindi, Marathi. The current one is marked; the choice is remembered.
function LangSwitch({ dark = false, className = '' }) {
  const { lang, setLang } = useLang()
  const t = useT()
  return (
    <div role="group" aria-label={t('Language')} className={`flex items-center gap-1 text-[0.8rem] ${className}`}>
      {LANGS.map((l, i) => (
        <span key={l.code} className="flex items-center gap-1">
          {i > 0 && <span aria-hidden="true" className={dark ? 'text-bone/40' : 'text-ink/30'}>/</span>}
          <button
            type="button"
            lang={l.code}
            aria-pressed={lang === l.code}
            aria-label={l.label}
            onClick={() => setLang(l.code)}
            className={`px-1 py-2 transition-colors ${lang === l.code ? (dark ? 'text-bone' : 'text-ink underline decoration-geru underline-offset-4') : dark ? 'text-bone/60 hover:text-bone' : 'text-ink-soft hover:text-ink'}`}
          >
            {l.short}
          </button>
        </span>
      ))}
    </div>
  )
}

function MobileMenu({ onClose }) {
  const ref = useRef(null)
  const t = useT()
  useLockBody(true)
  useFocusTrap(ref, true, onClose)
  return (
    <motion.div
      ref={ref}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label={t('Menu')}
      className="fixed inset-0 z-[60] flex flex-col bg-limestone pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)]"
      initial={{ y: '-100%' }}
      animate={{ y: '0%' }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.6, ease }}
    >
      <div className="wrap flex h-[var(--header-h)] items-center justify-between">
        <Link to="/" onClick={onClose} className="display latin text-[1.85rem] leading-none">
          {site.name}
        </Link>
        <button type="button" onClick={onClose} className="-mr-2 flex items-center gap-2 p-2 text-[0.85rem]" aria-label={t('Close menu')}>
          {t('Close')} <X size={18} strokeWidth={1.25} aria-hidden="true" />
        </button>
      </div>
      <nav aria-label={t('Main')} className="wrap flex-1 overflow-y-auto pt-6">
        <ul>
          {[{ to: '/', label: 'Home' }, ...nav].map((item, i) => (
            <motion.li
              key={item.to}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.15 + i * 0.045 }}
              className="border-b border-stone"
            >
              <NavLink
                to={item.to}
                end={item.to === '/'}
                onClick={onClose}
                className={({ isActive }) => `display block py-3 text-[2.8rem] leading-none ${isActive ? 'italic text-geru' : ''}`}
              >
                {t(item.label)}
              </NavLink>
            </motion.li>
          ))}
        </ul>
      </nav>
      <div className="wrap pb-8 pt-6">
        <a href={`mailto:${site.email}`} className="text-link text-[0.95rem]">
          {site.email}
        </a>
        <p className="caption mt-2">{t(site.short)}</p>
        <LangSwitch className="mt-4 -ml-1" />
      </div>
    </motion.div>
  )
}
