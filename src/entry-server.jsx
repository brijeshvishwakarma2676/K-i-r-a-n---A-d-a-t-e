import { renderToString } from 'react-dom/server'
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router'
import { routes } from './routes'
import { HeadContext } from './components/Seo'
import { projects, workPath } from './data/projects'
import { disciplines } from './data/disciplines'
export { shortLinks } from './data/shortLinks'

/*
  Server entry used only at build time by scripts/prerender.mjs: renders one page of the site to
  HTML, so that search engines and link previews get the full page without running JavaScript.
  Returns the page's markup and the head values its <Seo> set.
*/
export async function render(path) {
  const handler = createStaticHandler(routes)
  const context = await handler.query(new Request(`http://localhost${path}`))
  if (context instanceof Response) throw new Error(`${path} redirected`)
  const router = createStaticRouter(handler.dataRoutes, context)
  const head = {}
  const html = renderToString(
    <HeadContext.Provider value={head}>
      <StaticRouterProvider router={router} context={context} hydrate={false} />
    </HeadContext.Provider>,
  )
  return { html, head, status: context.statusCode }
}

// Every page the site has, for pre-rendering and the sitemap.
export const paths = [
  '/',
  '/works',
  ...disciplines.map((d) => `/works/${d.slug}`),
  ...projects.map(workPath),
  '/exhibitions',
  '/material',
  '/about',
  '/contact',
  '/portfolio',
]
