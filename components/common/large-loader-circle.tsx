import { cn } from '@/lib/utils/utils'
import { LoaderCircle } from 'lucide-react'

export default function LargeLoaderCircle({
  className,
  size = 80,
}: {
  className?: string
  size?: number
}) {
  return (
    <div
      className={cn(
        'flex w-full items-center justify-center text-primary',
        className,
      )}
    >
      <LoaderCircle className="animate-spin" size={size} />
    </div>
  )
}
