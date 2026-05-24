import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import styles from './Navbar.module.css'

/* ── Nav items from Figma ── */
const NAV_LINKS = [
  { label: 'Resume',     href: '#resume'   },
  { label: 'Projects',   href: '#projects' },
  { label: 'About Me',   href: '#about'    },
  { label: 'Contact Me', href: '#contact'  },
]

/* ── Animation variants ── */
const navVariants = {
  hidden:  { y: -90, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
}

const linkContainerVariants = {
  hidden:  {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.3 },
  },
}

const linkVariants = {
  hidden:  { y: -10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const shouldReduce = useReducedMotion()
  const ticking = useRef(false)

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20)
          ticking.current = false
        })
        ticking.current = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
      variants={navVariants}
      initial={shouldReduce ? 'visible' : 'hidden'}
      animate="visible"
      role="banner"
    >
      <nav className={styles.navInner} aria-label="Primary navigation">
        <motion.ul
          className={styles.linkList}
          variants={linkContainerVariants}
          initial={shouldReduce ? 'visible' : 'hidden'}
          animate="visible"
          role="list"
        >
          {NAV_LINKS.map(({ label, href }) => (
            <motion.li key={label} variants={linkVariants}>
              <NavItem href={href} label={label} />
            </motion.li>
          ))}
        </motion.ul>
      </nav>
    </motion.header>
  )
}

/* ── Individual nav link with animated underline ── */
function NavItem({ href, label }) {
  return (
    <motion.a
      href={href}
      className={styles.navLink}
      whileHover="hovered"
      initial="rest"
      animate="rest"
    >
      <span className={styles.linkText}>{label}</span>
      <motion.span
        className={styles.underline}
        variants={{
          rest:    { scaleX: 0, originX: 0 },
          hovered: { scaleX: 1, originX: 0 },
        }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
      />
    </motion.a>
  )
}
