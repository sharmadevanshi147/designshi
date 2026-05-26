import { createContext, useContext, useState, useCallback, useEffect } from 'react'

export const DISPLAY_FONTS = [
  {
    id: 'bodoni',
    label: 'Bodoni Moda',
    value: "'Bodoni Moda', Georgia, serif",
  },
  {
    id: 'castoro',
    label: 'Castoro',
    value: "'Castoro', Georgia, serif",
  },
  {
    id: 'alice',
    label: 'Alice',
    value: "'Alice', Georgia, serif",
  },
  {
    id: 'gabriela',
    label: 'Gabriela',
    value: "'Gabriela', Georgia, serif",
  },
  {
    id: 'youngserif',
    label: 'Young Serif',
    value: "'Young Serif', Georgia, serif",
  },
]

const FontCtx = createContext(null)

export function FontProvider({ children }) {
  const [fontId, setFontId] = useState('bodoni')

  const applyFont = (id) => {
    const font = DISPLAY_FONTS.find(f => f.id === id)
    if (font) document.documentElement.style.setProperty('--font-display', font.value)
  }

  /* Apply default on mount */
  useEffect(() => { applyFont('bodoni') }, [])

  const setFont = useCallback((id) => {
    setFontId(id)
    applyFont(id)
  }, [])

  return (
    <FontCtx.Provider value={{ fontId, setFont, fonts: DISPLAY_FONTS }}>
      {children}
    </FontCtx.Provider>
  )
}

export const useFont = () => useContext(FontCtx)
