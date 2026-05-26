import { useState, useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { useCursor } from '../../context/CursorContext'
import styles from './Navbar.module.css'

const EXPO = [0.16, 1, 0.3, 1]

const THEME_ICONS = {
  light: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
    </svg>
  ),
  dark: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  ),
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const shouldReduce = useReducedMotion()
  const { theme, cycleTheme } = useTheme()
  const { mode, toggleCursor } = useCursor()
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (e, href) => {
    if (!isHome || !href.startsWith('#')) return
    e.preventDefault()
    const id = href.slice(1)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
      initial={shouldReduce ? false : { y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: EXPO }}
    >
      <nav className={styles.inner} aria-label="Primary navigation">

        {/* Logo */}
        <Link to="/" className={styles.logo} aria-label="Devanshi Sharma — home">
          <span className={styles.logoMark}>
            <em>D</em>S
          </span>
          <span className={styles.logoDivider} aria-hidden="true" />
          <span className={styles.logoFull}>Devanshi</span>
        </Link>

        {/* Nav links */}
        <motion.ul
          className={styles.links}
          initial={shouldReduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          role="list"
        >
          {[
            { label: 'Work',     href: '#projects' },
            { label: 'About',    href: '#about'    },
            { label: 'Life',     href: '#life'     },
          ].map(({ label, href }) => (
            <li key={label}>
              <a
                href={isHome ? href : `/${href}`}
                className={styles.link}
                onClick={(e) => handleNavClick(e, href)}
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="https://linkedin.com/in/devanshi-sharma-746470213"
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.link} ${styles.linkResume}`}
            >
              Resume ↗
            </a>
          </li>
        </motion.ul>

        {/* Controls */}
        <div className={styles.controls}>
          {/* Cursor toggle */}
          <button
            className={`${styles.iconBtn} ${mode === 'pencil' ? styles.active : ''}`}
            onClick={toggleCursor}
            aria-label={`${mode === 'pencil' ? 'Disable' : 'Enable'} sparkle cursor`}
            title={mode === 'pencil' ? 'Cursor: Design mode ✦' : 'Cursor: Default'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/>
              <circle cx="11" cy="11" r="2"/>
            </svg>
            {mode === 'pencil' && <span className={styles.activeDot} aria-hidden="true"/>}
          </button>

          {/* Theme toggle */}
          <button
            className={styles.iconBtn}
            onClick={cycleTheme}
            aria-label={`Switch theme (current: ${theme})`}
            title={`Theme: ${theme}`}
          >
            <motion.span
              key={theme}
              initial={{ scale: 0.5, rotate: -90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.5, rotate: 90, opacity: 0 }}
              transition={{ duration: 0.25, ease: EXPO }}
            >
              {THEME_ICONS[theme]}
            </motion.span>
          </button>

          {/* Contact CTA */}
          <a
            href="mailto:devanshisharma3574@gmail.com"
            className={styles.ctaBtn}
          >
            Say hi ✉︎
          </a>
        </div>
      </nav>
    </motion.header>
  )
}
