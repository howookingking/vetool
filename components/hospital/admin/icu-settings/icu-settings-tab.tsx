import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import DefaultOrdersTab from './default-orders/default-orders-tab'
import HosDrugTab from './hos-drug/hos-drug-tab'
import MemoNameTab from './memo-name/memo-name-tab'
import OrderColorTab from './order-color-settings/order-color-tab'
import OrderFontSizeTab from './order-font-size/order-font-size-tab'
import OrdererTab from './orderer/orderer-tab'
import TimeGuidelineTab from './time-guideline/time-guideline-tab'
import VitalRefRangeTab from './vital-ref-range/vital-ref-range-tab'

const ADMIN_SETTING_ITEMS = [
  { label: '기본 차트', value: 'defaultOrder', Component: DefaultOrdersTab },
  {
    label: '오더색상 & 표시방법',
    value: 'orderColor',
    Component: OrderColorTab,
  },
  { label: '메모 이름', value: 'memo', Component: MemoNameTab },
  {
    label: '오더자 & 처치자',
    value: 'orderer',
    Component: OrdererTab,
  },
  {
    label: '바이탈 정상 범위',
    value: 'vitalRefRange',
    Component: VitalRefRangeTab,
  },
  {
    label: '오더 글자 크기',
    value: 'orderFontSize',
    Component: OrderFontSizeTab,
  },
  {
    label: '시간 가이드라인',
    value: 'timeGuideLine',
    Component: TimeGuidelineTab,
  },
  {
    label: '자주 사용하는 주사',
    value: 'hosDrug',
    Component: HosDrugTab,
  },
] as const

export default function IcuSettingsTab({ hosId }: { hosId: string }) {
  return (
    <Tabs defaultValue="defaultOrder">
      <TabsList className="grid grid-cols-8">
        {ADMIN_SETTING_ITEMS.map((item) => (
          <TabsTrigger key={item.value} value={item.value} className="text-sm">
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {ADMIN_SETTING_ITEMS.map((item) => (
        <TabsContent key={item.value} value={item.value}>
          <item.Component hosId={hosId} />
        </TabsContent>
      ))}
    </Tabs>
  )
}
