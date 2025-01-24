import SummaryTable from '@/components/hospital/icu/main/summary/table/summary-table'
import type { SummaryData } from '@/types/icu/summary'

export default function IcuSummaryEntry({
  summaryData,
}: {
  summaryData: SummaryData[]
}) {
  return (
    <div className="mt-12 h-mobile overflow-auto 2xl:mt-0 2xl:h-desktop">
      <SummaryTable summaryData={summaryData} />
    </div>
  )
}
