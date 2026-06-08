import { useState, useEffect, useRef } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import styles from './Hero.module.css'

const EXPO = [0.16, 1, 0.3, 1]

/* ── Marquee taglines ── */
const MARQUEE_ITEMS = [
  'AI First Product/UX Designer',
  'Turning Creative & Visual Thinking into User Scenarios',
  '2 Years in Healthcare UX',
  'Shipping in Code',
  'Experience with Different Industries',
]

/* ── Polaroid photos (replace src with real photos) ── */
const POLAROIDS = [
  { src: null, label: 'Photo 1', rotate: -12, x: -38, y: -18 },
  { src: null, label: 'Photo 2', rotate:  8,  x:  32, y: -28 },
  { src: null, label: 'Photo 3', rotate: -5,  x: -52, y:  22 },
  { src: null, label: 'Photo 4', rotate: 14,  x:  44, y:  26 },
]

/* ── Polaroid component ── */
function Polaroid({ photo, index, shouldReduce }) {
  return (
    <motion.div
      className={styles.polaroid}
      style={{ '--rotate': `${photo.rotate}deg` }}
      initial={shouldReduce ? false : { x: 0, y: 0, opacity: 0, scale: 0.6, rotate: 0 }}
      animate={{
        x: `${photo.x}vw`,
        y: `${photo.y}vh`,
        opacity: 1,
        scale: 1,
        rotate: photo.rotate,
      }}
      transition={{
        delay: 0.3 + index * 0.12,
        duration: 0.9,
        ease: EXPO,
      }}
      whileHover={{ scale: 1.08, zIndex: 10, rotate: photo.rotate * 0.4 }}
    >
      <div className={styles.polaroidPhoto}>
        {photo.src
          ? <img src={photo.src} alt={photo.label} />
          : <div className={styles.polaroidPlaceholder} />
        }
      </div>
      <p className={styles.polaroidLabel}>{photo.label}</p>
    </motion.div>
  )
}

export default function Hero() {
  const shouldReduce = useReducedMotion()
  const [morphed, setMorphed] = useState(false)

  /* Devanshi → Designshi at 2.4 s, back to Devanshi at 5.4 s */
  useEffect(() => {
    if (shouldReduce) return
    const t1 = setTimeout(() => setMorphed(true),  2400)
    const t2 = setTimeout(() => setMorphed(false), 5400)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [shouldReduce])

  return (
    <section className={styles.hero} id="home" aria-label="Introduction">

      {/* Soft blobs */}
      <div className={styles.deco} aria-hidden="true">
        <div className={styles.decoBlob1} />
        <div className={styles.decoBlob2} />
      </div>

      {/* ── Polaroids spreading from centre ── */}
      <div className={styles.polaroidStage} aria-hidden="true">
        {POLAROIDS.map((photo, i) => (
          <Polaroid key={i} photo={photo} index={i} shouldReduce={shouldReduce} />
        ))}
      </div>

      {/* ── Greeting ── */}
      <div className={styles.topContent}>
        <motion.span
          className={styles.greeting}
          initial={shouldReduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: EXPO }}
        >
          Hi, I&rsquo;m
        </motion.span>
      </div>

      {/* ── Full-width name ── */}
      <motion.div
        className={styles.nameRibbon}
        initial={shouldReduce ? false : { opacity: 0, filter: 'blur(32px)', scale: 0.97 }}
        animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
        transition={{ delay: 0.55, duration: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
        aria-label={morphed ? 'Designshi' : 'Devanshi'}
      >
        <span className={styles.name}>
          De
          <AnimatePresence mode="popLayout" initial={false}>
            {!morphed
              ? 'van'.split('').map((ch, i) => (
                  <motion.span
                    key={`v${i}`}
                    style={{ display: 'inline-block' }}
                    exit={{
                      opacity: 0, filter: 'blur(10px)', y: -8,
                      transition: { duration: 0.22, delay: (2 - i) * 0.04 },
                    }}
                  >{ch}</motion.span>
                ))
              : 'sign'.split('').map((ch, i) => (
                  <motion.span
                    key={`s${i}`}
                    style={{ display: 'inline-block' }}
                    initial={{ opacity: 0, filter: 'blur(10px)', y: 8 }}
                    animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                    transition={{ duration: 0.45, delay: i * 0.07, ease: EXPO }}
                  >{ch}</motion.span>
                ))}
          </AnimatePresence>
          shi
        </span>
      </motion.div>

      {/* ── Marquee tagline ── */}
      <motion.div
        className={styles.marqueeWrap}
        initial={shouldReduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.7 }}
        aria-hidden="true"
      >
        <div className={styles.marqueeTrack}>
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className={styles.marqueeItem}>
              {item}
              <span className={styles.marqueeDot}>✦</span>
            </span>
          ))}
        </div>
      </motion.div>

      {/* ── CTAs + note ── */}
      <div className={styles.bottomContent}>
        <motion.div
          className={styles.ctas}
          initial={shouldReduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6, ease: EXPO }}
        >
          <a
            href="#projects"
            className={styles.ctaPrimary}
            onClick={e => {
              e.preventDefault()
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            See my work
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
              strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a href="mailto:devanshisharma3574@gmail.com" className={styles.ctaSecondary}>
            Get in touch
          </a>
        </motion.div>

        <motion.p
          className={styles.note}
          initial={shouldReduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 0.8 }}
        >
          Designed with care, Pursuing each workflow like a dream{' '}
          <em className={styles.noteSpark}>✦</em>
        </motion.p>
      </div>

      {/* ── Social strip — fixed, always visible ── */}
      <motion.div
        className={styles.socials}
        initial={shouldReduce ? false : { opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4, duration: 0.6, ease: EXPO }}
      >
        {[
          {
            label: 'LinkedIn', href: 'https://linkedin.com/in/devanshi-sharma-746470213',
            icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
          },
          {
            label: 'Email', href: 'mailto:devanshisharma3574@gmail.com',
            icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="M22 7l-10 7L2 7"/></svg>,
          },
        ].map(({ label, href, icon }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer"
            className={styles.socialLink} aria-label={label}>
            {icon}
          </a>
        ))}
      </motion.div>

    </section>
  )
}
