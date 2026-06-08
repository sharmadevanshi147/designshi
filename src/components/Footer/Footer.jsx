import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import styles from './Footer.module.css'

/* ── Copy-to-clipboard row ── */
function CopyItem({ value, display, icon }) {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      const el = document.createElement('textarea')
      el.value = value
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 5000)
  }, [value])

  return (
    <div className={styles.copyRow}>
      <span className={styles.copyIcon}>{icon}</span>
      <span className={styles.copyValue}>{display}</span>
      <button
        className={`${styles.copyBtn} ${copied ? styles.copyDone : ''}`}
        onClick={copy}
        aria-label={copied ? 'Copied!' : `Copy ${display}`}
      >
        {copied
          ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
          : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        }
      </button>
    </div>
  )
}

/* ── "Devanshi Sharma" with letter-bounce on hover ── */
const NAME = 'Devanshi Sharma'

function BounceName() {
  const [hovered, setHovered] = useState(false)

  return (
    <h2
      className={styles.contactHeading}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={NAME}
    >
      {NAME.split('').map((ch, i) => (
        <motion.span
          key={i}
          className={styles.nameLetter}
          animate={hovered
            ? { y: [0, -10, 0], color: i % 3 === 0 ? '#EA5DB4' : i % 3 === 1 ? '#fff' : 'rgba(255,255,255,0.7)' }
            : { y: 0, color: '#fff' }
          }
          transition={{
            duration: 0.45,
            delay: i * 0.04,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {ch === ' ' ? ' ' : ch}
        </motion.span>
      ))}
    </h2>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer} id="contact" aria-label="Contact and footer">

      {/* ── Contact block ── */}
      <div className={styles.contact}>
        <p className={styles.contactEyebrow}>
          Thanks for taking a sneak peek into my work, leave a message to explore the canvas with me.
        </p>

        <BounceName />

        <div className={styles.contactItems}>
          <CopyItem
            value="devanshisharma3574@gmail.com"
            display="devanshisharma3574@gmail.com"
            icon="✉︎"
          />
          <CopyItem
            value="+917838997914"
            display="+91 7838997914"
            icon="☎"
          />
        </div>
      </div>

      <div className={styles.divider} />

      {/* ── Bottom row ── */}
      <div className={styles.bottom}>
        <div className={styles.brand}>
          <span className={styles.brandName}>Devanshi Sharma</span>
          <span className={styles.brandSub}>Product Designer · Healthcare UX</span>
        </div>

        <p className={styles.note}>
          Designed with care —{' '}
          <em>pursuing each workflow like a dream ✦</em>
        </p>

        <div className={styles.socials}>
          <a
            href="https://linkedin.com/in/devanshi-sharma-746470213"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="LinkedIn"
          >
            <span className={styles.socialIcon}>in</span>
            <span className={styles.socialLabel}>LinkedIn</span>
          </a>
        </div>
      </div>

      <div className={styles.copyright}>
        <p>© {year} Devanshi Sharma. Crafted with heart.</p>
        <p className={styles.location}>Pune, India 📍</p>
      </div>

    </footer>
  )
}
