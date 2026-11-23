import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tailwindcss()],
  // The day of the build: pages are pre-rendered with it, and src/lib/useToday.js starts from it.
  define: { __BUILD_DATE__: JSON.stringify(new Date().toISOString().slice(0, 10)) },
  // The server build (src/entry-server.jsx, used by scripts/prerender.mjs) bundles the motion and
  // icon libraries so Node can load them; React stays external.
  ssr: { noExternal: ['framer-motion', 'lucide-react', /^@fontsource/] },
  build: isSsrBuild ? {} : {
    rollupOptions: {
      output: {
        // Libraries in their own files: they change rarely, so browsers keep them cached
        // between deploys, and the site's own code downloads in parallel with them.
        manualChunks: {
          react: ['react', 'react-dom', 'react-router'],
          motion: ['framer-motion'],
        },
      },
    },
  },
}))
