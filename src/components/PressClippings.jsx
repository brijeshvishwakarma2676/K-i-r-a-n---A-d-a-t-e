import ArtImage from './ArtImage'
import Lightbox from './Lightbox'
import useOverlay from '../hooks/useOverlay'
import { Stagger } from './Motion'
import { useT } from '../i18n'

/*
  Newspaper clippings as a row of cards: the page as a picture, its headline and the paper and
  date beneath. Each opens full size (whole page, not cropped) so the article can be read.
  `items` are entries of artist.press in src/data/site.js.
*/
export default function PressClippings({ items, className = '' }) {
  // A history step, like every overlay: Back closes the clipping (src/hooks/useOverlay.js).
  const clipping = useOverlay('press')
  const open = clipping.open ? clipping.state.view ?? 0 : null
  const setOpen = (i) => clipping.show({ view: i })
  const t = useT()
  const images = items.map((x) => ({ id: x.image, alt: `${x.title}: ${t(x.outlet)}`, caption: `${x.title}${/[.!?]$/.test(x.title) ? "" : "."} ${t(x.outlet)}`, fit: 'contain' }))
  return (
    <>
      <Stagger as="ul" className={`grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 ${className}`} itemAs="li">
        {items.map((x, i) => (
          <button key={x.image} type="button" onClick={() => setOpen(i)} className="group block w-full cursor-zoom-in text-left" aria-label={t('Read “{title}”, {outlet}', { title: x.title, outlet: x.outlet })}>
            <div className="overflow-hidden bg-paper p-2 shadow-[0_18px_30px_-22px_rgb(34_33_30/0.45)] transition-transform duration-500 ease-gallery group-hover:-translate-y-1">
              <ArtImage image={images[i]} ratio="1/1" sizes="(min-width: 640px) 18vw, 45vw" />
            </div>
            <span className="label-title mt-3 block text-[1.08rem] leading-snug group-hover:text-geru">{x.title}</span>
            <span className="caption mt-1 block">{t(x.outlet)}</span>
          </button>
        ))}
      </Stagger>
      <Lightbox images={images} index={open} onIndex={(i) => clipping.update({ view: i })} onClose={clipping.hide} title={t('Press')} />
    </>
  )
}
