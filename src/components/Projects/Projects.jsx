import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import styles from './Projects.module.css'

const PROJECTS = [
  {
    id: 'goodreads',
    num: '01',
    title: 'Goodreads',
    subtitle: 'Reimagining the reading experience',
    desc: 'A redesign of the Goodreads platform focused on improving book discovery, social reading features, and a more delightful user experience for avid readers.',
    color: '#C8F0F8',
    mockupBg: '#0d1f2d',
    mockupAccent: '#00bcd4',
    tags: ['UX Redesign', 'Product Design', '2024'],
    year: '2024',
  },
  {
    id: 'balnce',
    num: '02',
    title: 'Balnce',
    subtitle: 'Finding balance in everyday wellness',
    desc: 'A wellness app designed to help users build healthy habits, track their mental and physical well-being, and find balance through intuitive, calming design.',
    color: '#FADADF',
    mockupBg: '#1e0a14',
    mockupAccent: '#ea5db4',
    tags: ['Product Design', 'Wellness', '2023'],
    year: '2023',
  },
  {
    id: 'foldhealth',
    num: '03',
    title: 'My Work at FoldHealth',
    subtitle: 'Healthcare UX at scale',
    desc: 'A deep dive into my work at FoldHealth — designing patient-centric healthcare experiences, streamlining clinical workflows, and improving health outcomes through empathy-first UX.',
    color: '#F9F0C0',
    mockupBg: '#1c1400',
    mockupAccent: '#f59e0b',
    tags: ['Healthcare UX', 'Enterprise', '2023–24'],
    year: '2023–24',
  },
]

function ProjectCard({ project, index }) {
  const wrapRef    = useRef(null)
  const shouldReduce = useReducedMotion()

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
      <motion.article
        className={styles.card}
        style={{
          backgroundColor: project.color,
          scale: shouldReduce ? 1 : scale,
        }}
        aria-label={`Project: ${project.title}`}
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
            <Link to={`/projects/${project.id}`} className={styles.viewBtn}>
              View case study
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
              </svg>
            </Link>
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
          <div className={styles.mockupContent}>
            <p className={styles.mockupYear}>{project.year}</p>
            <p className={styles.mockupLabel} style={{ color: project.mockupAccent }}>
              {project.title}
            </p>
            <p className={styles.mockupSub}>{project.subtitle}</p>
            <div className={styles.mockupGrid} aria-hidden="true">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className={styles.mockupGridLine}
                  style={{ borderColor: `rgba(255,255,255,${0.03 + i * 0.012})` }} />
              ))}
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  )
}

export default function Projects() {
  return (
    <section className={styles.projects} id="projects" aria-label="Projects">

      <div className={styles.header}>
        <p className={styles.eyebrow}>Selected Work</p>
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
