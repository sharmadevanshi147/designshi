import { useRef, useState, useEffect } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import styles from './Hero.module.css'

const EXPO = [0.16, 1, 0.3, 1]

/* Rotating taglines */
const TAGLINES = [
  'Healthcare UX, done with heart',
  'Turning complexity into clarity',
  'Research → Wireframe → Ship',
  '4:18am design sessions ☕',
  'Figma is my love language',
]

export default function Hero() {
  const shouldReduce = useReducedMotion()
  const [morphed, setMorphed] = useState(false)
  const [tagIdx, setTagIdx] = useState(0)

  /* Morph Devanshi → Designshi at 2s */
  useEffect(() => {
    if (shouldReduce) return
    const t = setTimeout(() => setMorphed(true), 2000)
    return () => clearTimeout(t)
  }, [shouldReduce])

  /* Rotate taglines */
  useEffect(() => {
    const t = setInterval(() => setTagIdx(i => (i + 1) % TAGLINES.length), 3000)
    return () => clearInterval(t)
  }, [])

  return (
    <section className={styles.hero} id="home" aria-label="Introduction">

      {/* ── Background deco ── */}
      <div className={styles.deco} aria-hidden="true">
        <div className={styles.decoBlob1} />
        <div className={styles.decoBlob2} />
        <div className={styles.decoGrid} />
      </div>

      {/* ── Main content ── */}
      <div className={styles.content}>
        {/* Eyebrow */}
        <motion.div
          className={styles.eyebrow}
          initial={shouldReduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: EXPO }}
        >
          <span className={styles.eyebrowDot} />
          Product Designer · Healthcare UX · Currently at Fold Health
        </motion.div>

        {/* Name block */}
        <div className={styles.nameBlock}>
          <motion.div
            className={styles.greeting}
            initial={shouldReduce ? false : { opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.75, ease: EXPO }}
          >
            Hi, I&rsquo;m
          </motion.div>

          <motion.div
            className={styles.nameWrap}
            initial={shouldReduce ? false : { opacity: 0, y: 64, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.85, ease: EXPO }}
          >
            <span className={styles.name} aria-label={morphed ? 'Designshi' : 'Devanshi'}>
              De
              <AnimatePresence mode="popLayout" initial={false}>
                {!morphed
                  ? 'van'.split('').map((ch, i) => (
                      <motion.span key={`v${i}`} style={{ display: 'inline-block' }}
                        exit={{ opacity: 0, y: -24, rotateX: 75,
                          transition: { duration: 0.2, delay: (2 - i) * 0.05, ease: [0.4,0,1,1] }
                        }}
                      >{ch}</motion.span>
                    ))
                  : 'sign'.split('').map((ch, i) => (
                      <motion.span key={`s${i}`} style={{ display: 'inline-block' }}
                        initial={{ opacity: 0, y: 28, rotateX: -75 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 18, delay: i * 0.06 }}
                      >{ch}</motion.span>
                    ))}
              </AnimatePresence>
              shi
            </span>
          </motion.div>
        </div>

        {/* Rotating tagline */}
        <motion.div
          className={styles.taglineWrap}
          initial={shouldReduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={tagIdx}
              className={styles.tagline}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: EXPO }}
            >
              {TAGLINES[tagIdx]}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* CTAs */}
        <motion.div
          className={styles.ctas}
          initial={shouldReduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.6, ease: EXPO }}
        >
          <a href="#projects" className={styles.ctaPrimary}
            onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }}>
            See my work
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a href="mailto:devanshisharma3574@gmail.com" className={styles.ctaSecondary}>
            Get in touch
          </a>
        </motion.div>

        {/* Personality note */}
        <motion.p
          className={styles.note}
          initial={shouldReduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          probably designed at 4:18am, running on caffeine
          <br/>and <em>unnecessary perfectionism</em> ;)
        </motion.p>
      </div>

      {/* ── Social strip ── */}
      <motion.div
        className={styles.socials}
        initial={shouldReduce ? false : { opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.9, duration: 0.6, ease: EXPO }}
      >
        {[
          { label: 'LinkedIn', href: 'https://linkedin.com/in/devanshi-sharma-746470213',
            icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
          { label: 'Instagram', href: 'https://instagram.com',
            icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg> },
          { label: 'Email', href: 'mailto:devanshisharma3574@gmail.com',
            icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></svg> },
        ].map(({ label, href, icon }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer"
            className={styles.socialLink} aria-label={label}>
            {icon}
          </a>
        ))}
      </motion.div>

      {/* ── Scroll cue ── */}
      <motion.div
        className={styles.scrollCue}
        initial={shouldReduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        aria-hidden="true"
      >
        <span className={styles.scrollText}>scroll</span>
        <div className={styles.scrollLine} />
      </motion.div>

    </section>
  )
}
