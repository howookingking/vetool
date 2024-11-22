import { Skeleton } from '@/components/ui/skeleton'

export default function TodoSkeleton() {
  return (
    <div className="space-y-20">
      {[1, 2, 3].map((index) => (
        <div key={index} className="space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-24" />
          </div>

          {[1, 2].map((itemIndex) => (
            <div key={itemIndex} className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
