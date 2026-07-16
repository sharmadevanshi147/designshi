import { useState } from 'react'
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
]

/*
  Distribute images across pages, 2–3 per page.
  Each page entry = array of image srcs.
*/
function buildPages(images) {
  const pages = []
  let i = 0
  let toggle = true // alternates between 2 and 3
  while (i < images.length) {
    const count = toggle ? 2 : 3
    toggle = !toggle
    pages.push(images.slice(i, i + count).filter(Boolean))
    i += count
  }
  return pages
}

const PAGES = buildPages(SCRAPBOOK_IMAGES)
// Pair pages into spreads (left + right)
const SPREADS = []
for (let i = 0; i < PAGES.length; i += 2) {
  SPREADS.push({
    left: PAGES[i] || [],
    right: PAGES[i + 1] || [],
  })
}

/* Rotation presets per image slot */
const TILTS = [
  ['-2deg', '2.5deg'],
  ['1.5deg', '-1deg', '2deg'],
  ['-1.5deg', '1deg'],
  ['2deg', '-2.5deg', '0.5deg'],
  ['-1deg', '1.5deg'],
  ['0.5deg', '-1.5deg', '2.5deg'],
  ['-2deg', '1deg'],
  ['1.5deg', '-2deg', '0.5deg'],
]

/* Renders a page's content (beige paper background + multiple images) */
function PageContent({ images, pageIndex }) {
  const tilts = TILTS[pageIndex % TILTS.length] || ['0deg']
  return (
    <div className={styles.pageBg}>
      <div className={styles.photoGrid}>
        {images.map((src, i) => (
          <div
            key={src}
            className={styles.photoCard}
            style={{ transform: `rotate(${tilts[i % tilts.length]})` }}
          >
            <img src={src} alt="Scrapbook" className={styles.photoCardImg} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Photobook() {
  const [page, setPage] = useState(0)
  const [flipping, setFlipping] = useState(null)
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

  /* Spread page data */
  const curSpread = SPREADS[page]
  const destIdx = flipping === 'forward' ? page + 1 : flipping === 'backward' ? page - 1 : page
  const destSpread = SPREADS[destIdx]

  /* Global page indices for tilts */
  const leftPageIdx = page * 2
  const rightPageIdx = page * 2 + 1
  const destLeftPageIdx = destIdx * 2
  const destRightPageIdx = destIdx * 2 + 1

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
              <div
                className={`${styles.page} ${styles.pageLeft}`}
                onClick={prev}
                role="button"
                tabIndex={0}
                onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && prev()}
                aria-label="Previous spread"
              >
                <PageContent
                  images={flipping === 'backward' ? destSpread.left : curSpread.left}
                  pageIndex={flipping === 'backward' ? destLeftPageIdx : leftPageIdx}
                />
                <div className={styles.pageHint} aria-hidden="true">‹</div>
              </div>

              {/* Backward flip overlay */}
              {flipping === 'backward' && (
                <div className={`${styles.flipOverlay} ${styles.flipBackward} ${shouldReduce ? styles.noAnim : ''}`}>
                  <div className={styles.flipInner}>
                    <div className={styles.flipFront}>
                      <PageContent images={curSpread.left} pageIndex={leftPageIdx} />
                    </div>
                    <div className={styles.flipBack}>
                      <PageContent
                        images={SPREADS[page - 1].right}
                        pageIndex={(page - 1) * 2 + 1}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ── Right page slot ── */}
            <div className={styles.pageSlot}>
              <div
                className={`${styles.page} ${styles.pageRight}`}
                onClick={next}
                role="button"
                tabIndex={0}
                onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && next()}
                aria-label="Next spread"
              >
                <PageContent
                  images={flipping === 'forward' ? destSpread.right : curSpread.right}
                  pageIndex={flipping === 'forward' ? destRightPageIdx : rightPageIdx}
                />
                <div className={styles.pageHint} aria-hidden="true">›</div>
              </div>

              {/* Forward flip overlay */}
              {flipping === 'forward' && (
                <div className={`${styles.flipOverlay} ${styles.flipForward} ${shouldReduce ? styles.noAnim : ''}`}>
                  <div className={styles.flipInner}>
                    <div className={styles.flipFront}>
                      <PageContent images={curSpread.right} pageIndex={rightPageIdx} />
                    </div>
                    <div className={styles.flipBack}>
                      <PageContent
                        images={SPREADS[page + 1].left}
                        pageIndex={(page + 1) * 2}
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
