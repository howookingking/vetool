import useLocalStorage from '@/hooks/use-local-storage'
import React from 'react'

export default function NewFeature({
  LocalStoragekey,
  children,
}: {
  LocalStoragekey: string
  children: React.ReactNode
}) {
  const [hasSeen, setHasSeen] = useLocalStorage(LocalStoragekey, false)
  return (
    <div className="relative" onClick={() => setHasSeen(true)}>
      {!hasSeen && (
        <div className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-destructive" />
      )}

      <div>{children}</div>
    </div>
  )
}
