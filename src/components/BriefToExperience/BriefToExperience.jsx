import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'
import styles from './BriefToExperience.module.css'

const EXPO = [0.16, 1, 0.3, 1]

/* ─────────────────────────────────────────
   Draw the napkin texture canvas
   Returns a live <canvas> element that can
   be used as a THREE.CanvasTexture source.
───────────────────────────────────────── */
function createNapkinCanvas() {
  const SIZE = 1024
  const c = document.createElement('canvas')
  c.width = SIZE; c.height = SIZE
  const ctx = c.getContext('2d')

  /* paper base */
  ctx.fillStyle = '#FFFEF5'
  ctx.fillRect(0, 0, SIZE, SIZE)

  /* subtle linen texture */
  for (let i = 0; i < 6000; i++) {
    const x = Math.random() * SIZE
    const y = Math.random() * SIZE
    ctx.strokeStyle = `rgba(180,170,150,${0.04 + Math.random() * 0.04})`
    ctx.lineWidth = 0.5
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + (Math.random() - 0.5) * 8, y + (Math.random() - 0.5) * 8)
    ctx.stroke()
  }

  /* crease lines */
  ctx.strokeStyle = 'rgba(160,150,130,0.18)'
  ctx.lineWidth = 2
  ctx.setLineDash([])
  ;[[0, 340, SIZE, 340], [330, 0, 330, SIZE], [0, 680, SIZE, 680]].forEach(([x1,y1,x2,y2]) => {
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke()
  })
  ctx.setLineDash([])

  return c
}

/* ─────────────────────────────────────────
   Draw sketch strokes onto the napkin canvas
   progress: 0..1
───────────────────────────────────────── */
const STROKES = [
  /* ── rough wireframe of a healthcare dashboard ── */
  // Top nav bar outline
  (ctx, p) => { if (p < 0.05) return; ctx.strokeStyle='rgba(40,60,100,0.75)'; ctx.lineWidth=3; sketchRect(ctx, 100,80, 820,65, 6) },
  // Nav dots
  (ctx, p) => { if (p < 0.09) return; [130,160,190].forEach(x => sketchCircle(ctx, x, 113, 12, 'rgba(40,60,100,0.6)')) },
  // Page title squiggle
  (ctx, p) => { if (p < 0.13) return; sketchWiggleLine(ctx, 100, 190, 560, 190, 'rgba(40,60,100,0.8)', 4) },
  (ctx, p) => { if (p < 0.17) return; sketchWiggleLine(ctx, 100, 220, 380, 220, 'rgba(40,60,100,0.45)', 2.5) },
  // Left main card
  (ctx, p) => { if (p < 0.22) return; ctx.strokeStyle='rgba(40,60,100,0.7)'; ctx.lineWidth=2.5; sketchRect(ctx, 100,260, 500,300, 8) },
  // Inside left card — avatar circle
  (ctx, p) => { if (p < 0.27) return; sketchCircle(ctx, 200, 360, 44, 'rgba(40,60,100,0.5)') },
  // Inside left card — lines
  (ctx, p) => { if (p < 0.31) return; sketchWiggleLine(ctx, 260,330, 540,330,'rgba(40,60,100,0.55)',2) },
  (ctx, p) => { if (p < 0.34) return; sketchWiggleLine(ctx, 260,355, 480,355,'rgba(40,60,100,0.4)',1.5) },
  (ctx, p) => { if (p < 0.37) return; sketchWiggleLine(ctx, 260,380, 520,380,'rgba(40,60,100,0.4)',1.5) },
  // Right stats card
  (ctx, p) => { if (p < 0.42) return; ctx.strokeStyle='rgba(40,60,100,0.7)'; ctx.lineWidth=2.5; sketchRect(ctx, 620,260, 300,300, 8) },
  // Bar chart inside stats card
  (ctx, p) => { if (p < 0.48) return
    const bars = [[640,460,40,80,'rgba(234,93,180,0.7)'],[700,490,40,50,'rgba(234,93,180,0.5)'],[760,430,40,110,'rgba(234,93,180,0.7)'],[820,470,40,70,'rgba(234,93,180,0.55)']]
    bars.forEach(([x,y,w,h,col]) => { ctx.fillStyle=col; ctx.fillRect(x,y,w,-h) })
  },
  // Bottom row cards
  (ctx, p) => { if (p < 0.54) return; ctx.strokeStyle='rgba(40,60,100,0.6)'; ctx.lineWidth=2; sketchRect(ctx, 100,580, 240,120,6) },
  (ctx, p) => { if (p < 0.58) return; sketchRect(ctx, 360,580, 240,120,6) },
  (ctx, p) => { if (p < 0.62) return; sketchRect(ctx, 620,580, 300,120,6) },
  // Annotations
  (ctx, p) => { if (p < 0.68) return; sketchArrow(ctx, 800,180, 820,260,'rgba(234,93,180,0.8)') },
  (ctx, p) => { if (p < 0.72) return
    ctx.fillStyle='rgba(40,60,100,0.65)'; ctx.font='italic 28px Georgia'
    ctx.fillText('Patient', 624,304)
  },
  (ctx, p) => { if (p < 0.76) return
    ctx.fillStyle='rgba(40,60,100,0.5)'; ctx.font='italic 22px Georgia'
    ctx.fillText('mobile?', 110,728)
  },
  // Mobile outline annotation
  (ctx, p) => { if (p < 0.82) return; ctx.strokeStyle='rgba(40,60,100,0.6)'; ctx.lineWidth=2; sketchRect(ctx, 120,740, 110,140,10) },
  (ctx, p) => { if (p < 0.88) return; sketchWiggleLine(ctx, 250,760, 380,720,'rgba(40,60,100,0.4)',1.5) },
  // Final note scrawl
  (ctx, p) => { if (p < 0.94) return
    ctx.fillStyle='rgba(234,93,180,0.8)'; ctx.font='italic bold 26px Georgia'
    ctx.fillText('→ needs UX polish', 400,760)
  },
]

function sketchRect(ctx, x, y, w, h, wobble=4) {
  ctx.beginPath()
  ctx.moveTo(x+wobble, y); ctx.lineTo(x+w-wobble, y)
  ctx.quadraticCurveTo(x+w, y, x+w, y+wobble)
  ctx.lineTo(x+w, y+h-wobble)
  ctx.quadraticCurveTo(x+w, y+h, x+w-wobble, y+h)
  ctx.lineTo(x+wobble, y+h)
  ctx.quadraticCurveTo(x, y+h, x, y+h-wobble)
  ctx.lineTo(x, y+wobble)
  ctx.quadraticCurveTo(x, y, x+wobble, y)
  ctx.stroke()
}

function sketchCircle(ctx, cx, cy, r, color) {
  ctx.strokeStyle = color; ctx.lineWidth = 2.5
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke()
}

function sketchWiggleLine(ctx, x1, y1, x2, y2, color, lw=2) {
  ctx.strokeStyle = color; ctx.lineWidth = lw
  const steps = 6; ctx.beginPath(); ctx.moveTo(x1, y1)
  for (let i = 1; i <= steps; i++) {
    const t = i / steps
    const mx = x1 + (x2 - x1) * t
    const my = y1 + (y2 - y1) * t + (Math.random() - 0.5) * 6
    ctx.lineTo(mx, my)
  }
  ctx.stroke()
}

function sketchArrow(ctx, x1, y1, x2, y2, color) {
  ctx.strokeStyle = color; ctx.lineWidth = 2
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke()
  const angle = Math.atan2(y2 - y1, x2 - x1)
  const hs = 12
  ctx.beginPath()
  ctx.moveTo(x2, y2)
  ctx.lineTo(x2 - hs * Math.cos(angle - 0.4), y2 - hs * Math.sin(angle - 0.4))
  ctx.moveTo(x2, y2)
  ctx.lineTo(x2 - hs * Math.cos(angle + 0.4), y2 - hs * Math.sin(angle + 0.4))
  ctx.stroke()
}

/* ─────────────────────────────────────────
   Draw the monitor screen texture (full UX mockup)
───────────────────────────────────────── */
function createMonitorTexture() {
  const W = 1200, H = 780
  const c = document.createElement('canvas')
  c.width = W; c.height = H
  const ctx = c.getContext('2d')

  /* bg */
  ctx.fillStyle = '#0D1117'; ctx.fillRect(0, 0, W, H)

  /* top navbar */
  ctx.fillStyle = '#161B22'; ctx.fillRect(0, 0, W, 56)
  ctx.fillStyle = '#EA5DB4'
  ctx.font = 'bold 18px Georgia'; ctx.fillText('Fold Health', 28, 35)
  const navItems = ['Dashboard', 'Patients', 'Appointments', 'Reports', 'Settings']
  ctx.font = '14px system-ui'; ctx.fillStyle = 'rgba(200,210,220,0.65)'
  navItems.forEach((n, i) => ctx.fillText(n, 180 + i * 120, 35))
  /* avatar */
  ctx.fillStyle = '#EA5DB4'; ctx.beginPath(); ctx.arc(W - 36, 28, 16, 0, Math.PI * 2); ctx.fill()
  ctx.fillStyle = '#fff'; ctx.font = 'bold 12px system-ui'; ctx.fillText('DS', W - 42, 33)

  /* Hero heading area */
  ctx.fillStyle = 'rgba(255,255,255,0.9)'; ctx.font = 'bold 26px Georgia'
  ctx.fillText('Good morning, Devanshi', 28, 98)
  ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.font = '14px system-ui'
  ctx.fillText('Here\'s what\'s happening with your patients today.', 28, 120)

  /* Stat cards */
  const stats = [
    { label: 'Total Patients', value: '2,847', delta: '+12%', color: '#EA5DB4' },
    { label: 'Appointments', value: '148', delta: '+5%', color: '#60C4FF' },
    { label: 'Avg Satisfaction', value: '94.2%', delta: '+2.1%', color: '#4ADE80' },
    { label: 'Pending Reviews', value: '23', delta: '-8%', color: '#FACC15' },
  ]
  stats.forEach((s, i) => {
    const x = 28 + i * 285, y = 140, w = 265, h = 90
    ctx.fillStyle = '#161B22'; roundRect(ctx, x, y, w, h, 10)
    ctx.fillStyle = s.color; ctx.font = 'bold 24px system-ui'; ctx.fillText(s.value, x + 18, y + 44)
    ctx.fillStyle = 'rgba(200,210,220,0.55)'; ctx.font = '12px system-ui'; ctx.fillText(s.label, x + 18, y + 65)
    ctx.fillStyle = s.delta.startsWith('+') ? '#4ADE80' : '#F87171'
    ctx.font = 'bold 12px system-ui'; ctx.fillText(s.delta, x + 18, y + 82)
  })

  /* Main chart area */
  ctx.fillStyle = '#161B22'; roundRect(ctx, 28, 248, 720, 200, 12)
  ctx.fillStyle = 'rgba(200,210,220,0.7)'; ctx.font = 'bold 14px system-ui'
  ctx.fillText('Patient Flow — Last 7 Days', 48, 278)
  /* chart lines */
  const points = [40, 70, 55, 80, 60, 85, 72]
  ctx.strokeStyle = '#EA5DB4'; ctx.lineWidth = 2.5
  ctx.shadowColor = '#EA5DB4'; ctx.shadowBlur = 8
  ctx.beginPath()
  points.forEach((v, i) => {
    const px = 48 + i * 96, py = 415 - v * 1.4
    i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
  })
  ctx.stroke(); ctx.shadowBlur = 0
  /* area fill */
  ctx.fillStyle = 'rgba(234,93,180,0.12)'
  ctx.beginPath()
  points.forEach((v, i) => { const px = 48 + i * 96, py = 415 - v * 1.4; i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py) })
  ctx.lineTo(48 + 6 * 96, 415); ctx.lineTo(48, 415); ctx.fill()
  /* dots */
  points.forEach((v, i) => {
    const px = 48 + i * 96, py = 415 - v * 1.4
    ctx.fillStyle = '#EA5DB4'; ctx.beginPath(); ctx.arc(px, py, 4, 0, Math.PI * 2); ctx.fill()
  })

  /* Right panel - patient list */
  ctx.fillStyle = '#161B22'; roundRect(ctx, 764, 248, 408, 480, 12)
  ctx.fillStyle = 'rgba(200,210,220,0.7)'; ctx.font = 'bold 14px system-ui'
  ctx.fillText('Recent Patients', 784, 278)
  const patients = [
    { name: 'Arjun Mehta', status: 'Scheduled', color: '#60C4FF' },
    { name: 'Priya Sharma', status: 'In Progress', color: '#4ADE80' },
    { name: 'Rahul Verma', status: 'Completed', color: 'rgba(255,255,255,0.3)' },
    { name: 'Sneha Patel', status: 'Scheduled', color: '#60C4FF' },
    { name: 'Vikram Singh', status: 'Follow-up', color: '#FACC15' },
  ]
  patients.forEach((p, i) => {
    const py = 300 + i * 76
    ctx.fillStyle = '#1A2230'; roundRect(ctx, 784, py, 368, 60, 8)
    ctx.fillStyle = '#EA5DB4'; ctx.beginPath(); ctx.arc(814, py + 30, 18, 0, Math.PI * 2); ctx.fill()
    ctx.fillStyle = '#fff'; ctx.font = 'bold 11px system-ui'; ctx.fillText(p.name.split(' ').map(w=>w[0]).join(''), 807, py + 35)
    ctx.fillStyle = 'rgba(200,210,220,0.85)'; ctx.font = '13px system-ui'; ctx.fillText(p.name, 844, py + 25)
    ctx.fillStyle = p.color; ctx.font = '11px system-ui'; ctx.fillText(p.status, 844, py + 44)
  })

  /* Bottom cards */
  const bottom = [
    { title: 'Upcoming', sub: '14 appointments this week', icon: '📅', color: '#60C4FF' },
    { title: 'Alerts', sub: '3 critical reviews pending', icon: '⚠️', color: '#F87171' },
    { title: 'Messages', sub: '7 unread from care team', icon: '💬', color: '#4ADE80' },
  ]
  bottom.forEach((b, i) => {
    const x = 28 + i * 244, y = 464
    ctx.fillStyle = '#161B22'; roundRect(ctx, x, y, 228, 80, 10)
    ctx.font = '22px system-ui'; ctx.fillText(b.icon, x + 16, y + 38)
    ctx.fillStyle = b.color; ctx.font = 'bold 14px system-ui'; ctx.fillText(b.title, x + 52, y + 32)
    ctx.fillStyle = 'rgba(200,210,220,0.5)'; ctx.font = '11px system-ui'; ctx.fillText(b.sub, x + 52, y + 50)
  })

  return c
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.arcTo(x + w, y, x + w, y + r, r)
  ctx.lineTo(x + w, y + h - r); ctx.arcTo(x + w, y + h, x + w - r, y + h, r)
  ctx.lineTo(x + r, y + h); ctx.arcTo(x, y + h, x, y + h - r, r)
  ctx.lineTo(x, y + r); ctx.arcTo(x, y, x + r, y, r)
  ctx.closePath(); ctx.fill()
}

/* ─────────────────────────────────────────
   Draw monitor screen canvas (mobile side panel)
───────────────────────────────────────── */
function createMobileTexture() {
  const W = 320, H = 560
  const c = document.createElement('canvas')
  c.width = W; c.height = H
  const ctx = c.getContext('2d')
  ctx.fillStyle = '#0D1117'; ctx.fillRect(0, 0, W, H)
  /* status bar */
  ctx.fillStyle = '#161B22'; ctx.fillRect(0, 0, W, 40)
  ctx.fillStyle = 'rgba(200,210,220,0.5)'; ctx.font = '10px system-ui'
  ctx.fillText('9:41', 14, 26); ctx.fillText('◉ 5G', W - 42, 26)
  /* header */
  ctx.fillStyle = '#EA5DB4'; ctx.font = 'bold 14px Georgia'; ctx.fillText('Fold', 20, 75)
  ctx.fillStyle = 'rgba(255,255,255,0.8)'; ctx.font = '13px system-ui'; ctx.fillText('My Patients', 20, 95)
  /* patient cards */
  ;[0, 1, 2, 3].forEach(i => {
    ctx.fillStyle = '#161B22'; roundRect(ctx, 12, 110 + i * 100, W - 24, 88, 8)
    ctx.fillStyle = '#EA5DB4'; ctx.beginPath(); ctx.arc(44, 155 + i * 100, 18, 0, Math.PI * 2); ctx.fill()
    ctx.fillStyle = 'rgba(200,210,220,0.8)'; ctx.font = 'bold 12px system-ui'
    ctx.fillText(['Arjun Mehta','Priya Sharma','Rahul Verma','Sneha Patel'][i], 72, 150 + i * 100)
    ctx.fillStyle = 'rgba(200,210,220,0.45)'; ctx.font = '10px system-ui'
    ctx.fillText(['Cardiology · Follow-up','Ortho · Recovery','General · Review','Neuro · Scheduled'][i], 72, 168 + i * 100)
  })
  /* bottom nav */
  ctx.fillStyle = '#161B22'; ctx.fillRect(0, H - 60, W, 60)
  ;['🏠','👥','📅','💬'].forEach((ic, i) => {
    ctx.font = '18px system-ui'; ctx.fillText(ic, 28 + i * 70, H - 26)
  })
  return c
}


/* ═══════════════════════════════════════
   Main Three.js scene component
═══════════════════════════════════════ */
export default function BriefToExperience() {
  const containerRef = useRef(null)
  const [showText, setShowText] = useState(false)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStarted(true) },
      { threshold: 0.25 }
    )
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started || !containerRef.current) return

    /* ── canvas ── */
    const canvas = document.createElement('canvas')
    canvas.className = styles.canvas
    containerRef.current.appendChild(canvas)

    const W = containerRef.current.clientWidth || 800
    const H = Math.min(W * 0.62, 520)
    canvas.style.width  = W + 'px'
    canvas.style.height = H + 'px'

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(W, H)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 80)
    camera.position.set(0, 0.2, 5.5)

    /* ── Lighting ── */
    scene.add(new THREE.AmbientLight(0xfff8f0, 0.6))
    const sun = new THREE.DirectionalLight(0xffffff, 1.2)
    sun.position.set(3, 5, 4); sun.castShadow = true
    scene.add(sun)
    const fill = new THREE.DirectionalLight(0xffe8d0, 0.4)
    fill.position.set(-3, 2, 2)
    scene.add(fill)

    /* ─────────── NAPKIN ─────────── */
    const napkinCanvas = createNapkinCanvas()
    const napkinTex = new THREE.CanvasTexture(napkinCanvas)

    const SEG = 40
    const napkinGeo = new THREE.PlaneGeometry(3.4, 2.4, SEG, SEG)
    /* store original positions for cloth animation */
    const origPos = napkinGeo.attributes.position.array.slice()

    /* initial crease displacement */
    const pos = napkinGeo.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), y = pos.getY(i)
      const fold = Math.sin(x * 2.0) * 0.04 + Math.sin(y * 2.5) * 0.035
      pos.setZ(i, fold + (Math.random() - 0.5) * 0.015)
    }
    napkinGeo.computeVertexNormals()

    const napkinMat = new THREE.MeshPhysicalMaterial({
      map: napkinTex,
      roughness: 0.88,
      metalness: 0.0,
      side: THREE.DoubleSide,
      color: 0xffffff,
    })
    const napkin = new THREE.Mesh(napkinGeo, napkinMat)
    napkin.castShadow = true
    napkin.receiveShadow = true
    scene.add(napkin)

    /* ─────────── MONITOR ─────────── */
    const monitorGroup = new THREE.Group()
    monitorGroup.visible = false; monitorGroup.scale.setScalar(0.001)
    scene.add(monitorGroup)

    /* outer bezel */
    const bezelMat = new THREE.MeshPhysicalMaterial({ color: 0x1c1c1e, roughness: 0.3, metalness: 0.6 })
    const bezel = new THREE.Mesh(new THREE.BoxGeometry(4.0, 2.55, 0.10), bezelMat)
    monitorGroup.add(bezel)

    /* inner screen */
    const monTex = new THREE.CanvasTexture(createMonitorTexture())
    const screenMat = new THREE.MeshBasicMaterial({ map: monTex })
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(3.72, 2.32), screenMat)
    screen.position.z = 0.052
    monitorGroup.add(screen)

    /* screen glass reflection */
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff, transparent: true, opacity: 0.04,
      roughness: 0, metalness: 0, transmission: 0.1,
    })
    const glass = new THREE.Mesh(new THREE.PlaneGeometry(3.72, 2.32), glassMat)
    glass.position.z = 0.056; monitorGroup.add(glass)

    /* stand neck */
    const standMat = new THREE.MeshPhysicalMaterial({ color: 0x2c2c2e, roughness: 0.4, metalness: 0.7 })
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.09, 0.6, 16), standMat)
    neck.position.set(0, -1.575, -0.04); monitorGroup.add(neck)
    /* stand base */
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.65, 0.06, 32), standMat)
    base.position.set(0, -1.88, -0.04); monitorGroup.add(base)

    /* mobile device (right side) */
    const mobileGroup = new THREE.Group()
    mobileGroup.position.set(2.4, -0.5, 0.3)
    mobileGroup.rotation.z = -0.08
    const mobileMat = new THREE.MeshPhysicalMaterial({ color: 0x1c1c1e, roughness: 0.25, metalness: 0.5 })
    const mobileBody = new THREE.Mesh(new THREE.BoxGeometry(0.72, 1.42, 0.055), mobileMat)
    mobileGroup.add(mobileBody)
    const mobTex = new THREE.CanvasTexture(createMobileTexture())
    const mobScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.63, 1.32), new THREE.MeshBasicMaterial({ map: mobTex }))
    mobScreen.position.z = 0.029; mobileGroup.add(mobScreen)
    /* camera notch */
    const notch = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.006, 16), new THREE.MeshPhysicalMaterial({ color: 0x111, roughness: 0.5 }))
    notch.rotation.x = Math.PI / 2; notch.position.set(0, 0.64, 0.03); mobileGroup.add(notch)
    monitorGroup.add(mobileGroup)

    /* ─────────── TIMELINE ─────────── */
    // Phases (seconds from first frame)
    const T = { scribbleStart: 0.6, scribbleEnd: 4.0, transformStart: 4.3, monitorIn: 5.2, done: 6.8 }
    let clock = 0
    let phase = 'napkin' // napkin → folding → monitor → done
    let napkinOpacity = 1
    let monitorScale = 0.001
    let textRevealed = false

    /* re-draw scribbles on napkin canvas */
    function updateScribbles(progress) {
      /* clear to base */
      const ctx = napkinCanvas.getContext('2d')
      ctx.clearRect(0, 0, 1024, 1024)
      /* re-draw base */
      ctx.fillStyle = '#FFFEF5'; ctx.fillRect(0, 0, 1024, 1024)
      for (let i = 0; i < 3000; i++) {
        ctx.strokeStyle = `rgba(180,170,150,${0.03 + Math.random() * 0.03})`
        ctx.lineWidth = 0.5; ctx.beginPath()
        const x = Math.random() * 1024, y = Math.random() * 1024
        ctx.moveTo(x, y); ctx.lineTo(x + (Math.random()-0.5)*6, y + (Math.random()-0.5)*6)
        ctx.stroke()
      }
      ctx.strokeStyle = 'rgba(160,150,130,0.15)'; ctx.lineWidth = 2
      ;[[0,340,1024,340],[330,0,330,1024],[0,680,1024,680]].forEach(([x1,y1,x2,y2]) => {
        ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke()
      })
      /* draw strokes up to progress */
      STROKES.forEach(fn => fn(ctx, progress))
      napkinTex.needsUpdate = true
    }

    /* ─────────── RENDER LOOP ─────────── */
    let rafId
    let lastTime = performance.now()

    function animate(now) {
      rafId = requestAnimationFrame(animate)
      const dt = Math.min((now - lastTime) / 1000, 0.05)
      lastTime = now
      clock += dt

      /* gentle float */
      const bob = Math.sin(clock * 0.8) * 0.03
      const sway = Math.sin(clock * 0.5) * 0.04

      if (phase === 'napkin') {
        napkin.rotation.x = sway * 0.5; napkin.rotation.y = sway
        napkin.position.y = bob

        /* scribbles */
        if (clock >= T.scribbleStart) {
          const p = Math.min(1, (clock - T.scribbleStart) / (T.scribbleEnd - T.scribbleStart))
          updateScribbles(p)
        }

        if (clock >= T.transformStart) { phase = 'folding' }
      }

      if (phase === 'folding') {
        const fp = Math.min(1, (clock - T.transformStart) / (T.monitorIn - T.transformStart))

        /* fold vertices toward center */
        const posArr = napkinGeo.attributes.position.array
        for (let i = 0; i < pos.count; i++) {
          const ox = origPos[i * 3], oy = origPos[i * 3 + 1], oz = origPos[i * 3 + 2]
          posArr[i * 3]     = ox * (1 - fp)
          posArr[i * 3 + 1] = oy * (1 - fp)
          posArr[i * 3 + 2] = oz + fp * (Math.abs(ox) + Math.abs(oy)) * 0.3
        }
        napkinGeo.attributes.position.needsUpdate = true
        napkinGeo.computeVertexNormals()

        napkin.rotation.y += dt * 1.5
        napkin.scale.setScalar(1 - fp * 0.7)
        napkinOpacity = 1 - fp
        napkinMat.opacity = napkinOpacity
        napkinMat.transparent = true

        if (clock >= T.monitorIn) { phase = 'monitor'; napkin.visible = false }
      }

      if (phase === 'monitor' || phase === 'done') {
        const mp = Math.min(1, (clock - T.monitorIn) / (T.done - T.monitorIn))
        monitorScale = 0.001 + mp * 0.999
        monitorGroup.visible = true
        monitorGroup.scale.setScalar(monitorScale)
        monitorGroup.rotation.y = Math.sin(clock * 0.4) * 0.06
        monitorGroup.position.y = bob * 0.5

        if (mp >= 1 && !textRevealed) {
          textRevealed = true
          setShowText(true)
          phase = 'done'
        }
      }

      renderer.render(scene, camera)
    }
    animate(performance.now())

    /* resize */
    const onResize = () => {
      const nw = containerRef.current?.clientWidth || W
      const nh = Math.min(nw * 0.62, 520)
      canvas.style.width = nw + 'px'; canvas.style.height = nh + 'px'
      renderer.setSize(nw, nh)
      camera.aspect = nw / nh; camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas)
    }
  }, [started])

  return (
    <section className={styles.section} aria-label="Turning briefs to experiences">
      <div ref={containerRef} className={styles.canvasWrap} />

      <AnimatePresence>
        {showText && (
          <motion.div
            className={styles.reveal}
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: EXPO }}
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
