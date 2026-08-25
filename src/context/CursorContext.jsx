import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const CursorCtx = createContext(null)

export function CursorProvider({ children }) {
  const [mode, setMode] = useState('pencil') // magic cursor on by default
  /* When set, the cursor becomes this label instead of the pencil */
  const [label, setLabel] = useState(null)

  /* Set body attribute on mount */
  useEffect(() => {
    document.body.setAttribute('data-cursor', 'pencil')
  }, [])

  const toggleCursor = useCallback(() => {
    setMode(m => {
      const next = m === 'default' ? 'pencil' : 'default'
      document.body.setAttribute('data-cursor', next === 'pencil' ? 'pencil' : 'default')
      return next
    })
  }, [])

  return (
    <CursorCtx.Provider value={{ mode, toggleCursor, label, setLabel }}>
      {children}
    </CursorCtx.Provider>
  )
}

export const useCursor = () => useContext(CursorCtx)
