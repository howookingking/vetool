import NoResultSquirrel from '@/components/common/no-result-squirrel'
import Summary from '@/components/hospital/icu/main/summary/summary'
import { getIcuSummaryData } from '@/lib/services/icu/summary/get-summary-data'

export default async function SummaryPage(props: {
  params: Promise<{
    hos_id: string
    target_date: string
  }>
}) {
  const params = await props.params
  const summaryData = await getIcuSummaryData(params.hos_id, params.target_date)

  if (!summaryData) {
    return (
      <NoResultSquirrel
        text="등록된 환자가 없습니다"
        className="h-icu-chart-main flex-col"
        size="lg"
      />
    )
  }

  return <Summary summaryData={summaryData} />
}
