import { useState, useCallback } from 'react'
import styles from './Footer.module.css'

function CopyItem({ value, display, icon }) {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 5000)
    } catch {
      /* fallback for older browsers */
      const el = document.createElement('textarea')
      el.value = value
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 5000)
    }
  }, [value])

  return (
    <div className={styles.copyRow}>
      <span className={styles.copyIcon}>{icon}</span>
      <span className={styles.copyValue}>{display}</span>
      <button
        className={`${styles.copyBtn} ${copied ? styles.copyDone : ''}`}
        onClick={copy}
        aria-label={copied ? 'Copied!' : `Copy ${display}`}
        title={copied ? 'Copied!' : 'Copy'}
      >
        {copied
          ? /* green tick */
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          : /* copy icon */
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <rect x="9" y="9" width="13" height="13" rx="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
        }
      </button>
    </div>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer} id="contact" aria-label="Contact and footer">

      {/* ── Contact block ── */}
      <div className={styles.contact}>
        <p className={styles.contactEyebrow}>Let's work together</p>
        <h2 className={styles.contactHeading}>Say hello</h2>

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
