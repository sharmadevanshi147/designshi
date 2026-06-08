import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import styles from './BriefToExperience.module.css'

const EXPO = [0.16, 1, 0.3, 1]

/* ─────────────────────────────────────────
   Sketch wireframe drawn on the napkin
   Uses SVG pathLength animation for draw-in
───────────────────────────────────────── */
const SKETCH_PATHS = [
  /* nav bar */
  { d: 'M20,22 L500,22 L500,52 L20,52 Z', delay: 0.0, stroke: '#1E3A5F', w: 1.5 },
  /* nav dots */
  { d: 'M40,37 m-5,0 a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0', delay: 0.15, stroke: '#1E3A5F', w: 1.5 },
  { d: 'M60,37 m-5,0 a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0', delay: 0.2, stroke: '#1E3A5F', w: 1.5 },
  { d: 'M80,37 m-5,0 a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0', delay: 0.25, stroke: '#1E3A5F', w: 1.5 },
  /* page title block */
  { d: 'M20,72 L310,72 L310,108 L20,108 Z', delay: 0.35, stroke: '#1E3A5F', w: 2 },
  { d: 'M20,118 L200,118 L200,132 L20,132 Z', delay: 0.45, stroke: '#1E3A5F', w: 1 },
  /* 4 stat cards */
  { d: 'M20,150 L138,150 L138,210 L20,210 Z', delay: 0.55, stroke: '#1E3A5F', w: 1.5 },
  { d: 'M146,150 L264,150 L264,210 L146,210 Z', delay: 0.62, stroke: '#1E3A5F', w: 1.5 },
  { d: 'M272,150 L390,150 L390,210 L272,210 Z', delay: 0.69, stroke: '#1E3A5F', w: 1.5 },
  { d: 'M398,150 L500,150 L500,210 L398,210 Z', delay: 0.76, stroke: '#1E3A5F', w: 1.5 },
  /* main chart area */
  { d: 'M20,222 L330,222 L330,318 L20,318 Z', delay: 0.88, stroke: '#1E3A5F', w: 1.5 },
  /* chart line inside */
  { d: 'M36,300 Q80,270 120,282 Q160,294 200,258 Q240,222 270,240 L310,232', delay: 1.05, stroke: '#EA5DB4', w: 2 },
  /* sidebar / patient list */
  { d: 'M342,222 L500,222 L500,318 L342,318 Z', delay: 0.92, stroke: '#1E3A5F', w: 1.5 },
  { d: 'M356,248 L486,248', delay: 1.08, stroke: '#1E3A5F', w: 1, dash: '6 4' },
  { d: 'M356,270 L486,270', delay: 1.12, stroke: '#1E3A5F', w: 1, dash: '6 4' },
  { d: 'M356,292 L486,292', delay: 1.16, stroke: '#1E3A5F', w: 1, dash: '6 4' },
  /* arrow annotation */
  { d: 'M220,185 L220,218', delay: 1.25, stroke: '#EA5DB4', w: 1.5 },
  { d: 'M213,212 L220,222 L227,212', delay: 1.32, stroke: '#EA5DB4', w: 1.5 },
  /* mobile device outline */
  { d: 'M420,248 L472,248 L472,310 L420,310 Z', delay: 1.38, stroke: '#1E3A5F', w: 1.5, rx: 8 },
  { d: 'M440,254 L452,254', delay: 1.46, stroke: '#1E3A5F', w: 2 },
]

function NapkinSketch({ drawing }) {
  return (
    <svg
      viewBox="0 0 520 340"
      className={styles.sketchSvg}
      aria-hidden="true"
    >
      {/* ruled lines */}
      {[28,56,84,112,140,168,196,224,252,280,308,336].map(y => (
        <line key={y} x1="0" y1={y} x2="520" y2={y}
          stroke="rgba(30,58,95,0.07)" strokeWidth="1" />
      ))}

      {/* sketch paths */}
      {drawing && SKETCH_PATHS.map((p, i) => (
        <motion.path
          key={i}
          d={p.d}
          stroke={p.stroke}
          strokeWidth={p.w}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={p.dash}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: p.delay, ease: 'easeOut' }}
        />
      ))}

      {/* annotation labels — appear after lines */}
      {drawing && (
        <>
          <motion.text x="26" y="96" fontFamily="Georgia" fontSize="11"
            fill="rgba(30,58,95,0.5)" fontStyle="italic"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}>
            hero / title
          </motion.text>
          <motion.text x="26" y="202" fontFamily="Georgia" fontSize="10"
            fill="rgba(30,58,95,0.45)" fontStyle="italic"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.88 }}>
            stat cards
          </motion.text>
          <motion.text x="26" y="310" fontFamily="Georgia" fontSize="10"
            fill="rgba(234,93,180,0.7)" fontStyle="italic"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}>
            data viz ↑
          </motion.text>
          <motion.text x="348" y="238" fontFamily="Georgia" fontSize="9"
            fill="rgba(30,58,95,0.45)" fontStyle="italic"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}>
            patient list
          </motion.text>
          <motion.text x="420" y="324" fontFamily="Georgia" fontSize="9"
            fill="rgba(30,58,95,0.4)" fontStyle="italic"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}>
            mobile
          </motion.text>
        </>
      )}
    </svg>
  )
}

/* ─────────────────────────────────────────
   Skeleton block helpers
───────────────────────────────────────── */
function Sk({ w = '100%', h = 12, r = 6, accent = false, delay = 0 }) {
  return (
    <motion.div
      className={`${styles.sk} ${accent ? styles.skAccent : ''}`}
      style={{ width: w, height: h, borderRadius: r }}
      initial={{ opacity: 0, scaleX: 0.4 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.5, delay, ease: EXPO }}
    />
  )
}

/* ─────────────────────────────────────────
   Monitor mockup with skeleton UI
───────────────────────────────────────── */
function MonitorMockup() {
  return (
    <div className={styles.monitorWrap}>
      <div className={styles.monitorFrame}>
        {/* top bar */}
        <div className={styles.monitorBar}>
          <div className={styles.trafficLights}>
            <span className={styles.tlRed}/>
            <span className={styles.tlYellow}/>
            <span className={styles.tlGreen}/>
          </div>
          <div className={styles.urlBar}/>
        </div>

        {/* screen: sidebar + main */}
        <div className={styles.screenLayout}>

          {/* sidebar */}
          <div className={styles.sidebar}>
            <div className={styles.sidebarLogo}>
              <Sk w={28} h={28} r={8} accent delay={0.1} />
              <Sk w={64} h={10} r={4} delay={0.15} />
            </div>
            {[0.2, 0.25, 0.3, 0.35, 0.4, 0.45].map((d, i) => (
              <div key={i} className={styles.sidebarRow}>
                <Sk w={14} h={14} r={4} delay={d} />
                <Sk w={i === 0 ? 72 : [60, 80, 68, 72, 56][i - 1]} h={10} r={4} delay={d + 0.03} />
              </div>
            ))}
            <div className={styles.sidebarDivider} />
            {[0.55, 0.6].map((d, i) => (
              <div key={i} className={styles.sidebarRow}>
                <Sk w={14} h={14} r={4} delay={d} />
                <Sk w={[64, 52][i]} h={10} r={4} delay={d + 0.03} />
              </div>
            ))}
          </div>

          {/* main content */}
          <div className={styles.mainContent}>
            {/* page header */}
            <div className={styles.pageHeader}>
              <div>
                <Sk w={160} h={14} r={5} delay={0.2} />
                <div style={{ marginTop: 6 }}><Sk w={240} h={9} r={4} delay={0.26} /></div>
              </div>
              <Sk w={96} h={32} r={16} accent delay={0.3} />
            </div>

            {/* stat cards */}
            <div className={styles.statCards}>
              {[
                { accent: true, d: 0.35 },
                { accent: false, d: 0.4 },
                { accent: false, d: 0.45 },
                { accent: false, d: 0.5 },
              ].map((c, i) => (
                <div key={i} className={`${styles.statCard} ${c.accent ? styles.statCardAccent : ''}`}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                    <Sk w={24} h={24} r={8} accent={c.accent} delay={c.d} />
                    <Sk w={40} h={10} r={4} delay={c.d + 0.04} />
                  </div>
                  <Sk w={72} h={20} r={5} accent={c.accent} delay={c.d + 0.08} />
                  <div style={{ marginTop: 8 }}><Sk w={56} h={8} r={3} delay={c.d + 0.12} /></div>
                </div>
              ))}
            </div>

            {/* chart + list row */}
            <div className={styles.chartRow}>
              {/* chart panel */}
              <div className={styles.chartPanel}>
                <div className={styles.chartHeader}>
                  <Sk w={140} h={11} r={4} delay={0.55} />
                  <Sk w={64} h={24} r={12} delay={0.58} />
                </div>
                {/* skeleton chart bars */}
                <div className={styles.chartBars}>
                  {[65, 82, 54, 90, 71, 88, 60].map((h, i) => (
                    <motion.div
                      key={i}
                      className={styles.chartBar}
                      style={{ height: `${h}%` }}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.5, delay: 0.6 + i * 0.06, ease: EXPO }}
                    />
                  ))}
                </div>
              </div>

              {/* list panel */}
              <div className={styles.listPanel}>
                <Sk w={110} h={11} r={4} delay={0.55} />
                <div className={styles.listRows}>
                  {[0.62, 0.67, 0.72, 0.77, 0.82].map((d, i) => (
                    <div key={i} className={styles.listRow}>
                      <Sk w={32} h={32} r={16} accent={i === 0} delay={d} />
                      <div className={styles.listRowText}>
                        <Sk w={88} h={10} r={4} delay={d + 0.04} />
                        <Sk w={60} h={8} r={3} delay={d + 0.08} />
                      </div>
                      <Sk w={48} h={20} r={10} delay={d + 0.06} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* monitor stand */}
      <div className={styles.stand}>
        <div className={styles.standNeck} />
        <div className={styles.standBase} />
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   Section
───────────────────────────────────────── */
export default function BriefToExperience() {
  const shouldReduce = useReducedMotion()
  const sectionRef   = useRef(null)
  const timersRef    = useRef([])
  const [phase, setPhase] = useState('idle')

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      obs.disconnect() // fire once only

      /* Set the entire timeline up-front.
         Never depends on phase, so cleanup never cancels mid-run. */
      setPhase('sketch')
      timersRef.current = [
        setTimeout(() => setPhase('flip'),    2200),
        setTimeout(() => setPhase('monitor'), 2900),
        setTimeout(() => setPhase('reveal'),  4400),
      ]
    }, { threshold: 0.15 })

    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => {
      obs.disconnect()
      timersRef.current.forEach(clearTimeout)
    }
  }, []) // runs once — no phase dependency

  return (
    <section ref={sectionRef} className={styles.section} aria-label="Turning briefs to experiences">

      {/* ambient glow */}
      <div className={styles.glow} aria-hidden="true" />

      {/* ── Central animation ── */}
      <div className={styles.stage}>
        <AnimatePresence mode="wait">

          {(phase === 'sketch' || phase === 'flip') && (
            <motion.div
              key="napkin"
              className={styles.napkin}
              initial={shouldReduce ? false : { opacity: 0, y: 32, rotate: -2 }}
              animate={{ opacity: 1, y: 0, rotate: -2 }}
              exit={{ opacity: 0, rotateY: 90, scale: 0.88, transition: { duration: 0.45, ease: [0.4,0,1,1] } }}
              transition={{ duration: 0.7, ease: EXPO }}
            >
              {/* paper lines + corner fold */}
              <div className={styles.napkinInner}>
                <NapkinSketch drawing={phase === 'sketch' || phase === 'flip'} />
              </div>
              {/* corner fold */}
              <div className={styles.cornerFold} aria-hidden="true" />
              <div className={styles.napkinLabel}>Brief sketch</div>
            </motion.div>
          )}

          {(phase === 'monitor' || phase === 'reveal') && (
            <motion.div
              key="monitor"
              initial={shouldReduce ? false : { opacity: 0, rotateY: -90, scale: 0.88 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: EXPO }}
              style={{ perspective: 1200 }}
            >
              <MonitorMockup />
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* ── Text reveal ── */}
      <AnimatePresence>
        {phase === 'reveal' && (
          <motion.div
            className={styles.reveal}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EXPO, delay: 0.2 }}
          >
            <p className={styles.eyebrow}>What We Build Together</p>
            <h2 className={styles.heading}>Turning Briefs to Experiences</h2>
            <p className={styles.sub}>Drop a message to work with me</p>
            <a href="mailto:devanshisharma3574@gmail.com" className={styles.cta}>
              Drop Mail ✉︎
            </a>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  )
}
