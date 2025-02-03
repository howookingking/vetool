import { Skeleton } from '@/components/ui/skeleton'

/**
 * 저장된 TX 이미지 뷰 스켈레톤
 */
export default function TxImageViewSkeleton({ count }: { count?: number }) {
  return (
    <div className="flex flex-wrap gap-2">
      {[...Array(4)].map((_, index) => (
        <Skeleton key={index} className="h-20 w-20 rounded-md" />
      ))}
    </div>
  )
}
