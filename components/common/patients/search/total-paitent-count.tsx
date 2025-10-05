import { Skeleton } from '@/components/ui/skeleton'
import { getHosPatientCount } from '@/lib/services/patient/patient'
import { useEffect, useState } from 'react'

export default function TotalPatientCount({ hosId }: { hosId: string }) {
  const [isFetching, setIsFetching] = useState(false)
  const [totalPatientCount, setTotalPatientCount] = useState<number>()

  useEffect(() => {
    setIsFetching(true)
    getHosPatientCount(hosId)
      .then(setTotalPatientCount)
      .then(() => setIsFetching(false))
  }, [hosId])

  return (
    <div className="absolute bottom-0 left-2">
      {isFetching ? (
        <Skeleton className="h-5 w-16" />
      ) : (
        <div className="text-sm text-muted-foreground">
          <span className="mr-1 text-base">{totalPatientCount}</span>
          마리 등록됨
        </div>
      )}
    </div>
  )
}
