import { CheckNameArray, TxTypes } from '@/types/checklist/checklistchart'

export const TXTYPES: TxTypes = [
  '수혈',
  '응급',
  '수술',
  '마취',
  '검사',
  'CT',
  'MRI',
  '사용자',
]

export const checkListSetArray: CheckNameArray = [
  { displayName: 'T', name: '체온', type: 'range' },
  { displayName: 'P', name: '심박수', type: 'range' },
  { displayName: 'R', name: '호흡수', type: 'range' },
  { displayName: 'SPO2', name: 'SPO2', type: 'range' },
  { displayName: 'BG', name: '혈당', type: 'range' },
  { displayName: 'BP', name: '혈압', type: 'range' },
  { displayName: 'ETC', name: '비고', type: 'text' },
]

export const timeInterval = (timetz1: string, timetz2: string) => {
  // timestapmtz로 들어온 2개의 시간 분차이
  const date1 = new Date(timetz1)
  const date2 = new Date(timetz2)
  const diffMs = date2.getTime() - date1.getTime() + 1000
  const diffMinutes = Math.floor(diffMs / (1000 * 60)) // 분
  const hr = Math.floor(diffMinutes / 60)
  const disphr = hr > 0 ? hr : null
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
  return [timeplusmin, resultDate, resultlocaltime]
}
