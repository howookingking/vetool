import DefaultOrdersTab from '@/components/hospital/admin/icu-settings/default-orders/default-orders-tab'
import HosDrugTab from '@/components/hospital/admin/icu-settings/hos-drug/hos-drug-tab'
import MemoNameTab from '@/components/hospital/admin/icu-settings/memo-name/memo-name-tab'
import OrderColorTab from '@/components/hospital/admin/icu-settings/order-color-settings/order-color-tab'
import OrderFontSizeTab from '@/components/hospital/admin/icu-settings/order-font-size/order-font-size-tab'
import OrdererTab from '@/components/hospital/admin/icu-settings/orderer/orderer-tab'
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
  { label: '바이탈 범위', value: 'vitalRefRange', Component: VitalRefRangeTab },
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
    label: '주사 약물 설정',
    value: 'hosDrug',
    Component: HosDrugTab,
  },
] as const

export const ORDER_FONT_SIZES = {
  14: {
    title: '14px',
    desc: '12px',
  },
  16: {
    title: '16px',
    desc: '14px',
  },
  18: {
    title: '18px',
    desc: '16px',
  },
} as const

export const TIME_GUIDELINES_SAMPLE_ORDERS = [
  {
    orderTitle: 'AMC IV',
    orderComment: '1mL',
  },
  {
    orderTitle: 'Esomeprazole SC',
    orderComment: '1mL',
  },
] as const
