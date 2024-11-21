import SummaryTable from '@/components/hospital/icu/main/summary/table/summary-table'
import type { SummaryData } from '@/types/icu/summary'

export default function Summary({
  summaryData,
}: {
  summaryData: SummaryData[]
}) {
  return (
    <div className="h-icu-chart overflow-auto p-2 pb-[48px]">
      <SummaryTable summaryData={summaryData} />
    </div>
  )
}
