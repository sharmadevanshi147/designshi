import { useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import styles from './Photobook.module.css'

/* Personal life spreads — photos to be swapped in later */
const SPREADS = [
  {
    title: 'Golden Hours',
    caption: 'Sunsets, slow evenings, and moments worth pausing for. The kind of light that makes you forget the time.',
    photos: [
      { label: 'Sunday evening', color: '#FFD6A5', emoji: '🌅', ratio: '4/3' },
      { label: 'City glow', color: '#FFCBA4', emoji: '🌇', ratio: '3/4' },
      { label: 'Rooftop quiet', color: '#FFE5CC', emoji: '🏙️', ratio: '4/3' },
    ],
  },
  {
    title: 'Coffee & Quiet',
    caption: 'Morning rituals, dog-eared books, and cups of chai that went cold while I was lost in thought.',
    photos: [
      { label: 'First cup', color: '#D4A97A', emoji: '☕', ratio: '3/4' },
      { label: 'The stack of books', color: '#E8D5B7', emoji: '📚', ratio: '4/3' },
    ],
  },
  {
    title: 'Wander',
    caption: 'Places I\'ve been, streets I\'ve found, and the beautiful disorientation of being somewhere new.',
    photos: [
      { label: 'A new street', color: '#B5D5C5', emoji: '🗺️', ratio: '4/3' },
      { label: 'Somewhere between', color: '#A8C5B5', emoji: '🚆', ratio: '3/4' },
      { label: 'Found corner', color: '#C8DDD5', emoji: '🌿', ratio: '3/4' },
    ],
  },
  {
    title: 'Small Joys',
    caption: 'Flowers from a street market. The perfect playlist. Rain on a window. The little things that make life feel full.',
    photos: [
      { label: 'Market flowers', color: '#FFB5C8', emoji: '🌸', ratio: '4/3' },
      { label: 'Rain light', color: '#C5D8E8', emoji: '🌧️', ratio: '4/3' },
    ],
  },
]

const BOOK_VARIANTS = {
  enter: (dir) => ({
    x: dir > 0 ? '55%' : '-55%',
    opacity: 0,
    rotateY: dir > 0 ? 10 : -10,
    scale: 0.94,
  }),
  center: {
    x: 0, opacity: 1, rotateY: 0, scale: 1,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
  exit: (dir) => ({
    x: dir > 0 ? '-55%' : '55%',
    opacity: 0,
    rotateY: dir > 0 ? -10 : 10,
    scale: 0.94,
    transition: { duration: 0.42, ease: [0.4, 0, 1, 1] },
  }),
}

export default function Photobook() {
  const [page, setPage] = useState(0)
  const [dir, setDir]   = useState(1)
  const shouldReduce = useReducedMotion()

  const go = useCallback((delta) => {
    setDir(delta)
    setPage(p => Math.max(0, Math.min(SPREADS.length - 1, p + delta)))
  }, [])

  const spread = SPREADS[page]

  return (
    <section className={styles.section} id="life" aria-label="Life photobook">

      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.heading}>Designing moments inspired by life</h2>
        <p className={styles.sub}>
          A personal photobook — the world outside the Figma file.
        </p>
      </div>

      {/* Book */}
      <div className={styles.book}>

        {/* Page dots */}
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
              {/* Spine */}
              <div className={styles.spine} aria-hidden="true">
                <span className={styles.spineText}>{spread.title.toUpperCase()}</span>
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
                    ✦ Real photos coming soon — these pages await their memories.
                  </p>
                </div>
              </div>

              {/* Right page: photo placeholders */}
              <div className={styles.rightPage}>
                <div
                  className={styles.photoGrid}
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

        {/* Nav arrows */}
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
          <span className={styles.navLabel}>{page + 1} / {SPREADS.length}</span>
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
