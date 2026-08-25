import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from 'react-router-dom'
import { ThemeProvider }  from './context/ThemeContext'
import { CursorProvider } from './context/CursorContext'
import Cursor        from './components/Cursor/Cursor'
import Navbar        from './components/Navbar/Navbar'
import Hero          from './components/Hero/Hero'
import About         from './components/About/About'
import Projects      from './components/Projects/Projects'
import Photobook     from './components/Photobook/Photobook'
import DesignProcess from './components/DesignProcess/DesignProcess'
import { lazy, Suspense, useLayoutEffect } from 'react'
import Experience          from './components/Experience/Experience'
import Footer              from './components/Footer/Footer'
const BriefToExperience = lazy(() => import('./components/BriefToExperience/BriefToExperience'))
import ProjectPage   from './pages/ProjectPage/ProjectPage'
import GoodreadsCaseStudy from './pages/GoodreadsCaseStudy/GoodreadsCaseStudy'
import FoldHealthCaseStudy from './pages/FoldHealthCaseStudy/FoldHealthCaseStudy'
import BalnceCaseStudy from './pages/BalnceCaseStudy/BalnceCaseStudy'

/*
  Client-side navigation leaves the scroll offset alone, so clicking a project
  card from halfway down the homepage lands you halfway down the case study.
  Reset to the top on forward navigation only. POP (back/forward) is left to
  the browser rather than forced to the top, so that if scroll restoration is
  added later it works without fighting this. Note the browser does not in fact
  restore the offset for these same-document entries today, so Back currently
  also lands at the top.
*/
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const navigationType = useNavigationType()

  useLayoutEffect(() => {
    if (navigationType === 'POP') return

    /* A hash means the link is aiming at a section, not the top of the page
       (e.g. "Back to work" -> /#projects), so honour it instead. */
    if (hash) {
      const target = document.querySelector(hash)
      if (target) {
        target.scrollIntoView({ behavior: 'instant', block: 'start' })
        return
      }
    }

    /* 'instant' is required: globals.css sets scroll-behavior: smooth, which
       would otherwise animate through the whole page on every route change. */
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash, navigationType])

  return null
}

function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Photobook />
        <DesignProcess />
        <Experience />
        <Suspense fallback={null}>
          <BriefToExperience />
        </Suspense>
        <Footer />
      </main>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter basename="/designshi">
      <ThemeProvider>
        <CursorProvider>
          <ScrollToTop />
          <Cursor />
          <Routes>
            <Route path="/"               element={<HomePage />} />
            <Route path="/projects/goodreads" element={<><Navbar /><GoodreadsCaseStudy /></>} />
            <Route path="/projects/foldhealth" element={<><Navbar /><FoldHealthCaseStudy /></>} />
            <Route path="/projects/balnce" element={<><Navbar /><BalnceCaseStudy /></>} />
            <Route path="/projects/:slug" element={<><Navbar /><ProjectPage /></>} />
            <Route path="*"               element={<HomePage />} />
          </Routes>
        </CursorProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
