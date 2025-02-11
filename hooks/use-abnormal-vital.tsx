import { Treatment } from '@/types/icu/chart'

const PANTING = ['p', 'panting']

// 체크리스트 결과 Number type으로 변환
const parseChecklistResult = (
  value?: string | null,
  defaultValue: string = '0',
) => {
  return Number(value || defaultValue)
}

export default function useAbnormalVital(
  treatment?: Treatment,
  rowVitalRefRange?: {
    min: number
    max: number
  },
) {
  // 바이탈 결과를 계산하여 'below', 'above', 'normal' 반환
  const calcVitalResult = () => {
    if (
      !rowVitalRefRange ||
      !treatment?.tx_result ||
      treatment.tx_result === null
    ) {
      return undefined
    }

    const result = treatment.tx_result

    if (
      PANTING.some((keyword) => result.toLowerCase().includes(keyword)) &&
      result.toLowerCase() !== 'pass'
    ) {
      return 'above'
    }

    const parsedValue = parseVitalValue(result)

    if (parsedValue < rowVitalRefRange.min) {
      return 'below'
    }

    if (parsedValue > rowVitalRefRange.max) {
      return 'above'
    }

    return 'normal'
  }

  const isAbnormalVital =
    calcVitalResult() === 'below' || calcVitalResult() === 'above'

  return { calcVitalResult: calcVitalResult(), isAbnormalVital }
}

// 바이탈 값 파싱 함수 ('sr', '#', '/')
function parseVitalValue(result: string): number {
  // 호흡수 sr 파싱
  const srMatch = result.match(/(\d+)\s*(?:sr|\()/i)
  if (srMatch) {
    return parseChecklistResult(srMatch[1])
  }

  // 혈압 - # 파싱
  const sharpMatch = result.match(/^(\d+)#/)
  if (sharpMatch) {
    return parseChecklistResult(sharpMatch[1])
  }

  // 혈압 - / 파싱 -> 최댓값 반환
  const slashMatch = result.match(/^(\d+)\/(\d+)/)
  if (slashMatch) {
    const [systolic, diastolic] = [slashMatch[1], slashMatch[2]].map(parseFloat)
    return Math.max(systolic, diastolic)
  }

  // 기본 숫자 파싱
  return parseChecklistResult(result)
}
