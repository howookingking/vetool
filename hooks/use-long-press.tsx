import { useCallback, useRef } from 'react'

interface UseLongPressOptions {
  onClick?: () => void
  onLongPress: () => void
  threshold?: number
}

export const useLongPress = ({
  onClick,
  onLongPress,
  threshold = 500,
}: UseLongPressOptions) => {
  const timerRef = useRef<NodeJS.Timeout>()
  const isLongPress = useRef(false)

  const start = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      // if (event.type.includes('touch')) {
      //   event.preventDefault()
      // }

      isLongPress.current = false

      timerRef.current = setTimeout(() => {
        isLongPress.current = true
        if ('button' in event && event.button === 0) {
          onLongPress()
        }
      }, threshold)
    },
    [onLongPress, threshold],
  )

  const end = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      // if (event.type.includes('touch')) {
      //   event.preventDefault()
      // }

      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }

      if (!isLongPress.current && onClick) {
        if (
          'button' in event &&
          event.button === 0 &&
          (event.ctrlKey || event.metaKey)
        ) {
          onClick()
        }
      }
    },
    [onClick],
  )

  const cancel = useCallback((event: React.MouseEvent | React.TouchEvent) => {
    // if (event.type.includes('touch')) {
    //   event.preventDefault()
    // }

    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    isLongPress.current = false
  }, [])

  return {
    onMouseDown: start,
    onMouseUp: end,
    onMouseLeave: cancel,
    onTouchStart: start,
    onTouchEnd: end,
    onTouchCancel: cancel,
  }
}
