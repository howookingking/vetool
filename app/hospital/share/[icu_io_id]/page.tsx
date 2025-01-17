import ReadOnlyChartTable from '@/components/hospital/icu/common-dialogs/preview/read-only-chart/read-only-chart-table'
import IcuShareChartInfos from '@/components/hospital/share/icu-share-chart-infos'
import IcuShareHeader from '@/components/hospital/share/header/icu-share-header'
import IcuShareNoResult from '@/components/hospital/share/icu-share-no-result'
import { DEFAULT_SHARE_ORDER_COLOR } from '@/constants/hospital/icu/chart/colors'
import { getIcuShareData } from '@/lib/services/share/share'
import HighlightGuide from '@/components/ui/highlight-guide'
import { SHARE_GUIDE_STEPS } from '@/constants/hospital/share'

export default async function IcuSharePage(props: {
  params: Promise<{ icu_io_id: string }>
  searchParams: Promise<{
    'target-date'?: string
    display?: string
    'main-vet'?: string
  }>
}) {
  const params = await props.params
  const searchParams = await props.searchParams

  const targetDate = searchParams['target-date']
  const display = searchParams.display
  const mainVetName = searchParams['main-vet']

  const shareData = await getIcuShareData(
    params.icu_io_id,
    targetDate as string,
  )

  if (!shareData) {
    return <IcuShareNoResult text="해당 환자의 입원 기록이 존재하지 않습니다" />
  }

  const { orders: chartOrderData, ...chartData } = shareData

  return (
    <div className="flex flex-col gap-4">
      <HighlightGuide steps={SHARE_GUIDE_STEPS} className="right-4" />

      <IcuShareHeader chartData={chartData} targetDate={targetDate as string} />
      <IcuShareChartInfos chartData={chartData} mainVetName={mainVetName} />
      <ReadOnlyChartTable
        chartOrderData={chartOrderData}
        orderColorsData={DEFAULT_SHARE_ORDER_COLOR}
        orderColorDisplay={display || 'full'}
        orderFontSizeData={16}
      />
    </div>
  )
}
