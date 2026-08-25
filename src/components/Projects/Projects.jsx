import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useCursor } from '../../context/CursorContext'
import styles from './Projects.module.css'

const PROJECTS = [
  {
    id: 'goodreads',
    num: '01',
    title: 'Goodreads',
    subtitle: 'Reimagining the reading experience',
    desc: 'A redesign of the Goodreads platform focused on improving book discovery, social reading features, and a more delightful user experience for avid readers.',
    color: '#F6EED6',      /* cream/gold, from the cover ground (hue ~48) */
    mockupBg: '#241C10',   /* warm dark, so the chrome bar reads with it */
    mockupAccent: '#00bcd4',
    cover: '/designshi/Goodreads/goodreads-cover.svg',
    tags: ['UX Redesign', 'Product Design', '2024'],
    year: '2024',
  },
  {
    id: 'balnce',
    num: '02',
    title: 'Balnce',
    subtitle: 'Finding balance in everyday wellness',
    desc: 'A wellness app designed to help users build healthy habits, track their mental and physical well-being, and find balance through intuitive, calming design.',
    color: '#DEDCFB',      /* periwinkle, from the cover ground (hue ~243) */
    mockupBg: '#16142B',   /* deep violet */
    mockupAccent: '#ea5db4',
    cover: '/designshi/Balnce/balnce-cover.svg',
    tags: ['Product Design', 'Wellness', '2023'],
    year: '2023',
  },
  {
    id: 'foldhealth',
    num: '03',
    title: 'My Work at FoldHealth',
    subtitle: 'Healthcare UX at scale',
    desc: 'A deep dive into my work at FoldHealth — designing patient-centric healthcare experiences, streamlining clinical workflows, and improving health outcomes through empathy-first UX.',
    color: '#F1DCF6',      /* orchid, from the cover's purple (hue ~289) */
    mockupBg: '#231630',   /* deep purple */
    mockupAccent: '#f59e0b',
    cover: '/designshi/FoldHealth/foldhealth-cover.png',
    tags: ['Healthcare UX', 'Enterprise', '2023–24'],
    year: '2023–24',
  },
]

/* The whole card is one link, so the inner button stays purely visual —
   an <a> inside an <a> would be invalid. */
const MotionLink = motion.create(Link)

function ProjectCard({ project, index }) {
  const wrapRef    = useRef(null)
  const shouldReduce = useReducedMotion()
  const { setLabel } = useCursor()

  /* Drop the label if the card unmounts while still hovered */
  useEffect(() => () => setLabel(null), [setLabel])

  /* Scale only — no opacity, cards always fully visible */
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['center end', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94])

  const stickyTop = `calc(var(--navbar-height) + ${24 + index * 28}px)`

  return (
    <div
      ref={wrapRef}
      className={styles.cardSticky}
      style={{ top: stickyTop, zIndex: index + 1 }}
    >
      <MotionLink
        to={`/projects/${project.id}`}
        className={styles.card}
        style={{
          backgroundColor: project.color,
          scale: shouldReduce ? 1 : scale,
        }}
        aria-label={`View case study: ${project.title}`}
        onMouseEnter={() => setLabel('🫳 View case study')}
        onMouseLeave={() => setLabel(null)}
      >
        {/* ── Text block ── */}
        <div className={styles.textBlock}>
          <div className={styles.topRow}>
            <p className={styles.cardNum}>{project.num}</p>
            <div className={styles.tags}>
              {project.tags.map(tag => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          </div>

          <h3 className={styles.cardTitle}>{project.title}</h3>
          <p className={styles.cardSubtitle}>{project.subtitle}</p>
          <p className={styles.cardDesc}>{project.desc}</p>

          <div className={styles.footer}>
            <span className={styles.viewBtn}>
              View case study
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
              </svg>
            </span>
          </div>
        </div>

        {/* ── Browser mockup ── */}
        <div className={styles.mockup} style={{ backgroundColor: project.mockupBg }}>
          <div className={styles.mockupBar}>
            <span className={styles.dot} style={{ background: '#ff5f57' }} />
            <span className={styles.dot} style={{ background: '#febc2e' }} />
            <span className={styles.dot} style={{ background: '#28c840' }} />
            <span className={styles.addressBar} />
          </div>
          {/* alt="" on purpose: the card link already announces the project */}
          <img
            className={styles.mockupImage}
            src={project.cover}
            alt=""
            loading="lazy"
            decoding="async"
          />
        </div>
      </MotionLink>
    </div>
  )
}

export default function Projects() {
  return (
    <section className={styles.projects} id="projects" aria-label="Projects">

      <div className={styles.header}>
        <h2 className={styles.heading}>Library of Projects</h2>
        <p className={styles.subheading}>
          User Centric Experiences, AI Based Workflows and more in the library.
        </p>
      </div>

      <div className={styles.stack}>
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>

    </section>
  )
}
