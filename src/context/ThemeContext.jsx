import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const THEMES = ['light', 'dark', 'sepia']
const THEME_LABELS = { light: '☀️', dark: '🌙', sepia: '📜' }
const STORAGE_KEY = 'portfolio-theme'

const ThemeCtx = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) || 'light' } catch { return 'light' }
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try { localStorage.setItem(STORAGE_KEY, theme) } catch {}
  }, [theme])

  const cycleTheme = useCallback(() => {
    setTheme(t => {
      const idx = THEMES.indexOf(t)
      return THEMES[(idx + 1) % THEMES.length]
    })
  }, [])

  return (
    <ThemeCtx.Provider value={{ theme, cycleTheme, THEME_LABELS }}>
      {children}
    </ThemeCtx.Provider>
  )
}

export const useTheme = () => useContext(ThemeCtx)
