import SummaryTable from '@/components/hospital/icu/main/summary/table/summary-table'
import type { SummaryData } from '@/types/icu/summary'

export default function Summary({
  summaryData,
}: {
  summaryData: SummaryData[]
}) {
  return (
    <div className="2xl:h-desktop h-mobile mt-12 overflow-auto 2xl:mt-0">
      <SummaryTable summaryData={summaryData} />
    </div>
  )
}
