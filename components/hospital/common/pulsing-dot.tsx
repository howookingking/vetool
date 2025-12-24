import { cn } from '@/lib/utils/utils'

export default function PulsingDot({ className }: { className?: string }) {
  return (
    <div className={cn('absolute z-50', className)}>
      <div className="h-2 w-2 rounded-full bg-destructive" />
      <div className="absolute left-0 top-0 h-2 w-2 animate-ping rounded-full bg-destructive" />
    </div>
  )
}
