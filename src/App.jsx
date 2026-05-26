import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider }  from './context/ThemeContext'
import { CursorProvider } from './context/CursorContext'
import { FontProvider }   from './context/FontContext'
import Cursor        from './components/Cursor/Cursor'
import Navbar        from './components/Navbar/Navbar'
import Hero          from './components/Hero/Hero'
import About         from './components/About/About'
import Projects      from './components/Projects/Projects'
import Photobook     from './components/Photobook/Photobook'
import DesignProcess from './components/DesignProcess/DesignProcess'
import Experience    from './components/Experience/Experience'
import Footer        from './components/Footer/Footer'
import ProjectPage   from './pages/ProjectPage/ProjectPage'

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
        <Footer />
      </main>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <FontProvider>
        <CursorProvider>
          <Cursor />
          <Routes>
            <Route path="/"               element={<HomePage />} />
            <Route path="/projects/:slug" element={<><Navbar /><ProjectPage /></>} />
            <Route path="*"               element={<HomePage />} />
          </Routes>
        </CursorProvider>
        </FontProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
