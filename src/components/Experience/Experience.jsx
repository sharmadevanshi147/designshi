import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import styles from './Experience.module.css'

const EXPO = [0.16, 1, 0.3, 1]

const JOBS = [
  {
    company: 'Fold Health',
    role: 'Product UX Designer',
    period: 'Oct 2024 – Present',
    location: 'Remote',
    tag: 'Current',
    color: 'var(--color-accent)',
    highlights: [
      'Expanded design system with new components & layout templates',
      'Conducted UX audits on 8+ core workflows, identifying 50+ usability issues',
      'Handled White-label platform reviews with major clients',
    ],
  },
  {
    company: 'Quickprism.com',
    role: 'UX Designer',
    period: 'Jan 2024 – Jun 2024',
    location: 'Hybrid',
    color: '#7C6EFF',
    highlights: [
      'User research with 20+ participants to guide wireframing & prototyping',
      'Created 100+ intuitive, engaging interfaces through iterative design',
      'Aligned design strategy with business objectives',
    ],
  },
  {
    company: 'Cyquent INC',
    role: 'UX Designer — Contract',
    period: 'Oct 2023 – Jan 2024',
    location: 'Remote',
    color: '#F59E0B',
    highlights: [
      'Led website development, created 15+ pages incorporating client feedback',
      'Established cohesive design system ensuring visual consistency',
      'Achieved seamless usability through rigorous testing & iteration',
    ],
  },
  {
    company: 'Sellular Student Networks',
    role: 'UX Design Intern',
    period: 'Jul 2023 – Sep 2023',
    location: 'Remote',
    color: '#10B981',
    highlights: [
      'Conducted UI testing on 30+ screens for functionality & usability',
      'Crafted user-centric UX with streamlined flows and visual layouts',
      'Collaborated on cohesive, consistent interfaces',
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
        <p className={styles.eyebrow}>Where I've been</p>
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
          <p className={styles.extraMain} style={{ marginTop: 12 }}>General Secretary — IEEE CS Chapter</p>
          <p className={styles.extraSub}>Mentored 30+ students in UX · 2023–24</p>
        </div>
      </motion.div>

    </section>
  )
}
