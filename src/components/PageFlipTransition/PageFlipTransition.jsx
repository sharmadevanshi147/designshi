import { useRef, useEffect, useCallback, createContext } from 'react'
import { motion, useAnimation } from 'framer-motion'
import styles from './PageFlipTransition.module.css'

/**
 * Provides the Projects scroll-container ref to deep children
 * (used by ProjectCard → useScroll)
 */
export const ScrollContainerCtx = createContext(null)

const FLIP_DURATION = 0.72
const EASE = [0.4, 0, 0.2, 1]

/** Returns a mid-animation box-shadow sequence */
const shadow = (dir) => [
  '0px 0px 0px 0px rgba(0,0,0,0)',
  `${dir * 22}px 0px 64px 12px rgba(0,0,0,0.16)`,
  '0px 0px 0px 0px rgba(0,0,0,0)',
]

export default function PageFlipTransition({ hero, about, projects }) {
  const projectsRef = useRef(null)   // scrollable projects container

  const heroControls  = useAnimation()  // controls heroPage
  const aboutControls = useAnimation()  // controls aboutPage

  // page: 0 = Hero visible, 1 = About visible, 2 = Projects visible
  const page     = useRef(0)
  const flipping = useRef(false)

  // Stable refs so event listeners never capture stale closures
  const heroFwdRef   = useRef(null)
  const heroBackRef  = useRef(null)
  const aboutFwdRef  = useRef(null)
  const aboutBackRef = useRef(null)

  /* ── Hero → About ──────────────────────────────────────── */
  const flipHeroForward = useCallback(() => {
    if (flipping.current || page.current !== 0) return
    flipping.current = true
    heroControls
      .start({ rotateY: -180, boxShadow: shadow(1), transition: { duration: FLIP_DURATION, ease: EASE } })
      .then(() => { flipping.current = false; page.current = 1 })
  }, [heroControls])

  /* ── About → Hero ──────────────────────────────────────── */
  const flipHeroBack = useCallback(() => {
    if (flipping.current || page.current !== 1) return
    flipping.current = true
    page.current = 0
    heroControls
      .start({ rotateY: 0, boxShadow: shadow(-1), transition: { duration: FLIP_DURATION, ease: EASE } })
      .then(() => { flipping.current = false })
  }, [heroControls])

  /* ── About → Projects ──────────────────────────────────── */
  const flipAboutForward = useCallback(() => {
    if (flipping.current || page.current !== 1) return
    flipping.current = true
    aboutControls
      .start({ rotateY: -180, boxShadow: shadow(1), transition: { duration: FLIP_DURATION, ease: EASE } })
      .then(() => {
        flipping.current = false
        page.current = 2
        if (projectsRef.current) projectsRef.current.scrollTop = 0
      })
  }, [aboutControls])

  /* ── Projects → About ──────────────────────────────────── */
  const flipAboutBack = useCallback(() => {
    if (flipping.current || page.current !== 2) return
    flipping.current = true
    page.current = 1
    aboutControls
      .start({ rotateY: 0, boxShadow: shadow(-1), transition: { duration: FLIP_DURATION, ease: EASE } })
      .then(() => { flipping.current = false })
  }, [aboutControls])

  // Keep stable refs in sync every render
  useEffect(() => { heroFwdRef.current   = flipHeroForward  }, [flipHeroForward])
  useEffect(() => { heroBackRef.current  = flipHeroBack     }, [flipHeroBack])
  useEffect(() => { aboutFwdRef.current  = flipAboutForward }, [flipAboutForward])
  useEffect(() => { aboutBackRef.current = flipAboutBack    }, [flipAboutBack])

  /* ── Window wheel — handles page 0 (Hero) and page 1 (About) ── */
  useEffect(() => {
    const onWheel = (e) => {
      const p = page.current
      if (p === 0 && e.deltaY > 0) {
        e.preventDefault(); heroFwdRef.current?.()
      } else if (p === 1 && e.deltaY > 0) {
        e.preventDefault(); aboutFwdRef.current?.()
      } else if (p === 1 && e.deltaY < 0) {
        e.preventDefault(); heroBackRef.current?.()
      }
    }
    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [])

  /* ── Projects container wheel — back-flip at scroll top ── */
  useEffect(() => {
    const el = projectsRef.current
    if (!el) return
    const onWheel = (e) => {
      if (page.current !== 2) return
      if (el.scrollTop === 0 && e.deltaY < 0) {
        e.preventDefault(); aboutBackRef.current?.()
      }
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  /* ── Touch support ── */
  useEffect(() => {
    let startY = 0
    const onTouchStart = (e) => { startY = e.touches[0].clientY }
    const onTouchEnd = (e) => {
      const dy = startY - e.changedTouches[0].clientY
      const p  = page.current
      if (dy > 40) {
        if (p === 0) heroFwdRef.current?.()
        else if (p === 1) aboutFwdRef.current?.()
      } else if (dy < -40) {
        if (p === 1) heroBackRef.current?.()
        else if (p === 2 && projectsRef.current?.scrollTop === 0) aboutBackRef.current?.()
      }
    }
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend',   onTouchEnd,   { passive: true })
    return () => {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend',   onTouchEnd)
    }
  }, [])

  return (
    <div className={styles.stage}>

      {/* ── Page 3: Projects — bottommost, scrollable ── */}
      <ScrollContainerCtx.Provider value={projectsRef}>
        <div className={styles.projectsPage} ref={projectsRef}>
          {projects}
        </div>
      </ScrollContainerCtx.Provider>

      {/* ── Page 2: About — flips over Projects ── */}
      <motion.div
        className={styles.aboutPage}
        animate={aboutControls}
        initial={{ rotateY: 0 }}
      >
        {about}
      </motion.div>

      {/* ── Page 1: Hero — flips over About ── */}
      <motion.div
        className={styles.heroPage}
        animate={heroControls}
        initial={{ rotateY: 0 }}
      >
        {hero}
      </motion.div>

    </div>
  )
}
