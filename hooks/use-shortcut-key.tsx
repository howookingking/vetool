import { useEffect } from 'react'

type UseShortcutKeyProps = {
  key: string
  condition?: boolean
  callback: () => void
  ignoreInput?: boolean
  requireCtrl?: boolean
}

export default function useShortcutKey({
  key,
  condition = true,
  callback,
  ignoreInput = false,
  requireCtrl = true,
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

      const ctrlPressed = event.ctrlKey || event.metaKey
      const keyMatches = event.key === key

      const isValidCombination = requireCtrl
        ? ctrlPressed && keyMatches
        : keyMatches

      if (condition && isValidCombination) {
        event.stopPropagation()
        event.preventDefault()
        callback()
        return false
      }
    }

    window.addEventListener('keydown', handleKeyDown, { capture: true })
    return () =>
      window.removeEventListener('keydown', handleKeyDown, { capture: true })
  }, [callback, key, condition, ignoreInput, requireCtrl])
}
