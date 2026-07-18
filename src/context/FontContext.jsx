import { createContext, useContext, useState, useCallback, useEffect } from 'react'

export const DISPLAY_FONTS = [
  {
    id: 'fraunces',
    label: 'Fraunces',
    value: "'Fraunces', Georgia, serif",
  },
]

const FontCtx = createContext(null)

export function FontProvider({ children }) {
  const [fontId, setFontId] = useState('fraunces')

  const applyFont = (id) => {
    const font = DISPLAY_FONTS.find(f => f.id === id)
    if (font) document.documentElement.style.setProperty('--font-display', font.value)
  }

  /* Apply default on mount */
  useEffect(() => { applyFont('fraunces') }, [])

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
