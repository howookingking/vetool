import { Skeleton } from '@/components/ui/skeleton'

export default function CalculatorSheetSkeleton() {
  return (
    <div className="w-full animate-pulse p-4">
      <Skeleton className="mb-4 h-8 w-full" />
      <Skeleton className="h-[400px] w-full" />
    </div>
  )
}
