import { Link } from 'react-router'
import Seo, { personLd } from '../components/Seo'
import { artist } from '../data/site'

const jsonLd = personLd(artist)
import Hero from '../sections/Hero'
import Statement from '../sections/Statement'
import Monument from '../sections/Monument'
import SelectedWorks from '../sections/SelectedWorks'
import RecentExhibition from '../sections/RecentExhibition'
import DisciplineIndex from '../sections/DisciplineIndex'
import Studio from '../sections/Studio'
import PressBand from '../sections/PressBand'
import InPlace from '../sections/InPlace'
import ArtistIntro from '../sections/ArtistIntro'
import Invitation from '../sections/Invitation'

// Sections below the first screen are wrapped in .cv-auto: the browser skips rendering them until
// they come near the screen, which keeps scrolling light on modest computers.
export default function Home() {
  return (
    <>
      <Seo jsonLd={jsonLd} />
      {/* TEST ONLY: one button to the AI video test page (/video-test). Remove with that page. */}
      <Link
        to="/video-test"
        className="fixed bottom-4 right-4 z-[70] rounded-full bg-basalt px-4 py-2.5 text-[0.85rem] text-bone shadow-[0_6px_20px_rgb(0_0_0/0.25)] transition-colors hover:bg-geru md:bottom-6 md:right-6"
      >
        Video test
      </Link>
      <Hero />
      <div className="cv-auto room-dark">
        <Statement />
        <Monument />
      </div>
      <div className="cv-auto">
        <SelectedWorks />
        <RecentExhibition />
      </div>
      <div className="cv-auto"><DisciplineIndex /></div>
      <div className="cv-auto"><Studio /></div>
      <div className="cv-auto"><PressBand /></div>
      <div className="cv-auto"><InPlace /></div>
      <div className="cv-auto">
        <ArtistIntro />
        <Invitation />
      </div>
    </>
  )
}
