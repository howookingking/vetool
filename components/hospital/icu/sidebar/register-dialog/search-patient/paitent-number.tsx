import { Skeleton } from '@/components/ui/skeleton'
import { getHosPatientCount } from '@/lib/services/patient/patient'
import { useEffect, useState } from 'react'

export default function PatientNumber({ hosId }: { hosId: string }) {
  const [isFetching, setIsFetching] = useState(false)
  const [totalPatientCount, setTotalPatientCount] = useState<number>()

  useEffect(() => {
    setIsFetching(true)
    getHosPatientCount(hosId)
      .then(setTotalPatientCount)
      .then(() => setIsFetching(false))
  }, [hosId])

  return (
    <div className="flex shrink-0 items-center gap-1 text-sm text-muted-foreground">
      현재 등록된 환자 수 :
      {isFetching ? (
        <Skeleton className="h-5 w-20" />
      ) : (
        <span className="font-medium text-black">{totalPatientCount}마리</span>
      )}
    </div>
  )
}
