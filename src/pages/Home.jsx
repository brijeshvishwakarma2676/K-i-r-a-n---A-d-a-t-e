import Seo, { personLd, studioLd, websiteLd } from '../components/Seo'
import { artist } from '../data/site'

// The site, the artist and his studio, described for search engines.
const jsonLd = [websiteLd(), personLd(artist), studioLd()]
import Hero from '../sections/Hero'
import Statement from '../sections/Statement'
import Monument from '../sections/Monument'
import SelectedWorks from '../sections/SelectedWorks'
import RecentExhibition from '../sections/RecentExhibition'
import DisciplineIndex from '../sections/DisciplineIndex'
import Studio from '../sections/Studio'
import PressBand from '../sections/PressBand'
import InPlace from '../sections/InPlace'
import MaterialStudies from '../sections/MaterialStudies'
import ArtistIntro from '../sections/ArtistIntro'
import Invitation from '../sections/Invitation'

// Sections below the first screen are wrapped in .cv-auto: the browser skips rendering them until
// they come near the screen, which keeps scrolling light on modest computers.
export default function Home() {
  return (
    <>
      <Seo jsonLd={jsonLd} />
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
      <div className="cv-auto"><MaterialStudies /></div>
      <div className="cv-auto">
        <ArtistIntro />
        <Invitation />
      </div>
    </>
  )
}
