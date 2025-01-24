import NoResultSquirrel from '@/components/common/no-result-squirrel'
import IcuSummaryEntry from '@/components/hospital/icu/main/summary/icu-summary-entry'
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
        className="h-screen flex-col"
        size="lg"
      />
    )
  }

  return <IcuSummaryEntry summaryData={summaryData} />
}
