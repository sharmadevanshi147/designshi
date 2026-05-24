import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import Tape from './Tape'
import styles from './About.module.css'

const EXPO = [0.16, 1, 0.3, 1]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
}

const bioVariants = {
  hidden:  { y: 44, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.85, ease: EXPO } },
}

const btnVariants = {
  hidden:  { scale: 0.88, opacity: 0 },
  visible: {
    scale: 1, opacity: 1,
    transition: { type: 'spring', stiffness: 80, damping: 14, mass: 0.9, opacity: { duration: 0.4, ease: EXPO } },
  },
}

export default function About() {
  const ref        = useRef(null)
  const inView     = useInView(ref, { once: true, margin: '-8% 0px' })
  const shouldReduce = useReducedMotion()
  const animate    = shouldReduce ? 'visible' : inView ? 'visible' : 'hidden'

  return (
    <section
      ref={ref}
      className={styles.about}
      id="about"
      aria-label="About me"
    >
      {/* ── Card + tape wrapper ── */}
      <div className={styles.cardWrap}>

        {/* Tape — straddles the top edge of the card */}
        <div className={styles.tapeHolder} aria-hidden="true">
          <Tape />
        </div>

        {/* Cream card */}
        <motion.div
          className={styles.card}
          variants={containerVariants}
          initial={shouldReduce ? 'visible' : 'hidden'}
          animate={animate}
        >
          <motion.p className={styles.bio} variants={bioVariants}>
            I have been designing complex User experiences for 2 Years, Working
            specially in Healthcare UX, I think about the user&rsquo;s journey
            outside of the application, everything that they experience because
            of the application, not just while using it.
          </motion.p>

          <motion.a
            href="#resume"
            className={styles.btn}
            variants={btnVariants}
            whileHover={shouldReduce ? {} : { scale: 1.04 }}
            whileTap={shouldReduce  ? {} : { scale: 0.97 }}
          >
            <svg
              className={styles.btnIcon}
              width="18" height="18"
              viewBox="0 0 24 24"
              fill="none" stroke="currentColor"
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 5v14" />
              <path d="M5 12l7 7 7-7" />
            </svg>
            Download my Resume
          </motion.a>
        </motion.div>

      </div>
    </section>
  )
}
