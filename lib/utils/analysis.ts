import type { ChartData, IcuAnalysisData } from '@/types/icu/analysis'
import { VitalData } from '@/types/icu/chart'
import { differenceInDays } from 'date-fns'
import { DateRange } from 'react-day-picker'

// 날짜별 입원 환자 수 계산
export const groupDataByDate = (originalData: IcuAnalysisData[]) => {
  const dataMap = new Map<string, ChartData>()

  originalData.forEach((item) => {
    const date = item.target_date

    if (!dataMap.has(date)) {
      dataMap.set(date, { date, all: 0, canine: 0, feline: 0 })
    }

    const data = dataMap.get(date)!
    data.all += 1

    if (item.patient.species === 'canine') data.canine += 1
    if (item.patient.species === 'feline') data.feline += 1
  })

  return Array.from(dataMap.values()).sort((a, b) =>
    a.date.localeCompare(b.date),
  )
}

// 환자 중복이 제거된 품종별 입원 환자 수 계산
export const calculateTotals = (originalData: IcuAnalysisData[]) => {
  const patientIdSet = new Set<string>()

  return originalData.reduce(
    (acc, item) => {
      const patientId = item.patient.patient_id

      if (patientIdSet.has(patientId)) return acc

      patientIdSet.add(patientId)

      acc.all += 1

      if (item.patient.species === 'canine') acc.canine += 1
      if (item.patient.species === 'feline') acc.feline += 1

      return acc
    },
    { all: 0, canine: 0, feline: 0 },
  )
}

export const filterIoPatients = (
  analysisData: IcuAnalysisData[],
  selectedGroup: string | null,
  selectedVet: string | null,
) => {
  let filteredData = analysisData

  if (selectedGroup && selectedGroup !== 'all') {
    filteredData = filteredData.filter(
      (item) => item.icu_io?.group_list?.includes(selectedGroup) ?? false,
    )
  }

  if (selectedVet && selectedVet !== 'all') {
    filteredData = filteredData.filter(
      (item) => item.main_vet.name === selectedVet,
    )
  }

  return filteredData
}

export const calculateDailyAverage = (
  analysisData: ChartData[],
  dateRange: DateRange | undefined,
) => {
  const numberOfDays =
    dateRange?.from && dateRange?.to
      ? Math.max(1, differenceInDays(dateRange.to, dateRange.from) + 1)
      : 1

  const total = {
    all: analysisData.reduce((acc, curr) => acc + curr.all, 0),
    canine: analysisData.reduce((acc, curr) => acc + curr.canine, 0),
    feline: analysisData.reduce((acc, curr) => acc + curr.feline, 0),
  }

  const dailyAverages = {
    all: Math.round(total.all / numberOfDays),
    views: Math.round(total.all / numberOfDays),
    canine: Math.round(total.canine / numberOfDays),
    feline: Math.round(total.feline / numberOfDays),
  }

  return dailyAverages
}

// 기본값을 설정하는 헬퍼 함수
const parseWithDefault = (
  value?: string | null,
  defaultValue: string = '0',
): number => {
  return parseFloat(value || defaultValue)
}

/**
 * 바이탈 측정 값 파싱 함수
 * @param currentVital 현재 측정 중인 바이탈 종류
 * @param item 현재 측정 중인 바이탈 데이터
 * @returns 파싱된 바이탈 값
 */
export const parseVitalValue = (
  currentVital: string,
  item: VitalData,
): number => {
  const result = item.icu_chart_tx_result

  if (!item) return 0

  switch (currentVital) {
    case '체중':
      if (result?.includes('kg')) {
        return parseWithDefault(result.split('kg')[0])
      }

      return parseWithDefault(result)

    case '심박수':
    case '활력':
      return parseWithDefault(result)

    case '혈압':
      if (result?.includes('#')) {
        return parseWithDefault(result.split('#')[0])
      }

      if (result?.includes('/')) {
        const [systolic, diastolic] = result.split('/').map(parseFloat)
        return Math.max(systolic, diastolic)
      }

      return parseWithDefault(result)

    case '호흡수':
      if (
        result?.toLowerCase().includes('panting') ||
        result?.toLowerCase().includes('p')
      ) {
        return 200
      }

      return parseWithDefault(result)

    default:
      return parseWithDefault(result)
  }
}
