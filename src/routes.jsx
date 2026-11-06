import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'

// Pages other than Home load on demand. The router waits for the code before it navigates,
// so page transitions are unaffected.
const page = (load) => () => load().then((m) => ({ Component: m.default }))

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
      { path: 'about', lazy: page(() => import('./pages/About')) },
      { path: 'contact', lazy: page(() => import('./pages/Contact')) },
      { path: '*', lazy: page(() => import('./pages/NotFound')) },
    ],
  },
]
