import AddOutDuePatientDialog from '@/components/hospital/icu/main/out-and-visit/icu-out-chart/add-out-due-patient-dialog'
import IcuOutChart from '@/components/hospital/icu/main/out-and-visit/icu-out-chart/icu-out-chart'
import OutAndVisitSkeleton from '@/components/hospital/icu/main/out-and-visit/out-and-visit-skeleton'
import AddVisitPatientDialog from '@/components/hospital/icu/main/out-and-visit/visit-chart/add-visit-patient-dialog'
import VisitChart from '@/components/hospital/icu/main/out-and-visit/visit-chart/visit-chart'
import { Separator } from '@/components/ui/separator'
import { Suspense } from 'react'

export default async function OutAndVisitPage(props: {
  params: Promise<{
    hos_id: string
    target_date: string
  }>
}) {
  const params = await props.params
  return (
    <div className="flex h-icu-chart-main flex-col p-2">
      <div className="flex-1">
        <div className="mb-1 flex items-center gap-2 font-semibold">
          <span>퇴원차트</span>
          <AddOutDuePatientDialog />
        </div>
        <Suspense fallback={<OutAndVisitSkeleton />}>
          <IcuOutChart hosId={params.hos_id} targetDate={params.target_date} />
        </Suspense>
      </div>

      <Separator className="mb-2" />

      <div className="flex-1">
        <div className="mb-1 flex items-center gap-2 font-semibold">
          <span>면회리스트</span>
          <AddVisitPatientDialog />
        </div>
        <Suspense fallback={<OutAndVisitSkeleton />}>
          <VisitChart hosId={params.hos_id} targetDate={params.target_date} />
        </Suspense>
      </div>
    </div>
  )
}
