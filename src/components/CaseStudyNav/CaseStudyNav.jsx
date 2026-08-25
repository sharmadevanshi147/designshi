import { Link } from 'react-router-dom'
import { useCursor } from '../../context/CursorContext'
import styles from './CaseStudyNav.module.css'

/*
  Case studies in the same order as the homepage project stack, so the arrows
  walk through them the way the cards are listed. Cyclic — with only three
  studies, a disabled arrow at each end is more dead-end than helpful.
*/
export const CASE_STUDIES = [
  { slug: 'goodreads',  title: 'Goodreads' },
  { slug: 'balnce',     title: 'Balnce' },
  { slug: 'foldhealth', title: 'Fold Health' },
]

const Arrow = ({ dir }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {dir === 'left'
      ? <><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></>
      : <><path d="M5 12h14" /><path d="M12 5l7 7-7 7" /></>}
  </svg>
)

/* Back to the project stack on the homepage */
export function CaseStudyBack() {
  return (
    <Link to="/#projects" className={styles.back}>
      <Arrow dir="left" />
      Back to work
    </Link>
  )
}

/* Previous / next study, shown at the foot of a case study */
export function CaseStudyPager({ slug }) {
  const { setLabel } = useCursor()
  const i = CASE_STUDIES.findIndex(c => c.slug === slug)
  if (i === -1) return null

  const prev = CASE_STUDIES[(i - 1 + CASE_STUDIES.length) % CASE_STUDIES.length]
  const next = CASE_STUDIES[(i + 1) % CASE_STUDIES.length]

  const hover = title => ({
    onMouseEnter: () => setLabel(`🫳 ${title}`),
    onMouseLeave: () => setLabel(null),
  })

  return (
    <nav className={styles.pager} aria-label="Other case studies">
      <Link to={`/projects/${prev.slug}`} className={styles.pagerLink} {...hover(prev.title)}>
        <Arrow dir="left" />
        <span className={styles.pagerMeta}>
          <span className={styles.pagerLabel}>Previous</span>
          <span className={styles.pagerTitle}>{prev.title}</span>
        </span>
      </Link>

      <Link to={`/projects/${next.slug}`} className={`${styles.pagerLink} ${styles.pagerNext}`} {...hover(next.title)}>
        <span className={styles.pagerMeta}>
          <span className={styles.pagerLabel}>Next</span>
          <span className={styles.pagerTitle}>{next.title}</span>
        </span>
        <Arrow dir="right" />
      </Link>
    </nav>
  )
}
