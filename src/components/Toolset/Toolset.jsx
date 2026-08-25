import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import styles from './Toolset.module.css'

const EXPO = [0.16, 1, 0.3, 1]

/* ── Tool definitions ── */
const TOOLS = [
  {
    name: 'Figma',
    color: '#A259FF',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <path d="M8 24c2.2 0 4-1.8 4-4v-4H8c-2.2 0-4 1.8-4 4s1.8 4 4 4z" fill="#0ACF83"/>
        <path d="M4 12c0-2.2 1.8-4 4-4h4v8H8c-2.2 0-4-1.8-4-4z" fill="#A259FF"/>
        <path d="M4 4c0-2.2 1.8-4 4-4h4v8H8C5.8 8 4 6.2 4 4z" fill="#F24E1E"/>
        <path d="M12 0h4c2.2 0 4 1.8 4 4s-1.8 4-4 4h-4V0z" fill="#FF7262"/>
        <path d="M20 12c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4 4 1.8 4 4z" fill="#1ABCFE"/>
      </svg>
    ),
  },
  {
    name: 'Claude Code',
    color: '#D97706',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="3" width="20" height="18" rx="3" fill="#1a1a1a" stroke="#D97706" strokeWidth="1.5"/>
        <path d="M7 8l3 4-3 4" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13 16h4" stroke="#D97706" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: 'Pen & Paper',
    color: '#5B8C5A',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="2" width="16" height="20" rx="2" fill="#F5F0E0" stroke="#5B8C5A" strokeWidth="1.2"/>
        <line x1="7" y1="7" x2="17" y2="7" stroke="#5B8C5A" strokeWidth="1" opacity="0.5"/>
        <line x1="7" y1="10" x2="17" y2="10" stroke="#5B8C5A" strokeWidth="1" opacity="0.5"/>
        <line x1="7" y1="13" x2="13" y2="13" stroke="#5B8C5A" strokeWidth="1" opacity="0.5"/>
        <path d="M16 22l4-4-2-2-4 4v2h2z" fill="#5B8C5A"/>
        <path d="M18 16l2 2" stroke="#5B8C5A" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: 'Antigravity',
    color: '#EA5DB4',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#EA5DB4" strokeWidth="1.5"/>
        <path d="M8 16l4-10 4 10" stroke="#EA5DB4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9.5 13h5" stroke="#EA5DB4" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: 'Gemini',
    color: '#4285F4',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C12 2 14 7 18 8C14 9 12 14 12 14C12 14 10 9 6 8C10 7 12 2 12 2Z" fill="#4285F4"/>
        <path d="M12 14C12 14 13.5 17 16 18C13.5 19 12 22 12 22C12 22 10.5 19 8 18C10.5 17 12 14 12 14Z" fill="#4285F4" opacity="0.7"/>
      </svg>
    ),
  },
  {
    name: 'Miro',
    color: '#FFD02F',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <path d="M4 3h3.5l4 7.5L15.5 3H19l-6 11v7h-2v-7L4 3z" fill="#FFD02F"/>
        <path d="M17 3h3l-5.5 10.5L17 3z" fill="#FFD02F" opacity="0.7"/>
      </svg>
    ),
  },
  {
    name: 'FigJam',
    color: '#F24E1E',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="4" fill="#F24E1E" opacity="0.15"/>
        <rect x="3" y="3" width="18" height="18" rx="4" stroke="#F24E1E" strokeWidth="1.5"/>
        <circle cx="9" cy="10" r="2" fill="#F24E1E"/>
        <circle cx="15" cy="10" r="2" fill="#F24E1E"/>
        <path d="M8 15c0 0 2 2.5 4 2.5s4-2.5 4-2.5" stroke="#F24E1E" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
]

/* Position offsets for tool cards floating out */
const FLOAT_POSITIONS = [
  { x: -220, y: -160 },
  { x: 0,    y: -180 },
  { x: 220,  y: -160 },
  { x: -300, y: -60  },
  { x: -110, y: -80  },
  { x: 110,  y: -80  },
  { x: 300,  y: -60  },
]

export default function Toolset() {
  const sectionRef = useRef(null)
  const shouldReduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  /* Briefcase starts flat (90°) → upright (25°) → lid opens (-80°) */
  const caseRotateX = useTransform(scrollYProgress, [0.05, 0.25, 0.35], [75, 25, 25])
  const lidRotate = useTransform(scrollYProgress, [0.25, 0.50], [0, -120])
  const caseScale = useTransform(scrollYProgress, [0.05, 0.25], [0.85, 1])

  /* Icon emergence: staggered per tool */
  const iconProgressArr = TOOLS.map((_, i) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTransform(scrollYProgress, [0.35 + i * 0.03, 0.55 + i * 0.03], [0, 1])
  )

  /* Inner glow */
  const glowOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 0.8])

  return (
    <section ref={sectionRef} className={styles.section} id="toolset" aria-label="Toolset">

      {/* Header */}
      <div className={styles.header}>
        <motion.h2
          className={styles.heading}
          initial={shouldReduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, ease: EXPO, delay: 0.08 }}
        >
          My Toolset
        </motion.h2>
      </div>

      {/* 3D Scene */}
      <div className={styles.scene}>

        {/* Floating tool icons — emerge from briefcase */}
        <div className={styles.toolOrbit}>
          {TOOLS.map((tool, i) => (
            <motion.div
              key={tool.name}
              className={styles.toolCard}
              style={{
                '--tool-color': tool.color,
                '--glow': `0 0 24px ${tool.color}44, 0 0 48px ${tool.color}22`,
                opacity: shouldReduce ? 1 : iconProgressArr[i],
                x: shouldReduce ? FLOAT_POSITIONS[i].x : useTransform(iconProgressArr[i], [0, 1], [0, FLOAT_POSITIONS[i].x]),
                y: shouldReduce ? FLOAT_POSITIONS[i].y : useTransform(iconProgressArr[i], [0, 1], [60, FLOAT_POSITIONS[i].y]),
                scale: shouldReduce ? 1 : useTransform(iconProgressArr[i], [0, 1], [0.3, 1]),
              }}
            >
              <div className={styles.toolIcon}>
                {tool.icon}
              </div>
              <span className={styles.toolName}>{tool.name}</span>
            </motion.div>
          ))}
        </div>

        {/* Briefcase */}
        <motion.div
          className={styles.briefcaseWrap}
          style={{
            rotateX: shouldReduce ? 25 : caseRotateX,
            scale: shouldReduce ? 1 : caseScale,
          }}
        >
          {/* Lid */}
          <motion.div
            className={styles.lid}
            style={{ rotateX: shouldReduce ? -120 : lidRotate }}
          >
            <div className={styles.lidOuter}>
              {/* Handle on lid */}
              <div className={styles.handle} />
              {/* Clasps */}
              <div className={styles.claspRow}>
                <div className={styles.clasp} />
                <div className={styles.clasp} />
              </div>
            </div>
            <div className={styles.lidInner} />
          </motion.div>

          {/* Base */}
          <div className={styles.base}>
            <div className={styles.baseInner}>
              {/* Inner glow */}
              <motion.div
                className={styles.innerGlow}
                style={{ opacity: shouldReduce ? 0.6 : glowOpacity }}
              />
              {/* Tool silhouettes inside */}
              <div className={styles.innerTools}>
                {TOOLS.map((tool) => (
                  <div key={tool.name} className={styles.innerSlot}>
                    <div className={styles.innerSlotIcon} style={{ color: tool.color }}>
                      {tool.icon}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.baseOuter} />
          </div>
        </motion.div>

      </div>
    </section>
  )
}
