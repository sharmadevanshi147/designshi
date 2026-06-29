import { useState, useEffect } from 'react'
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

export default function Hero() {
  const shouldReduce = useReducedMotion()
  const [morphed, setMorphed] = useState(false)

  /* Devanshi ↔ Designshi — loops continuously */
  useEffect(() => {
    if (shouldReduce) return
    const t1 = setTimeout(() => setMorphed(true), 2400)
    const interval = setInterval(() => {
      setMorphed(prev => !prev)
    }, 4000)
    return () => { clearTimeout(t1); clearInterval(interval) }
  }, [shouldReduce])

  return (
    <section className={styles.hero} id="home" aria-label="Introduction">

      {/* Soft blobs */}
      <div className={styles.deco} aria-hidden="true">
        <div className={styles.decoBlob1} />
        <div className={styles.decoBlob2} />
      </div>

      {/* ── Two-column layout: content left, image right ── */}
      <div className={styles.heroGrid}>

        {/* ── Left column: centered content ── */}
        <div className={styles.leftCol}>

          {/* Greeting */}
          <motion.span
            className={styles.greeting}
            initial={shouldReduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: EXPO }}
          >
            Hi, I&rsquo;m
          </motion.span>

          {/* Name */}
          <motion.div
            className={styles.nameWrap}
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
                        initial={{ opacity: 0, filter: 'blur(10px)', y: 8 }}
                        animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                        exit={{
                          opacity: 0, filter: 'blur(10px)', y: -8,
                          transition: { duration: 0.22, delay: (2 - i) * 0.04 },
                        }}
                        transition={{ duration: 0.45, delay: i * 0.07, ease: EXPO }}
                      >{ch}</motion.span>
                    ))
                  : 'sign'.split('').map((ch, i) => (
                      <motion.span
                        key={`s${i}`}
                        style={{ display: 'inline-block' }}
                        initial={{ opacity: 0, filter: 'blur(10px)', y: 8 }}
                        animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                        exit={{
                          opacity: 0, filter: 'blur(10px)', y: -8,
                          transition: { duration: 0.22, delay: (3 - i) * 0.04 },
                        }}
                        transition={{ duration: 0.45, delay: i * 0.07, ease: EXPO }}
                      >{ch}</motion.span>
                    ))}
              </AnimatePresence>
              shi
            </span>
          </motion.div>

          {/* Marquee tagline */}
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

          {/* CTAs */}
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

          {/* Note */}
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

        {/* ── Right column: portrait image ── */}
        <motion.div
          className={styles.rightCol}
          initial={shouldReduce ? false : { opacity: 0, x: 40, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.6, duration: 1.2, ease: EXPO }}
        >
          <div className={styles.portraitWrap}>
            <img
              src="/designshi/hero-portrait.jpg"
              alt="Devanshi Sharma"
              className={styles.portraitImg}
            />
          </div>
        </motion.div>

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
