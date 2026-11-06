import Seo from '../components/Seo'
import Tone from '../components/Tone'
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

// The home page as a walk through rooms: the page changes colour as each one reaches the middle
// of the screen (see src/components/Tone.jsx).
export default function Home() {
  return (
    <>
      <Seo />
      <Tone name="light"><Hero /></Tone>
      <Tone name="night">
        <Statement />
        <Monument />
      </Tone>
      <Tone name="clay">
        <SelectedWorks />
        <RecentExhibition />
      </Tone>
      <Tone name="moss"><DisciplineIndex /></Tone>
      <Tone name="stone"><Studio /></Tone>
      <Tone name="light"><InPlace /></Tone>
      <Tone name="earth">
        <ArtistIntro />
        <Invitation />
      </Tone>
    </>
  )
}
