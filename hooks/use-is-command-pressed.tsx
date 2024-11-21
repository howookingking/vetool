import { useEffect, useState } from 'react'

export default function useIsCommandPressed() {
  const [isCommandPressed, setIsCommandPressed] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        setIsCommandPressed(true)
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Meta' || e.key === 'Control') {
        setIsCommandPressed(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return isCommandPressed
}
