import { createContext, useContext, useState, useCallback } from 'react'

const CursorCtx = createContext(null)

export function CursorProvider({ children }) {
  const [mode, setMode] = useState('default') // 'default' | 'pencil'

  const toggleCursor = useCallback(() => {
    setMode(m => {
      const next = m === 'default' ? 'pencil' : 'default'
      document.body.setAttribute('data-cursor', next === 'pencil' ? 'pencil' : 'default')
      return next
    })
  }, [])

  return (
    <CursorCtx.Provider value={{ mode, toggleCursor }}>
      {children}
    </CursorCtx.Provider>
  )
}

export const useCursor = () => useContext(CursorCtx)
