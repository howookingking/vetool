// import { getIcuChart } from '@/lib/services/icu/chart/get-icu-chart'

import NoResultSquirrel from '@/components/common/no-result-squirrel'
import PatientDetailInfo from '@/components/hospital/common/patient/patient-detail-info'
import { Button } from '@/components/ui/button'
import { getPatientChecklistData } from '@/lib/services/checklist/get-checklist-data'
import { ChecklistSidebarData } from '@/types/checklist/checklistchart'
import { cn } from '@/lib/utils/utils'

const ICON_SIZE_MAP = {
  sm: 20,
  md: 28,
  lg: 50,
} as const

const TEXT_SIZE_MAP = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-xl font-bold',
} as const

import { Pencil, FileCheck, ScrollText, Monitor, Trash2 } from 'lucide-react'
import TxChartInformation from '@/components/hospital/checklist/txchart/txchart-information'
import GeneralClock from '@/components/hospital/checklist/common/generalclock'
import TxChartMainContainer from '@/components/hospital/checklist/txchart/txchart-main-container'
import TxReportUser from '@/components/hospital/checklist/tx-report/tx-report-user'
export default async function TxChartReport(props: {
  children: React.ReactNode
  params: Promise<{
    hos_id: string
    target_date: string
    checklist_id: string
  }>
}) {
  const params = await props.params
  const txchartdata: any = await getPatientChecklistData(params.checklist_id)

  // const chartData = await getIcuChart(
  //   params.hos_id,
  //   params.target_date,
  //   params.patient_id,
  // )

  return (
    <div className="flex-col">
      {txchartdata?.checklist_id &&
      txchartdata?.starttime &&
      txchartdata?.endtime &&
      txchartdata.checklist_type === '사용자' ? (
        <TxReportUser txchartdata={txchartdata && txchartdata}></TxReportUser>
      ) : (
        <div className="flex-col">
          <div className="flex flex-wrap justify-center">
            <div className="mr-2 font-bold">{txchartdata?.due_date}</div>
            <PatientDetailInfo
              species={txchartdata?.patients?.species ?? ''}
              name={txchartdata?.patients?.name ?? ''}
              breed={txchartdata?.patients?.breed ?? ''}
              gender={txchartdata?.patients?.gender ?? ''}
              birth={txchartdata?.patients?.birth ?? ''}
              weight={txchartdata?.weight ? String(txchartdata.weight) : '0'}
            ></PatientDetailInfo>
          </div>
          <div
            className={cn(
              'flex items-center justify-center gap-2 text-sm text-slate-800',
              'lg',
              'h-screen',
            )}
          >
            TX 차트에 대한 과정이 종료되야 리포트를 출력할 수 있습니다.
          </div>
        </div>
      )}
    </div>
  )
}
