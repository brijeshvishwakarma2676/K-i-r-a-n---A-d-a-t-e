import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'
import { redirect } from 'react-router'
import { shortLinkFor } from './data/shortLinks'

// Pages other than Home load on demand. The router waits for the code before it navigates,
// so page transitions are unaffected.
const page = (load) => {
  loaders.push(load)
  return () => load().then((m) => ({ Component: m.default }))
}
const loaders = []

// Fetches every page's code once the first page is up (main.jsx), so moving to another page never
// waits for it; each is small, and the browser keeps them.
export const prefetchPages = () => Promise.allSettled(loaders.map((load) => load()))

export const routes = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'works', lazy: page(() => import('./pages/Works')) },
      { path: 'works/:slug', lazy: page(() => import('./pages/Discipline')) },
      { path: 'works/:slug/:work', lazy: page(() => import('./pages/Project')) },
      { path: 'exhibitions', lazy: page(() => import('./pages/Exhibitions')) },
      { path: 'material', lazy: page(() => import('./pages/Material')) },
      { path: 'about', lazy: page(() => import('./pages/About')) },
      { path: 'contact', lazy: page(() => import('./pages/Contact')) },
      // Short links (src/data/shortLinks.js): /freedom, /IFA-SC-041, /sculpture… lead to their page;
      // any other single word is the not-found page.
      {
        path: ':short',
        loader: ({ params }) => {
          const to = shortLinkFor(params.short)
          if (to) throw redirect(to)
          return null
        },
        lazy: page(() => import('./pages/NotFound')),
      },
      { path: '*', lazy: page(() => import('./pages/NotFound')) },
    ],
  },
  // The portfolio as printable A4 sheets, outside the site's header and footer.
  { path: '/portfolio', lazy: page(() => import('./pages/Portfolio')) },
]
