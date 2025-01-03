import SummaryTable from '@/components/hospital/icu/main/summary/table/summary-table'
import type { SummaryData } from '@/types/icu/summary'

export default function Summary({
  summaryData,
}: {
  summaryData: SummaryData[]
}) {
  return (
    <div className="mt-12 2xl:mt-0">
      <div className="relative h-[calc(100vh-88px)] overflow-auto">
        <SummaryTable summaryData={summaryData} />
      </div>
    </div>
  )
}
