import { useEffect, useRef, useState, useCallback } from 'react'
import { useCursor } from '../../context/CursorContext'
import styles from './Cursor.module.css'

/* Sparkle shapes — star, heart, diamond, spark */
const SHAPES = ['✦', '✧', '♡', '◆', '✿', '★', '·', '⁺']
const COLORS = ['#EA5DB4','#7C6EFF','#F59E0B','#10B981','#F87171','#60A5FA','#A78BFA']

let sparkleId = 0

export default function Cursor() {
  const { mode } = useCursor()
  const cursorRef = useRef(null)
  const dotRef    = useRef(null)
  const [sparkles, setSparkles] = useState([])
  const posRef    = useRef({ x: -200, y: -200 })
  const lastSparkle = useRef(0)

  /* ── Move cursor ── */
  useEffect(() => {
    const move = (e) => {
      const x = e.clientX
      const y = e.clientY
      posRef.current = { x, y }

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${x}px, ${y}px)`
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x}px, ${y}px)`
      }

      /* Spawn sparkles only in pencil mode, throttled to 60ms */
      if (mode === 'pencil') {
        const now = Date.now()
        if (now - lastSparkle.current > 55) {
          lastSparkle.current = now
          const id = ++sparkleId
          const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)]
          const color = COLORS[Math.floor(Math.random() * COLORS.length)]
          const ox = (Math.random() - 0.5) * 24
          const oy = (Math.random() - 0.5) * 24
          const size = 10 + Math.random() * 14
          setSparkles(prev => [...prev.slice(-18), { id, x, y, ox, oy, shape, color, size }])
          setTimeout(() => setSparkles(prev => prev.filter(s => s.id !== id)), 700)
        }
      }
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [mode])

  if (mode !== 'pencil') return null

  return (
    <>
      {/* Custom pencil cursor */}
      <div ref={cursorRef} className={styles.cursor} aria-hidden="true">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M4 24L10 18L22 6L24 8L12 20L6 26Z" fill="currentColor" opacity=".15"/>
          <path d="M22 4L24 6L8 22L4 24L6 20L22 4Z" fill="currentColor"/>
          <path d="M4 24L6 20L8 22Z" fill="var(--color-accent)"/>
          <path d="M20 2L26 8" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Sparkle particles */}
      {sparkles.map(s => (
        <div
          key={s.id}
          className={styles.sparkle}
          aria-hidden="true"
          style={{
            left: s.x + s.ox,
            top:  s.y + s.oy,
            color: s.color,
            fontSize: s.size,
          }}
        >
          {s.shape}
        </div>
      ))}
    </>
  )
}
