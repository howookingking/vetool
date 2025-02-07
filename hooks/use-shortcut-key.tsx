import { useEffect } from 'react'

type UseShortcutKeyProps = {
  keys: string[]
  condition?: boolean
  callback: () => void
  ignoreInput?: boolean
}

export default function useShorcutKey({
  keys,
  condition = true,
  callback,
  ignoreInput = false,
}: UseShortcutKeyProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger for input fields
      const activeElement = document.activeElement
      const tagName = activeElement?.tagName ?? ''
      if (
        ['INPUT', 'TEXTAREA'].includes(tagName.toUpperCase()) &&
        !ignoreInput
      ) {
        return
      }
      if (
        condition &&
        (event.ctrlKey || event.metaKey) &&
        keys.includes(event.key.toLowerCase())
      ) {
        event.stopPropagation()
        event.preventDefault()
        callback()
        return false
      }
    }

    window.addEventListener('keydown', handleKeyDown, { capture: true })
    return () =>
      window.removeEventListener('keydown', handleKeyDown, { capture: true })
  }, [callback, keys])
}
