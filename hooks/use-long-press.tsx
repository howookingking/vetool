import { useCallback, useEffect, useRef } from 'react'

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
  const touchPoint = useRef<{ x: number; y: number } | null>(null)
  const isTouchMoved = useRef(false)

  const start = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      isLongPress.current = false
      isTouchMoved.current = false

      if (event.type === 'touchstart') {
        const touches = (event as React.TouchEvent).touches[0]

        touchPoint.current = {
          x: touches.clientX,
          y: touches.clientY,
        }
      }

      timerRef.current = setTimeout(() => {
        isLongPress.current = true
        if (
          ('button' in event && event.button === 0) ||
          event.type === 'touchstart'
        ) {
          onLongPress()
        }
      }, threshold)
    },
    [onLongPress, threshold],
  )

  const move = useCallback((event: React.TouchEvent) => {
    if (touchPoint.current) {
      const touch = event.touches[0]
      const moveDistance = Math.sqrt(
        Math.pow(touch.clientX - touchPoint.current.x, 2) +
          Math.pow(touch.clientY - touchPoint.current.y, 2),
      )

      // 10px 이상 이동하면 터치 이동으로 간주
      if (moveDistance > 10) {
        isTouchMoved.current = true

        if (timerRef.current) {
          clearTimeout(timerRef.current)
        }
      }
    }
  }, [])

  const end = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }

      if (!isLongPress.current && !isTouchMoved.current && onClick) {
        if (
          'button' in event &&
          event.button === 0 &&
          (event.ctrlKey || event.metaKey)
        ) {
          onClick()
        }
      }

      touchPoint.current = null
      isTouchMoved.current = false
    },
    [onClick],
  )

  const cancel = useCallback((event: React.MouseEvent | React.TouchEvent) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    touchPoint.current = null
    isTouchMoved.current = false
    isLongPress.current = false
  }, [])

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  return {
    onMouseDown: start,
    onMouseUp: end,
    onMouseLeave: cancel,
    onTouchStart: start,
    onTouchEnd: end,
    onTouchCancel: cancel,
    onTouchMove: move,
  }
}
