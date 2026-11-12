import Seo from '../components/Seo'
import Hero from '../sections/Hero'
import Statement from '../sections/Statement'
import Monument from '../sections/Monument'
import SelectedWorks from '../sections/SelectedWorks'
import RecentExhibition from '../sections/RecentExhibition'
import DisciplineIndex from '../sections/DisciplineIndex'
import Studio from '../sections/Studio'
import InPlace from '../sections/InPlace'
import ArtistIntro from '../sections/ArtistIntro'
import Invitation from '../sections/Invitation'

// Sections below the first screen are wrapped in .cv-auto: the browser skips rendering them until
// they come near the screen, which keeps scrolling light on modest computers.
export default function Home() {
  return (
    <>
      <Seo />
      <Hero />
      <div className="cv-auto">
        <Statement />
        <Monument />
      </div>
      <div className="cv-auto">
        <SelectedWorks />
        <RecentExhibition />
      </div>
      <div className="cv-auto"><DisciplineIndex /></div>
      <div className="cv-auto"><Studio /></div>
      <div className="cv-auto"><InPlace /></div>
      <div className="cv-auto">
        <ArtistIntro />
        <Invitation />
      </div>
    </>
  )
}
