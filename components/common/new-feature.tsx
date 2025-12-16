import { cn } from '@/lib/utils/utils'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
}

export default function NewFeature({ children, className }: Props) {
  return (
    <div className="relative">
      <div
        className={cn(
          'absolute right-1.5 top-1.5 z-40 h-1.5 w-1.5 rounded-full bg-destructive',
          className,
        )}
      />
      {children}
    </div>
  )
}
