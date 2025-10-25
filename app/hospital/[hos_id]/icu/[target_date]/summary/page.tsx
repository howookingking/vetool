import NoResultSquirrel from '@/components/common/no-result-squirrel'
import SummaryInfos from '@/components/hospital/icu/main/summary/summary-infos/summary-infos'
import SummaryTable from '@/components/hospital/icu/main/summary/table/summary-table'
import { fetchSummaryData } from '@/lib/services/icu/summary/fetch-summary-data'
import { DashboardIcon } from '@radix-ui/react-icons'
import MobileTitle from '../../../../../../components/common/mobile-title'

export default async function SummaryPage(props: {
  params: Promise<{
    hos_id: string
    target_date: string
  }>
}) {
  const { hos_id, target_date } = await props.params
  const { prev_summary_count, target_date_summary_data } =
    await fetchSummaryData(hos_id, target_date)

  return (
    <>
      <MobileTitle title="종합현황" icon={DashboardIcon} />

      {target_date_summary_data.length === 0 ? (
        <NoResultSquirrel
          text="입원환자 없음"
          className="h-mobile flex-col 2xl:h-desktop"
          size="lg"
        />
      ) : (
        <div className="space-y-2 p-2">
          <SummaryTable
            summaryData={target_date_summary_data}
            targetDate={target_date}
            hosId={hos_id}
          />

          <SummaryInfos
            summaryData={target_date_summary_data}
            targetDate={target_date}
            prevSummaryCount={prev_summary_count}
          />
        </div>
      )}
    </>
  )
}
