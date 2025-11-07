'use client'

import { useEffect, useState } from 'react'

function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // 비동기로 state 변경 (lint 경고 방지)
    const timeout = setTimeout(() => {
      try {
        const item = window.localStorage.getItem(key)
        if (item !== null) {
          setStoredValue(JSON.parse(item))
        }
      } catch (error) {
        console.error('Error reading from localStorage:', error)
      } finally {
        setIsInitialized(true)
      }
    }, 0)

    return () => clearTimeout(timeout)
  }, [key])

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }

  return [storedValue, setValue, isInitialized] as const
}

export default useLocalStorage
