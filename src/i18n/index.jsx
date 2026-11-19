import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { hi } from './hi'
import { mr } from './mr'

/*
  Languages: English (the site's own text), Hindi and Marathi.

  Text is translated by its English wording: t('Works') gives 'कृतियाँ' in Hindi. The dictionaries
  (src/i18n/hi.js, mr.js) map English text to the translation; anything missing stays in English,
  so a new sentence never breaks a page, it only waits for its translation. Placeholders in braces
  are filled from `vars`: t('About {name}', { name }) .

  The visitor's choice is remembered in the browser and sets <html lang>. Pages are pre-rendered in
  English; the chosen language is applied as soon as the app starts.
*/
export const LANGS = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'hi', label: 'हिन्दी', short: 'हिं' },
  { code: 'mr', label: 'मराठी', short: 'मरा' },
]
const DICTS = { hi, mr }
const KEY = 'lang'

function saved() {
  try {
    const v = localStorage.getItem(KEY)
    return LANGS.some((l) => l.code === v) ? v : 'en'
  } catch {
    return 'en'
  }
}

const LangContext = createContext({ lang: 'en', setLang: () => {} })

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => (typeof window === 'undefined' ? 'en' : saved()))
  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem(KEY, lang)
    } catch {
      /* private mode: the choice lasts for this visit only */
    }
  }, [lang])
  const value = useMemo(() => ({ lang, setLang }), [lang])
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
