import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

/*
  Languages: English (the site's own text), Hindi and Marathi.

  Text is translated by its English wording: t('Works') gives 'कृतियाँ' in Hindi. The dictionaries
  (src/i18n/hi.js, mr.js) map English text to the translation; anything missing stays in English,
  so a new sentence never breaks a page, it only waits for its translation. Placeholders in braces
  are filled from `vars`: t('About {name}', { name }) .

  The visitor's choice is remembered in the browser and sets <html lang>. Pages are pre-rendered in
  English; a saved choice is applied just after the app has taken over the page (the first render
  must match the English HTML). Each dictionary is a separate file that downloads only when its
  language is chosen, so English visitors never load them; preloadSavedLanguage() (main.jsx)
  starts that download while the app is still starting.
*/
export const LANGS = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'hi', label: 'हिन्दी', short: 'हिं' },
  { code: 'mr', label: 'मराठी', short: 'मरा' },
]
const DICTS = {} // filled as each language is first chosen
const LOAD = { hi: () => import('./hi.js').then((m) => m.hi), mr: () => import('./mr.js').then((m) => m.mr) }
const KEY = 'lang'

function load(code) {
  if (code === 'en' || DICTS[code]) return Promise.resolve()
  return LOAD[code]().then((dict) => {
    DICTS[code] = dict
  })
}

function saved() {
  try {
    const v = localStorage.getItem(KEY)
    return LANGS.some((l) => l.code === v) ? v : 'en'
  } catch {
    return 'en'
  }
}

export function preloadSavedLanguage() {
  load(saved()).catch(() => {})
}

const LangContext = createContext({ lang: 'en', setLang: () => {} })

export function LangProvider({ children }) {
  const [lang, show] = useState('en')
  const wanted = useRef('en') // the latest choice, in case an earlier one is still downloading

  // Choose a language: its dictionary downloads first, so the page never shows half a language.
  const setLang = useCallback((code, remember = true) => {
    if (!LANGS.some((l) => l.code === code)) return
    wanted.current = code
    if (remember) {
      try {
        localStorage.setItem(KEY, code)
      } catch {
        /* private mode: the choice lasts for this visit only */
      }
    }
    load(code)
      .then(() => wanted.current === code && show(code))
      .catch(() => {}) // offline: stay in the current language
  }, [])

  useEffect(() => {
    const s = saved()
    if (s !== 'en') setLang(s, false)
  }, [setLang])
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo(() => ({ lang, setLang }), [lang, setLang])
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)

// t(english, vars?) → the text in the current language.
export function useT() {
  const { lang } = useContext(LangContext)
  return useCallback(
    (text, vars) => {
      if (text == null) return text
      let s = (lang !== 'en' && DICTS[lang]?.[text]) || text
      if (vars) s = s.replace(/\{(\w+)\}/g, (m, k) => (vars[k] != null ? t2(vars[k]) : m))
      return s
      function t2(v) {
        return typeof v === 'string' ? (lang !== 'en' && DICTS[lang]?.[v]) || v : v
      }
    },
    [lang],
  )
}

// <T>English text</T> in JSX, for text inside small components: same as t().
export function T({ children, vars }) {
  const t = useT()
  return t(children, vars)
}
