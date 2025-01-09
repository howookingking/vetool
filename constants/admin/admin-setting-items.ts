import DefaultOrdersTab from '@/components/hospital/admin/icu-settings/default-orders/default-orders-tab'
import MaintenanceRateTab from '@/components/hospital/admin/icu-settings/maintenance-rate/maintenace-rate-tab'
import MemoNameTab from '@/components/hospital/admin/icu-settings/memo-name/memo-name-tab'
import OrderColorTab from '@/components/hospital/admin/icu-settings/order-color-settings/order-color-tab'
import OrderFontSizeTab from '@/components/hospital/admin/icu-settings/order-font-size/order-font-size-tab'
import OrdererTab from '@/components/hospital/admin/icu-settings/orderer/orderer-tab'
import RerCalcTab from '@/components/hospital/admin/icu-settings/rer-calc/rer-calc-tab'
import TimeGuidelineTab from '@/components/hospital/admin/icu-settings/time-guideline/time-guideline-tab'
import VitalRefRangeTab from '@/components/hospital/admin/icu-settings/vital-ref-range/vital-ref-range-tab'

export const ADMIN_SETTING_ITEMS = [
  { label: '기본 차트', value: 'defaultOrder', Component: DefaultOrdersTab },
  {
    label: '오더색상 & 표시방법',
    value: 'orderColor',
    Component: OrderColorTab,
  },
  { label: '메모이름', value: 'memo', Component: MemoNameTab },
  {
    label: '오더자 & 처치자 설정',
    value: 'orderer',
    Component: OrdererTab,
  },
  {
    label: '유지속도 계산법',
    value: 'maintenanceRate',
    Component: MaintenanceRateTab,
  },
  { label: 'RER 계산법', value: 'rerCalc', Component: RerCalcTab },
  { label: '바이탈', value: 'vitalRefRange', Component: VitalRefRangeTab },
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
] as const
