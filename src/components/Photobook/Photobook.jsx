import { useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import styles from './Photobook.module.css'

/* Each page spread = array of photo slots (1–4 photos) */
const SPREADS = [
  {
    title: 'The Process',
    caption: 'Where it all begins — sticky notes, sketches, late-night epiphanies.',
    photos: [
      { label: 'Sketching wireframes', color: '#C3F6FF', emoji: '✏️', ratio: '4/3' },
      { label: 'Sticky note chaos', color: '#FFE4F3', emoji: '🗒️', ratio: '3/4' },
      { label: 'Design review board', color: '#FFF3C4', emoji: '📋', ratio: '4/3' },
    ],
  },
  {
    title: 'The People',
    caption: 'Every user interview, every "aha!" moment, every frustrated click that taught us something.',
    photos: [
      { label: 'User interview', color: '#D1FAE5', emoji: '🎙️', ratio: '3/4' },
      { label: 'Co-design session', color: '#EDE9FE', emoji: '🤝', ratio: '4/3' },
    ],
  },
  {
    title: 'The Pixels',
    caption: 'From rough to refined — the Figma files that made it to production.',
    photos: [
      { label: 'Component library', color: '#FEE2E2', emoji: '🧩', ratio: '3/4' },
      { label: 'Final UI screens', color: '#E0F2FE', emoji: '✨', ratio: '4/3' },
      { label: 'Mobile prototype', color: '#FEF3C7', emoji: '📱', ratio: '3/4' },
    ],
  },
  {
    title: 'The Moments',
    caption: 'Life between the deadlines — what keeps the design alive.',
    photos: [
      { label: '4am coffee run', color: '#FCE7F3', emoji: '☕', ratio: '4/3' },
      { label: 'Presentation day', color: '#ECFDF5', emoji: '🎤', ratio: '4/3' },
    ],
  },
]

const BOOK_VARIANTS = {
  enter: (dir) => ({
    x: dir > 0 ? '60%' : '-60%',
    opacity: 0,
    rotateY: dir > 0 ? 15 : -15,
    scale: 0.92,
  }),
  center: {
    x: 0, opacity: 1, rotateY: 0, scale: 1,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
  exit: (dir) => ({
    x: dir > 0 ? '-60%' : '60%',
    opacity: 0,
    rotateY: dir > 0 ? -15 : 15,
    scale: 0.92,
    transition: { duration: 0.45, ease: [0.4, 0, 1, 1] },
  }),
}

export default function Photobook() {
  const [page, setPage] = useState(0)
  const [dir, setDir] = useState(1)
  const shouldReduce = useReducedMotion()
  const containerRef = useRef(null)

  const go = useCallback((delta) => {
    setDir(delta)
    setPage(p => Math.max(0, Math.min(SPREADS.length - 1, p + delta)))
  }, [])

  const spread = SPREADS[page]

  return (
    <section className={styles.section} id="life" aria-label="Designing moments inspired by life">

      {/* Header */}
      <div className={styles.header}>
        <p className={styles.eyebrow}>Designing moments inspired by</p>
        <h2 className={styles.heading}>Life</h2>
        <p className={styles.sub}>
          A photobook of the process, the people, and the pixels — real stories behind the work.
        </p>
      </div>

      {/* Book container */}
      <div className={styles.book} ref={containerRef}>

        {/* Page indicator */}
        <div className={styles.pageIndicator} aria-label={`Page ${page + 1} of ${SPREADS.length}`}>
          {SPREADS.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === page ? styles.dotActive : ''}`}
              onClick={() => { setDir(i > page ? 1 : -1); setPage(i) }}
              aria-label={`Go to spread ${i + 1}: ${SPREADS[i].title}`}
            />
          ))}
        </div>

        {/* Spread */}
        <div className={styles.spreadWrap} style={{ perspective: 1400 }}>
          <AnimatePresence initial={false} custom={dir} mode="wait">
            <motion.div
              key={page}
              className={styles.spread}
              custom={dir}
              variants={shouldReduce ? {} : BOOK_VARIANTS}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {/* Book spine */}
              <div className={styles.spine} aria-hidden="true">
                <span className={styles.spineText}>
                  {spread.title.toUpperCase()}
                </span>
              </div>

              {/* Left page: caption */}
              <div className={styles.leftPage}>
                <div className={styles.pageLines} aria-hidden="true">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <div key={i} className={styles.pageLine} />
                  ))}
                </div>
                <div className={styles.leftContent}>
                  <span className={styles.pageNum}>0{page + 1}</span>
                  <h3 className={styles.spreadTitle}>{spread.title}</h3>
                  <p className={styles.spreadCaption}>{spread.caption}</p>
                  <p className={styles.photoNote}>
                    ✦ Photos coming soon — these pages await your story.
                  </p>
                </div>
              </div>

              {/* Right page: photos */}
              <div className={styles.rightPage}>
                <div className={styles.photoGrid}
                  data-count={spread.photos.length}
                >
                  {spread.photos.map((photo, i) => (
                    <div
                      key={i}
                      className={styles.photo}
                      style={{ background: photo.color, aspectRatio: photo.ratio }}
                      aria-label={photo.label}
                    >
                      <span className={styles.photoEmoji} aria-hidden="true">{photo.emoji}</span>
                      <span className={styles.photoLabel}>{photo.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation arrows */}
        <div className={styles.nav}>
          <button
            className={styles.navBtn}
            onClick={() => go(-1)}
            disabled={page === 0}
            aria-label="Previous spread"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <span className={styles.navLabel}>
            {page + 1} / {SPREADS.length}
          </span>
          <button
            className={styles.navBtn}
            onClick={() => go(1)}
            disabled={page === SPREADS.length - 1}
            aria-label="Next spread"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>

      </div>
    </section>
  )
}
