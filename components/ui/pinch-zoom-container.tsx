'use client'

import { useRef, useState, useEffect, ReactNode, useCallback } from 'react'

const ZOOM_FACTOR = 0.3
const MIN_SCALE = 0.5
const MAX_SCALE = 10

export default function PinchZoomContainer({
  children,
}: {
  children: ReactNode
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // 이미지 확대/축소 비율 (기본값: 1 (100%))
  const [scale, setScale] = useState(1)

  // Children의 현재 x, y 좌표 위치
  const [position, setPosition] = useState({ x: 0, y: 0 })

  // 현재 드래그 중인지 여부
  const [isDragging, setIsDragging] = useState(false)

  // 드래그 시작 시의 위치
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 })

  // 터치 거리 (핀치 동작 구현을 위한 거리 정보) (null: 핀치 동작 아님 / number: 핀치 동작 중)
  const [touchDistance, setTouchDistance] = useState<number | null>(null)

  // 터치스크린 핸들러
  const handleTouchStart = useCallback(
    (event: TouchEvent) => {
      // 두 손가락 터치인 경우 (PINCH 동작)
      if (event.touches.length === 2) {
        // 두 손가락 사이의 거리 계산 (두 점 사이의 거리)
        const distance = Math.hypot(
          event.touches[0].clientX - event.touches[1].clientX,
          event.touches[0].clientY - event.touches[1].clientY,
        )

        // 초기 핀치 거리 저장
        setTouchDistance(distance)
      }

      // 한 손가락 터치인 경우 (DRAG 동작)
      if (event.touches.length === 1) {
        setIsDragging(true)

        // 현재 터치 위치 (clientX, clientY)에서
        // 현재 컨테이너 위치 (position.x, position.y)를 빼서 드래그 시작 위치 저장
        setStartPosition({
          x: event.touches[0].clientX - position.x,
          y: event.touches[0].clientY - position.y,
        })
      }
    },
    [position.x, position.y],
  )

  const handleTouchMove = useCallback(
    (event: TouchEvent) => {
      event.preventDefault()

      // 두 손가락 터치인 경우 (PINCH 동작)
      if (event.touches.length === 2 && touchDistance !== null) {
        const newDistance = Math.hypot(
          event.touches[0].clientX - event.touches[1].clientX,
          event.touches[0].clientY - event.touches[1].clientY,
        )

        const delta =
          ((newDistance - touchDistance) / touchDistance) * ZOOM_FACTOR
        const newScale = Math.min(
          Math.max(scale * (1 + delta), MIN_SCALE),
          MAX_SCALE,
        )

        setScale(newScale)
        setTouchDistance(newDistance)

        // 경계값 체크
        if (position.x < 0) {
          setPosition((prev) => ({ ...prev, x: 0 }))
        }
        if (position.y < 0) {
          setPosition((prev) => ({ ...prev, y: 0 }))
        }
      }

      // 한 손가락 터치인 경우 (DRAG 동작)
      if (event.touches.length === 1 && isDragging) {
        const newX = Math.min(0, event.touches[0].clientX - startPosition.x)
        const newY = Math.min(0, event.touches[0].clientY - startPosition.y)

        setPosition({ x: newX, y: newY })
      }
    },
    [
      isDragging,
      position.x,
      position.y,
      scale,
      startPosition.x,
      startPosition.y,
      touchDistance,
    ],
  )

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false)
    setTouchDistance(null)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener('touchstart', handleTouchStart, {
      passive: false,
    })
    container.addEventListener('touchmove', handleTouchMove, { passive: false })
    container.addEventListener('touchend', handleTouchEnd)
    return () => {
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
      container.removeEventListener('touchend', handleTouchEnd)
    }
  }, [handleTouchStart, handleTouchMove, handleTouchEnd])

  return (
    <div
      ref={containerRef}
      className="h-full w-full overflow-auto"
      style={{
        touchAction: 'none',
        backgroundColor: 'hsl(var(--primary))',
      }}
    >
      <div
        ref={contentRef}
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transformOrigin: '0 0',
          willChange: 'transform',
          backgroundColor: 'white',
        }}
      >
        {children}
      </div>
    </div>
  )
}
