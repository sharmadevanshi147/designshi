import { motion } from 'framer-motion'
import styles from './Footer.module.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer} id="contact" aria-label="Footer and contact">

      {/* ── Big CTA ── */}
      <div className={styles.cta}>
        <p className={styles.ctaEyebrow}>Got a project? Let's talk.</p>
        <h2 className={styles.ctaHeading}>
          Say{' '}
          <span className={styles.ctaAccent}>hello</span>
          {' '}✉︎
        </h2>
        <a
          href="mailto:devanshisharma3574@gmail.com"
          className={styles.ctaBtn}
        >
          devanshisharma3574@gmail.com
        </a>
      </div>

      <div className={styles.divider} />

      {/* ── Bottom row ── */}
      <div className={styles.bottom}>
        <div className={styles.brand}>
          <span className={styles.brandName}>Devanshi Sharma</span>
          <span className={styles.brandSub}>Product Designer · Healthcare UX</span>
        </div>

        <p className={styles.note}>
          designed with obsessive care —{' '}
          <em>somewhere between a deadline and a dream ✦</em>
        </p>

        <div className={styles.socials}>
          {[
            { label: 'LinkedIn', href: 'https://linkedin.com/in/devanshi-sharma-746470213', icon: 'in' },
            { label: 'Instagram', href: 'https://instagram.com', icon: '✦' },
            { label: '+91 7838997914', href: 'tel:+917838997914', icon: '☎' },
          ].map(({ label, href, icon }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              className={styles.socialLink} aria-label={label}>
              <span className={styles.socialIcon}>{icon}</span>
              <span className={styles.socialLabel}>{label}</span>
            </a>
          ))}
        </div>
      </div>

      <div className={styles.copyright}>
        <p>© {year} Devanshi Sharma. Crafted with heart (and way too much coffee).</p>
        <p className={styles.location}>Pune, India 📍</p>
      </div>

    </footer>
  )
}
