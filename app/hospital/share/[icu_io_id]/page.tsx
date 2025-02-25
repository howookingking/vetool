import ChartTable from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table'
import IcuShareHeader from '@/components/hospital/share/header/icu-share-header'
import IcuShareChartInfos from '@/components/hospital/share/icu-share-chart-infos'
import IcuShareNoResult from '@/components/hospital/share/icu-share-no-result'
import HighlightGuide from '@/components/ui/highlight-guide'
import { DEFAULT_SHARE_ORDER_COLOR } from '@/constants/hospital/icu/chart/colors'
import { SHARE_GUIDE_STEPS } from '@/constants/hospital/icu/guide/guide'
import { getSharedIcuData } from '@/lib/services/icu/share'
import { BasicHosDataProvider } from '@/providers/basic-hos-data-context-provider'

type IcuSharePageProps = {
  params: Promise<{ icu_io_id: string }>
  searchParams: Promise<{
    'target-date'?: string
  }>
}

export default async function IcuSharePage(props: IcuSharePageProps) {
  const params = await props.params
  const searchParams = await props.searchParams
  const targetDate = searchParams['target-date']

  const sharedChartData = await getSharedIcuData(
    params.icu_io_id,
    targetDate as string,
  )

  if (!sharedChartData) {
    return <IcuShareNoResult text="차트가 존재하지 않습니다" />
  }

  return (
    <BasicHosDataProvider
      basicHosData={{
        groupListData: [],
        orderColorsData: DEFAULT_SHARE_ORDER_COLOR,
        memoNameListData: ['', '', ''],
        orderColorDisplay: 'dot',
        orderFontSizeData: 16,
        showOrderer: false,
        showTxUser: false,
        sidebarData: [],
        timeGuidelineData: [],
        vetsListData: [],
        vitalRefRange: [],
      }}
    >
      <div className="flex flex-col gap-4 p-4">
        <IcuShareHeader
          chartData={sharedChartData}
          targetDate={targetDate as string}
        />

        <IcuShareChartInfos chartData={sharedChartData} />

        <ChartTable chartData={sharedChartData} preview />
      </div>
      <HighlightGuide steps={SHARE_GUIDE_STEPS} localStorageKey="share-guide" />
    </BasicHosDataProvider>
  )
}
