// import { getIcuChart } from '@/lib/services/icu/chart/get-icu-chart'

import ChecklistHeader from '@/components/hospital/checklist/checklist-header/checklist-header'

export default async function ChecklistChartPage(props: {
  children: React.ReactNode
  params: Promise<{
    hos_id: string
    target_date: string
    checklist_id: string
  }>
}) {
  const params = await props.params

  // const chartData = await getIcuChart(
  //   params.hos_id,
  //   params.target_date,
  //   params.patient_id,
  // )

  return (
    <div className="relative flex h-desktop flex-col overflow-auto">
      <ChecklistHeader checklistId={params.checklist_id} />
      <div>{props.children}</div>
    </div>
  )

  //   <IcuChartEntry chartData={chartData} patientId={params.patient_id} />
}
