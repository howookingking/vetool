import { useEffect, useRef } from 'react'

export function useAutoScroll<T>(dependency: T) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }, [dependency])

  return ref
}
