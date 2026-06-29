import { useState, useCallback } from 'react'
import { useReducedMotion } from 'framer-motion'
import styles from './Photobook.module.css'

/* ── Scrapbook images ── */
const SCRAPBOOK_IMAGES = [
  '/designshi/Scrapbook/Screenshot 2024-08-25 12.37.30 AM.png',
  '/designshi/Scrapbook/Screenshot 2024-08-25 12.38.38 AM.png',
  '/designshi/Scrapbook/dog.png',
  '/designshi/Scrapbook/Screenshot 2024-08-25 12.45.05 AM.png',
  '/designshi/Scrapbook/iiitd-night.png',
  '/designshi/Scrapbook/Screenshot 2024-08-25 12.45.45 AM.png',
  '/designshi/Scrapbook/tree-path.png',
  '/designshi/Scrapbook/Screenshot 2024-08-25 12.46.42 AM.png',
  '/designshi/Scrapbook/sunset.png',
  '/designshi/Scrapbook/Screenshot 2024-08-25 12.50.14 AM.png',
  '/designshi/Scrapbook/cat.png',
  '/designshi/Scrapbook/Screenshot 2024-08-25 12.50.45 AM.png',
  '/designshi/Scrapbook/Screenshot 2024-08-25 12.50.53 AM.png',
  '/designshi/Scrapbook/Screenshot 2024-08-25 12.53.35 AM.png',
  '/designshi/Scrapbook/image (2).png',
  null, // empty page to make 16
]

/*
  8 spreads × 2 pages = 16 pages.
  Colors: right page of spread N === left page of spread N+1.
*/
const SPREADS = [
  { left: '#FFD6A5', right: '#FFCBA4' },
  { left: '#FFCBA4', right: '#E8D5B7' },
  { left: '#E8D5B7', right: '#B5D5C5' },
  { left: '#B5D5C5', right: '#FFB5C8' },
  { left: '#FFB5C8', right: '#D5C5E8' },
  { left: '#D5C5E8', right: '#C5D8E8' },
  { left: '#C5D8E8', right: '#D4A97A' },
  { left: '#D4A97A', right: '#F0D6A8' },
]

/* Slight tilts per page for scrapbook feel */
const ROTATIONS = [
  '-2deg', '1.5deg', '-1deg', '2deg',
  '-1.5deg', '1deg', '-2.5deg', '0.5deg',
  '2deg', '-1deg', '1.5deg', '-2deg',
  '0.5deg', '-1.5deg', '2.5deg', '0deg',
]

/* Renders a page's content (colored background + image) */
function PageContent({ color, imageSrc, rotation }) {
  return (
    <div className={styles.pageBg} style={{ background: color }}>
      {imageSrc && (
        <div className={styles.photoCard} style={{ transform: `rotate(${rotation})` }}>
          <img src={imageSrc} alt="Scrapbook" className={styles.photoCardImg} />
        </div>
      )}
    </div>
  )
}

export default function Photobook() {
  const [page, setPage] = useState(0)
  const [flipping, setFlipping] = useState(null) // 'forward' | 'backward' | null
  const shouldReduce = useReducedMotion()

  const flipDuration = shouldReduce ? 50 : 1000

  const next = () => {
    if (page >= SPREADS.length - 1 || flipping) return
    setFlipping('forward')
    setTimeout(() => {
      setPage(p => p + 1)
      setFlipping(null)
    }, flipDuration)
  }

  const prev = () => {
    if (page <= 0 || flipping) return
    setFlipping('backward')
    setTimeout(() => {
      setPage(p => p - 1)
      setFlipping(null)
    }, flipDuration)
  }

  const goTo = (i) => {
    if (i === page || flipping) return
    setFlipping(i > page ? 'forward' : 'backward')
    setTimeout(() => {
      setPage(i)
      setFlipping(null)
    }, flipDuration)
  }

  /* Page indices */
  const leftIdx = page * 2
  const rightIdx = page * 2 + 1

  /* Destination spread (what we'll land on after the flip) */
  const destPage = flipping === 'forward' ? page + 1 : flipping === 'backward' ? page - 1 : page
  const destLeftIdx = destPage * 2
  const destRightIdx = destPage * 2 + 1

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
              onClick={() => goTo(i)}
              aria-label={`Go to spread ${i + 1}`}
            />
          ))}
        </div>

        {/* Book spread */}
        <div className={styles.spreadWrap}>
          <div className={styles.spread}>

            {/* Spine */}
            <div className={styles.spine} aria-hidden="true">
              <span className={styles.spineText}>{`0${page + 1}`}</span>
            </div>

            {/* ── Left page slot ── */}
            <div className={styles.pageSlot}>
              {/*
                Static page underneath:
                - During backward flip → show destination left (what we're going to)
                - Otherwise → show current left
              */}
              <div
                className={`${styles.page} ${styles.pageLeft}`}
                onClick={prev}
                role="button"
                tabIndex={0}
                onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && prev()}
                aria-label="Previous spread"
              >
                <PageContent
                  color={flipping === 'backward' ? SPREADS[destPage].left : SPREADS[page].left}
                  imageSrc={flipping === 'backward' ? SCRAPBOOK_IMAGES[destLeftIdx] : SCRAPBOOK_IMAGES[leftIdx]}
                  rotation={flipping === 'backward' ? ROTATIONS[destLeftIdx] : ROTATIONS[leftIdx]}
                />
                <div className={styles.pageHint} aria-hidden="true">‹</div>
              </div>

              {/* Backward flip overlay */}
              {flipping === 'backward' && (
                <div className={`${styles.flipOverlay} ${styles.flipBackward} ${shouldReduce ? styles.noAnim : ''}`}>
                  <div className={styles.flipInner}>
                    <div className={styles.flipFront}>
                      <PageContent
                        color={SPREADS[page].left}
                        imageSrc={SCRAPBOOK_IMAGES[leftIdx]}
                        rotation={ROTATIONS[leftIdx]}
                      />
                    </div>
                    <div className={styles.flipBack}>
                      <PageContent
                        color={SPREADS[page - 1].right}
                        imageSrc={SCRAPBOOK_IMAGES[(page - 1) * 2 + 1]}
                        rotation={ROTATIONS[(page - 1) * 2 + 1]}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ── Right page slot ── */}
            <div className={styles.pageSlot}>
              {/*
                Static page underneath:
                - During forward flip → show destination right (what we're going to)
                - Otherwise → show current right
              */}
              <div
                className={`${styles.page} ${styles.pageRight}`}
                onClick={next}
                role="button"
                tabIndex={0}
                onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && next()}
                aria-label="Next spread"
              >
                <PageContent
                  color={flipping === 'forward' ? SPREADS[destPage].right : SPREADS[page].right}
                  imageSrc={flipping === 'forward' ? SCRAPBOOK_IMAGES[destRightIdx] : SCRAPBOOK_IMAGES[rightIdx]}
                  rotation={flipping === 'forward' ? ROTATIONS[destRightIdx] : ROTATIONS[rightIdx]}
                />
                <div className={styles.pageHint} aria-hidden="true">›</div>
              </div>

              {/* Forward flip overlay */}
              {flipping === 'forward' && (
                <div className={`${styles.flipOverlay} ${styles.flipForward} ${shouldReduce ? styles.noAnim : ''}`}>
                  <div className={styles.flipInner}>
                    <div className={styles.flipFront}>
                      <PageContent
                        color={SPREADS[page].right}
                        imageSrc={SCRAPBOOK_IMAGES[rightIdx]}
                        rotation={ROTATIONS[rightIdx]}
                      />
                    </div>
                    <div className={styles.flipBack}>
                      <PageContent
                        color={SPREADS[page + 1].left}
                        imageSrc={SCRAPBOOK_IMAGES[(page + 1) * 2]}
                        rotation={ROTATIONS[(page + 1) * 2]}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Nav */}
        <div className={styles.nav}>
          <button className={styles.navBtn} onClick={prev} disabled={page === 0 || !!flipping} aria-label="Previous">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <span className={styles.navLabel}>{page + 1} / {SPREADS.length}</span>
          <button className={styles.navBtn} onClick={next} disabled={page === SPREADS.length - 1 || !!flipping} aria-label="Next">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>

      </div>
    </section>
  )
}
