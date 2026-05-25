import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { CursorProvider } from './context/CursorContext'
import Cursor             from './components/Cursor/Cursor'
import Navbar             from './components/Navbar/Navbar'
import Hero               from './components/Hero/Hero'
import About              from './components/About/About'
import Projects           from './components/Projects/Projects'
import Photobook          from './components/Photobook/Photobook'
import Experience         from './components/Experience/Experience'
import Footer             from './components/Footer/Footer'
import PageFlipTransition from './components/PageFlipTransition/PageFlipTransition'
import ProjectPage        from './pages/ProjectPage/ProjectPage'

/* All sections rendered inside the scrollable projects layer */
function ProjectsPageContent() {
  return (
    <>
      <Projects />
      <Photobook />
      <Experience />
      <Footer />
    </>
  )
}

/* Homepage: 3-page book flip */
function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <PageFlipTransition
          hero={<Hero />}
          about={<About />}
          projects={<ProjectsPageContent />}
        />
      </main>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <CursorProvider>
          <Cursor />
          <Routes>
            <Route path="/"               element={<HomePage />} />
            <Route path="/projects/:slug" element={<><Navbar /><ProjectPage /></>} />
            <Route path="*"               element={<HomePage />} />
          </Routes>
        </CursorProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
