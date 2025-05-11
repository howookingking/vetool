import ShareContainer from '@/components/company/share/share-container'
import HighlightGuide from '@/components/ui/highlight-guide'
import { DEFAULT_SHARE_ORDER_COLOR } from '@/constants/hospital/icu/chart/colors'
import { SHARE_GUIDE_STEPS } from '@/constants/hospital/icu/guide/guide'
import { fetchSharedIcuData } from '@/lib/services/icu/share'
import { BasicHosDataProvider } from '@/providers/basic-hos-data-context-provider'

// 추후 라우트 분기해야함
// /test/io, test/echocardio, test/surgery ...

export default async function TestPage(props: {
  searchParams: Promise<{
    'target-date'?: string
  }>
}) {
  const searchParams = await props.searchParams
  const targetDate = searchParams['target-date']
  const testIoId = '4f89def7-7123-4479-a726-67d658a39589'

  const sharedChartData = await fetchSharedIcuData(
    testIoId,
    targetDate as string,
  )

  return (
    <div className="h-full">
      <div className="flex flex-col gap-4 p-4">
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
            plan: 'severe',
            isInChargeSystem: false,
            baselineTime: 0,
          }}
        >
          <ShareContainer
            sharedChartData={sharedChartData}
            targetDate={targetDate as string}
          />
        </BasicHosDataProvider>
      </div>
      <HighlightGuide steps={SHARE_GUIDE_STEPS} localStorageKey="share-guide" />
    </div>
  )
}
