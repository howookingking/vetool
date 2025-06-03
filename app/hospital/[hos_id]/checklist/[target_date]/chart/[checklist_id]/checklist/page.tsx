// import { getIcuChart } from '@/lib/services/icu/chart/get-icu-chart'

export default async function ChecklistChartForm(props: {
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
      <div>checklist</div>
    </div>
  )
}
