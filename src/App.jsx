import Navbar             from './components/Navbar/Navbar'
import Hero               from './components/Hero/Hero'
import About              from './components/About/About'
import Projects           from './components/Projects/Projects'
import PageFlipTransition from './components/PageFlipTransition/PageFlipTransition'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <PageFlipTransition
          hero={<Hero />}
          about={
            <>
              <About />
              <Projects />
            </>
          }
        />
      </main>
    </>
  )
}
