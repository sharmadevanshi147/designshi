import { useRef, useContext } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ScrollContainerCtx } from '../PageFlipTransition/PageFlipTransition'
import styles from './Projects.module.css'

/* ─── Project data ─────────────────────────────────────── */
const PROJECTS = [
  {
    id: 1,
    title: 'Telemedpro',
    subtitle: 'Healthcare Platform to improve patient care',
    desc: 'A comprehensive telemedicine platform designed to connect patients with healthcare providers — reducing wait times and improving health outcomes through intuitive, empathy-first UX.',
    color: '#C3F6FF',
    mockupBg: '#0d1f2d',
    mockupAccent: '#00bcd4',
    tags: ['Healthcare UX', 'Telemedicine', '2024'],
    href: '#',
  },
  {
    id: 2,
    title: 'MedSync',
    subtitle: 'Appointment scheduling & clinic management',
    desc: 'Streamlined booking and patient management for multi-specialty clinics, reducing no-shows by 40% through smart reminders, waitlist intelligence, and an intuitive scheduling flow.',
    color: '#FFE4F3',
    mockupBg: '#1e0a14',
    mockupAccent: '#ea5db4',
    tags: ['Product Design', 'Healthcare', '2023'],
    href: '#',
  },
  {
    id: 3,
    title: 'HealthVault',
    subtitle: 'Personal health records & monitoring dashboard',
    desc: 'A patient-centred dashboard empowering individuals to own their health data, track vitals over time, and share records securely with their care providers in one place.',
    color: '#FFF3C4',
    mockupBg: '#1c1400',
    mockupAccent: '#f59e0b',
    tags: ['Dashboard', 'Data UX', '2023'],
    href: '#',
  },
]

/* ─── Single sticky card ───────────────────────────────── */
function ProjectCard({ project, index }) {
  const containerRef  = useContext(ScrollContainerCtx)
  const wrapRef       = useRef(null)
  const shouldReduce  = useReducedMotion()

  // Track this card's position relative to the scroll container
  const { scrollYProgress } = useScroll({
    container: containerRef,
    target:    wrapRef,
    offset:    ['start end', 'end start'],
  })

  // As the next card slides over: scale this card down slightly for depth
  const scale   = useTransform(scrollYProgress, [0.55, 0.85], [1, 0.94])
  const opacity = useTransform(scrollYProgress, [0.6, 0.9],  [1, 0.7])

  // Stagger the sticky top so each card peeks 18 px below the one before
  const stickyTop = `calc(var(--navbar-height) + ${28 + index * 18}px)`

  return (
    <div ref={wrapRef} className={styles.cardWrap}>
      <motion.article
        className={styles.card}
        style={{
          backgroundColor: project.color,
          top:    stickyTop,
          zIndex: index + 1,
          scale:  shouldReduce ? 1 : scale,
          opacity: shouldReduce ? 1 : opacity,
        }}
        aria-label={`Project: ${project.title}`}
      >
        {/* ── Text block ── */}
        <div className={styles.textBlock}>
          <p className={styles.cardIndex}>0{index + 1}</p>
          <h3 className={styles.cardTitle}>{project.title}</h3>
          <p className={styles.cardSubtitle}>{project.subtitle}</p>
          <p className={styles.cardDesc}>{project.desc}</p>

          <div className={styles.footer}>
            <div className={styles.tags}>
              {project.tags.map(tag => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
            <a href={project.href} className={styles.viewBtn} aria-label={`View ${project.title} case study`}>
              View case study
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>

        {/* ── Browser mockup ── */}
        <div className={styles.mockup} style={{ backgroundColor: project.mockupBg }}>
          {/* Chrome bar */}
          <div className={styles.mockupBar}>
            <span className={styles.dot} style={{ background: '#ff5f57' }} />
            <span className={styles.dot} style={{ background: '#febc2e' }} />
            <span className={styles.dot} style={{ background: '#28c840' }} />
            <span className={styles.addressBar} />
          </div>
          {/* Screen content */}
          <div className={styles.mockupContent}>
            <p className={styles.mockupLabel} style={{ color: project.mockupAccent }}>
              {project.title}
            </p>
            <p className={styles.mockupSub} style={{ color: 'rgba(255,255,255,0.45)' }}>
              {project.subtitle}
            </p>
            {/* Decorative grid lines */}
            <div className={styles.mockupGrid} aria-hidden="true">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className={styles.mockupGridLine}
                  style={{ borderColor: `rgba(255,255,255,${0.04 + i * 0.015})` }} />
              ))}
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  )
}

/* ─── Section ──────────────────────────────────────────── */
export default function Projects() {
  return (
    <section className={styles.projects} id="projects" aria-label="Projects">

      {/* Header */}
      <div className={styles.header}>
        <p className={styles.eyebrow}>Judge a book by its cover in the</p>
        <h2 className={styles.heading}>Library of Projects</h2>
        <p className={styles.subheading}>
          Flip any project book, read about it, and explore the full case study by clicking on it.
        </p>
      </div>

      {/* Sticky stack */}
      <div className={styles.stack}>
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
        {/* Bottom spacer so last card unsticks cleanly */}
        <div className={styles.stackSpacer} aria-hidden="true" />
      </div>

    </section>
  )
}
