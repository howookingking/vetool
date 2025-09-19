// import { getIcuChart } from '@/lib/services/icu/chart/get-icu-chart'

export default async function ChecklistChartPage(props: {
  children: React.ReactNode
  params: Promise<{
    hos_id: string
    checklist_id: string
  }>
}) {
  return (
    <div className="relative flex h-desktop flex-col overflow-auto">
      {props.children}
    </div>
  )
}
