import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import * as THREE from 'three'
import styles from './BriefToExperience.module.css'

const EXPO = [0.16, 1, 0.3, 1]

/* ── Scribble paths drawn on the napkin ── */
const SCRIBBLES = [
  'M 20 60 Q 80 40 140 65 Q 200 90 250 55',
  'M 30 90 L 220 90',
  'M 60 115 L 190 115',
  'M 40 140 Q 100 130 160 145 L 230 135',
  'M 70 165 L 200 165',
  /* quick sketch box */
  'M 80 185 L 80 230 L 200 230 L 200 185 Z',
  /* mobile outline inside */
  'M 155 190 L 155 225 L 195 225 L 195 190 Z',
]

function NapkinCanvas({ phase }) {
  const canvasRef = useRef(null)
  const rendererRef = useRef(null)
  const sceneRef    = useRef(null)
  const napkinRef   = useRef(null)
  const frameRef    = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    /* ── Scene setup ── */
    const w = canvas.clientWidth || 600
    const h = canvas.clientHeight || 420
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(w, h, false)
    rendererRef.current = renderer

    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100)
    camera.position.set(0, 0, 4)

    /* ── Lighting ── */
    scene.add(new THREE.AmbientLight(0xffffff, 0.7))
    const dir = new THREE.DirectionalLight(0xffffff, 0.9)
    dir.position.set(2, 4, 3)
    scene.add(dir)

    /* ── Napkin mesh ── */
    const napkinGeo = new THREE.PlaneGeometry(3.2, 2.4, 12, 8)
    /* slight cloth waviness */
    const pos = napkinGeo.attributes.position
    for (let i = 0; i < pos.count; i++) {
      pos.setZ(i, (Math.random() - 0.5) * 0.06)
    }
    napkinGeo.computeVertexNormals()

    const napkinMat = new THREE.MeshStandardMaterial({
      color: 0xFFFEF0,
      side: THREE.DoubleSide,
      roughness: 0.85,
    })
    const napkin = new THREE.Mesh(napkinGeo, napkinMat)
    scene.add(napkin)
    napkinRef.current = napkin

    /* ── Monitor mesh (hidden initially) ── */
    const monitorGroup = new THREE.Group()

    /* Screen */
    const screenGeo = new THREE.BoxGeometry(3.0, 2.0, 0.08)
    const screenMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.4 })
    const screen = new THREE.Mesh(screenGeo, screenMat)
    monitorGroup.add(screen)

    /* Screen bezel inner */
    const displayGeo = new THREE.PlaneGeometry(2.7, 1.75)
    const displayMat = new THREE.MeshStandardMaterial({ color: 0x0d1117, roughness: 0.2 })
    const display = new THREE.Mesh(displayGeo, displayMat)
    display.position.z = 0.045
    monitorGroup.add(display)

    /* Stand */
    const standGeo = new THREE.BoxGeometry(0.15, 0.5, 0.08)
    const standMat = new THREE.MeshStandardMaterial({ color: 0x333333 })
    const stand = new THREE.Mesh(standGeo, standMat)
    stand.position.y = -1.25
    monitorGroup.add(stand)

    /* Base */
    const baseGeo = new THREE.BoxGeometry(0.8, 0.08, 0.3)
    const base = new THREE.Mesh(baseGeo, standMat)
    base.position.y = -1.5
    monitorGroup.add(base)

    /* Mobile screen (small, inside monitor frame area) */
    const mobileGeo = new THREE.BoxGeometry(0.55, 0.95, 0.06)
    const mobileMat = new THREE.MeshStandardMaterial({ color: 0x111111 })
    const mobile = new THREE.Mesh(mobileGeo, mobileMat)
    mobile.position.set(1.55, -0.35, 0.1)
    monitorGroup.add(mobile)

    monitorGroup.scale.set(0.001, 0.001, 0.001)
    monitorGroup.visible = false
    scene.add(monitorGroup)

    /* ── Animation loop ── */
    let t = 0
    function animate() {
      frameRef.current = requestAnimationFrame(animate)
      t += 0.012

      /* gentle float */
      if (napkin.visible) {
        napkin.rotation.x = Math.sin(t * 0.5) * 0.06
        napkin.rotation.y = Math.sin(t * 0.3) * 0.08
      }
      if (monitorGroup.visible) {
        monitorGroup.rotation.y = Math.sin(t * 0.4) * 0.05
      }

      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      const nw = canvas.clientWidth
      const nh = canvas.clientHeight
      camera.aspect = nw / nh
      camera.updateProjectionMatrix()
      renderer.setSize(nw, nh, false)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
    }
  }, [])

  /* ── Phase transitions ── */
  useEffect(() => {
    const napkin   = napkinRef.current
    const renderer = rendererRef.current
    const scene    = sceneRef.current
    if (!napkin || !renderer || !scene) return

    const monitorGroup = scene.children.find(c => c.isGroup)

    if (phase === 'napkin') {
      napkin.visible = true
      if (monitorGroup) monitorGroup.visible = false
    }

    if (phase === 'transform') {
      /* rotate napkin out */
      let progress = 0
      const spin = setInterval(() => {
        progress += 0.04
        if (napkin) {
          napkin.rotation.y += 0.12
          napkin.scale.setScalar(Math.max(0, 1 - progress))
        }
        if (progress >= 1) {
          clearInterval(spin)
          if (napkin) napkin.visible = false
          if (monitorGroup) {
            monitorGroup.visible = true
            monitorGroup.scale.set(0.001, 0.001, 0.001)
            let grow = 0
            const growInterval = setInterval(() => {
              grow += 0.06
              const s = Math.min(1, grow)
              monitorGroup.scale.setScalar(s)
              if (grow >= 1) clearInterval(growInterval)
            }, 16)
          }
        }
      }, 16)
    }
  }, [phase])

  return <canvas ref={canvasRef} className={styles.canvas} />
}

export default function BriefToExperience() {
  const shouldReduce = useReducedMotion()
  const sectionRef   = useRef(null)
  const [phase, setPhase] = useState('idle') // idle → napkin → scribble → transform → reveal

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setPhase('napkin') },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (phase === 'napkin') {
      const t1 = setTimeout(() => setPhase('scribble'),  600)
      const t2 = setTimeout(() => setPhase('transform'), 3200)
      const t3 = setTimeout(() => setPhase('reveal'),    4800)
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
    }
  }, [phase])

  const showScribbles = phase === 'scribble' || phase === 'transform'
  const showMonitor   = phase === 'transform' || phase === 'reveal'
  const showTitle     = phase === 'reveal'

  return (
    <section ref={sectionRef} className={styles.section} aria-label="Turning briefs to experiences">

      <div className={styles.canvasWrap}>
        {phase !== 'idle' && (
          <NapkinCanvas phase={showMonitor ? 'transform' : 'napkin'} />
        )}

        {/* SVG scribbles overlay on napkin */}
        <AnimatePresence>
          {showScribbles && !showMonitor && (
            <motion.div
              className={styles.scribbleOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
            >
              <svg viewBox="0 0 280 260" className={styles.scribbleSvg} aria-hidden="true">
                {SCRIBBLES.map((d, i) => (
                  <motion.path
                    key={i}
                    d={d}
                    stroke="#333"
                    strokeWidth="1.8"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.7 }}
                    transition={{ duration: 0.5, delay: i * 0.25, ease: 'easeOut' }}
                  />
                ))}
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Reveal text */}
      <AnimatePresence>
        {showTitle && (
          <motion.div
            className={styles.reveal}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EXPO }}
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
