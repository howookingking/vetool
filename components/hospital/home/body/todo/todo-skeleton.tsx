import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

export default function TodoSkeleton() {
  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <Skeleton className="h-6 w-32" />

        {[1, 2, 3].map((itemIndex) => (
          <Skeleton className="h-5 w-full" key={itemIndex} />
        ))}
      </div>

      <Separator className="my-2 bg-gray-800" />

      <div className="space-y-4">
        <Skeleton className="h-6 w-32" />

        {[1, 2, 3].map((itemIndex) => (
          <Skeleton className="h-5 w-full" key={itemIndex} />
        ))}
      </div>

      <Separator className="my-2 bg-gray-800" />

      <div className="space-y-4">
        <Skeleton className="h-6 w-32" />

        {[1, 2, 3].map((itemIndex) => (
          <Skeleton className="h-5 w-full" key={itemIndex} />
        ))}
      </div>
    </div>
  )
}
