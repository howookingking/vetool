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
export default async function TxChartForm(props: {
  children: React.ReactNode
  params: Promise<{
    hos_id: string
    target_date: string
    checklist_id: string
  }>
}) {
  const params = await props.params
  const txchartdata: ChecklistSidebarData = await getPatientChecklistData(
    params.checklist_id,
  )
  // const chartData = await getIcuChart(
  //   params.hos_id,
  //   params.target_date,
  //   params.patient_id,
  // )

  return (
    <div className="flex-col">
      <div className="flex justify-center">
        <div className="mr-2 font-bold">{txchartdata?.due_date}</div>
        <PatientDetailInfo
          species={txchartdata?.patients?.species ?? ''}
          name={txchartdata?.patients?.name ?? ''}
          breed={txchartdata?.patients?.breed ?? ''}
          gender={txchartdata?.patients?.gender ?? ''}
          birth={txchartdata?.patients?.birth ?? ''}
          weight={'0'}
        ></PatientDetailInfo>
      </div>
      <div className="fle-wrap flex items-center">
        <div className="m-5 text-xl font-bold">
          {txchartdata?.checklist_title}
        </div>
        <GeneralClock></GeneralClock>
      </div>
      <div className="m-3">
        <TxChartInformation txchartdata={txchartdata}></TxChartInformation>
      </div>
      <TxChartMainContainer
        checklistId={txchartdata.checklist_id}
      ></TxChartMainContainer>
      {!txchartdata.checklist_type && !txchartdata.checklist_title && (
        <div
          className={cn(
            'flex items-center justify-center gap-2 text-sm text-slate-800',
            'lg',
            'h-screen',
          )}
        >
          <Pencil></Pencil>를 클릭하여 치료차트에 대한 세부 정보를 작성 해
          주세요
        </div>
      )}
    </div>
  )
}
