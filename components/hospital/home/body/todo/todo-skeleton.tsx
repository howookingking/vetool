import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

export default function TodoSkeleton() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-6 rounded-full" />
        </div>

        {[1, 2, 3].map((itemIndex) => (
          <Skeleton className="h-5 w-full" key={itemIndex} />
        ))}
      </div>

      <Separator />

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-6 rounded-full" />
        </div>

        {[1, 2, 3].map((itemIndex) => (
          <Skeleton className="h-5 w-full" key={itemIndex} />
        ))}
      </div>

      <Separator />

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-6 rounded-full" />
        </div>

        {[1, 2, 3].map((itemIndex) => (
          <Skeleton className="h-5 w-full" key={itemIndex} />
        ))}
      </div>
    </div>
  )
}
