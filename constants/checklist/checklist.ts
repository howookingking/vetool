import { CheckNameArray, TxTypes } from '@/types/checklist/checklist-type'

export const ChecklistTypes: TxTypes = [
  '일반',
  '응급',
  '처치',
  '마취',
  '사용자',
]

export const checkListSetArray: CheckNameArray = [
  { displayName: 'T', name: '체온(°C)', type: 'range' },
  { displayName: 'P', name: '심박수', type: 'range' },
  { displayName: 'R', name: '호흡수', type: 'range' },
  { displayName: 'SPO2', name: 'SPO2(%)', type: 'range' },
  { displayName: 'BG', name: '혈당(g/dl)', type: 'range' },
  { displayName: 'BP', name: '혈압(mmHg)', type: 'range' },
  { displayName: 'CRT', name: 'CRT(sec)', type: 'range' },
  { displayName: 'MMC', name: 'MMC', type: 'text' },
  { displayName: 'ETC', name: '비고', type: 'text' },
]

export const checkListSetArraySurgery: CheckNameArray = [
  { displayName: 'T', name: '체온(°C)', type: 'range' },
  { displayName: 'P', name: '심박수', type: 'range' },
  { displayName: 'R', name: '호흡수', type: 'range' },
  { displayName: 'SPO2', name: 'SPO2(%)', type: 'range' },
  { displayName: 'BG', name: '혈당(g/dl)', type: 'range' },
  { displayName: 'BP', name: '혈압(mmHg)', type: 'range' },
  { displayName: 'CRT', name: 'CRT(sec)', type: 'range' },
  { displayName: 'MMC', name: 'MMC', type: 'text' },
  { displayName: 'ETC', name: '비고', type: 'text' },
]

export const emergencyPhrase: string[] = [
  '심정지',
  '호흡정지',
  '심페정지',
  '인공호흡(manual)',
  '인공호흡(vent)',
  '흉부압박',
  'AED',
  '심폐소생술(CPCR)',
  '심박회복',
  '자발호흡',
  '기관튜브 삽관',
  '정맥카테터 장착',
]

// db default 값으로 설정
// export const defaultChecklistSet = {
//   interval: '1',
//   preSet: [
//     {
//       setname: ['체온(°C)', '심박수', '호흡수', '혈압(mmHg)', '비고'],
//       settime: '0',
//     },
//   ],
// }

export const timeInterval = (timetz1: string, timetz2: string) => {
  // timestapmtz로 들어온 2개의 시간 분차이
  const date1 = new Date(timetz1)
  const date2 = new Date(timetz2)
  const diffMs = date2.getTime() - date1.getTime() + 1000
  const diffMinutes = Math.floor(diffMs / (1000 * 60)) // 분
  const hr = Math.floor(diffMinutes / 60)
  const disphr = hr > 0 ? hr : 0
  const min = diffMinutes % 60
  return [String(diffMinutes), String(disphr), String(min)]
}

export const minToLocalTime = (start: string, min: string) => {
  const date1 = new Date(start)
  const date2 = date1.getTime() + Number(min) * 60 * 1000 // 분을 밀리초로 변환
  const newDate = new Date(date2)
  const hh = newDate.getHours().toString().padStart(2, '0')
  const mm = newDate.getMinutes().toString().padStart(2, '0')
  return [date2, `${hh}:${mm}`]
}

export const timestampPlusMin = (time: number, min: string) => {
  const timeplusmin = time + Number(min) * 60 * 1000
  const resultDate = new Date(timeplusmin)
  const resultlocaltime = resultDate.toLocaleTimeString()
  const hh = resultDate.getHours().toString().padStart(2, '0')
  const mm = resultDate.getMinutes().toString().padStart(2, '0')
  return [timeplusmin, resultDate, resultlocaltime, `${hh}:${mm}`]
}
