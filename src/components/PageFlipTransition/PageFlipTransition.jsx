import { useRef, useEffect, useCallback } from 'react'
import { motion, useAnimation } from 'framer-motion'
import styles from './PageFlipTransition.module.css'

const FLIP_DURATION = 0.72

export default function PageFlipTransition({ hero, about }) {
  const behindRef = useRef(null)
  const controls  = useAnimation()

  // Mutable flags — never trigger re-renders
  const flipping = useRef(false)
  const onAbout  = useRef(false)

  // Keep latest callbacks in refs so event listeners never go stale
  const flipForwardRef = useRef(null)
  const flipBackRef    = useRef(null)

  /* ── Forward: Hero → About ── */
  const flipForward = useCallback(() => {
    if (flipping.current || onAbout.current) return
    flipping.current = true

    controls
      .start({
        rotateY: -180,
        boxShadow: [
          '0px 0px 0px 0px rgba(0,0,0,0)',
          '22px 0px 64px 12px rgba(0,0,0,0.16)',
          '0px 0px 0px 0px rgba(0,0,0,0)',
        ],
        transition: { duration: FLIP_DURATION, ease: [0.4, 0, 0.2, 1] },
      })
      .then(() => {
        flipping.current = false
        onAbout.current  = true
        // Scroll the About panel to top whenever we land on it
        if (behindRef.current) behindRef.current.scrollTop = 0
      })
  }, [controls])

  /* ── Back: About → Hero ── */
  const flipBack = useCallback(() => {
    if (flipping.current || !onAbout.current) return
    flipping.current = true
    onAbout.current  = false

    controls
      .start({
        rotateY: 0,
        boxShadow: [
          '0px 0px 0px 0px rgba(0,0,0,0)',
          '-22px 0px 64px 12px rgba(0,0,0,0.16)',
          '0px 0px 0px 0px rgba(0,0,0,0)',
        ],
        transition: { duration: FLIP_DURATION, ease: [0.4, 0, 0.2, 1] },
      })
      .then(() => {
        flipping.current = false
      })
  }, [controls])

  // Keep refs current every render
  useEffect(() => { flipForwardRef.current = flipForward }, [flipForward])
  useEffect(() => { flipBackRef.current    = flipBack    }, [flipBack])

  /* ── Window wheel — fires when Hero is the front page ── */
  useEffect(() => {
    const onWheel = (e) => {
      if (onAbout.current) return
      if (e.deltaY > 0) {
        e.preventDefault()
        flipForwardRef.current?.()
      }
    }
    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [])

  /* ── behindPage wheel — fires when About is the front page ── */
  useEffect(() => {
    const el = behindRef.current
    if (!el) return
    const onBehindWheel = (e) => {
      if (!onAbout.current) return
      if (el.scrollTop === 0 && e.deltaY < 0) {
        e.preventDefault()
        flipBackRef.current?.()
      }
    }
    el.addEventListener('wheel', onBehindWheel, { passive: false })
    return () => el.removeEventListener('wheel', onBehindWheel)
  }, [])

  /* ── Touch support ── */
  useEffect(() => {
    let startY = 0
    const onTouchStart = (e) => { startY = e.touches[0].clientY }
    const onTouchEnd   = (e) => {
      const dy = startY - e.changedTouches[0].clientY
      if (dy > 40 && !onAbout.current)  flipForwardRef.current?.()
      if (dy < -40 && onAbout.current && behindRef.current?.scrollTop === 0)
        flipBackRef.current?.()
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
      {/* About — lives behind the hero, scrollable within the viewport */}
      <div className={styles.behindPage} ref={behindRef}>
        {about}
      </div>

      {/* Hero — flips forward (right-to-left) and back (left-to-right) */}
      <motion.div
        className={styles.heroPage}
        animate={controls}
        initial={{ rotateY: 0 }}
      >
        {hero}
      </motion.div>
    </div>
  )
}
