import { cn } from '@/lib/utils/utils'
import { Spinner } from '../ui/spinner'

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
      <Spinner className="h-20 w-20" />
    </div>
  )
}
