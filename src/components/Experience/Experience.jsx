import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import styles from './Experience.module.css'

const EXPO = [0.16, 1, 0.3, 1]

const JOBS = [
  {
    company: 'Fold Health',
    role: 'Product UX Designer',
    period: 'Oct 2024 – Present',
    location: 'Onsite · Pune, Maharashtra, India',
    tag: 'Current',
    color: 'var(--color-accent)',
    highlights: [
      'Shipped 10+ workflows as AI-based React frontend code, saving time in the SDLC',
      'Expanded the design system with multiple components & layout templates for faster delivery',
      'Ran heuristic UX audits across 8+ modules, raising, tracking & addressing 200+ UX bugs',
      'Revamped onboarding & implementation workflows, cutting up to 70% of feature configuration time',
      'Worked with Analytics UX on the creation of 5+ reports',
      'Contributed to provider workflows managing more than 1M lives',
      'Handled white-labelling platform reviews & conversations with major clients',
      'Redesigned patient care modules, 25+ end-to-end support workflows & 50+ enhancements, including AI agent workflows and a patient-facing electronic insurance ID',
    ],
  },
  {
    company: 'Quickprism.com',
    role: 'UX Designer',
    period: 'Jan 2024 – Jun 2024',
    location: 'Hybrid',
    color: '#2A9D8F',
    highlights: [
      'Conducted user research with over 20 participants, guiding wireframing & prototype development',
      'Created 100+ intuitive, engaging interfaces through iterative design & usability testing',
      'Aligned design strategy with business objectives for seamless, effective user interactions',
    ],
  },
  {
    company: 'Cyquent INC',
    role: 'UX Designer — Contract',
    period: 'Oct 2023 – Jan 2024',
    location: 'Remote',
    color: '#F59E0B',
    highlights: [
      'Directed website development, creating 15+ pages from client feedback with consistent branding',
      'Established a cohesive design system, cutting design time & improving visual consistency',
    ],
  },
  {
    company: 'Sellular Student Networks',
    role: 'UX Design Intern',
    period: 'Jul 2023 – Sep 2023',
    location: 'Remote',
    color: '#10B981',
    highlights: [
      'Conducted UI testing on 30+ screens to ensure functionality & enhance usability',
      'Crafted user-centric UX with a streamlined flow & visually appealing layouts to boost engagement',
    ],
  },
]

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const shouldReduce = useReducedMotion()

  return (
    <section ref={ref} className={styles.section} id="experience" aria-label="Work experience">

      <div className={styles.header}>
        <h2 className={styles.heading}>Experience</h2>
      </div>

      <div className={styles.timeline}>
        {/* Vertical line */}
        <div className={styles.line} aria-hidden="true">
          <motion.div
            className={styles.lineProgress}
            initial={{ scaleY: 0 }}
            animate={inView || shouldReduce ? { scaleY: 1 } : {}}
            transition={{ duration: 1.4, ease: EXPO, delay: 0.2 }}
          />
        </div>

        {JOBS.map((job, i) => (
          <motion.div
            key={job.company}
            className={styles.item}
            initial={shouldReduce ? false : { opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
            animate={inView || shouldReduce ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: EXPO, delay: 0.1 + i * 0.14 }}
          >
            {/* Timeline node */}
            <div className={styles.node} style={{ '--job-color': job.color }} aria-hidden="true">
              <div className={styles.nodeRing} />
              <div className={styles.nodeDot} />
            </div>

            {/* Card */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div>
                  <h3 className={styles.company}>{job.company}</h3>
                  <p className={styles.role}>{job.role}</p>
                </div>
                <div className={styles.meta}>
                  {job.tag && (
                    <span className={styles.currentTag}>{job.tag}</span>
                  )}
                  <span className={styles.period}>{job.period}</span>
                  <span className={styles.location}>{job.location}</span>
                </div>
              </div>
              <ul className={styles.highlights}>
                {job.highlights.map((h, j) => (
                  <li key={j} className={styles.highlight}>
                    <span className={styles.bullet} style={{ background: job.color }} aria-hidden="true" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Education & certs row */}
      <motion.div
        className={styles.extra}
        initial={shouldReduce ? false : { opacity: 0, y: 32 }}
        animate={inView || shouldReduce ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: EXPO, delay: 0.7 }}
      >
        <div className={styles.extraCard}>
          <p className={styles.extraLabel}>Education</p>
          <p className={styles.extraMain}>B.Tech in Information Technology</p>
          <p className={styles.extraSub}>GTBIT, Delhi · CBSE XII</p>
        </div>
        <div className={styles.extraCard}>
          <p className={styles.extraLabel}>Certifications</p>
          <ul className={styles.certList}>
            {[
              'Intro to UX Design — Georgia Tech',
              'Advanced UI/UX in Figma — Udemy',
              'CS50x — Harvard University',
              'Responsive Web Design — freeCodeCamp',
            ].map(c => (
              <li key={c} className={styles.cert}>{c}</li>
            ))}
          </ul>
        </div>
        <div className={styles.extraCard}>
          <p className={styles.extraLabel}>Leadership</p>
          <p className={styles.extraMain}>President — Swaas Eco-Tech Society</p>
          <p className={styles.extraSub}>GTBIT · 2022–23</p>
          <p className={`${styles.extraSub} ${styles.extraNote}`}>
            Secured a Bisleri <em>Bottles for Change</em> collaboration, cutting the
            society&rsquo;s carbon footprint by over 100&nbsp;kg of plastic
          </p>
          <p className={styles.extraMain} style={{ marginTop: 12 }}>General Secretary — IEEE CS Chapter</p>
          <p className={styles.extraSub}>Mentored 30+ students in UX · 2023–24</p>
        </div>
      </motion.div>

    </section>
  )
}
