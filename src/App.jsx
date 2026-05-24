import Navbar            from './components/Navbar/Navbar'
import Hero              from './components/Hero/Hero'
import About             from './components/About/About'
import PageFlipTransition from './components/PageFlipTransition/PageFlipTransition'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <PageFlipTransition
          hero={<Hero />}
          about={<About />}
        />
      </main>
    </>
  )
}
