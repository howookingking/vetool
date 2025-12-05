import NoResultSquirrel from '@/components/common/no-result-squirrel'
import ReadOnlyIcuChart from '@/components/common/read-only-icu-chart/read-only-icu-chart'
import IcuShareHeader from '@/components/hospital/share/header/icu-share-header'
import IcuShareNoResult from '@/components/hospital/share/icu-share-no-result'
import HighlightGuide from '@/components/ui/highlight-guide'
import { SHARE_GUIDE_STEPS } from '@/constants/hospital/icu/guide/guide'
import { fetchSharedIcuData } from '@/lib/services/icu/share'
import { BasicHosDataProvider } from '@/providers/basic-hos-data-context-provider'

type IcuSharePageProps = {
  params: Promise<{ icu_io_id: string }>
  searchParams: Promise<{
    targetDate?: string
    orderColors?: string
    showOrderer?: string
    timeGuideline?: string
    vitalRefRange?: string
    isInChargeSystem?: string
  }>
}

export default async function IcuSharePage(props: IcuSharePageProps) {
  const params = await props.params
  const {
    targetDate,
    orderColors,
    showOrderer,
    timeGuideline,
    vitalRefRange,
    isInChargeSystem,
  } = await props.searchParams

  const orderColorsData = JSON.parse(decodeURIComponent(orderColors!))
  const timeGuidelineData = JSON.parse(decodeURIComponent(timeGuideline!))
  const vitalRefRangeData = JSON.parse(decodeURIComponent(vitalRefRange!))
  const showOrdererData = JSON.parse(decodeURIComponent(showOrderer!))
  const isInChargeSystemData = JSON.parse(decodeURIComponent(isInChargeSystem!))

  const sharedChartData = await fetchSharedIcuData(
    params.icu_io_id,
    targetDate!,
  )

  if (!sharedChartData) {
    return <IcuShareNoResult text="차트가 존재하지 않습니다" />
  }

  return (
    <BasicHosDataProvider
      basicHosData={{
        groupListData: [],
        orderColorsData: orderColorsData,
        memoNameListData: ['', '', ''],
        orderFontSizeData: 16,
        showOrderer: showOrdererData,
        showTxUser: false,
        icuSidebarPatients: [],
        timeGuidelineData: timeGuidelineData,
        vetList: [],
        vitalRefRange: vitalRefRangeData,
        plan: 'severe',
        isInChargeSystem: isInChargeSystemData,
      }}
    >
      <NoResultSquirrel
        size="lg"
        text="PC 환경에서 이용해주세요"
        className="h-screen flex-col lg:hidden"
      />

      <div className="hidden flex-col lg:flex">
        <IcuShareHeader chartData={sharedChartData} targetDate={targetDate!} />
        <ReadOnlyIcuChart chartData={sharedChartData} />
      </div>

      <HighlightGuide steps={SHARE_GUIDE_STEPS} localStorageKey="share-guide" />
    </BasicHosDataProvider>
  )
}
