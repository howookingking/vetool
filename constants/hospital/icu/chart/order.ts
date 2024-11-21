// 불필요
export const DEFAULT_ICU_ORDER_NAME = [
  {
    orderName: '체온(T)',
    orderComment: '직장체온',
  },
  {
    orderName: '심박수(P)',
    orderComment: '분당 심박수',
    dataType: 'checklist',
  },
  {
    orderName: '호흡수(R)',
    orderComment: '①기침 ②맑은콧물 ③화농성콧물',
    dataType: 'checklist',
  },
  {
    orderName: '혈압(BP)',
    orderComment: '도플러 혈압계',
    dataType: 'checklist',
  },
  {
    orderName: '활력',
    orderComment: '①양호 ②저하 ③불량',
    dataType: 'checklist',
  },
  {
    orderName: '구토',
    orderComment: '①위액 ②음식물 ③혈액 ④거품 ⑤기타',
    dataType: 'checklist',
  },
  {
    orderName: '배변',
    orderComment: '①정상 ②약간무름 ③무름 ④설사 ⑤혈액 ⑥점액',
    dataType: 'checklist',
  },
  {
    orderName: '배뇨',
    orderComment: '①정상뇨 ②옅은뇨 ③진한뇨 ④혈뇨',
    dataType: 'checklist',
  },
  {
    orderName: '수액',
    orderComment: 'N/S',
    dataType: 'fluid',
  },
  {
    orderName: '라인확인',
    orderComment: '라인설치일',
    dataType: 'fluid',
  },
  {
    orderName: 'Cefazoline 30mg/kg IV TID',
    orderComment: '2ml/dog',
    dataType: 'injection',
  },
  {
    orderName: 'Famotidine 0.5mg/kg IV BID',
    orderComment: '1ml/dog',
    dataType: 'injection',
  },
  {
    orderName: '사료',
    orderComment: '①모두먹음 ②절반 ③안먹음',
    dataType: 'feed',
  },
] as const

export const CHECKLIST_ORDERS = [
  {
    orderName: '체온(T)',
    orderComment: '직장체온',
    min: {
      canine: 38.3,
      feline: 38.3,
    },
    max: {
      canine: 39.2,
      feline: 39.2,
    },
  },
  {
    orderName: '심박수(P)',
    orderComment: '분당 심박수',
    min: {
      canine: 60,
      feline: 160,
    },
    max: {
      canine: 140,
      feline: 220,
    },
  },
  {
    orderName: '호흡수(R)',
    orderComment: '①기침 ②맑은콧물 ③화농성콧물',
    min: {
      canine: 15,
      feline: 15,
    },
    max: {
      canine: 30,
      feline: 30,
    },
  },
  {
    orderName: '혈압(BP)',
    orderComment: '도플러 혈압계',
    min: {
      canine: 110,
      feline: 110,
    },
    max: {
      canine: 160,
      feline: 160,
    },
  },
  {
    orderName: '활력',
    orderComment: '①양호 ②저하 ③불량',
  },
  {
    orderName: '구토',
    orderComment: '①위액 ②음식물 ③혈액 ④거품 ⑤기타',
  },
  {
    orderName: '배변',
    orderComment: '①정상 ②약간무름 ③무름 ④설사 ⑤혈액 ⑥점액',
  },
  {
    orderName: '배뇨',
    orderComment: '①정상뇨 ②옅은뇨 ③진한뇨 ④혈뇨',
  },
  {
    orderName: '체중',
    orderComment: '',
  },
] as const

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
    label: '기타',
    value: 'manual',
  },
  {
    label: '식이',
    value: 'feed',
  },
] as const
