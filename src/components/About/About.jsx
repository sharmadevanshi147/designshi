import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import Tape from './Tape'
import styles from './About.module.css'

const EXPO = [0.16, 1, 0.3, 1]

const SKILLS = [
  'User Research', 'Design Systems', 'Heuristic Audits',
  'Wireframing', 'Prototyping', 'HTML · CSS · JS',
  'Figma', 'Information Architecture', 'Usability Testing',
]

const STATS = [
  { value: '2+',   label: 'Years designing' },
  { value: '100+', label: 'Interfaces shipped' },
  { value: '20+',  label: 'Research sessions' },
  { value: '50+',  label: 'Usability issues found' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })
  const shouldReduce = useReducedMotion()
  const animate = shouldReduce ? 'visible' : inView ? 'visible' : 'hidden'

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
  }
  const fadeUp = {
    hidden:  { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: EXPO } },
  }
  const pop = {
    hidden:  { scale: 0.88, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 80, damping: 14 } },
  }

  return (
    <section ref={ref} className={styles.about} id="about" aria-label="About me">

      {/* ── Card + tape ── */}
      <div className={styles.cardWrap}>
        <div className={styles.tapeHolder} aria-hidden="true"><Tape /></div>

        <motion.div
          className={styles.card}
          variants={container}
          initial={shouldReduce ? 'visible' : 'hidden'}
          animate={animate}
        >
          {/* Left: bio */}
          <div className={styles.left}>
            <motion.p className={styles.label} variants={fadeUp}>About me</motion.p>

            <motion.h2 className={styles.bio} variants={fadeUp}>
              I design complex healthcare experiences that feel{' '}
              <em>human</em> — thinking about everything a user feels{' '}
              <em>because</em> of the product, not just while using it.
            </motion.h2>

            <motion.p className={styles.bodyCopy} variants={fadeUp}>
              2+ years deep in healthcare UX, startups, and freelance. Currently{' '}
              <strong>expanding design systems</strong> and running heuristic audits at Fold Health.
              I mentor peers, ship fast, and obsess over details at 4am.
            </motion.p>

            {/* Stats */}
            <motion.div className={styles.stats} variants={fadeUp}>
              {STATS.map(({ value, label }) => (
                <div key={label} className={styles.stat}>
                  <span className={styles.statValue}>{value}</span>
                  <span className={styles.statLabel}>{label}</span>
                </div>
              ))}
            </motion.div>

            <motion.div className={styles.actions} variants={pop}>
              <a
                href="https://linkedin.com/in/devanshi-sharma-746470213"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnPrimary}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                </svg>
                View LinkedIn
              </a>
              <a
                href="/resume.pdf"
                download="Devanshi_Sharma_Resume.pdf"
                className={styles.btnDownload}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                  <path d="M12 15V3"/><path d="M7 10l5 5 5-5"/><path d="M3 19h18"/>
                </svg>
                Download CV
              </a>
              <a href="mailto:devanshisharma3574@gmail.com" className={styles.btnSecondary}>
                Get in touch →
              </a>
            </motion.div>
          </div>

          {/* Right: skills */}
          <div className={styles.right}>
            <motion.p className={styles.label} variants={fadeUp}>What I do</motion.p>
            <motion.div className={styles.skillGrid} variants={fadeUp}>
              {SKILLS.map((s, i) => (
                <motion.span
                  key={s}
                  className={styles.skill}
                  initial={shouldReduce ? false : { scale: 0.85, opacity: 0 }}
                  animate={inView || shouldReduce ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.05, duration: 0.4, ease: EXPO }}
                >
                  {s}
                </motion.span>
              ))}
            </motion.div>

            <motion.div className={styles.toolsNote} variants={fadeUp}>
              <span className={styles.toolsLabel}>Tools I love</span>
              <p className={styles.toolsList}>
                Figma · FigJam · Claude · Miro · Notion · VS Code · GitHub
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
