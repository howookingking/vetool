import { Skeleton } from '@/components/ui/skeleton'

export default function NoticeSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-[34px]" />
      <Skeleton className="h-[34px]" />
      <Skeleton className="h-[34px]" />
      <Skeleton className="h-[34px]" />
      <Skeleton className="h-[34px]" />
      <Skeleton className="h-[34px]" />
      <Skeleton className="h-[34px]" />
      <Skeleton className="h-[34px]" />
    </div>
  )
}
