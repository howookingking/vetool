import NoResultSquirrel from '@/components/common/no-result-squirrel'
import SummaryInfos from '@/components/hospital/icu/main/summary/summary-infos/summary-infos'
import SummaryTable from '@/components/hospital/icu/main/summary/table/summary-table'
import { fetchSummaryData } from '@/lib/services/icu/summary/fetch-summary-data'

export default async function SummaryPage(props: {
  params: Promise<{
    hos_id: string
    target_date: string
  }>
}) {
  const { hos_id, target_date } = await props.params
  const { prev_summary_count, target_date_summary_data } =
    await fetchSummaryData(hos_id, target_date)

  if (target_date_summary_data.length === 0) {
    return (
      <NoResultSquirrel
        text="입원환자 없음"
        className="h-screen flex-col"
        size="lg"
      />
    )
  }

  return (
    <div className="mt-12 h-mobile overflow-auto bg-muted p-2 2xl:mt-0 2xl:h-desktop">
      <SummaryInfos
        summaryData={target_date_summary_data}
        targetDate={target_date}
        prevSummaryCount={prev_summary_count}
      />

      <SummaryTable
        summaryData={target_date_summary_data}
        targetDate={target_date}
      />
    </div>
  )
}
