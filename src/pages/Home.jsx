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

export default function Home() {
  return (
    <>
      <Seo />
      <Hero />
      <Statement />
      <Monument />
      <SelectedWorks />
      <RecentExhibition />
      <DisciplineIndex />
      <Studio />
      <InPlace />
      <ArtistIntro />
      <Invitation />
    </>
  )
}
