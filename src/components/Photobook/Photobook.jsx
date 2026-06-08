import { useState, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import styles from './Photobook.module.css'

/*
  Both pages are image slots.
  Replace `left` / `right` src values with real photo paths.
  Clicking left page → previous spread.
  Clicking right page → next spread.
*/
const SPREADS = [
  {
    left:  { src: null, alt: 'Golden hour sunset', color: '#FFD6A5' },
    right: { src: null, alt: 'City glow at night', color: '#FFCBA4' },
  },
  {
    left:  { src: null, alt: 'Morning coffee ritual', color: '#D4A97A' },
    right: { src: null, alt: 'Stack of books', color: '#E8D5B7' },
  },
  {
    left:  { src: null, alt: 'A new street', color: '#B5D5C5' },
    right: { src: null, alt: 'Somewhere between', color: '#A8C5B5' },
  },
  {
    left:  { src: null, alt: 'Market flowers', color: '#FFB5C8' },
    right: { src: null, alt: 'Rain on a window', color: '#C5D8E8' },
  },
]

const FLIP = {
  enter: (dir) => ({
    rotateY: dir > 0 ? 90 : -90,
    opacity: 0,
    scale: 0.96,
  }),
  center: {
    rotateY: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
  exit: (dir) => ({
    rotateY: dir > 0 ? -90 : 90,
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.38, ease: [0.4, 0, 1, 1] },
  }),
}

function BookPage({ src, alt, color, onClick, side }) {
  return (
    <div
      className={`${styles.page} ${side === 'left' ? styles.pageLeft : styles.pageRight}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onClick()}
      aria-label={side === 'left' ? 'Previous spread' : 'Next spread'}
    >
      {src
        ? <img src={src} alt={alt} className={styles.pageImg} />
        : <div className={styles.pagePlaceholder} style={{ background: color }}>
            <span className={styles.placeholderNote}>Drop photo here</span>
          </div>
      }
      {/* subtle page-turn hint arrow */}
      <div className={styles.pageHint} aria-hidden="true">
        {side === 'left' ? '‹' : '›'}
      </div>
    </div>
  )
}

export default function Photobook() {
  const [page, setPage] = useState(0)
  const [dir, setDir]   = useState(1)
  const shouldReduce = useReducedMotion()

  const prev = useCallback(() => {
    if (page === 0) return
    setDir(-1); setPage(p => p - 1)
  }, [page])

  const next = useCallback(() => {
    if (page === SPREADS.length - 1) return
    setDir(1); setPage(p => p + 1)
  }, [page])

  return (
    <section className={styles.section} id="life" aria-label="Life photobook">

      <div className={styles.header}>
        <h2 className={styles.heading}>Designing moments inspired by life</h2>
        <p className={styles.sub}>A personal photobook — the world outside the Figma file.</p>
      </div>

      <div className={styles.book}>

        {/* Page dots */}
        <div className={styles.pageIndicator}>
          {SPREADS.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === page ? styles.dotActive : ''}`}
              onClick={() => { setDir(i > page ? 1 : -1); setPage(i) }}
              aria-label={`Go to spread ${i + 1}`}
            />
          ))}
        </div>

        {/* Book spread */}
        <div className={styles.spreadWrap} style={{ perspective: 1600 }}>
          <AnimatePresence initial={false} custom={dir} mode="wait">
            <motion.div
              key={page}
              className={styles.spread}
              custom={dir}
              variants={shouldReduce ? {} : FLIP}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {/* Spine */}
              <div className={styles.spine} aria-hidden="true">
                <span className={styles.spineText}>{`0${page + 1}`}</span>
              </div>

              {/* Left page → click = previous */}
              <BookPage
                side="left"
                src={SPREADS[page].left.src}
                alt={SPREADS[page].left.alt}
                color={SPREADS[page].left.color}
                onClick={prev}
              />

              {/* Right page → click = next */}
              <BookPage
                side="right"
                src={SPREADS[page].right.src}
                alt={SPREADS[page].right.alt}
                color={SPREADS[page].right.color}
                onClick={next}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Nav label */}
        <div className={styles.nav}>
          <button className={styles.navBtn} onClick={prev} disabled={page === 0} aria-label="Previous">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <span className={styles.navLabel}>{page + 1} / {SPREADS.length}</span>
          <button className={styles.navBtn} onClick={next} disabled={page === SPREADS.length - 1} aria-label="Next">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>

      </div>
    </section>
  )
}
