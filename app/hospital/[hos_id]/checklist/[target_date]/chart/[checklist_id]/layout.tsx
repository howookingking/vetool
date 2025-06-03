// import { getIcuChart } from '@/lib/services/icu/chart/get-icu-chart'

import ChecklistTopNav from '@/components/hospital/checklist/checklist-top/checklist-top-nav'

export default async function ChecklistChartPage(props: {
  children: React.ReactNode
  params: Promise<{
    hos_id: string
    target_date: string
    patient_id: string
  }>
}) {
  const params = await props.params

  // const chartData = await getIcuChart(
  //   params.hos_id,
  //   params.target_date,
  //   params.patient_id,
  // )

  return (
    <div className="flex-col">
      <ChecklistTopNav />
      <div>{props.children}</div>
    </div>
  )

  //   <IcuChartEntry chartData={chartData} patientId={params.patient_id} />
}
