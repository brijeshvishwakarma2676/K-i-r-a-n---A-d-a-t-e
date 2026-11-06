import { useEffect } from 'react'

/*
  Rooms. Wrap a run of sections in <Tone name="night"> (or clay, moss, stone, earth, light) and the
  whole page fades to that palette while the run is in the middle of the screen. The palettes are
  in src/styles/global.css (":root[data-tone=…]").
*/
export default function Tone({ name, as: Tag = 'div', className, children }) {
  return (
    <Tag data-tone={name} className={className}>
      {children}
    </Tag>
  )
}

// Watches the rooms inside `root` and sets the tone of the one crossing the middle of the screen.
// Called once per page; the page starts in the light room.
export function useRooms(rootRef) {
  useEffect(() => {
    const html = document.documentElement
    const set = (tone) => {
      if (tone === 'light') delete html.dataset.tone
      else html.dataset.tone = tone
    }
    set('light')
    const root = rootRef.current
    if (!root || typeof IntersectionObserver === 'undefined') return () => set('light')
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) set(e.target.dataset.tone)
      },
      { rootMargin: '-50% 0px -50% 0px' },
    )
    const watch = () => root.querySelectorAll('[data-tone]').forEach((r) => io.observe(r))
    watch()
    // Rooms that appear later (a filter swapping sections) are watched as they arrive.
    const mo = new MutationObserver(watch)
    mo.observe(root, { childList: true, subtree: true })
    return () => {
      mo.disconnect()
      io.disconnect()
      set('light')
    }
  }, [rootRef])
}
