import { cn } from '@/lib/utils/utils'
import { LoaderCircle } from 'lucide-react'

export default function LargeLoaderCircle({
  className,
}: {
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex w-full items-center justify-center text-primary',
        className,
      )}
    >
      <LoaderCircle className="h-20 w-20 animate-spin" />
    </div>
  )
}
