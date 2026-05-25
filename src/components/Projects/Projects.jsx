import { useRef, useContext } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ScrollContainerCtx } from '../PageFlipTransition/PageFlipTransition'
import styles from './Projects.module.css'

const PROJECTS = [
  {
    id: 'telemedpro',
    num: '01',
    title: 'Telemedpro',
    subtitle: 'Healthcare Platform to improve patient care',
    desc: 'A comprehensive telemedicine platform designed to connect patients with healthcare providers — reducing wait times and improving health outcomes through intuitive, empathy-first UX.',
    color: '#C3F6FF',
    mockupBg: '#0d1f2d',
    mockupAccent: '#00bcd4',
    tags: ['Healthcare UX', 'Telemedicine', '2024'],
    year: '2024',
  },
  {
    id: 'medsync',
    num: '02',
    title: 'MedSync',
    subtitle: 'Appointment scheduling & clinic management',
    desc: 'Streamlined booking and patient management for multi-specialty clinics, reducing no-shows by 40% through smart reminders, waitlist intelligence, and an intuitive scheduling flow.',
    color: '#FFE4F3',
    mockupBg: '#1e0a14',
    mockupAccent: '#ea5db4',
    tags: ['Product Design', 'Healthcare', '2023'],
    year: '2023',
  },
  {
    id: 'healthvault',
    num: '03',
    title: 'HealthVault',
    subtitle: 'Personal health records & monitoring dashboard',
    desc: 'A patient-centred dashboard empowering individuals to own their health data, track vitals over time, and share records securely with their care providers in one place.',
    color: '#FFF3C4',
    mockupBg: '#1c1400',
    mockupAccent: '#f59e0b',
    tags: ['Dashboard', 'Data UX', '2023'],
    year: '2023',
  },
]

function ProjectCard({ project, index }) {
  const containerRef = useContext(ScrollContainerCtx)
  const wrapRef      = useRef(null)
  const shouldReduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    container: containerRef,
    target:    wrapRef,
    offset:    ['center end', 'end start'],
  })

  const scale   = useTransform(scrollYProgress, [0, 1], [1, 0.93])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.6])

  const stickyTop = `calc(var(--navbar-height) + ${28 + index * 32}px)`

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
          scale:   shouldReduce ? 1 : scale,
          opacity: shouldReduce ? 1 : opacity,
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
        <p className={styles.eyebrow}>Judge a book by its cover in the</p>
        <h2 className={styles.heading}>Library of Projects</h2>
        <p className={styles.subheading}>
          Flip any project, read about it, and explore the full case study.
        </p>
      </div>

      <div className={styles.stack}>
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
        <div className={styles.stackEnd} aria-hidden="true" />
      </div>

    </section>
  )
}
