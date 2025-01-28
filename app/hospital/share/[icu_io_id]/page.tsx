import ChartTable from '@/components/hospital/icu/main/chart/selected-chart/chart-body/table/chart-table'
import IcuShareHeader from '@/components/hospital/share/header/icu-share-header'
import IcuShareChartInfos from '@/components/hospital/share/icu-share-chart-infos'
import IcuShareNoResult from '@/components/hospital/share/icu-share-no-result'
import HighlightGuide, { Step } from '@/components/ui/highlight-guide'
import { DEFAULT_SHARE_ORDER_COLOR } from '@/constants/hospital/icu/chart/colors'
import { getSharedIcuData } from '@/lib/services/icu/share'
import { BasicHosDataProvider } from '@/providers/basic-hos-data-context-provider'

type IcuSharePageProps = {
  params: Promise<{ icu_io_id: string }>
  searchParams: Promise<{
    'target-date'?: string
    display: string
    'main-vet'?: string
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

const SHARE_GUIDE_STEPS: Step[] = [
  {
    target: 'date-picker',
    title: '날짜 선택',
    description: '해당 날짜의 차트로 이동합니다',
  },
  {
    target: 'patient-info',
    title: '환자 정보',
    description: '환자의 기본 정보와 최근 측정된 체중을 확인할 수 있습니다',
  },
  {
    target: 'chart-info',
    title: '입원 정보',
    description: '환자의 입원 정보를 확인할 수 있습니다',
  },
  {
    target: 'order-list',
    title: '오더 정보',
    description: '시간별 오더 및 처치 결과를 확인할 수 있습니다',
  },
]
