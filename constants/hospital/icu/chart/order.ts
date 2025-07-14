export const CHECKLIST_ORDERS = [
  '체온',
  '심박수',
  '호흡수',
  '혈압',
  '체중',
  '활력',
  '구토',
  '배변',
  '배뇨',
  'SPO2',
  '혈당',
] as const

export type ChecklistOrder = (typeof CHECKLIST_ORDERS)[number]

export const DEFAULT_ICU_ORDER_TYPE = [
  {
    label: '체크리스트',
    value: 'checklist',
  },
  {
    label: '수액',
    value: 'fluid',
  },
  {
    label: '주사',
    value: 'injection',
  },
  {
    label: '경구',
    value: 'po',
  },
  {
    label: '검사',
    value: 'test',
  },
  {
    label: '식이',
    value: 'feed',
  },
  {
    label: '기타',
    value: 'manual',
  },
] as const

export const DEFAULT_ICU_ORDER_TYPE_DIC = {
  checklist: '체크리스트',
  fluid: '수액',
  injection: '주사',
  po: '경구',
  test: '검사',
  manual: '기타',
  feed: '식이',
} as const

export const BG_CANDIDATES = [
  '혈당',
  'bg',
  'blood glucose',
  '간이혈당',
  '혈당',
  '간이혈당',
  '간이 혈당',
  '혈당측정',
  '간이혈당계',
] as const

export const DESKTOP_WIDTH_SEQUENCE = [300, 400, 500, 600] as const
export const MOBILE_WIDTH_SEQUENCE = [200, 300] as const

export type OrderType = (typeof DEFAULT_ICU_ORDER_TYPE)[number]['value']
