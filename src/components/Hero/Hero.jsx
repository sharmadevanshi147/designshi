import { useRef, useState, useEffect } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import styles from './Hero.module.css'

/* ─────────────────────────────────────────────
   Animation config
───────────────────────────────────────────── */
const EXPO = [0.16, 1, 0.3, 1]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
}

/* "Hi, I'm" — slides up cleanly */
const greetingVariants = {
  hidden:  { y: 56, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: EXPO },
  },
}

/* "Devanshi" — spring pop for personality */
const nameVariants = {
  hidden:  { y: 72, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 70,
      damping: 14,
      mass: 1,
      opacity: { duration: 0.5, ease: EXPO },
    },
  },
}

/* Subtitle — soft fade up */
const subtitleVariants = {
  hidden:  { y: 28, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.65, ease: EXPO },
  },
}

/* ─────────────────────────────────────────────
   Component
───────────────────────────────────────────── */
export default function Hero() {
  const shouldReduce = useReducedMotion()
  const ref = useRef(null)
  const [morphed, setMorphed] = useState(false)

  useEffect(() => {
    if (shouldReduce) return
    const t = setTimeout(() => setMorphed(true), 2000)
    return () => clearTimeout(t)
  }, [shouldReduce])

  return (
    <section
      ref={ref}
      className={styles.hero}
      id="home"
      aria-label="Introduction"
    >
      <motion.div
        className={styles.stack}
        variants={containerVariants}
        initial={shouldReduce ? 'visible' : 'hidden'}
        animate="visible"
      >
        {/* ── "Hi, I'm" — DM Sans Regular 200px ── */}
        <motion.div className={styles.greetingWrap} variants={greetingVariants}>
          <h1 className={styles.greeting}>Hi, I&rsquo;m</h1>
        </motion.div>

        {/* ── "Devanshi" → "Designshi" — Fredoka One 240px #EA5DB4 ── */}
        <motion.div className={styles.nameWrap} variants={nameVariants}>
          <motion.span
            className={styles.name}
            layout
            aria-label={morphed ? 'Designshi' : 'Devanshi'}
          >
            {'De'}
            <AnimatePresence mode="popLayout" initial={false}>
              {!morphed
                ? 'van'.split('').map((ch, i) => (
                    <motion.span
                      key={`van-${i}`}
                      style={{ display: 'inline-block' }}
                      exit={{
                        opacity: 0,
                        y: -28,
                        rotateX: 80,
                        transition: {
                          duration: 0.22,
                          delay: (2 - i) * 0.06,
                          ease: [0.4, 0, 1, 1],
                        },
                      }}
                    >
                      {ch}
                    </motion.span>
                  ))
                : 'sign'.split('').map((ch, i) => (
                    <motion.span
                      key={`sign-${i}`}
                      style={{ display: 'inline-block' }}
                      initial={{ opacity: 0, y: 32, rotateX: -80 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 18,
                        delay: i * 0.07,
                        opacity: { duration: 0.15 },
                      }}
                    >
                      {ch}
                    </motion.span>
                  ))}
            </AnimatePresence>
            {'shi'}
          </motion.span>
        </motion.div>

        {/* ── Subtitle — Darker Grotesque SemiBold 44px ── */}
        <motion.p className={styles.subtitle} variants={subtitleVariants}>
          UX Designer &amp; Developer
        </motion.p>
      </motion.div>
    </section>
  )
}
