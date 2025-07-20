import { cn } from '@/lib/utils/utils'
import React from 'react'

export default function NewFeature({
  // LocalStoragekey,
  children,
  className,
}: {
  // LocalStoragekey: string
  children: React.ReactNode
  className?: string
}) {
  // 보면 없에는 기능인데 그냥 없어도 될 듯
  // const [hasSeen, setHasSeen] = useLocalStorage(LocalStoragekey, false)
  return (
    <div
      className="relative"
      // onClick={() => setHasSeen(true)}
    >
      {/* {!hasSeen && ( */}
      <div
        className={cn(
          'absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-destructive',
          className,
        )}
      />
      {/* )} */}

      <div>{children}</div>
    </div>
  )
}
