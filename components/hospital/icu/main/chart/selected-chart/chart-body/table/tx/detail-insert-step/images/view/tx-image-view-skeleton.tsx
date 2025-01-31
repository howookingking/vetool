import { Skeleton } from '@/components/ui/skeleton'

type TxImageViewSkeletonProps = {
  count: number
}

/**
 * 저장된 TX 이미지 뷰 스켈레톤
 */
export default function TxImageViewSkeleton({
  count,
}: TxImageViewSkeletonProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {[...Array(4)].map((_, index) => (
        <Skeleton key={index} className="h-24 w-24 rounded-md" />
      ))}
    </div>
  )
}
