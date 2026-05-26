import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import styles from './DesignProcess.module.css'

const EXPO = [0.16, 1, 0.3, 1]

/* 6 stages — odd indices (0,2,4) sit ABOVE the wave; even indices (1,3,5) sit BELOW */
const STAGES = [
  { num: '01', name: 'Ideate',  desc: 'How Might We? Sticky notes, wild ideas, zero judgement.',  emoji: '💡', color: '#FFD166', above: true  },
  { num: '02', name: 'Sketch',  desc: 'Pen on paper. Low-fi wireframes and quick flows.',          emoji: '✏️', color: '#06D6A0', above: false },
  { num: '03', name: 'Inspo',   desc: 'Pattern libraries, real products — knowing what exists.',   emoji: '🌐', color: '#118AB2', above: true  },
  { num: '04', name: 'AI Make', desc: 'Using AI to accelerate iterations and explore at scale.',   emoji: '✦',  color: '#EA5DB4', above: false },
  { num: '05', name: 'High Fi', desc: 'Figma in full detail. Every pixel considered.',            emoji: '🎨', color: '#EF476F', above: true  },
  { num: '06', name: 'Code',    desc: 'From design to shipped product. Because it must work.',     emoji: '⌨️', color: '#A8DADC', above: false },
]

/* SVG wave path — 3 full periods for 6 stage dots
   Peaks (y=14) at x=100,500,900  → stages 0,2,4 (above)
   Troughs (y=106) at x=300,700,1100 → stages 1,3,5 (below)
   viewBox: 0 0 1200 120           */
const WAVE = `
  M 0,60
  C 25,60 75,14 100,14
  C 125,14 175,60 200,60
  C 225,60 275,106 300,106
  C 325,106 375,60 400,60
  C 425,60 475,14 500,14
  C 525,14 575,60 600,60
  C 625,60 675,106 700,106
  C 725,106 775,60 800,60
  C 825,60 875,14 900,14
  C 925,14 975,60 1000,60
  C 1025,60 1075,106 1100,106
  C 1125,106 1175,60 1200,60
`.trim()

/* x,y of each stage dot in the 0-1200 coordinate system */
const DOT_POSITIONS = [
  [100, 14],
  [300, 106],
  [500, 14],
  [700, 106],
  [900, 14],
  [1100, 106],
]

function StageCard({ stage, delay, inView, shouldReduce }) {
  return (
    <motion.div
      className={`${styles.stageCard} ${stage.above ? styles.above : styles.below}`}
      initial={shouldReduce ? false : { opacity: 0, y: stage.above ? 24 : -24 }}
      animate={inView || shouldReduce ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: EXPO, delay }}
    >
      <div className={styles.cardInner}>
        <div className={styles.cardTop}>
          <span className={styles.stageNum} style={{ color: stage.color }}>{stage.num}</span>
          <span className={styles.stageEmoji}>{stage.emoji}</span>
        </div>
        <h3 className={styles.stageName} style={{ color: stage.color }}>{stage.name}</h3>
        <p className={styles.stageDesc}>{stage.desc}</p>
      </div>
      {/* Connector line from card to wave dot */}
      <div
        className={stage.above ? styles.connectorDown : styles.connectorUp}
        style={{ borderColor: stage.color }}
      />
    </motion.div>
  )
}

export default function DesignProcess() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })
  const shouldReduce = useReducedMotion()

  return (
    <section ref={ref} className={styles.section} id="process" aria-label="Design process">

      {/* Header */}
      <div className={styles.header}>
        <motion.p
          className={styles.eyebrow}
          initial={shouldReduce ? false : { opacity: 0, y: 16 }}
          animate={inView || shouldReduce ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EXPO }}
        >
          How I work
        </motion.p>
        <motion.h2
          className={styles.heading}
          initial={shouldReduce ? false : { opacity: 0, y: 24 }}
          animate={inView || shouldReduce ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EXPO, delay: 0.08 }}
        >
          The Process
        </motion.h2>
      </div>

      {/* Wavy timeline — desktop only (> 900px) */}
      <div className={styles.processWrap}>

        {/* TOP ROW — stages that sit above the wave (indices 0,2,4) */}
        <div className={styles.topRow}>
          {STAGES.map((stage, i) =>
            stage.above ? (
              <StageCard key={stage.num} stage={stage}
                delay={0.1 + i * 0.08} inView={inView} shouldReduce={shouldReduce} />
            ) : (
              <div key={stage.num} className={styles.emptySlot} />
            )
          )}
        </div>

        {/* WAVE SVG */}
        <div className={styles.waveWrap}>
          <motion.svg
            className={styles.waveSvg}
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            aria-hidden="true"
            initial={shouldReduce ? false : { opacity: 0 }}
            animate={inView || shouldReduce ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: EXPO, delay: 0.2 }}
          >
            {/* Wave path */}
            <motion.path
              d={WAVE}
              fill="none"
              className={styles.wavePath}
              initial={shouldReduce ? false : { pathLength: 0 }}
              animate={inView || shouldReduce ? { pathLength: 1 } : {}}
              transition={{ duration: 1.8, ease: EXPO, delay: 0.3 }}
            />

            {/* Stage dots on the wave */}
            {STAGES.map((stage, i) => (
              <motion.circle
                key={stage.num}
                cx={DOT_POSITIONS[i][0]}
                cy={DOT_POSITIONS[i][1]}
                r={10}
                fill={stage.color}
                initial={shouldReduce ? false : { scale: 0, opacity: 0 }}
                animate={inView || shouldReduce ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.4, ease: EXPO, delay: 0.5 + i * 0.1 }}
                style={{ transformOrigin: `${DOT_POSITIONS[i][0]}px ${DOT_POSITIONS[i][1]}px` }}
              />
            ))}
          </motion.svg>
        </div>

        {/* BOTTOM ROW — stages that sit below the wave (indices 1,3,5) */}
        <div className={styles.bottomRow}>
          {STAGES.map((stage, i) =>
            !stage.above ? (
              <StageCard key={stage.num} stage={stage}
                delay={0.12 + i * 0.08} inView={inView} shouldReduce={shouldReduce} />
            ) : (
              <div key={stage.num} className={styles.emptySlot} />
            )
          )}
        </div>

      </div>

      {/* Mobile grid — sequential 01–06, shown only below 900px */}
      <div className={styles.mobileGrid}>
        {STAGES.map((stage, i) => (
          <StageCard key={`m-${stage.num}`} stage={stage}
            delay={0.1 + i * 0.08} inView={inView} shouldReduce={shouldReduce} />
        ))}
      </div>
    </section>
  )
}
